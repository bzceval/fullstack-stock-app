import React, { useMemo } from "react";
import { TextField, Paper, Box, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email!")
    .required("Please enter your email!"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must have min 8 chars")
    .max(16, "Password too longer")
    .matches(/\d+/, "Password must have number")
    .matches(/[a-z]+/, "Password must have lowercase")
    .matches(/[A-Z]+/, "Password must have uppercase"),
});

const Login = () => {
  const { currentUser, error, loading } = useSelector((state) => state.auth);
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
              // 2. in form reset
              actions.resetForm();
              // 3. if form submit, formik set auto true, this state fix
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => (
              <Form style={{ width: "100%" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                />
                <LoadingButton
                  loading={loading}
                  loadingPosition="center"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
