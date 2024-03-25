import axios, {AxiosResponse} from "axios";

const baseUrl = "http://127.0.0.1:8000";

function getToken() {
    return localStorage.getItem("token");
}

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers["Authorization"] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getRooms = async (): Promise<AxiosResponse<ApiSimpleRoomDataType>> => {
    return await axiosInstance.get("/rooms/list");
};

export const getDevicesByRoomId = async (
    id: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
    return await axiosInstance.get(`/rooms/devices/${(parseInt(id))}`,)
}

export const addRoom = async (
    roomName: string
): Promise<AxiosResponse<ApiRoomDataType>> => {
    return await axiosInstance.post("/rooms/create", {
        name: roomName
    });
};

export const editRoom = async (
    id: string,
    formData: roomSchema
): Promise<AxiosResponse<ApiRoomDataType>> => {
    return await axiosInstance.put(`/rooms/update`, {
        id: id,
        name: formData.name
    });
};

export const deleteRoom = async (
    id: string
): Promise<AxiosResponse<ApiRoomDataType>> => {
    return await axiosInstance.delete(`/rooms/delete${id}`);
};
