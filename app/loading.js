"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export default function Load() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}
