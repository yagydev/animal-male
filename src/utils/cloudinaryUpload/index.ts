import DataURIParser from "datauri/parser";
import path from "path";
import cloudinary from "../cloudinary";

export const cloudinaryUpload = async (uploadPreset: string, file: any) => {
  try {
    const parser = new DataURIParser();
    const base64Image = parser.format(
      path.extname(file.originalname).toString(),
      file.buffer
    );
    const { public_id, url } = await cloudinary.uploader.upload(
      base64Image.content!,
      { resource_type: "image", upload_preset: uploadPreset }
    );
    return { public_id, url };
  } catch (error) {
    throw error;
  }
};
