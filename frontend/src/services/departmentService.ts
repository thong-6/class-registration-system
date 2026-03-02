import axiosClient from "./axiosClient"

export const getAllDepartment =async()=>{
    const res = await axiosClient.get("/admin/department");
    return res.data;
}