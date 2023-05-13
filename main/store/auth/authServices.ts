import { api } from "config";
import { LoginDTO, ResponseDTO, UserDTO } from "dtos";
import { signIn, useSession } from "next-auth/react";
import { LOCALSTORAGE_SESSION_ID } from "utils/constants";

// Register user
type RegisterProps = {
  email: string;
  password?: string;
};

const register = async (userData: RegisterProps): Promise<UserDTO> => {
  const response: ResponseDTO<UserDTO> = await api.post(
    "/api/auth/signup",
    userData
  );
  const newUser = response?.data;
  console.log("new user", newUser);
  if (newUser?._id) {
    localStorage.setItem(LOCALSTORAGE_SESSION_ID, JSON.stringify(newUser._id));
    newUser.password &&
      (await signIn("credentials", {
        email: newUser.email,
        password: newUser.password,
        redirect: false,
      }));
    return Promise.resolve(newUser);
  }
  return Promise.reject(response?.error);
};

const login = async (userData: LoginDTO) => {
  console.log("user data", userData);
  try {
    const res = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });
    if (res?.ok) {
      const user: ResponseDTO<UserDTO> = await api.get("/api/user");
      return user.data || null;
    }
    return null;
  } catch (error: any) {
    if (error.response) {
      throw {
        status: error.request.status,
        success: error.response.data.success,
        message: error.response.data.message,
      };
    } else {
      throw error;
    }
  }
};

const authService = {
  register,
  login,
};

export default authService;
