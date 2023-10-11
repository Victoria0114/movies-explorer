import React from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ handleClose }) {
	const links = [
		{ id: 12234, link: '/', title: 'Главная' },
		{ id: 421232, link: '/movies', title: 'Фильмы' },
		{ id: 3, link: '/saved-movies', title: 'Сохранённые фильмы' },
	];

	const setActiveColorLink = ({ isActive }) =>
		isActive ? 'navigation__link active' : 'navigation__link';

	return (
		<div className='navigation__page-overlay'>
			<div className='navigation__overlay-container'></div>
			<div className='navigation__mobile-menu'>
				<button
					className='navigation__close-button'
					onClick={handleClose}
				></button>
				<nav className='navigation__links'>
					{links.map((el) => (
						<NavLink
							key={el.id}
							className={setActiveColorLink}
							to={el.link}
							onClick={handleClose}
						>
							{el.title}
						</NavLink>
					))}
				</nav>
				<NavLink
					to='/profile'
					className='navigation__admin admin'
				>
					Аккаунт
				</NavLink>
			</div>
		</div>
	);
}

export default Navigation;