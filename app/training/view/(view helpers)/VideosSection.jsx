"use server";

import axios from "axios";
import MainVideo from "./(VideosSection Helpers)/MainVideo";
import SideVideo from "./(VideosSection Helpers)/SideVideo";

const videos = [
  "https://www.youtube.com/embed/fvxegHK_avg",
  "https://www.youtube.com/embed/PT765vSgH6o",
  "https://www.youtube.com/embed/vVnksE4nRyw",
  "https://www.youtube.com/embed/_ar0JRLUeMI",
  "https://www.youtube.com/embed/8BcaB4PiecU",
  "https://www.youtube.com/embed/yGyrJZuOf7o",
  "https://www.youtube.com/embed/6r6c8TggKfM",
  "https://www.youtube.com/embed/S3HIINnQaSg",
  "https://www.youtube.com/embed/fyeRt7suIXU",
  "https://www.youtube.com/embed/g7HIdi6JLSY",
];

export default async function VideosSection({ url }) {
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
    <div className="px-4 lg:px-20 py-8 flex flex-col items-center md:items-start lg:flex-row lg:justify-between gap-4">
      <MainVideo url={url} getURLdetails={getURLdetails} />
      <section className="mt-4 lg:mt-0 w-[90vw] lg:w-[31vw] lg:max-w-[screen] overflow-y-scroll block flex flex-col justify-start items-center md:items-start gap-4">
        {videos.map((cur, i) => {
          return (
            <SideVideo key={cur + i} url={cur} getURLdetails={getURLdetails} />
          );
        })}
      </section>
    </div>
  );
}
