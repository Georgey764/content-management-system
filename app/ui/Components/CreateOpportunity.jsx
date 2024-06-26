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
import { useRouter } from "next/navigation";
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

export default function CreateOpportunity() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    name: "",
    deadline: "",
    country: "",
    organization: "",
    type: "",
    detailed_description: "",
    image: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    async function create() {
      const { error } = await supabase.from("opportunities").insert({
        name: form.name,
        deadline: form.deadline,
        country: form.country,
        organization: form.organization,
        typeId: form.type,
        detailed_description: form.detailed_description,
        image: form.image,
      });
      if (error) {
        router.push(`/opportunities?error=${error.message}`);
      } else {
        router.push("/opportunities?success=New%20opportunity%20was%20created");
        router.refresh();
      }
    }
    create();
  }

  function handleChange(e) {
    setForm({ ...form, [e.target?.name]: e.target.value });
  }

  function handleSelectChange(e) {
    setForm({ ...form, type: e });
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Add Opportunities</CardTitle>
        <CardDescription>Fill in information for opportunities</CardDescription>
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
            <Label htmlFor="create_country">Country</Label>
            <Input
              name="country"
              onChange={handleChange}
              id="create_country"
              placeholder="Enter the Country"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="create_organization">Organization</Label>
            <Input
              name="organization"
              onChange={handleChange}
              id="create_organization"
              placeholder="Enter the Org"
              required
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="create_deadline">Deadline: </Label>
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
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="type">Type</Label>
            <Select name="type" onValueChange={handleSelectChange}>
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

          <div className="space-y-1 flex flex-col">
            <Label>Content</Label>
            <Textarea
              required
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
          <Button>Add</Button>
        </CardFooter>
      </form>
    </>
  );
}
