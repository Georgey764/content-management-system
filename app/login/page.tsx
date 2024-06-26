"use client";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SubmitButton } from "./submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modals from "../ui/Components/Modals";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string; success: string; error: string };
}) {
  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?error=Could%20not%20authenticate%20user");
    }

    redirect("/?success=You%20Have%20Successfully%20Logged%20In");
  };

  return (
    <div className="w-full flex flex-row items-start justify-center bg-slate-50">
      <Modals searchParams={searchParams} />
      <Card className="w-[350px] mt-[calc(50vh-205px)] mb-20">
        <CardHeader className="text-center">
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Enter your credentials to log in
          </CardDescription>{" "}
        </CardHeader>
        <CardContent>
          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  // className="rounded-md px-4 py-2 bg-inherit border mb-6"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border mb-6"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <SubmitButton
              formAction={signIn}
              className="bg-primary hover:bg-primary/90 text-white hover:bg-gray-800 mt-5 rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="Signing In..."
            >
              Sign In
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex gap-4 flex-col justify-between">
          <Label>
            Don't have an account?
            <span style={{ cursor: "pointer" }} className="text-blue-500">
              {" "}
              <Link href="/signup">Sign Up</Link>
            </span>
          </Label>
        </CardFooter>
      </Card>
    </div>
  );
}
