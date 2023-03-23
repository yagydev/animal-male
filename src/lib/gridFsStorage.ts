import { GridFsStorage } from "multer-gridfs-storage";

export const gridFsStorage = (bucketName = "Photos") =>
  new GridFsStorage({
    url: process.env.DATABASE_URL!,
    cache: bucketName,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];

      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-akumar-${file.originalname}`;
        return filename;
      }

      return {
        bucketName,
        filename: `${Date.now()}-akumar-${file.originalname}`,
      };
    },
  });
