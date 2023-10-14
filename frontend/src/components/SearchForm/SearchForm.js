import React, { useState, useEffect } from 'react';
import customIcon from '../../images/customIcon.svg';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm({isShortMovies, setSearchQueryValue, onFilterMovies, saved }) {
	const takeFromLocal = localStorage.getItem('filmsSearch') 
	const finalQuery = takeFromLocal === null ? '' : takeFromLocal 
	const location = useLocation();
	const [query, setQuery] = useState( saved ? '' : finalQuery);
	const [hasSearchError, setHasSearchError] = useState(false);

	function handleQueryInputChange(event) {
		setQuery(event.target.value);
	}

	function handleEditUserInfo(event) {
		event.preventDefault();
		if (query.trim().length === 0) {
			setHasSearchError(true);
		} else {
			setHasSearchError(false);
			setSearchQueryValue(query);
		}
	}

	useEffect(() => {
		if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
			const localQuery = localStorage.getItem('movieSearch');
			setQuery(localQuery);
		}
	}, [location]);

	return (
		<section className='search'>
			<form
				className='search__forma'
				id='form'
				onSubmit={handleEditUserInfo}
			>
				<div className='search__field'>
					<input
						className='search__input'
						name='query'
						placeholder='Фильм'
						type='text'
						value={query || ''}
						onChange={handleQueryInputChange}
					></input>
					<button
						className='search__button'
						type='submit'
					>
						<img
							src={customIcon}
							alt='Поиск'
						/>
					</button>
				</div>
				{hasSearchError && (
					<span className='search__form-error'>Нужно ввести ключевое слово</span>
				)}
				<FilterCheckbox
					isShortMovies={isShortMovies}
					onFilterMovies={onFilterMovies}
				/>
			</form>
		</section>
	);
}

export default SearchForm;
