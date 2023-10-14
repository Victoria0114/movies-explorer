import React, { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { filterMovies, filterDurationFilm } from '../../utils/filmHelpers';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import * as movies from '../../utils/MoviesApi';

function Movies({ userSavedFilms, likeMovie, loggedIn, onDeleteCard }) {
	const takeFromLocal = JSON.parse(localStorage.getItem('shortMovies'))	
	const finalToggle = takeFromLocal === null ? false : takeFromLocal
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [initialCardsMovies, setInitialCardsMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isShortMovies, setisShortMovies] = useState(finalToggle);
	const [isReqError, setisReqError] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);

	function handleFilterMovie(movies, query, short) {
		const moviesFilmList = filterMovies(movies, query, short);
		setInitialCardsMovies(moviesFilmList);
		setFilteredMovies(short ? filterDurationFilm(moviesFilmList) : moviesFilmList);
		localStorage.setItem('allFilms', JSON.stringify(movies));
		localStorage.setItem('films', JSON.stringify(moviesFilmList));
	}

	function setSearchQueryValue(query) {
		localStorage.setItem('filmsSearch', query);
		localStorage.setItem('shortFilms', isShortMovies);
		if (localStorage.getItem('allFilms')) {
			const movies = JSON.parse(localStorage.getItem('allFilms'));
			handleFilterMovie(movies, query, isShortMovies);
		} else {
			setIsLoading(true);
			movies
				.getMovies()
				.then((cardsSavedFilms) => {
					handleFilterMovie(cardsSavedFilms, query, isShortMovies);
					setisReqError(false);
					console.log(cardsSavedFilms);
				})
				.catch((error) => {
					setisReqError(true);
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}

	function handleToggleShortMovies() {
		console.log('переключение чекбокса');
		setisShortMovies(!isShortMovies);
		if (!isShortMovies) {
			const filteredCardsMovies = filterDurationFilm(initialCardsMovies);
			setFilteredMovies(filteredCardsMovies);
		} else {
			setFilteredMovies(initialCardsMovies);
		}
		localStorage.setItem('shortMovies', !isShortMovies);
	}

	// useEffect(() => {
	// 	setisShortMovies(localStorage.getItem('shortFilms') === 'true');
	// }, []);

	useEffect(() => {
		if (localStorage.getItem('films')) {
			const movies = JSON.parse(localStorage.getItem('films'));
			setInitialCardsMovies(movies);
			if (localStorage.getItem('shortFilms') === 'true') {
				setFilteredMovies(filterDurationFilm(movies));
			} else {
				setFilteredMovies(movies);
			}
		}
	}, []);

	useEffect(() => {
		if (localStorage.getItem('filmsSearch')) {
			setIsNotFound(filteredMovies.length === 0);
		} else {
			setIsNotFound(false);
		}
	}, [filteredMovies]);

	return (
		<section className='movies'>
			<Header loggedIn={loggedIn} />
			<SearchForm
				isShortMovies={isShortMovies}
				setSearchQueryValue={setSearchQueryValue}
				onFilterMovies={handleToggleShortMovies}
			/>
			<MoviesCardList
				cards={filteredMovies}
				isLoading={isLoading}
				userSavedFilms={userSavedFilms}
				isSavedFilms={false}
				isReqError={isReqError}
				isNotFound={isNotFound}
				likeMovie={likeMovie}
				onDeleteCard={onDeleteCard}
			/>
			<Footer />
		</section>
	);
}

export default Movies;
