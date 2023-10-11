import React, { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import useForm from '../../hooks/useForm';
import ProfileInputs from './ProfileInputs';
import Header from '../Header/Header';

function Profile({signOut, isLoading, loggedIn, onUpdateUser }) {
	const user = useContext(CurrentUserContext);
	const [isLastValues, setIsLastValues] = useState(false);

	const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } = useForm();

	function handleEditUserInfo(event) {
		event.preventDefault();
		onUpdateUser({
			name: enteredValues.name,
			email: enteredValues.email,
		});
	}

	useEffect(() => {
		if (user) {
			resetForm(user);
		}
	}, [user, resetForm]);

	useEffect(() => {
		if (user.name === enteredValues.name && user.email === enteredValues.email) {
			setIsLastValues(true);
		} else {
			setIsLastValues(false);
		}
	}, [enteredValues]);
	return (
		<>
			<Header loggedIn={loggedIn} />
			<section className='profile'>
				<h3 className='profile__title'>Привет, {user.name}!</h3>
				<form
					className='profile__forma'
					id='form'
					onSubmit={handleEditUserInfo}
					noValidate
				>
					<ProfileInputs
						handleChangeInput={handleChangeInput}
						enteredValues={handleChangeInput}
						errors={errors}
						isFormValid={isFormValid}
						isLoading={isLoading}
						isLastValues={isLastValues}
						signOut={signOut}
					/>
				</form>
			</section>
		</>
	);
}

export default Profile;
