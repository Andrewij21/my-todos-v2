import * as z from "zod";

export const SignInSchema = z.object({
    email:z.string().min(1).email({
        message:"Email is required"
    }),
    password:z.string().min(1,{
        message:"Password is required"
    })
})
export const SignUpSchema = z.object({
    email:z.string().email({
        message:"Email is invalid"
    }),
    password:z.string().min(1,{
        message:"Password is required"
    }),
    confirmPassword: z.string().min(1, {
        message: "Confirm Password is required",
      }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will appear in the confirmPassword field
  });

  
export const CreateTodoSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Must contain at least 1 character(s)" })
      .max(50),
    body: z
      .string()
      .min(1, { message: "Must contain at least 1 character(s)" })
      .max(100),
  });