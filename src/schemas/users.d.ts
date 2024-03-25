interface checkCodeSchema {
	e_mail: string
}

type ApiCodeDataType = {
	message: string
	status: string
	code?: string
}

interface userRegisterSchema {
	name: string
	surname: string
	e_mail: string
	hash_password: string
}

type ApiTokenDataType = {
	token: string
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

interface userTokenSchema {
	access_token: string
	token_type: string
}
