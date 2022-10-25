import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth);

	const dispatch = useDispatch();

	//используем хук useForm для работы с формой
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: 'Глеб Пупкин',
			email: 'gleb@test.ru',
			password: '12345',
		},
		//валидация должна происходить когда поменяеются поля
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));
		//сохранение в localStorage
		if (!data.payload) {
			return alert('Не удалось зарегистрироваться!');
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		}
	};

	//при авторизации будет переходить на главную страницу
	console.log(isAuth);
	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					//регистрируем поле
					{...register('fullName', { required: 'Укажите полное имя' })}
					className={styles.field}
					label="Полное имя"
					fullWidth
				/>
				<TextField
					type="email"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					//регистрируем поле
					{...register('email', { required: 'Укажите почту' })}
					className={styles.field}
					label="E-Mail"
					fullWidth
				/>
				<TextField
					type="password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					//регистрируем поле
					{...register('password', { required: 'Введите пароль' })}
					className={styles.field}
					label="Пароль"
					fullWidth
				/>
				<Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};
