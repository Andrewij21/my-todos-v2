"use client";

import TodoForm, { formSchema } from "@/app/components/TodoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { z } from "zod";
import useSWR, { mutate } from "swr";
import { Post } from "@prisma/client";
import dateFormater from "@/lib/formatters";
import fetcher from "@/lib/fetch";
import { putData } from "@/lib/axiosInstance";

// Fetcher function for SWR
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DetailPage({ params }: { params: { id: string } }) {
  // Fetch todo data using SWR based on the id from params
  const { data, error } = useSWR<Post, Error>(`/todo/${params.id}`, fetcher);

  const [todo, setTodo] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });

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
  const handleSaveTodo = async (todo: z.infer<typeof formSchema>) => {
    try {
      await putData("/todo/" + data?.id, {
        ...todo,
        userId: "66fbb19453d964750f03a595",
      });
      mutate("/todo/" + data?.id);
      alert("success");
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Handle change on todo form
  const handleTodoChange = (data: z.infer<typeof formSchema>) => {
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
          />
        </>
      )}
    </div>
  );
}
