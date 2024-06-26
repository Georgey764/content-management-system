import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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
import { SubmitButton } from "./submit-button";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Zaad",
  description: "Sign up to Zaad Website",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: { message: string; success: string; error: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/signup?message=Could not authenticate user");
    }

    return redirect("/signup?message=Check email to continue sign in process");
  };

  return (
    <div className="w-full flex flex-row justify-center bg-slate-50">
      <Card className="w-[350px] mt-[calc(50vh-205px)] mb-20">
        <CardHeader className="text-center">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your info below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" placeholder="Email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>

                <Input name="password" type="password" placeholder="Password" />
              </div>
            </div>
            <SubmitButton
              formAction={signUp}
              className="bg-black text-white hover:bg-gray-800 mt-5 rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="Signing Up..."
            >
              Sign Up
            </SubmitButton>
            {searchParams?.message && (
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>{searchParams.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-row justify-center">
          <Label>
            Already have an account?
            <span style={{ cursor: "pointer" }} className="text-blue-500">
              {" "}
              <Link href="/login">Sign In</Link>
            </span>
          </Label>
        </CardFooter>
      </Card>
    </div>
  );
}
