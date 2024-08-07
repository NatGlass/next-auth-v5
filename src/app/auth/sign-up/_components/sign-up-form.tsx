"use client";

import { signupUserAction } from "@/actions/sign-up-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignupInput, SignupSchema } from "@/validators/sign-up-validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

function SignUpForm() {
  const [success, setSuccess] = useState(false);
  const form = useForm<SignupInput>({
    resolver: valibotResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control, formState, reset, setError } = form;

  const submit = async (data: SignupInput) => {
    const res = await signupUserAction(data);

    if (res.success) {
      setSuccess(true);
      reset();
    } else {
      switch (res.statusCode) {
        case 400: {
          const nestedErrors = res.error.nested;

          for (const key in nestedErrors) {
            setError(key as keyof SignupInput, {
              message: nestedErrors[key]?.[0],
            });
          }

          break;
        }
        default: {
          const error = res.error || "Internal server error";
          setError("confirmPassword", { message: error });
        }
      }
    }
  };

  if (success) {
    return (
      <div>
        <p>User created successfully</p>
        <span>
          Click{" "}
          <Link href="/auth/sign-in" className="underline text-primary">
            here
          </Link>
          to sign in.
        </span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-4 max-w-sm mx-auto"
      >
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John"
                  {...field}
                  autoComplete="name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="John@example.com"
                  {...field}
                  autoComplete="email"
                />
              </FormControl>
              <FormDescription>
                Must be an email you can access for email verification
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} autoComplete="new-password" />
              </FormControl>
              <FormDescription>Minimum 6 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={formState.isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
