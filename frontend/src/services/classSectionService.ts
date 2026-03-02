import axiosClient from "./axiosClient"

export const getAllClassSection = async() =>{
    const res = await axiosClient.get("/class-section");
    return res.data;
}

export const getAClassSection = async(id: number) =>{
    const res = await axiosClient.get(`/class-section/${id}`);
    return res.data;
}

export const createAClassSection = async(formData: object) =>{
    const res = await axiosClient.post("/class-section", formData);
    return res.data;
}

export const updateAClassSection = async(id: number, formData: object) =>{
    const res = await axiosClient.put(`/class-section/${id}`, formData);
    return res.data;
}