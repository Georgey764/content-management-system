import Image from "next/image";

const videos = [
  {
    type: "main",
    title: "Take the risk",
    description:
      "Taking the risk is beneficial to health.Taking the risk is beneficial to health.Taking the risk is beneficial to health.Taking the risk is beneficial to health.Taking the risk is beneficial to health.Taking the risk is beneficial to health.Taking the risk is beneficial to health.",
    link: "https://www.youtube.com/embed/9EJdkuLkgGs",
    date: "12/12/2024",
  },
  {
    type: "side",
    title: "Take the risk",
    description:
      "Taking the risk is beneficial to health. Health is beneficial to health the life is wow.",
    link: "https://www.youtube.com/embed/9EJdkuLkgGs",
    date: "12/12/2024",
  },
  {
    type: "side",
    title: "Take the risk",
    description: "Taking the risk is beneficial to health.",
    link: "https://www.youtube.com/embed/9EJdkuLkgGs",
    date: "12/12/2024",
  },
  {
    type: "main",
    title: "Take the risk",
    description: "Taking the risk is beneficial to health.",
    link: "https://www.youtube.com/embed/9EJdkuLkgGs",
    date: "12/12/2024",
  },
];

export default async function MainVideo({ getURLdetails, url }) {
  const data = await getURLdetails(url);

  return (
    <>
      <div className="w-[90vw] lg:w-[55vw] text-left flex-col flex gap-4">
        <iframe
          className="rounded w-[90vw] lg:w-[55vw] aspect-video"
          src={url}
          title={data.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <p className="text-2xl font-bold">{data.title}</p>
        <div className="flex flex-row justify-start gap-2 items-center font-medium">
          <Image
            src="/images/logo-no-outbg.png"
            width={30}
            height={30}
            alt="Zaad logo"
          />
          <span>{data.channelTitle}</span>
        </div>

        <div className="w-full bg-gray-100 p-4 rounded text-sm">
          <span className="font-bold">
            {"Published on " + Date(data.publishedAt)}
          </span>
          <br />
          <p style={{ whiteSpace: "pre-wrap" }} className="break-words">
            {data.description}
          </p>
        </div>
      </div>
    </>
  );
}
