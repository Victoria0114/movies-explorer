import React from 'react';
import { Link } from 'react-router-dom';


const SignInSignUp = ({logo}) => {
	return (
		<header
			className='header'
			id='header'
		>
			<Link
				to='/'
				className='logo'
			>
				<img
					src={logo}
					alt='Лого'
				/>
			</Link>
			<div className='header__button-wrapper'>
				<Link
					to='/signup'
					className='header__button'
				>
					Регистрация
				</Link>
				<Link
					to='/signin'
					className='header__button header__button-black'
				>
					Войти
				</Link>
			</div>
		</header>
	);
};

export default SignInSignUp;
