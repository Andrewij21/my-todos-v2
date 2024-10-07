import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import Link from "next/link";
import { Post } from "@prisma/client";
import dateFormater from "@/lib/formatters";

export default function TodoLists({
  className,
  data,
  deleteHandler,
}: {
  className: string;
  data: Post[];
  deleteHandler: (p: string) => void;
}) {
  return (
    <div className={`${className} flex flex-col gap-4`}>
      {data?.length === 0 && (
        <div className="w-full">You do not have nothing todo</div>
      )}
      {data &&
        data.map((todo: Post) => (
          <Card className="relative" key={todo.id}>
            <Link href={`/detail/${todo.id}`}>
              <CardHeader>
                <CardTitle className="text-green-400 text-xl font-bold">
                  {todo.title}
                </CardTitle>
                <CardDescription>
                  {dateFormater(todo.createdAt)}
                </CardDescription>
              </CardHeader>
            </Link>
            <Button
              size="smIcon"
              className="absolute top-2 right-2 bg-destructive hover:bg-destructive/80"
              onClick={() => deleteHandler(todo.id)}
            >
              <X />
            </Button>
          </Card>
        ))}
      {/* <Card className="relative">
        <Link href="/detail/1">
          <CardHeader>
            <CardTitle className="text-green-400 text-xl font-bold">
              Shopping
            </CardTitle>
            <CardDescription>1 minutes ago</CardDescription>
          </CardHeader>
          <Button
            size="smIcon"
            className="absolute top-2 right-2 bg-destructive hover:bg-destructive/80"
          >
            <X />
          </Button>
        </Link>
      </Card> */}
    </div>
  );
}
