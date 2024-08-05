import * as v from "valibot";

export const SignupSchema = v.pipe(
  v.object({
    name: v.optional(
      v.union([
        v.pipe(
          v.literal(""),
          v.transform(() => undefined)
        ),
        v.pipe(
          v.string(),
          v.nonEmpty("Name cannot be empty"),
          v.minLength(3, "Name must be at least 3 characters long")
        ),
      ])
    ),
    email: v.pipe(v.string(), v.nonEmpty("Email cannot be empty"), v.email()),
    password: v.pipe(
      v.string(),
      v.nonEmpty("Password cannot be empty"),
      v.minLength(6, "Password must be at least 6 characters long")
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.nonEmpty("Confirm password cannot be empty")
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "Passwords do not match"
    ),
    ["confirmPassword"]
  )
);

export type SignupInput = v.InferInput<typeof SignupSchema>;