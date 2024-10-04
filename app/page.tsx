"use client";
import { z } from "zod";
import TodoForm, { formSchema } from "./components/TodoForm";
import TodoLists from "./components/TodoLists";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetch";
import { Post } from "@prisma/client";
import { deleteData, postData } from "@/lib/axiosInstance";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const { data, error } = useSWR<Post[]>(
    `/todo?email=${session?.user.email}`,
    fetcher
  );
  console.log({ session });
  const handleSaveTodo = async (data: z.infer<typeof formSchema>) => {
    try {
      await postData("/todo", { ...data, userId: "66fbb19453d964750f03a595" });
      mutate("/todo");
      alert("success");
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteData("/todo/" + id);
      mutate("/todo");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      {error && <div className="w-full">Failed to load todo</div>}
      {data?.length === 0 && (
        <div className="w-full">You do not have nothing todo</div>
      )}
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
