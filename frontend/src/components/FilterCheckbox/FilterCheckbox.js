import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onFilterMovies, isShortMovies }) {
	return (
		<>
			<div className='filter'>
				<label className='filter__toggle'>
					<input
						onChange={onFilterMovies}
						checked={isShortMovies}
						type='checkbox'
						id='toggle'
					/>
					<span className='filter__toggle-slider'></span>
				</label>
				<span className='filter__checkbox-title'>Короткометражки</span>
			</div>
		</>
	);
}

export default FilterCheckbox;
