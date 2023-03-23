import { fetchWithCache } from "@/utils";
import { useEffect, useState } from "react";

export default function useFetchImage(photoId: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [image, setImage] = useState<any>(); // fix me
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (!photoId) {
      return;
    }
    (async () => {
      try {
        const data = await fetchWithCache(`/api/photo/${photoId}`);
        setImage(data.data);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        setError(err);
      }
    })();
  }, [photoId]);

  return {
    image,
    isLoading,
    isError: error,
  };
}
