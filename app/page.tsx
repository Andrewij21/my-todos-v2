"use client";
import { z } from "zod";
import TodoForm from "./components/TodoForm";
import TodoLists from "./components/TodoLists";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetch";
import { Post } from "@prisma/client";
import { deleteData, postData } from "@/lib/axiosInstance";
import { useSession } from "next-auth/react";
import { CreateTodoSchema } from "@/lib/zod";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = useSession();
  const { data, error } = useSWR<Post[]>(
    `/todo?email=${session?.user.email}`,
    fetcher
  );
  // console.log({ session });
  const handleSaveTodo = async (data: z.infer<typeof CreateTodoSchema>) => {
    try {
      const newTodo = postData("/todo", {
        ...data,
        email: session?.user.email,
      });
      toast.promise(newTodo, {
        loading: "Loading...",
        success: (data: Post) => {
          mutate(`/todo?email=${session?.user.email}`);
          return `${data.title} has been added`;
        },
        error: "Error",
      });
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };
  const handleDeleteTodo = async (id: string) => {
    try {
      const deletedTodo = deleteData("/todo/" + id);
      toast.promise(deletedTodo, {
        loading: "Loading...",
        success: (data: Post) => {
          mutate(`/todo?email=${session?.user.email}`);
          return `${data.title} has been deleted`;
        },
        error: "Error",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      {error && <div className="w-full">Failed to load todo</div>}
      {data ? (
        <>
          <TodoForm
            className="md:order-last"
            onChange={() => {}}
            submitHandler={handleSaveTodo}
          />
          <TodoLists
            className="w-full"
            data={data}
            deleteHandler={handleDeleteTodo}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
      {/* <TodoLists className="w-full" data={data} /> */}
    </div>
  );
}
