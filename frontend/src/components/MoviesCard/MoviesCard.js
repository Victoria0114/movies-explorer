import React from 'react';
import './MoviesCard.css';
import MovieCardInfo from './MovieCardInfo';

function MoviesCard({
	saved,
	isSavedFilms,
	card,
	likeMovie,
	onDeleteCard,
	userSavedFilms,
}) {

	function onDelete() {
		onDeleteCard(card);
	}

	
	function onCardClick() {
		if (saved) {
			onDeleteCard(userSavedFilms.filter((m) => m.movieId === card.id)[0]);
		} else {
			likeMovie(card);
		}
	}

	return (
		<>
			<div className='movie-card'>
				<a href={card.trailerLink}>
					<img
						src={
							isSavedFilms ? card.image : `https://api.nomoreparties.co/${card.image.url}`
						}
						alt={card.nameRU}
						className='movie-card__image'
					/>
				</a>
				<MovieCardInfo
					card={card}
					isSavedFilms={isSavedFilms}
					onDelete={onDelete}
					saved={saved}
					onCardClick={onCardClick}
				/>
			</div>
		</>
	);
}

export default MoviesCard;
