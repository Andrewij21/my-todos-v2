"use client";
import { handleSignIn, handleGoogleSignin } from "@/app/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Chrome } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    try {
      await handleSignIn(values);
      router.push("/");
      window.location.reload();
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Welcome back</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize font-semibold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="pb-2">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isLoading}
              >
                sign in
              </Button>
            </CardFooter>
          </form>
        </Form>
        <CardFooter className="flex flex-col gap-2 items-stretch text-center">
          <span className="text-card-foreground">or</span>
          {/* <form action={handleGithubSignin}>
            <Button variant="outline" className="w-full">
              <GitHubLogoIcon className="mr-2" />
              sign up with github
            </Button>
          </form> */}
          <form action={handleGoogleSignin}>
            <Button variant="outline" className="w-full">
              <Chrome className="mr-2" />
              sign up with google
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
