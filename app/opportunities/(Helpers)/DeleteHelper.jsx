"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
<Button />;

export default function DeleteHelper({ deleteHelper, handleDeleteHelper }) {
  const supabase = createClient();
  function deleteOpportunity() {
    handleDeleteHelper({ modal: "delete_success" });
    setTimeout(() => {
      handleDeleteHelper({});
    }, 3000);
    const deleteCard = async () => {
      const { error } = await supabase
        .from("opportunities")
        .delete()
        .eq("id", deleteHelper?.id);
      if (error) {
        console.log(error.message);
      }
    };
    deleteCard();
  }

  return (
    <>
      {deleteHelper.modal === "confirm_delete" && (
        <>
          <div className="fixed top-0 left-0 overflow-hidden bg-black opacity-30 z-40 w-full h-full"></div>
          <Card className="fixed top-[calc(50%-90px)] left-[calc(50%-200px)] z-40 w-[400px] h-[180px]">
            <CardHeader className="text-left">
              <CardTitle>Are you sure?</CardTitle>
              <CardDescription>
                By clicking the DELETE button you will delete the opportunity
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button
                onClick={(e) => {
                  handleDeleteHelper({});
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={deleteOpportunity} variant="destructive">
                Delete
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
      {deleteHelper.modal === "delete_success" && (
        <Alert className="z-40 fixed top-[80px] left-[20px] w-[300px] text-left">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Successfully Deleted!</AlertTitle>
          <AlertDescription>Refresh the page for latest view</AlertDescription>
        </Alert>
      )}
    </>
  );
}
