import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const DefaultList = ({
	cards,
	shownMovies,
	isSavedFilms,
	getSavedMovieFromList,
	userSavedFilms,
	likeMovie,
	onDeleteCard,
	handleShownMoviesCountPlayButton,
}) => {
	return (
		<>
			<ul className='cards__list'>
				{cards.slice(0, shownMovies).map((card) => (
					<MoviesCard
						key={isSavedFilms ? card._id : card.id}
						saved={getSavedMovieFromList(userSavedFilms, card)}
						cards={cards}
						card={card}
						isSavedFilms={isSavedFilms}
						likeMovie={likeMovie}
						onDeleteCard={onDeleteCard}
						userSavedFilms={userSavedFilms}
					/>
				))}
			</ul>
			<div className='cards__button-wrapper'>
				{cards.length > shownMovies ? (
					<button
						className='cards__button'
						onClick={handleShownMoviesCountPlayButton}
					>
						Ещё
					</button>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default DefaultList;
