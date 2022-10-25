import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

//запрос на авторизацию
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
	const { data } = await axios.post('/auth/login', params);
	return data;
});

//запрос на проверку авторизации
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
	const { data } = await axios.get('/auth/me');
	return data;
});

//запрос на регистрацию
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
	const { data } = await axios.post('/auth/register', params);
	return data;
});

const initialState = {
	data: null,
	status: 'loading',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		},
	},
	//описание ассинхронного экшена
	extraReducers: {
		//
		[fetchAuth.pending]: (state) => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchAuth.rejected]: (state) => {
			state.status = 'error';
			state.data = null;
		},

		//на проверку авторизации
		[fetchAuthMe.pending]: (state) => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchAuthMe.rejected]: (state) => {
			state.status = 'error';
			state.data = null;
		},
		//на регистрацию
		[fetchRegister.pending]: (state) => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchRegister.rejected]: (state) => {
			state.status = 'error';
			state.data = null;
		},
	},
});

//авторизован ли пользователь
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
