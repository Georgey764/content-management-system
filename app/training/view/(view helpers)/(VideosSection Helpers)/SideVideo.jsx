import Image from "next/image";

export default async function SideVideo({
  url,
  getURLdetails,
  orientation = "vertical",
}) {
  const data = await getURLdetails(url);
  return (
    <a href={`/training/view?v=${url}`}>
      <div
        className={
          "flex items-start justify-start gap-2 flex-col " +
          `${`${
            orientation == "vertical"
              ? "md:flex-row"
              : orientation == "horizontal"
              ? "flex-col"
              : ""
          }`}`
        }
      >
        <div className="w-[80vw] aspect-video md:h-[110px] md:w-[185px] rounded-lg relative">
          <Image
            className="rounded-lg"
            src={data.thumbnails.medium.url}
            fill={true}
            alt={"thumbnail of " + data.title}
            objectFit="cover"
          />
        </div>
        <div
          className={
            "px-2 text-left flex flex-col justify-start gap-1 h-auto md:h-[110px] w-[80vw] " +
            `${`${
              orientation == "horizontal"
                ? "md:w-[185px]"
                : orientation == "vertical"
                ? "md:w-[calc(100%-185px)]"
                : ""
            }`}`
          }
        >
          <p className="font-medium">
            {data.title.split("").slice(0, 50).join("") + "..."}
          </p>
          <p className="hidden md:block text-gray-500 text-xs break-all">
            {data.description.split("").slice(0, 70).join("") + "..."}
          </p>
          <p className="text-gray-800 text-xs text-left">
            Date: {data.publishedAt}
          </p>
        </div>
      </div>
    </a>
  );
}
