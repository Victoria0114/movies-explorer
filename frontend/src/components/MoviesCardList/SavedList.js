import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const SavedList = ({
	cards,
	isSavedFilms,
	likeMovie,
	onDeleteCard,
	getSavedMovieFromList,
	userSavedFilms,
}) => {
	return (
		<>
			<ul className='cards__list'>
				{cards.map((card) => (
					<MoviesCard
						key={isSavedFilms ? card._id : card.id}
						card={card}
						cards={cards}
						likeMovie={likeMovie}
						onDeleteCard={onDeleteCard}
						saved={getSavedMovieFromList(userSavedFilms, card)}
						userSavedFilms={userSavedFilms}
						isSavedFilms={isSavedFilms}
					/>
				))}
			</ul>
		</>
	);
};

export default SavedList;
