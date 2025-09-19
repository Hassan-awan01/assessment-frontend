// 📂 components/image-preview.tsx
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  selectedImage: File;
}

export const ImagePreview = ({ selectedImage }: Props) => {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Input Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <p className="text-sm text-muted-foreground mb-2">
          File: <span className="font-medium">{selectedImage.name}</span> (
          {(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
        </p> */}
        <div className="flex justify-center">
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Model Input Preview"
            className="max-w-full h-auto max-h-72 object-contain rounded-md shadow-sm border"
            height={300}
            width={300}
          />
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Image will be preprocessed for model input (resize, normalize, etc.)
        </p>
      </CardContent>
    </Card>
  );
};
