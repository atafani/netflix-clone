import {useCookies} from "react-cookie";

const useCookie = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const setToken = (access_token: string) => {
    setCookie("token", JSON.stringify(access_token), {
      path: "/",
      maxAge: 3600, // Expires after 1hr
      sameSite: true,
    });
  };
  const clearToken = () => {
    if (!(typeof window === "undefined")) {
      removeCookie("token", {path: "/"});
    }
  };
  const getToken = () => {
    cookie.token;
  };

  return {setToken, clearToken, getToken};
};
export default useCookie;
