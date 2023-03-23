import SimpleHeader from "@/components/simple-header";
import { isPhoneNumberValid } from "@/utils";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";

export default function Register() {
  const [user, setUser] = useState({ phone: "" });
  const [phoneValid, setPhoneValid] = useState(true);
  const [showLoginFailedAlert, setShowLoginFailedAlert] =
    useState<boolean>(false);
  const router = useRouter();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [evt.target.name]: evt.currentTarget.value });
  };

  const signUpHandler = () => {
    router.push("/signup");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const valid = isPhoneNumberValid(user.phone);
    setPhoneValid(valid);
    if (user.phone && !valid) {
      return;
    }

    axios
      .post("/api/login", user)
      .then((res) => {
        const { from } = router.query;
        if (from) {
          const url = typeof from === "string" ? from : from[0];
          router.push(decodeURIComponent(url));
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        setShowLoginFailedAlert(true);
      });
  };
  return (
    <>
      <Head>
        <title>AnimalMela - Login</title>
        <meta
          name="description"
          content="An online market place to sell and buy animals"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <SimpleHeader />
        {showLoginFailedAlert && (
          <Alert severity="error" color="error" closeText="Close">
            Please check you phone number
          </Alert>
        )}
        <Card>
          <CardHeader
            title="Login"
            titleTypographyProps={{
              color: "primary",
            }}
          ></CardHeader>
          <CardContent>
            <Box component="form" noValidate autoComplete="off">
              <div>
                <TextField
                  fullWidth
                  label="Phone"
                  size="small"
                  margin="normal"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 10,
                  }}
                  required
                  error={!phoneValid}
                  helperText={!phoneValid && "Invalid Phone"}
                />
              </div>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" onClick={handleSubmit}>
                  Login
                </Button>
                <Button variant="outlined" onClick={signUpHandler}>
                  SignUp
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
