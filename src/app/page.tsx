"use client";
import { AttackForm } from "@/components/attack-input";
import { ResponseType } from "../components/constants";
import { useState } from "react";
import { ImagePreview } from "@/components/image-preview";

const Page = () => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  return (
    <div>
      <AttackForm
        setData={setData}
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
      />
      {selectedImage ? <ImagePreview selectedImage={selectedImage} /> : null}
    </div>
  );
};

export default Page;
