import axiosClient from "./axiosClient"

export const getAllCourse = async () =>{
    const res = await axiosClient.get("/admin/course");
    return res.data;
}
export const getACourse = async (id: number) =>{
    const res = await axiosClient.get(`/admin/course/${id}`);
    return res.data;
}
export const createACourse = async (data: object) =>{
    const res = await axiosClient.post("/admin/course", data);
    return res.data;
}
export const updateACourse = async (id: number, data: object) =>{
    const res = await axiosClient.put( `/admin/course/${id}`, data);
    return res.data;
}
 export const deleteACourse = async (id: number) =>{
    const res = await axiosClient.delete(`/admin/course/${id}`);
    return res.data;
 }