"use client"

import { useState } from "react";

import HomeInput from "@/components/pages-comp/home/input";
import HomeSettings from "@/components/pages-comp/home/settings";
import HomeResult from "@/components/pages-comp/home/result";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 container mx-auto overflow-auto">
      {!image ? (
        <HomeInput inputImage={(image: string) => setImage(image)} />
      ) : (
        <>
          {image && croppedImages.length == 0 ? (
            <HomeSettings images={image} onImageChange={setImage} onCroppedImages={setCroppedImages} />
          ) : (
            <HomeResult images={croppedImages} onBack={() => setCroppedImages([])} onRestart={() => setImage(null)} />
          )}
        </>
      )}
    </section>
  );
}
