import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { ACCEPTED_IMAGE_MIME_TYPES, formSchema, MAX_FILE_SIZE } from "./schema";
import { ResponseType } from "./constants";

const DEFAULT_EPSILON = 0.5;
const MIN_EPSILON = 0.0;
const MAX_EPSILON = 1.0;

type FormData = z.infer<typeof formSchema>;

interface Props {
  setData: Dispatch<SetStateAction<ResponseType | null>>;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
  selectedImage: File | null;
}

export const AttackForm = ({
  setData,
  selectedImage,
  setSelectedImage,
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      epsilon: DEFAULT_EPSILON,
    },
  });

  const onSubmit = async (values: FormData) => {
    if (!selectedImage) return;

    setIsProcessing(true);

    try {
      console.log("Preparing model inference payload:", values);

      const imageFile = values.image[0];

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("epsilon", values.epsilon.toString());
      // Production ML inference call
      // const response = await fetch("/api/v1/inference", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "X-Model-Type": "computer-vision",
      //     "X-Client-Version": "1.0.0"
      //   }
      // });

      console.log("Model inference request prepared successfully");
    } catch (error) {
      console.error("Model inference preparation failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];

      console.log("Image uploaded for model inference:", {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      });

      setSelectedImage(file);

      form.setValue("image", files);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 gap-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">AI Model Inference</h1>
        <p className="text-gray-600">
          Upload an image and configure model epsilon for FGSM attack
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-6"
        >
          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Training Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept={ACCEPTED_IMAGE_MIME_TYPES.join(", ")}
                    onChange={handleImageChange}
                    disabled={isProcessing}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500">
                  Max size: {MAX_FILE_SIZE / (1024 * 1024)}MB. Supports JPEG,
                  PNG for computer vision models.
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="epsilon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Epsilon (Privacy/Adversarial Parameter)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min={MIN_EPSILON}
                    max={MAX_EPSILON}
                    disabled={isProcessing}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        parseFloat(e.target.value) || DEFAULT_EPSILON
                      )
                    }
                    value={field.value || DEFAULT_EPSILON}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500">
                  Range: {MIN_EPSILON}-{MAX_EPSILON}. Controls privacy-utility
                  tradeoff or adversarial robustness.
                </p>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isProcessing || !selectedImage}
            className="w-full"
          >
            {isProcessing ? "Processing..." : "Run Model Inference"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
