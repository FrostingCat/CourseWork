interface checkCodeSchema {
	email: string
}

interface codeSchema {
	code: string
}

type ApiCodeDataType = {
	message: string
	status: string
	user: codeSchema[]
	user?: codeSchema
}
