import React from 'react';
import '../Form/Form.css';
import useForm from '../../hooks/useForm';
import Form from '../Form/Form';
import MyInputs from './MyInputs';

function Login({ isLoading, onAuthorization }) {
  
	const { enteredValues, errors, handleChangeInput, isFormValid } = useForm();

	function handleEditUserInfo(event) {
		event.preventDefault();
		onAuthorization({
			email: enteredValues.email,
			password: enteredValues.password,
		});
	}

	return (
		<Form
			title='Рады видеть!'
			buttonText='Войти'
			linkText=' Регистрация'
			question='Еще не зарегистрированы?'
			link='/signup'
			isDisablBtn={!isFormValid}
			isLoading={isLoading}
			onSubmit={handleEditUserInfo}
		>
			<MyInputs
				handleChangeInput={handleChangeInput}
				enteredValues={enteredValues}
				errors={errors}
			/>
		</Form>
	);
}

export default Login;
