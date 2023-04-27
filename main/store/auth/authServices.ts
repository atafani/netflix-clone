import { api } from "config";
import { ResponseDTO, UserDTO } from "dtos";
import { signIn } from "next-auth/react";

// Register user
type RegisterProps = {
  email: string;
  password?: string;
};
const register = async (userData: RegisterProps): Promise<UserDTO> => {
  const response: ResponseDTO = await api.post("/api/auth/signup", userData);
  if (response && !response.error) {
    signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });
  }
  return response.data;
};
const login = async (userData: RegisterProps) => {
  try {
    // const response = await axios.post(baseURL + "/auth/login", userData);

    const user = {
      email: userData.email,
    };
    // if (response.data) {
    //   setCookie("user", JSON.stringify(user), { maxAge: 60 * 60 * 24 * 30 });
    // }
    return user;
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
