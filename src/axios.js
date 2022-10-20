import axios from 'axios';

//для того чтобы при работе с axios не пришлось писать весь путь
const instance = axios.create({
	baseURL: 'http://localhost:4444',
});

export default instance;
