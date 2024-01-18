import {
  FETCH_FAIL,
  FETCH_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000";

  const loginSuccess = async (userInfo) => {
    dispatch(FETCH_START());
    try {
      const { data } = await axios.post(
        `${BASE_URL}/account/auth/login/`,
        userInfo
      );
      dispatch(LOGIN_SUCCESS(data));
      navigate("/stock/");
    } catch (error) {
      dispatch(FETCH_FAIL(error));
    }
  };

  const registerSuccess = async (userInfo) => {
    dispatch(FETCH_START());
    try {
      const { data } = await axiosPublic.post("account/register/", userInfo);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/stock");
    } catch (err) {
      dispatch(FETCH_FAIL());
    }
  };

  const logoutSuccess = async () => {
    dispatch(FETCH_START());
    try {
      await axios.post(`${BASE_URL}/account/auth/logout/`);
      dispatch(LOGOUT_SUCCESS());
      navigate("/");
    } catch (error) {
      dispatch(FETCH_FAIL(error));
    }
  };

  return { loginSuccess, logoutSuccess, registerSuccess };
};

export default useAuthCalls;
