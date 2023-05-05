import { LoginDTO, UserDTO } from "dtos";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { login, register, setUser } from "store/auth/authSlice";

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (user: LoginDTO) => {
    try {
      await dispatch(login(user));
      return true;
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const handleRegister = async (user: UserDTO) => {
    try {
      await dispatch(register(user));
      return true;
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const handleUpdate = async (user: UserDTO) => {
    await dispatch(setUser(user));
  };

  return { auth, handleLogin, handleRegister, handleUpdate };
};
export default useAuth;
