import React from 'react';
import { formatDuration } from '../../utils/config';
import './MoviesCard.css';

function MoviesCard({
	card,
	isSavedFilms,
	likeMovie,
	saved,
	userSavedFilms,
	onDeleteCard,
}) {
	function onCardClick() {
		if (saved) {
			onDeleteCard(userSavedFilms.filter((m) => m.movieId === card.id)[0]);
		} else {
			likeMovie(card);
		}
	}

	function onDelete() {
		onDeleteCard(card);
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
				<div className='movie-card__header'>
					<div className='movie-card__header-wrapper'>
						<h2 className='movie-card__title'>
							{card.nameRU.length > 27 ? `${card.nameRU.slice(0, 27)}..` : card.nameRU}
						</h2>
						{isSavedFilms ? (
							<button
								className={`
              card__delete-button
            `}
								type='button'
								aria-label='удалить'
								onClick={onDelete}
							></button>
						) : (
							<button
								className={`
              card__save-button
              ${saved ? 'card__save-button_active' : ''}
              button
            `}
								type='button'
								aria-label='сохранить или удалить'
								onClick={onCardClick}
							></button>
						)}
					</div>
					<span className='movie-card__duration'>{formatDuration(card.duration)}</span>
				</div>
			</div>
		</>
	);
}

export default MoviesCard;
