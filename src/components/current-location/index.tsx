import { useEffect } from "react";
import Box from "@mui/material/Box";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { fetchWithCache } from "@/utils";
import { useAppStateContext } from "@/context";
import { IAddress } from "@/types";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";

export default function CurrentLocation() {
  const { state, updateCurrentLocation } = useAppStateContext();

  useEffect(() => {
    if (state.currentLocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(async function (position) {
      const data = await fetchWithCache(
        `https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
      updateCurrentLocation({
        display: data.display_name,
        location: {
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude],
        },
        address: data.address,
      });
    });
  }, [state, updateCurrentLocation]);

  if (!state.currentLocation) {
    return <Skeleton />;
  }
  const getAddress = (location: IAddress) => {
    if (location.address) {
      return `${location.address.city} ${location.address.state}`;
    }
    return location.display;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Chip
        icon={<PinDropIcon />}
        label={getAddress(state.currentLocation)}
        color="default"
      />
    </Box>
  );
}
