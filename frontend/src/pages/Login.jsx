import React, { useMemo } from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";
import LoginForm, { loginSchema } from "../components/LoginForm";

const Login = () => {
  const { loginSuccess } = useAuthCalls();
  // const { currentUser, error } = useSelector((state) => state.auth);
  const styles = useMemo(
    () => ({
      imageSide: {
        backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      formSide: {
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    }),
    []
  );
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={false} sm={4} md={7} sx={styles.imageSide} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={styles.formSide}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              // 1. login request
              loginSuccess(values);
              // 2. in form reset
              actions.resetForm();
              // 3. if form submit, formik set auto true, this state fix
              actions.setSubmitting(false);
            }}
            component={(props) => <LoginForm {...props} />}
          ></Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
