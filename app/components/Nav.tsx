// "use client";
import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { auth } from "@/auth";
import SignoutButton from "./SignoutButton";

export default async function Nav() {
  const session = await auth(); //gunakan ini di server component
  // const { data: session } = useSession();
  // console.log({ session });
  return (
    <nav className="px-4 py-2 flex justify-between items-center shadow">
      <h1 className="text-3xl tracking-tight font-bold capitalize">
        <Link href="/">MY TODO</Link>
      </h1>
      <div className="flex items-center gap-x-4">
        {session ? (
          // <form action={handleSignout}>
          //   <Button type="submit">Sign out</Button>
          // </form>
          <SignoutButton />
        ) : (
          <>
            <Button variant={"outline"} asChild>
              <Link href="/auth/signin">Sign in</Link>
            </Button>
            <Button>
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
