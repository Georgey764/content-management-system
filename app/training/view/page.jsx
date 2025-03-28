import VideoSection from "./(view helpers)/VideosSection";

export const metadata = {
  title: "Training Videos",
  description: "This page contains training videos from Zaad Opportunities.",
};

export default function View({ searchParams }) {
  const url = searchParams.v;
  return (
    <div className="w-screen text-center border-b">
      <div className="w-screen pt-10 pb-10"></div>
      <VideoSection url={url} />
    </div>
  );
}
