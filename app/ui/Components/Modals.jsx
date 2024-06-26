"use client";

import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Modals({ searchParams }) {
  const [success, setSuccess] = useState(searchParams?.success);
  const [errorMsg, setErrorMsg] = useState(searchParams?.error);

  useEffect(() => {
    setTimeout(() => {
      setSuccess("");
      setErrorMsg("");
    }, 3000);
  }, [success, errorMsg]);

  return (
    <>
      {success && (
        <Alert className="fixed top-[70px] left-[50%-150px] z-40 w-[300px]">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      {errorMsg && (
        <Alert
          variant="destructive"
          className="fixed top-[70px] left-[50%-150px] z-40 w-[300px] bg-white"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something Went Wrong</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
