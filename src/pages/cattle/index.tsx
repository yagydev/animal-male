import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Head from "next/head";
import React, { useState, ChangeEvent, Fragment } from "react";
import styles from "./Cattle.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { convertJsonToFormData } from "@/utils";
import Typography from "@mui/material/Typography";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cattleSchema } from "@/utils/validators";
import LoadingButton from "@mui/lab/LoadingButton";
import { AcceptImages } from "@/constants";
import ReactHookFormSelect from "@/components/react-hook-form-select";
import NoSsr from "@mui/material/NoSsr";
// import { GoogleAddress } from "@/components/google-address";
import CattleRefContent from "@/constants/cattle-ref-content";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { GeocodeAddress } from "@/components/geocode-address";
import logger from "@/helpers/logger";
import findAnimalGender from "@/helpers/findAnimalGender";
import { useTranslation } from "react-i18next";
import SimpleHeader from "@/components/simple-header";
import Radio from "@mui/material/Radio";
import ReactHookFormRadio from "@/components/react-hook-form-radio";

export default function CattlePage() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: zodResolver(cattleSchema),
  });

  logger.debug(watch());

  logger.error(errors);

  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<Record<string, any>>({
    photo_1: undefined,
    photo_2: undefined,
    photo_3: undefined,
    photo_4: undefined,
  });
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState<boolean>(false);

  const onSubmit = async (cattle: FieldValues) => {
    const {
      type,
      milk,
      price,
      pregnancy,
      address,
      milkCapacity,
      isPregnant,
      bargain,
      pregnancyAge,
      baby,
      moreDetails,
      animalAge,
      breed,
    } = cattle;
    const form = convertJsonToFormData({
      type,
      milk,
      price,
      pregnancy,
      milkCapacity,
      animalAge,
      isPregnant,
      bargain,
      pregnancyAge,
      baby,
      moreDetails,
      address: JSON.stringify(address),
      breed,
    });

    Object.keys(previewUrl)
      .filter((key) => previewUrl[key] !== undefined)
      .forEach((key) => {
        form.append("photos", previewUrl[key]);
      });

    try {
      setSaving(true);
      await axios.post(`/api/cattle`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/");
    } catch (error: any) {
      logger.error(error);
      setError(`ERROR - ${error.message}`);
      setSaving(false);
    }
  };

  const { type, isPregnant, breed } = watch();
  const breedofAnimalData =
    type &&
    CattleRefContent[type]?.map((item: any) => {
      return (
        <MenuItem key={`type${item.code}`} value={item.code}>
          {item.text}
        </MenuItem>
      );
    });

  const animalType = CattleRefContent?.type?.map((item: any) => {
    return (
      <MenuItem key={`breed${item.code}`} value={item.code}>
        {item.text}
      </MenuItem>
    );
  });

  return (
    <NoSsr>
      <Head>
        <title>AnimalMela - new cattle</title>
        <meta
          name="description"
          content="An online market place to sell and buy animals"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <SimpleHeader />

        {error && (
          <Alert severity="error" color="error" closeText="Close">
            {error}
          </Alert>
        )}
        <Box
          component={"form"}
          sx={{ minWidth: 120 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ReactHookFormSelect
            name="type"
            label={t("type")}
            control={control}
            defaultValue={""}
            error={!!errors.type}
            helperText={errors.type?.message as string}
          >
            {animalType}
          </ReactHookFormSelect>
          {breedofAnimalData &&
            <ReactHookFormSelect
              name="breed"
              label="Breed of Animal"
              control={control}
              defaultValue={''}
            >
              {breedofAnimalData}
            </ReactHookFormSelect>}

          <Grid container spacing={1}>
            <Grid key="animal-price" item xs={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Price"
                  type="number"
                  size="small"
                  {...register("price", { valueAsNumber: true })}
                  error={!!errors.price}
                  helperText={errors.price?.message as string}
                />
              </FormControl>
            </Grid>
            <Grid key="isBargain" item xs={6}>
              <FormControl fullWidth margin="normal">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox {...register("bargain")} defaultChecked />
                    }
                    label="Is Bargaining"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Age of Animal"
              type="number"
              size="small"
              {...register("animalAge", { valueAsNumber: true })}
            />
          </FormControl>
          {findAnimalGender(type) === "female" && (
            <Fragment>
              <Grid container spacing={1}>
                <Grid key="pregnancy" item xs={6}>
                  <ReactHookFormSelect
                    name="pregnancy"
                    label="Pregnancy"
                    control={control}
                    defaultValue={""}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </ReactHookFormSelect>
                </Grid>
                <Grid key="isBaby" item xs={6}>
                  <ReactHookFormRadio
                    name="baby"
                    label="Baby?"
                    control={control}
                    defaultValue={true}
                    valueAsBoolean
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </ReactHookFormRadio>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid key="milk" item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Milk(per day)"
                      type="number"
                      size="small"
                      {...register("milk", { valueAsNumber: true })}
                    />
                  </FormControl>
                </Grid>
                <Grid key="milkCapacity" item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Capacity of milk"
                      type="number"
                      size="small"
                      {...register("milkCapacity", { valueAsNumber: true })}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid key="isPregnant" item xs={6}>
                  <ReactHookFormRadio
                    name="isPregnant"
                    label="Pregnant?"
                    control={control}
                    defaultValue={true}
                    valueAsBoolean
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </ReactHookFormRadio>
                </Grid>
                {isPregnant === "true" && (
                  <Grid key="pregnancyAge" item xs={6}>
                    <ReactHookFormSelect
                      name="pregnancyAge"
                      label="Age of Pregnancy(Month)"
                      control={control}
                      defaultValue={""}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </ReactHookFormSelect>
                  </Grid>
                )}
              </Grid>
            </Fragment>
          )}
          <Grid container spacing={1}>
            <FormControl fullWidth margin="normal">
              <FormLabel id="photo-upload-label">
                कृपया जानवर का फोटो और वीडियो डालें, आपको अधिक प्रतिक्रिया
                मिलेगी:
              </FormLabel>
            </FormControl>
            {Object.keys(previewUrl).map((key, index) => (
              <Grid key={`${index}-photo`} item xs={6}>
                <FormControl fullWidth margin="normal">
                  {!previewUrl[key] && (
                    <>
                      <input
                        accept={AcceptImages}
                        id={`contained-button-file-${index}`}
                        type="file"
                        className={styles.uploadInput}
                        {...register(key)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setPreviewUrl({
                            ...previewUrl,
                            [key]:
                              e?.target?.files?.length && e?.target?.files[0],
                          })
                        }
                      />
                      <label htmlFor={`contained-button-file-${index}`}>
                        <div className={styles.uploadPlaceholder}>
                          <Typography variant="h6" color="text.secondary">
                            Click here to upload photo
                          </Typography>
                        </div>
                      </label>
                    </>
                  )}
                  {previewUrl[key] && (
                    <Box sx={{ border: "1px dashed" }}>
                      {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt="file uploader preview"
                          src={URL.createObjectURL(previewUrl[key])}
                          height="100%"
                          width="100%"
                        />
                      }
                      <IconButton
                        aria-label="remove"
                        onClick={() =>
                          setPreviewUrl({
                            ...previewUrl,
                            [key]: undefined,
                          })
                        }
                        sx={{ float: "right" }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  )}
                </FormControl>
              </Grid>
            ))}
          </Grid>
          <GeocodeAddress control={control} name="address" />
          <FormControl fullWidth margin="normal" {...register("moreDetails")}>
            <TextareaAutosize
              maxRows={4}
              aria-label="More Details"
              placeholder="More Details"
              name="moreDetails"
              style={{ height: 100 }}
            />
          </FormControl>
          <LoadingButton
            type="submit"
            variant="contained"
            size="small"
            className={styles.submit}
            loading={saving}
          >
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </NoSsr>
  );
}
