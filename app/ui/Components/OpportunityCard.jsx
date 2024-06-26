import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useAuth } from "../hooks/AuthProvider";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Calendar, MapPin, Server, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OpportunityCard({ obj, role, handleDeleteClick }) {
  const router = useRouter();

  return (
    <Card className="relative w-[300px] p-4 text-left relative">
      {role === "true" ? (
        <>
          <Trash
            onClick={(e) => handleDeleteClick(e, obj.id)}
            className="p-1 h-7 w-7 rounded text-white absolute bg-red-500 top-2 left-[calc(100%-70px)] cursor-pointer hover:bg-red-700"
          />
          <PencilSquareIcon
            onClick={(e) => {
              router.push("opportunities/edit/" + obj.id);
            }}
            className="p-1 h-7 w-7 rounded text-white absolute bg-green-600 top-2 left-[calc(100%-35px)] cursor-pointer hover:bg-green-700"
          />
        </>
      ) : (
        <span></span>
      )}
      <Image
        src={`${obj.image}`}
        width={380}
        height={120}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          objectPosition: "50% 50%",
        }}
        loading="lazy"
        alt="Picture of the opportunity"
      />
      <div>
        <div className="flex flex-row justify-between mt-2">
          <CardDescription>
            {obj.type.type.charAt(0) + obj.type.type.substring(1).toLowerCase()}
          </CardDescription>
          <span className="mr-2 text-gray-500 text-sm flex flex-row items-center">
            <MapPin className="inline h-4 w-4 mr-1 text-purple-800" />
            {obj.country}
          </span>
        </div>
        <p className="font-semibold mt-2">{obj.name}</p>

        <div className="mb-12 mt-0"></div>

        <p className="font-light absolute top-[calc(100%-33px)] left-4 text-sm flex flex-row">
          <span className="font-medium mr-1 text-gray-500">
            <Server className="inline h-4 w-4 mr-1 text-purple-800" />
            Hosted by:{" "}
          </span>{" "}
          <span className="w-[85px]">{obj.organization}</span>
        </p>
        <p className="font-light absolute top-[calc(100%-53px)] left-4 text-sm flex flex-row">
          <span className="font-medium mr-2 text-gray-500 text-sm flex flex-row items-center">
            {" "}
            <Calendar className="inline h-4 w-4 mr-1 text-purple-800" />
            Deadline:
          </span>
          {new Date(obj.deadline).toDateString()}
        </p>

        <p className="text-blue-500 absolute top-[calc(100%-33px)] text-sm left-[calc(100%-95px)] hover:text-blue-600 cursor-pointer">
          <Link href={"/opportunities/" + obj.id}>Read More...</Link>
        </p>
      </div>
    </Card>
  );
}
