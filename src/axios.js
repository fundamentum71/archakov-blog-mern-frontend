import axios from 'axios';

//для того чтобы при работе с axios не пришлось писать весь путь
const instance = axios.create({
	baseURL: 'http://localhost:4444',
});

//функция посредник, которая при каждом запросе будет проверять есть ли токен в localStorage
instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token');
	return config;
});

export default instance;
