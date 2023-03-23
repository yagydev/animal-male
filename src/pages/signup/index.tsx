import { userSchema } from "@/utils/validators";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import NoSsr from "@mui/material/NoSsr";
import Typography from "@mui/material/Typography";

import PersonIcon from "@mui/icons-material/Person";
import styles from "./Signup.module.scss";
import { AcceptImages } from "@/constants";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleHeader from "@/components/simple-header";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const router = useRouter();
  const [serverError, setServerError] = useState<string>();
  const [saving, setSaving] = useState<boolean>(false);

  const onSubmit = async (user: FieldValues) => {
    const form = new FormData();
    form.append("name", user.name);
    form.append("phone", user.phone);

    if (user.avatar.length) {
      form.append("avatar", user.avatar[0]);
    }
    try {
      setSaving(true);
      await axios.post(`/api/signup`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/");
    } catch (error: any) {
      setSaving(false);
      setServerError(error.message);
    }
  };
  const avatar = watch("avatar");
  return (
    <NoSsr>
      <SimpleHeader />
      {serverError && (
        <Alert severity="error" color="error" closeText="Close">
          {serverError}
        </Alert>
      )}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            margin: "auto",
            flexDirection: "column",
          }}
        >
          <FormControl>
            {(!avatar || !avatar.length) && (
              <>
                <input
                  accept={AcceptImages}
                  id="contained-button-file"
                  type="file"
                  className={styles.uploadInput}
                  {...register("avatar")}
                />
                <label htmlFor="contained-button-file">
                  <PersonIcon sx={{ width: 80, height: 80 }} />
                  <Typography sx={{ textAlign: "center" }}>Upload</Typography>
                </label>
              </>
            )}
            {avatar && !!avatar.length && (
              <Image
                alt="Avatar"
                src={URL.createObjectURL(avatar[0])}
                width={120}
                height={120}
              />
            )}
          </FormControl>
        </Avatar>
        <TextField
          fullWidth
          label="Name"
          size="small"
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name?.message as string}
          {...register("name")}
        />
        <TextField
          fullWidth
          label="Phone"
          size="small"
          margin="normal"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 10,
          }}
          required
          error={!!errors.phone}
          helperText={errors.phone?.message as string}
          {...register("phone")}
        />

        <LoadingButton loading={saving} variant="contained" type="submit">
          <span>Sign Up</span>
        </LoadingButton>
      </Box>
    </NoSsr>
  );
}
