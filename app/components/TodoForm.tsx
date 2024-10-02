import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Must contain at least 1 character(s)" })
    .max(50),
  body: z
    .string()
    .min(1, { message: "Must contain at least 1 character(s)" })
    .max(100),
});

export default function TodoForm({
  className,
  todo,
  submitHandler,
  onChange,
}: {
  className: string;
  todo?: { title: string; body: string };
  submitHandler: (p: z.infer<typeof formSchema>) => void;
  onChange: (data: z.infer<typeof formSchema>) => void;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  // Reset the form when todo changes
  useEffect(() => {
    if (todo) {
      form.reset({
        title: todo.title,
        body: todo.body,
      });
    }
  }, [todo, form]);

  // Watch form changes and call onChange
  useEffect(() => {
    const subscription = form.watch((values) => {
      const refinedValues = {
        title: values.title ?? "",
        body: values.body ?? "",
      };
      onChange(refinedValues);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitHandler(values);
    form.reset();
    setOpenModal(false);
  }

  return (
    <div className={`${className} min-w-[350px]`}>
      <Form {...form}>
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>{todo ? "Edit todo" : "Create Todo"}</CardTitle>
            <CardDescription>
              {todo ? "" : "Save your todo in one-click."}
            </CardDescription>
            <Separator />
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <TodoFormContent form={form} />
            </CardContent>
            <CardFooter>
              <Button type="submit" variant="success">
                {todo ? "Edit" : "Add"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger className="md:hidden" asChild>
            <Button variant="success">Add Todo</Button>
          </DialogTrigger>
          <DialogContent className="rounded-xl">
            <DialogHeader>
              <DialogTitle>{todo ? "Edit todo" : "Create Todo"}</DialogTitle>
              <DialogDescription>
                {todo ? "" : "Save your todo in one-click."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TodoFormContent form={form} />
              <DialogFooter className="mt-4">
                <Button type="submit" variant="success">
                  {todo ? "Edit" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </div>
  );
}

function TodoFormContent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="capitalize font-semibold">Title</FormLabel>
            <FormControl>
              <Input placeholder="What is on your mind today?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="body"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="capitalize font-semibold">Content</FormLabel>
            <FormControl>
              <Textarea placeholder="What todo?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
