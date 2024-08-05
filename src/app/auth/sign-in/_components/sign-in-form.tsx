"use client";

import { signinUserAction } from "@/actions/sign-in-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SigninInput, SigninSchema } from "@/validators/sign-in-validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

function SignInForm() {
  const form = useForm<SigninInput>({
    resolver: valibotResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control, formState, reset, setError } = form;

  const submit = async (data: SigninInput) => {
    const res = await signinUserAction(data);

    if (res.success) {
      reset();
    } else {
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-4 max-w-sm mx-auto"
      >
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
                <Input
                  type="password"
                  {...field}
                  autoComplete="current-password"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={formState.isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
