import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CodeType {
	firstName: string;
	lastName: string;
    code: string;
	email: string;
	password: string;
}

const INITIAL_STATE: CodeType = {
    firstName: "",
	lastName: "",
    code: "",
	email: "",
	password: "",
}

export const code = createSlice({
    name: 'code',
    initialState: INITIAL_STATE,
    reducers: {
		addFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        addLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
		addCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
		addEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
		addPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
});

export const { addFirstName, addLastName, addCode, addEmail, addPassword } = code.actions;

export default code.reducer;

