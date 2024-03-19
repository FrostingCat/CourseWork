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
