import axiosClient from "./axiosClient";
import { decodeToken } from "./jwt";

export const register = async (
  username: string,
  password: string,
  email: string
)=>{
  const res = await axiosClient.post("/auth/register",{
    username,
    password,
    email
  })
  return res.data;
}

export const login = async (username: string, password: string) => {
  const res = await axiosClient.post("/auth/login", {
    username,
    password,
  });

  const accessToken = res.data.accessToken;
  localStorage.setItem("accessToken", accessToken);
  const payload: any = decodeToken(accessToken);
  console.log(payload)
  const user ={
    username: payload.sub,
    role: payload.roles[0]
  }
  localStorage.setItem("user", JSON.stringify(user));

  return res.data;
};

export const refreshAccessToken = async () =>{
  const res = await axiosClient.post("/auth/refresh");
  const newToken = res.data.accessToken;
  localStorage.setItem("accessToken", newToken);
  return newToken;
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
