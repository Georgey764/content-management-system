import SideVideo from "./view/(view helpers)/(VideosSection Helpers)/SideVideo";
import axios from "axios";

export const metadata = {
  title: "Training Videos",
  description: "This page contains training videos from Zaad Opportunities.",
};

const videos = [
  "https://www.youtube.com/embed/jIlHaHM92S4",
  "https://www.youtube.com/embed/fDVbjzR1itk",
  "https://www.youtube.com/embed/ywqBWbFSjgg",
  "https://www.youtube.com/embed/pJbFH8psJfI",
  "https://www.youtube.com/embed/XGzRqbUCKCU",
  "https://www.youtube.com/embed/lplUbzWpqaY",
  "https://www.youtube.com/embed/NLuuoI0tznE",
  "https://www.youtube.com/embed/bL2U1Vzc4Bs",
  "https://www.youtube.com/embed/LFEE-edhoAI",
  "https://www.youtube.com/embed/4YmRn7nB3TE",
];

export default function Training({ searchParams }) {
  const googleapi = "https://www.googleapis.com/youtube/v3";
  const apikey = process.env.key;

  async function getURLdetails(url) {
    const arr = url?.split("/") || [];
    const id = arr[arr.length - 1] || 0;
    const res = await axios.get(
      googleapi +
        "/videos?part=snippet&fields=items(id,snippet(title,channelTitle,publishedAt,description,thumbnails(medium)))&id=" +
        id +
        "&key=" +
        apikey
    );
    const data = res.data.items[0]?.snippet || {
      title: "Not Available",
      publishedAt: "NaN",
      description: "N/A",
      thumbnails: {
        default: {
          url: "N/A",
        },
      },
    };
    return data;
  }
  return (
    <div className="w-screen text-center flex flex-col items-center justify-center pb-12">
      <div className="w-screen pt-28 pb-10 flex flex-col justify-end items-center">
        <p className="text-3xl">Training</p>
        <p className="mt-4 font-extralight">Checkout our videos.</p>
      </div>
      <div className="flex flex-row items-center justify-center p-4">
        <iframe
          className="rounded w-[80vw] lg:w-[55vw] aspect-video"
          src="https://www.youtube.com/embed/jIlHaHM92S4"
          title="My Response To MrBeast"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-col items-start justify-start gap-4">
        <p className="text-2xl">More From Us</p>
        <section className="mt-4 overflow-x-scroll lg:mt-0 w-[85vw] lg:max-w-[screen] overflow-y-hidden block flex flex-col md:flex-row justify-start items-start gap-6">
          {videos.map((cur, i) => {
            return (
              <SideVideo
                key={cur + i}
                url={cur}
                orientation="horizontal"
                getURLdetails={getURLdetails}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}
