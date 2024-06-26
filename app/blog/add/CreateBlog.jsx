import { Button } from "@/components/ui/button";
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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function CreateBlog() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    content: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    async function create() {
      const { error } = await supabase.from("blog").insert({
        name: form.name,
        description: form.description,
        image: form.image,
        content: form.content,
        date: new Date(),
      });
      if (error) {
        router.push(`/blog?error=${error.message}`);
      } else {
        router.push("/blog?success=New%20opportunity%20was%20created");
        router.refresh();
      }
    }
    create();
  }

  function handleChange(e) {
    setForm({ ...form, [e.target?.name]: e.target.value });
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Create a New Blog</CardTitle>
        <CardDescription>
          Fill in information to create a new blog.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2 text-left">
          <div className="space-y-1">
            <Label htmlFor="create_name">Name</Label>
            <Input
              id="create_name"
              placeholder="Enter Name"
              name="name"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="create_image">Image Link</Label>
            <Input
              id="create_image"
              placeholder="Enter Image Link"
              name="image"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="create_description">Description</Label>
            <Input
              name="description"
              onChange={(e) => handleChange(e)}
              id="create_description"
              placeholder="Enter a brief description of the blog"
              required
            />
          </div>

          <div className="space-y-1 flex flex-col">
            <Label>Content</Label>
            <Textarea
              required
              className="h-44"
              onChange={(e) =>
                setForm((cur) => {
                  return { ...cur, content: e.target.value };
                })
              }
              value={form.content}
              placeholder="Type your message here."
              id="message-2"
            />
            <p className="text-sm text-muted-foreground">
              The content supports{" "}
              <a
                target="_blank"
                className="text-blue-600 cursor-pointer underline hover:text-blue-400"
                href="https://commonmark.org/help/"
              >
                Markdown
              </a>{" "}
              text formatting.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Create</Button>
        </CardFooter>
      </form>
    </>
  );
}
