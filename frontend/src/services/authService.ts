import axiosClient from "./axiosClient";

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

  const token = res.data.token;

  localStorage.setItem("token", token);

  return res.data;
};



export const logout = () => {
  localStorage.removeItem("token");
};
