import { validateUser } from "@/utils/validators";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/generateToken";
import { setServerCookie } from "@/lib/setServerCookie";
import { USER_TOKEN_KEY } from "@/lib/constants";
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
import { AVATAR_PRESETS } from "@/constants";
import { onError, onNoMatch } from "@/utils/errorHandler";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: onError,
  onNoMatch: onNoMatch,
})
  .use(multer({ storage: multer.memoryStorage() }).single("avatar"))
  .post(async (req, res) => {
    const { phone, name } = req.body;

    // @ts-ignore-error
    const { error } = validateUser({ phone, name });
    if (error) {
      return res.status(400).json(error.format());
    }
    // @ts-ignore-error
    const file = req.file;
    try {
      let uploadedImageResponse;
      if (file) {
        uploadedImageResponse = await cloudinaryUpload(AVATAR_PRESETS, file);
      }

      const result = await prisma.user.create({
        data: {
          name,
          phone,
          avatar: uploadedImageResponse
            ? {
                url: uploadedImageResponse.url,
                public_id: uploadedImageResponse.public_id,
              }
            : undefined,
        },
      });
      const token = await generateToken(req.body.phone);
      setServerCookie(req, res, USER_TOKEN_KEY, token);
      res.status(201).send(result);
    } catch (error) {
      throw error;
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
