import axiosClient from "./axiosClient"

export const getAllSemester = async () =>{
    const res = await axiosClient.get("/admin/semester");
    return res.data;
}