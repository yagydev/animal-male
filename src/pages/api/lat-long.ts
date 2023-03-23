import { onError, onNoMatch } from "@/utils/errorHandler";
import nextConnect from "next-connect";

export default nextConnect({
  onError: onError,
  onNoMatch: onNoMatch,
}).get(async (req, res) => {
  const { latitude, longitude, localityLanguage = "en" } = req.query;
  try {
    const location = await fetch(
      `${process.env.GEO_LOCATION_API}/reverse?lat=${latitude}&lon=${longitude}&localityLanguage=${localityLanguage}`
    );
    res.status(200).send(await location.json());
  } catch (error) {
    throw error;
  }
});
