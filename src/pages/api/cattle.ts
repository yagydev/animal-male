import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import { validateCattle } from "@/utils/validators";
import { useUserMiddleware } from "@/lib/middleware/useUserMiddleware";
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
import { PHOTOS_PRESETS } from "@/constants";
import { onError, onNoMatch } from "@/utils/errorHandler";

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError: onError,
  onNoMatch: onNoMatch,
})
  .use(useUserMiddleware)
  .use(multer({ storage: multer.memoryStorage() }).array("photos"))
  .post(async (req, res) => {
    // @ts-ignore
    const user = req.user;

    const {
      milk,
      price,
      type,
      pregnancy,
      address,
      milkCapacity,
      isPregnant,
      bargain,
      baby,
      moreDetails,
      animalAge,
      breed,
    } = req.body;

    // @ts-ignore
    const { data, error } = validateCattle({
      milk: parseInt(milk),
      price: parseInt(price),
      type,
      pregnancy: parseInt(pregnancy),
      address: JSON.parse(address),
      milkCapacity: parseInt(milkCapacity),
      isPregnant: JSON.parse(isPregnant),
      bargain: JSON.parse(bargain),
      baby: JSON.parse(baby),
      moreDetails,
      animalAge: parseInt(animalAge),
      breed,
    });
    if (error) {
      return res.status(400).json(error.format());
    }
    // @ts-ignore
    const files = req.files;

    try {
      const uploadedImageResponses = await Promise.all(
        files.map(
          async (file: any) => await cloudinaryUpload(PHOTOS_PRESETS, file)
        )
      );

      const newCattle = {
        ...data,
        photos: uploadedImageResponses.map(
          ({ url, public_id }: { url: string; public_id: string }) => ({
            url,
            public_id,
          })
        ),
        user: { connect: { id: user.id } },
      };

      const cattle = await prisma.cattle.create({
        data: newCattle,
      });
      res.status(201).send(cattle);
    } catch (error) {
      throw error;
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
