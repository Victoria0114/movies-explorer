import React from 'react';
import { Link } from 'react-router-dom';
import { PATTERN_REGEX_EMAIL } from '../../utils/constants';

const ProfileInputs = ({
	handleChangeInput,
	enteredValues,
	errors,
	isFormValid,
	isLoading,
	isLastValues,
	signOut,
}) => {
	return (
		<>
			<label className='profile__label'>
				Имя
				<input
					className='profile__input'
					name='name'
					minLength={2}
					maxLength={40}
					placeholder='Ваше имя'
					type='text'
					onChange={handleChangeInput}
					value={enteredValues.name || ''}
					required
				/>
				<span className='profile__input-error'>{errors.name}</span>
			</label>
			<div className='profile__line'></div>
			<label className='profile__label'>
				E-mail
				<input
					className='profile__input'
					name='email'
					placeholder='Ваш Email'
					type='email'
					onChange={handleChangeInput}
					pattern={PATTERN_REGEX_EMAIL}
					value={enteredValues.email || ''}
					required
				/>
				<span className='profile__input-error'>{errors.email}</span>
			</label>
			<button
				type='submit'
				disabled={!isFormValid ? true : false}
				className={
					!isFormValid || isLoading || isLastValues
						? 'profile__button-save form__button-save_inactive'
						: 'profile__button-save'
				}
			>
				Редактировать
			</button>
			<Link
				className='profile__exit'
				to='/profile'
				type='button'
				onClick={signOut}
			>
				Выйти из аккаунта
			</Link>
		</>
	);
};

export default ProfileInputs;
