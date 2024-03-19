interface checkCodeSchema {
	email: string
}

interface codeSchema {
	code: string
}

type ApiCodeDataType = {
	message: string
	status: string
	code: codeSchema
	code?: codeSchema
}

interface userRegisterSchema {
	name: string
	surname: string
	e_mail: string
	hash_password: string
}

interface userAuthorizeSchema {
	e_mail: string
	hash_password: string
}

interface userRetAuthSchema {
	name: string
	surname: string
}

type ApiAuthDataType = {
	message: string
	status: string
	code: userRetAuthSchema
	code?: userRetAuthSchema
}

interface userProfileSchema {
	name: string
	surname: string
}

interface userEditSchema {
	name: string
	surname: string
	e_mail: string
}