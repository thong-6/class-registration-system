import axiosClient from "./axiosClient"

export const getAllCurriculum = async()=>{
    const res = await axiosClient.get("/admin/curriculum");
    return res.data;
}