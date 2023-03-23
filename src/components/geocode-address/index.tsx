import { useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import axios from "axios";
import { Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { IAddress } from "@/types";

interface GeocodeResponse {
  display_name: string;
  lat: string;
  lon: string;
  type: string;
}

const PLACES_TYPES = ["village", "city", "locality"];

type GeocodeAddressProps = {
  control: any;
  name: string;
};

export function GeocodeAddress({
  control,
  name,
  ...props
}: GeocodeAddressProps) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly IAddress[]>([]);

  const fetch = useMemo(
    () =>
      debounce((request: { input: string }, callback) => {
        axios
          .get(`https://geocode.maps.co/search?q=${request.input}&format=json`)
          .then(callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    fetch({ input: inputValue }, ({ data }: { data: GeocodeResponse[] }) => {
      if (active) {
        let newOptions: readonly IAddress[] = [];
        if (data) {
          newOptions = [
            ...newOptions,
            ...data
              .filter(({ type }) => PLACES_TYPES.includes(type))
              .map(
                (place) =>
                  ({
                    display: place.display_name,
                    location: {
                      type: "Point",
                      coordinates: [Number(place.lon), Number(place.lat)],
                    },
                  } as IAddress)
              ),
          ];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <FormControl {...props} margin="normal" fullWidth size="small">
      <Controller
        control={control}
        name={name}
        defaultValue={""}
        render={({ field }) => (
          <Autocomplete
            id="geocode-address"
            {...field}
            sx={{ width: "100%" }}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.display
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            noOptionsText="No locations"
            isOptionEqualToValue={(option, value) => {
              return option.display === value.display;
            }}
            onChange={(e, newVal) => {
              field.onChange(newVal);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add a location"
                fullWidth
                size="small"
                margin="normal"
              />
            )}
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Grid container alignItems="center">
                    <Grid item sx={{ display: "flex", width: 44 }}>
                      <LocationOnIcon sx={{ color: "text.secondary" }} />
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "calc(100% - 44px)",
                        wordWrap: "break-word",
                      }}
                    >
                      {/* {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))} */}
                      <Typography variant="body2" color="text.secondary">
                        {option.display}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
            {...props}
          />
        )}
      ></Controller>
    </FormControl>
  );
}
