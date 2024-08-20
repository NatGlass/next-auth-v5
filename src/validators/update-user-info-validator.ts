import * as v from "valibot";

export const UpdateUserInfoSchema = v.object({
    id: v.pipe(
        v.string("Id must be a string"),
        v.uuid("Id must be a valid UUID")
    ),
    name: v.pipe(
        v.string("Name must be a string"),
        v.nonEmpty("Name cannot be empty"),
        v.minLength(3, "Name must be at least 3 characters long")
    )
})

export type UpdateUserInfoInput = v.InferInput<typeof UpdateUserInfoSchema>