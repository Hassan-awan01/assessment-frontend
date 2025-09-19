import Image from "next/image";

interface Props {
  selectedImage: File;
}
export const ImagePreview = ({ selectedImage }: Props) => {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-medium mb-2">Input Preview</h3>
      <p className="text-sm text-gray-600 mb-2">
        File: {selectedImage.name} (
        {(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
      </p>
      <div className="flex justify-center">
        <Image
          src={URL.createObjectURL(selectedImage)}
          alt="Model Input Preview"
          className="max-w-full h-auto max-h-64 object-contain rounded-md shadow-sm border"
          height={250}
          width={250}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Image will be preprocessed for model input (resize, normalize, etc.)
      </p>
    </div>
  );
};
