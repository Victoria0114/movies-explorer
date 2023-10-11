import React from 'react';
import { formatDuration } from '../../utils/filmHelpers';

const MovieCardInfo = ({ card, isSavedFilms, onDelete, saved, onCardClick }) => {
	return (
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
	);
};

export default MovieCardInfo;
