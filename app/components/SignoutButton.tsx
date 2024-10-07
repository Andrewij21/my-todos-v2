"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleSignout } from "../actions/authActions";

const signOutHandler = () => {
  toast.promise(handleSignout(), {
    loading: "Loading...",
    success: () => {
      return `Sign Out`;
    },
    error: "Error",
  });
};

export default function SignoutButton() {
  return <Button onClick={signOutHandler}>Sign out</Button>;
}
