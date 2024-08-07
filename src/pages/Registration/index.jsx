import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';

export const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)


  const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      fullName: 'Новый пользователь',
      email: 'john.doe@example.com',
      password: '123'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values)).catch(err => console.log(err))

    if(!data.payload){
      return alert('Не удалось зарегистрироваться')
    }

    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }

    if(isAuth){
      navigate('/')
    }
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
          {...register("fullName", { required: "Укажите полное имя" })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          className={styles.field}
          type="email"
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          className={styles.field}
          type="password"
          label="Пароль"
          fullWidth
        />
        <Button type='submit' disabled={!isValid} size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
