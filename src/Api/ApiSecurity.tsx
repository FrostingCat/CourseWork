import axios, {AxiosResponse} from "axios";
import {baseUrl} from "./ApiEnv";

export const getSecurityPhoto = async (
    ip: string
): Promise<AxiosResponse<Blob>> => {
    return await axios.get(baseUrl + `/security/photo?ip=${ip}`, {
        responseType: 'blob'
    })
}