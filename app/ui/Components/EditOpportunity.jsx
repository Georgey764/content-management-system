"use client";

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
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

function getIndex(str, substr, ind) {
  let Len = str.length,
    i = -1;
  while (ind-- && i++ < Len) {
    i = str.indexOf(substr, i);
    if (i < 0) break;
  }
  return i;
}

export default function EditOpportunity() {
  const router = useRouter();
  const path = usePathname();
  const supabase = createClient();
  const [form, setForm] = useState({
    id: null,
    name: "",
    deadline: "",
    country: "",
    organization: "",
    typeId: "",
    detailed_description: "",
    image: "",
  });

  useState(() => {
    async function getData() {
      const { data, error } = await supabase
        .from("opportunities")
        .select()
        .eq("id", path.substring(getIndex(path, "/", 3) + 1));
      if (error) {
        router.push(`/opportunities?error${error.message}`);
      } else {
        setForm({ ...data[0] });
      }
    }
    getData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    async function update() {
      const { error } = await supabase
        .from("opportunities")
        .update({
          name: form.name,
          deadline: form.deadline,
          country: form.country,
          organization: form.organization,
          typeId: form.typeId,
          detailed_description: form.detailed_description,
          image: form.image,
        })
        .eq("id", form.id);
      if (error) {
        router.push(`/opportunities?error${error.message}`);
      } else {
        router.push("/opportunities?success=An%20Opportunity%20was%20Edited");
        router.refresh();
      }
    }
    update();
  }

  function handleChange(e) {
    setForm({ ...form, [e.target?.name]: e.target.value });
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Edit</CardTitle>
        <CardDescription>
          Make changes to opportunity here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2 text-left">
          <div className="space-y-1">
            <Label htmlFor="create_name">Name</Label>
            <Input
              id="create_name"
              name="name"
              value={form.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="create_image">Image Link</Label>
            <Input
              type="url"
              id="create_image"
              placeholder="Enter Image Link"
              value={form.image}
              name="image"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="create_country">Country</Label>
            <Input
              name="country"
              onChange={handleChange}
              id="create_country"
              value={form.country}
              defaultValue={form.country}
              required
            />
          </div>
          <div className="space-y-1 ">
            <Label htmlFor="create_organization">Organization</Label>
            <Input
              name="organization"
              onChange={handleChange}
              id="create_organization"
              value={form.organization}
              placeholder="Enter the Org"
              required
            />
          </div>

          <div className="space-y-1 flex flex-col">
            <Label htmlFor="create_deadline">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !form.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.deadline ? (
                    format(form.deadline, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.deadline}
                  onSelect={(e) => {
                    setForm((cur) => {
                      return { ...cur, deadline: e };
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1">
            <Label htmlFor="typee">Type</Label>
            <Select
              required
              value={form.typeId}
              name="type"
              onValueChange={(e) => {
                setForm((cur) => {
                  return { ...cur, typeId: e };
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select the type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Opportunity Type</SelectLabel>
                  <SelectItem name="type" value="1">
                    Scholarship
                  </SelectItem>
                  <SelectItem name="type" value="2">
                    Grants
                  </SelectItem>
                  <SelectItem name="type" value="3">
                    Workshop
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="deadline">Content</Label>
            <Textarea
              className="h-44"
              onChange={(e) =>
                setForm((cur) => {
                  return { ...cur, detailed_description: e.target.value };
                })
              }
              value={form.detailed_description}
              placeholder="Type your message here."
              id="message-2"
            />
            <p className="text-sm text-muted-foreground">
              The content supports{" "}
              <a
                className="text-blue-600 cursor-pointer underline hover:text-blue-400"
                href="https://commonmark.org/help/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Markdown
              </a>{" "}
              text formatting.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </form>
    </>
  );
}
