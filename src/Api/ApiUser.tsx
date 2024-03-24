import axios, { AxiosResponse } from "axios"

const baseUrl = "http://127.0.0.1:8000"
const usersPrefix = "users"
export const salt = "$2b$10$AAOFrjbRj8B5t6JVkUWNdu"

// export const getUser = async (
//
// )

export const checkCodeUser = async (
	email: string
): Promise<AxiosResponse<ApiCodeDataType>> => {
	const user: checkCodeSchema = {
		e_mail: email
	}
	console.log(user)
	const code: AxiosResponse<ApiCodeDataType> = await axios.post(
		baseUrl + `/${usersPrefix}/validate_email`,
		user
	)
	return code
}

export const createUser = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string,
): Promise<AxiosResponse<null>> => {
	const user: userRegisterSchema = {
		name: firstName,
		surname: lastName,
		e_mail: email,
		hash_password: password
	}
	console.table(user)
	const saveUser: AxiosResponse<null> = await axios.post(
		baseUrl + `/${usersPrefix}/register`,
		user
	)
	return saveUser
}

export const authorizeUser = async (
	email: string,
	password: string,
): Promise<AxiosResponse<userRetAuthSchema>> => {
	const user: userAuthorizeSchema = {
		e_mail: email,
		hash_password: password
	}
	console.log(user)
	const authUser: AxiosResponse<userRetAuthSchema> = await axios.post(
		baseUrl + `/${usersPrefix}/authorize`,
		user
	)
	return authUser
}

export const editUser = async (
	formData: userProfileSchema,
	email: string
): Promise<AxiosResponse<null>> => {
	const user: userEditSchema = {
		name: formData.name,
		surname: formData.surname,
		e_mail: email
	}
	console.table(user)
	const editUser: AxiosResponse<null> = await axios.put(
		`${baseUrl}/${usersPrefix}/update`,
		user
	)
	return editUser
}


export const getToken = async (
	email: string,
	password: string,
): Promise<AxiosResponse<userTokenSchema>> => {
	const user: userAuthorizeSchema = {
		e_mail: email,
		hash_password: password
	}
	console.log(user)
	return await axios.post(
		baseUrl + `/${usersPrefix}/token`,
		user
	)
}