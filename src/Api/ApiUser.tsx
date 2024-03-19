import axios, { AxiosResponse } from "axios"

const baseUrl = "todo"

export const checkCodeUser = async (
	email: string
): Promise<AxiosResponse<ApiCodeDataType>> => {
	const user: checkCodeSchema = {
		email: email
	}
	console.log(user)
	const code: AxiosResponse<ApiCodeDataType> = await axios.post(
		baseUrl + "/user/validate_email",
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
	console.log(user)
	const saveUser: AxiosResponse<null> = await axios.post(
		baseUrl + "/user/register",
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
		baseUrl + "/user/authorize",
		user
	)
	return authUser
}

export const editUser = async (
	formData: userProfileSchema,
	email: string
): Promise<AxiosResponse<null>> => {
	console.log({ formData })
	const user: userEditSchema = {
		name: formData.name,
		surname: formData.surname,
		e_mail: email
	}
	console.table(user)
	const editUser: AxiosResponse<null> = await axios.put(
		`${baseUrl}/user/update`,
		user
	)
	return editUser
}