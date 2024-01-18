import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Form } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must have min 8 chars")
    .max(16, "Password too longer")
    .matches(/\d+/, "Password must have number")
    .matches(/[a-z]+/, "Password must have lowercase")
    .matches(/[A-Z]+/, "Password must have uppercase"),
});

const LoginForm = ({ values, handleChange, errors, touched, handleBlur }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
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
  );
};

export default LoginForm;
