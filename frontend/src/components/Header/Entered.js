import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import whiteBurger from '../../images/burger-icon-white.svg';
import blackBurger from '../../images/burger-icon-black.svg';

const Entered = ({ logo }) => {
	const { pathname } = useLocation();

	const [isOpened, setIsOpened] = useState(false);

	function handleOpen() {
		setIsOpened(true);
	}
	function handleClose() {
		setIsOpened(false);
	}

	return (
		<header className={`${pathname === '/' ? 'header' : 'header header_white'}`}>
			<Link
				to='/'
				className='logo'
			>
				<img
					src={logo}
					alt='Лого'
				/>
			</Link>
			<div className='header__button-wrapper-items'>
				<NavLink
					className={`header__button ${pathname !== '/' && 'header__button-white'}`}
					to='/movies'
				>
					Фильмы
				</NavLink>
				<NavLink
					className={`header__button ${pathname !== '/' && 'header__button-white'}`}
					to='/saved-movies'
				>
					Сохраненные фильмы
				</NavLink>
			</div>
			<div className='header__button-wrapper'>
				<Link
					to='/profile'
					className='header__admin admin'
				>
					Аккаунт
				</Link>
				<button
					className='header__menu-button'
					onClick={handleOpen}
				>
					{pathname === '/' ? (
						<img
							src={whiteBurger}
							alt='меню'
						/>
					) : (
						<img
							src={blackBurger}
							alt='меню'
						/>
					)}
				</button>
			</div>
			{isOpened ? <Navigation handleClose={handleClose} /> : ''}
		</header>
	);
};

export default Entered;
