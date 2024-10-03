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
        message:"Email is required"
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