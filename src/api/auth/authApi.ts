import axios from "axios";
import {
  LOGIN_URL,
  LOGOUT_URL,
  REFRESH_TOKEN_URL,
  REGISTER_URL
} from "../../constants/apiUrl";
import handleApiResponse from "../../utils/handleApiResponse";
import axiosInstance from "../../utils/axiosInstance";

interface RegisterPayloadTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayloadTypes {
  email: string;
  password: string;
}

const registerUser = async (body : RegisterPayloadTypes) => {
  return await handleApiResponse(axios.post(REGISTER_URL, body), true);
};

const loginUser = async (body: LoginPayloadTypes) => {
  return await handleApiResponse(axios.post(LOGIN_URL, body), true);
};

const refershAccessToken = async (refresh_token : string) => {
  return await handleApiResponse(
    axios.post(REFRESH_TOKEN_URL, { refreshToken: refresh_token })
  );
};

const logoutUser = async () => {
  return await handleApiResponse(axiosInstance.post(LOGOUT_URL), true);
};

export { registerUser, loginUser, refershAccessToken, logoutUser };
