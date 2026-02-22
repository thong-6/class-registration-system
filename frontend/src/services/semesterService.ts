import axiosClient from "./axiosClient"

export const getAllSemester = async () =>{
    const res = await axiosClient.get("/admin/semester");
    return res.data;
}

export const createASemester = async (data: object) =>{
    const res = await axiosClient.post("/admin/semester", data)
    return res.data;
}

export const updateASemester = async (id: number, data: object) =>{
    const res = await axiosClient.put(`/admin/semester/${id}`, data)
    return res.data;
}

export const deleteASemester = async (id: number) =>{
    const res = await axiosClient.delete(`/admin/semester/${id}`)
    return res.data;
}