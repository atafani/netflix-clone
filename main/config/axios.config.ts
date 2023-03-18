import axios, {AxiosError} from "axios";
import Router from "next/router";
import {GetServerSidePropsContext, NextApiRequest} from "next/types";
import {toast} from "react-toastify";
import cookie from "cookie";
import {TokenDTO} from "../models";

const isServer = () => {
  return typeof window === "undefined";
};

let context: GetServerSidePropsContext;
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export function getToken(): TokenDTO {
  let data: any = cookie.parse(
    isServer() ? context?.req?.headers?.cookie || "" : document.cookie
  );
  if (data.token) data.token = JSON.parse(data.token);
  return data.token;
}

export const clearToken = () => {
  if (!isServer()) {
    localStorage.clear();
    Router.push("/login");
  }
};

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token: TokenDTO = getToken();

  if (config && config.headers && token) {
    if (token) config.headers.Authorization = `Bearer ${token.accessToken}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers.withCredentials = true;
    config.headers.credentials = "same-origin";
  }

  return config;
});

api.interceptors.response.use(
  async (response) => {
    let data = null;
    if (response?.data?.errors) {
      toast.error(response?.data?.errors);
    }
    if (response?.data?.result) {
      data = response.data.data;
    }
    if (response?.config?.url?.includes("authentication/login")) {
      localStorage.setItem("logged", JSON.stringify(true));
    }
    if (response?.data?.statusCode === 401) {
      const retryResponse: any = await refreshToken(response);
      data = retryResponse.data.data;
    }
    return data;
  },
  async (error: AxiosError<any>) => {
    // check conditions to refresh token
    if (
      (error.response?.status === 401 &&
        !error.response?.config?.url?.includes("authentication/refresh") &&
        !error.response?.config?.url?.includes("authentication/login")) ||
      error.response?.config?.url?.includes("authentication/refresh")
    ) {
      clearToken();
    } else {
      if (error.response?.data?.Errors) {
        toast.error(error.response?.data?.Errors);
      }
    }
    return Promise.reject(error);
  },
  {synchronous: false}
);

let fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback: (token: string) => any) => {
  subscribers.push(callback);
};

const refreshToken = async (response: any) => {
  try {
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((token: string) => {
        if (response! && response!.config && response!.config.headers)
          response!.config.headers["Authorization"] = `Bearer ${token}`;
        resolve(axios(response!.config));
      });
    });

    // check whether refreshing token or not
    if (!fetchingToken) {
      fetchingToken = true;

      const token: TokenDTO = getToken();
      // refresh token
      const data: TokenDTO | undefined = await api.post(
        "authentication/refresh",
        {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        }
      );

      if (data && data.accessToken && data.refreshToken) {
        onAccessTokenFetched(data.accessToken);
      } else {
        clearToken();
      }
    }
    return retryOriginalRequest;
  } catch (error) {
    // on error go to login page
    if (!isServer() && !Router.asPath.includes("authentication/login")) {
      clearToken();
    }
    return Promise.reject(response);
  } finally {
    fetchingToken = false;
  }
};
