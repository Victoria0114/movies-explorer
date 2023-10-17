import React, { useState, useEffect } from 'react';
import { filterMovies, filterDurationFilm } from '../../utils/filmHelpers';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ onDeleteCard, userSavedFilms, loggedIn, likeMovie }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [isNotFound, setIsNotFound] = useState(false);
	const [isShortMovies, setisShortMovies] = useState(false);
	const [filteredMovies, setFilteredMovies] = useState(userSavedFilms);
	useEffect(() => {
		const moviesFilmList = filterMovies(userSavedFilms, searchQuery);
		setFilteredMovies(
			isShortMovies ? filterDurationFilm(moviesFilmList) : moviesFilmList
		);
	}, [userSavedFilms, isShortMovies, searchQuery]);

	useEffect(() => {
		if (filteredMovies.length === 0) {
			setIsNotFound(true);
		} else {
			setIsNotFound(false);
		}
	}, [filteredMovies]);
	
	function setSearchQueryValue(query) {
		setSearchQuery(query);
	}

	function handleToggleShortMovies() {
		setisShortMovies(!isShortMovies);
	}



	return (
		<section className='movies'>
			<Header loggedIn={loggedIn} />
			<SearchForm
				onFilterMovies={handleToggleShortMovies}
				setSearchQueryValue={setSearchQueryValue}
				saved
			/>
			<MoviesCardList
				cards={filteredMovies}
				userSavedFilms={userSavedFilms}
				isSavedFilms={true}
				onDeleteCard={onDeleteCard}
				isNotFound={isNotFound}
				likeMovie={likeMovie}
			/>
			<Footer />
		</section>
	);
}

export default SavedMovies;
