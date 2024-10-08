"use client";

import TodoForm from "@/app/components/TodoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { z } from "zod";
import useSWR from "swr";
import { Post } from "@prisma/client";
import dateFormater from "@/lib/formatters";
import fetcher from "@/lib/fetch";
import { putData } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { CreateTodoSchema } from "@/lib/zod";
import { toast } from "sonner";
// Fetcher function for SWR
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DetailPage({ params }: { params: { id: string } }) {
  // Fetch todo data using SWR based on the id from params
  const { data, error } = useSWR<Post, Error>(`/todo/${params.id}`, fetcher);
  const { push } = useRouter();
  const [todo, setTodo] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Update todo state when data is fetched
  useEffect(() => {
    if (data) {
      setTodo({
        title: data.title,
        body: data.body,
      });
    }
  }, [data]);

  // Handle saving the todo
  const handleSaveTodo = async (todo: z.infer<typeof CreateTodoSchema>) => {
    try {
      setLoading(true);
      const editedTodo = putData("/todo/" + data?.id, {
        ...todo,
      });
      toast.promise(editedTodo, {
        loading: "Loading...",
        success: () => {
          setLoading(false);
          push("/");
          return `Success`;
        },
        error: "Error",
      });
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Handle change on todo form
  const handleTodoChange = (data: z.infer<typeof CreateTodoSchema>) => {
    setTodo(data);
  };

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      {error && <div className="w-full">Failed to load</div>}
      {!data ? (
        <div>Loading...</div>
      ) : (
        <>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl font-bold">
                {todo.title}
              </CardTitle>
              <CardDescription>{dateFormater(data.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap">
              {todo.body}
            </CardContent>
          </Card>
          <TodoForm
            className="order-first md:order-last"
            submitHandler={handleSaveTodo}
            onChange={handleTodoChange}
            todo={todo}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}
