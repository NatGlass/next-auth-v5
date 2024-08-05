import * as v from "valibot";

export const SigninSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty("Email cannot be empty"), v.email()),
  password: v.pipe(v.string(), v.nonEmpty("Password cannot be empty")),
});

export type SigninInput = v.InferInput<typeof SigninSchema>;
