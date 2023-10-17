import React from 'react';
import { PATTERN_REGEX_EMAIL } from '../../utils/constants';

const RegisteInputs = ({ handleChangeInput, enteredValues, errors }) => {
	return (
		<>
			<label className='form__label'>
				Имя
				<input
					className='form__input'
					name='name'
					minLength={2}
					maxLength={40}
					placeholder='Ваше имя'
					type='text'
					onChange={handleChangeInput}
					value={enteredValues.name || ''}
					required
				/>
				<span className='form__input-error'>{errors.name}</span>
			</label>
			<label className='form__label'>
				E-mail
				<input
					className='form__input'
					name='email'
					placeholder='Ваш Email'
					type='email'
					onChange={handleChangeInput}
					pattern={PATTERN_REGEX_EMAIL}
					value={enteredValues.email || ''}
					required
				/>
				<span className='form__input-error'>{errors.email}</span>
			</label>
			<label className='form__label'>
				Пароль
				<input
					className='form__input'
					name='password'
					placeholder='Ваш пароль'
					type='password'
					onChange={handleChangeInput}
					value={enteredValues.password || ''}
					minLength={6}
					maxLength={12}
					required
				/>
				<span className='form__input-error'>{errors.password}</span>
			</label>
		</>
	);
};

export default RegisteInputs;
