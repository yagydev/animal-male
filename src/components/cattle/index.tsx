import Card from "@mui/material/Card";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import { ICattle } from "@/types";
import { distanceBetweenCoordinates, prettyTime } from "@/utils";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import findAnimalGender from "@/helpers/findAnimalGender";
import { useAppStateContext } from "@/context";
import NoSsr from "@mui/material/NoSsr";
import CardFooter from "../card-footer";

interface Props {
  cattle: ICattle;
}
const DynamicImageGallery = dynamic<{ photos: any[] }>(() =>
  import("../image-gallery").then((mod) => ({ default: mod.ImageGallery }))
);

const Cattle: React.FC<Props> = ({ cattle }) => {

  const { photos, milk, updatedAt, address, price,
    type, pregnancy, breed, bargain, milkCapacity, baby, user } = cattle;

  const {
    state: { currentLocation },
  } = useAppStateContext();
  const { t, i18n } = useTranslation();

  const cattleBreed = breed ? t(`newCattle.breed.${type}.${breed}`) : '';
  const cattlePregnancy = pregnancy ? t(`newCattle.pregnancy.${pregnancy}`) : '';
  const cattleBaby = baby ? t(`newCattle.baby.${baby}`) : '';
  const animalDetails = i18n.language === 'hi' && findAnimalGender(type) === "female" ?
    `ये ${cattleBreed} ${t(`newCattle.type.${type}`)} है। ये ${t(`newCattle.type.${type}`)} ${cattlePregnancy} ब्यात में है, ${cattleBaby} और अभी ${milk} लीटर दूध देती है।` :
    `This is ${cattleBreed} ${t(`newCattle.type.${type}`)}. ${t(`newCattle.type.${type}`)} has ${cattlePregnancy} pregnancy, ${cattleBaby} and in current milk is ${milk} ltr.`;

  const cttaleMilkCapacity = i18n.language === 'hi' ? `${milkCapacity} दूध क्षमता (प्रति दिन)` : `${milkCapacity} milk capacity`
  const priceBargaining = bargain ? ` (${t(`newCattle.bargain.${bargain}`)})` : price;
  return (
    <Card variant="outlined">
      <CardContent>
        {photos && photos?.length > 0 && (
          <DynamicImageGallery photos={photos} />
        )}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5"
              sx={{
                display: "flex",
                justifyContent: "left",
                gap: "5px",
                paddingTop: "5px",
              }}>
              ₹ {price}
              {milkCapacity &&
                <Typography variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{
                    gap: "5px",
                    paddingTop: "5px",
                  }}
                >
                  {cttaleMilkCapacity}
                </Typography>
              }
              {/* <Tooltip title="Delete">
                <IconButton>
                  <img src="https://static-assets.animall.in/static/images/isNegotiablePurple.svg" width="18" height="14" alt="negotiable"></img>
                </IconButton>
              </Tooltip> */}
            </Typography>

          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "right",
                gap: "5px",
                paddingTop: "5px",
              }}
            >
              <AccessTimeIcon fontSize="small" />
              <NoSsr>
                <span>{prettyTime(updatedAt)}</span>
              </NoSsr>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="text.secondary">
              {animalDetails}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{
                display: "flex",
                gap: "5px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <PlaceIcon fontSize="small" />
              <span>
                {`${address.display} ${currentLocation
                  ? `(लगभग ${distanceBetweenCoordinates(
                    address.location.coordinates[0],
                    address.location.coordinates[1],
                    currentLocation.location.coordinates[0],
                    currentLocation.location.coordinates[1]
                  )} कि.मी.)`
                  : ""
                  }`}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardFooter
        name={user.name}
        phone={user.phone}
        avatar={user.avatar}
      ></CardFooter>
    </Card>
  );
};

export default Cattle;
