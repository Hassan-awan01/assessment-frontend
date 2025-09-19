// 📂 components/preview-data.tsx
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImagePreview } from "./image-preview";
import { ResponseType } from "./constants";

interface Props {
  data: ResponseType;
  selectedImage: File;
}

export const PreviewData = ({ data, selectedImage }: Props) => {
  return (
    <div className="mt-8 w-full max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Results Card */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Attack Results
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="text-muted-foreground">Clean Prediction</p>
            <p className="font-medium">{data.clean_prediction}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Adversarial Prediction</p>
            <p className="font-medium">{data.adversarial_prediction}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Epsilon</p>
            <p className="font-medium">{data.epsilon}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Attack Success</p>
            <Badge
              variant={data.attack_success ? "default" : "destructive"}
              className={`px-2 py-1 text-xs ${
                data.attack_success
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : ""
              }`}
            >
              {data.attack_success ? "Success ✅" : "Failed ❌"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Image Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Preview */}
        <ImagePreview selectedImage={selectedImage} />

        {/* Adversarial Image Card */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Adversarial Image
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Image
              src={`data:image/png;base64,${data.adversarial_image_b64}`}
              alt="Adversarial Preview"
              className="max-w-full h-auto max-h-72 object-contain rounded-md shadow-sm border"
              height={300}
              width={300}
            />
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Generated adversarial image using FGSM.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
