import { useDispatch } from "react-redux";
import {
  FETCH_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  FETCH_FAIL,
} from "../redux/features/authSlice";
import { axiosPublic } from "./useAxios";
import { useNavigate } from "react-router-dom";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userInfo) => {
    dispatch(FETCH_START());
    try {
      const { data } = await axiosPublic.post("account/auth/login/", userInfo);
      dispatch(LOGIN_SUCCESS(data));
      navigate("/stock");
    } catch (err) {
      dispatch(FETCH_FAIL());
    }
  };

  const logout = async () => {
    dispatch(FETCH_START());
    try {
      await axiosPublic.post("account/auth/logout/");
      dispatch(LOGOUT_SUCCESS());
      navigate("/");
    } catch (err) {
      dispatch(FETCH_FAIL());
    }
  };

  const register = async (userInfo) => {
    dispatch(FETCH_START());
    try {
      const { data } = await axiosPublic.post("account/register/", userInfo);
      dispatch(REGISTER_SUCCESS(data));
      navigate("/stock");
    } catch (err) {
      dispatch(FETCH_FAIL());
    }
  };

  return {
    login,
    logout,
    register,
  };
};

export default useAuthCalls;
