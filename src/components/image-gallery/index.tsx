import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";

type Photo = {
  public_id: string;
  url: string;
};
export const ImageGallery = ({ photos }: { photos: Photo[] }) => {
  return (
    <Box>
      <ImageList
        cols={photos.length > 1 ? 2 : 1}
        gap={2}
        sx={{ minHeight: 100 }}
      >
        {photos.map((item) => (
          <ImageListItem
            key={item.public_id}
            sx={{ position: "relative", minHeight: 140 }}
          >
            <Image
              src={`${item.url}?auto=format`}
              alt="Your Image"
              fill={true}
              sizes="(min-width: 640px) 50vw, 100vw"
              priority={true}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
