import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="px-4 py-2 flex justify-between items-center shadow">
      <h1 className="text-3xl tracking-tight font-bold capitalize">
        <Link href="/">MY TODO</Link>
      </h1>
      <div className="flex items-center gap-x-4">
        <Button variant={"outline"}>Sign in</Button>
        <Button>Sign up</Button>
        {/* <p>example@mail.com</p>
        <Button variant="destructive">logout</Button> */}
      </div>
    </nav>
  );
}
