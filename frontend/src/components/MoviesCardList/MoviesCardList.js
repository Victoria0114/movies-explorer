import React, { useEffect, useState } from 'react';
import SearchError from '../SearchError/SearchError';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import {
	NUMBER_MOVIES_DESKTOP,
	NUMBER_MOVIES_TABLET,
	NUMBER_MOVIES_MOBIL,
} from '../../utils/constants';
import SavedList from './SavedList';
import DefaultList from './DefaultList';

function MoviesCardList({
	cards,
	isLoading,
	isSavedFilms,
	userSavedFilms,
	isReqError,
	isNotFound,
	likeMovie,
	onDeleteCard,
}) {
	const [shownMovies, setShownMovies] = useState(0);
	const { pathname } = useLocation();

	function getSavedMovieFromList(userSavedFilms, card) {
		return userSavedFilms.find((savedMovie) => savedMovie.movieId === card.id);
	}

	const errMessageText = 'Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'


	useEffect(() => {
		setTimeout(() => {
			window.addEventListener('resize', handleShowFilmsDisplay);
		}, 500);
	});

	function handleShowFilmsDisplay() {
		const display = window.innerWidth;
		console.log('Отображение карточек в от разрешения экрана');
		console.log(display);
		if (display > 1180) {
			setShownMovies(12);
		} else if (display > 767) {
			setShownMovies(8);
		} else {
			setShownMovies(5);
		}
	}

	useEffect(() => {
		handleShowFilmsDisplay();
	}, [cards]);

	function handleShownMoviesCountPlayButton() {
		const display = window.innerWidth;
		if (display > 1180) {
			setShownMovies(shownMovies + NUMBER_MOVIES_DESKTOP);
		} else if (display > 767) {
			setShownMovies(shownMovies + NUMBER_MOVIES_TABLET);
		} else {
			setShownMovies(shownMovies + NUMBER_MOVIES_MOBIL);
		}
	}


	return (
		<section className='cards'>
			{isLoading && <Preloader />}
			{isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />}
			{isReqError && !isLoading && (
				<SearchError
					errorText={errMessageText}
				/>
			)}
			{!isLoading && !isReqError && !isNotFound && (
				<>
					{pathname === '/saved-movies' ? (
						<SavedList
							cards={cards}
							isSavedFilms={isSavedFilms}
							likeMovie={likeMovie}
							onDeleteCard={onDeleteCard}
							getSavedMovieFromList={getSavedMovieFromList}
							userSavedFilms={userSavedFilms}
						/>
					) : (
						<DefaultList
							cards={cards}
							shownMovies={shownMovies}
							isSavedFilms={isSavedFilms}
							getSavedMovieFromList={getSavedMovieFromList}
							userSavedFilms={userSavedFilms}
							likeMovie={likeMovie}
							onDeleteCard={onDeleteCard}
							handleShownMoviesCountPlayButton={handleShownMoviesCountPlayButton}
						/>
					)}
				</>
			)}
		</section>
	);
}

export default MoviesCardList;
