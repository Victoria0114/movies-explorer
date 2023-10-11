import React from 'react';
import Form from '../Form/Form';
import '../Form/Form.css';
import useForm from '../../hooks/useForm';
import RegisteInputs from './RegisteInputs';

function Register({ isLoading, registerUser }) {
	const { enteredValues, errors, handleChangeInput, isFormValid } = useForm();
	function handleEditUserInfo(event) {
		event.preventDefault();
		registerUser({
			name: enteredValues.name,
			email: enteredValues.email,
			password: enteredValues.password,
		});
	}
	return (
		<Form
			link='/signin'
			title='Добро пожаловать!'
			buttonText='Зарегистрироваться'
			question='Уже зарегистрированы?'
			linkText=' Войти'
			onSubmit={handleEditUserInfo}
			isDisablBtn={!isFormValid}
			isLoading={isLoading}
		>
			<RegisteInputs
			handleChangeInput={handleChangeInput}
			enteredValues={enteredValues}
			errors={errors}
			/>
		</Form>
	);
}

export default Register;
