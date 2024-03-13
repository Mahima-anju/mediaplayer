import commonApi from "./commonApi"
import { BASE_URL } from "./base_urls"

export const uploadVideo=async(data)=>{
    return await commonApi("POST",`${BASE_URL}/allVideos`,data)
}
export const getVideo=async ()=>{
    return await commonApi ("GET",`${BASE_URL}/allvideos`,"")
}
export const deleteVideo=async (id)=>{
    return await commonApi("DELETE",`${BASE_URL}/allvideos/${id}`,{})
}
export const addCategory=async(data)=>{
    return await commonApi("POST",`${BASE_URL}/catgories`,data)
}



export const getCategory=async()=>{
    return await commonApi("GET",`${BASE_URL}/catgories`,"")
}
export const deleteCategory=async(id)=>{
    return await commonApi ("DELETE",`${BASE_URL}/catgories/${id}`,{})
}
export const addHistory= async (data)=>{
    return await commonApi ("POST",`${BASE_URL}/history`,data)
}
export const allHistory =async ()=>{
return await commonApi ("GET",`${BASE_URL}/history`,"")
}
export const  deleteHistory =async (id)=>{
    return await commonApi ("DELETE",`${BASE_URL}/history/${id}`,{})
}
export const getSpecificVideo=async(id)=>{
    return await commonApi ("GET",`${BASE_URL}/allVideos/${id}`,"")
}
export const updateCategory =async(data,id)=>{
    return await commonApi ("PUT",`${BASE_URL}/catgories/${id}`,data)
}