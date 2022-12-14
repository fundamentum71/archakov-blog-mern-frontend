import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

//асинхронный запрос на получение постов
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts');
	return data;
});

//асинхронный запрос на удаление постов
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
	axios.delete(`/posts/${id}`),
);

//асинхронный запрос на получение тэгов
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const { data } = await axios.get('/tags');
	//уникальные элементы массива
	const unicData = Array.from(new Set(data));
	return unicData;
});

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	//описание ассинхронного экшена
	extraReducers: {
		// получение постов
		[fetchPosts.pending]: (state) => {
			state.posts.items = [];
			state.posts.status = 'loading';
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = 'loaded';
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = 'error';
		},
		//получение тэгов
		[fetchTags.pending]: (state) => {
			state.tags.items = [];
			state.tags.status = 'loading';
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload;
			state.tags.status = 'loaded';
		},
		[fetchTags.rejected]: (state) => {
			state.tags.items = [];
			state.tags.status = 'error';
		},
		//удаление постов
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
		},
	},
});

export const postsReducer = postsSlice.reducer;
