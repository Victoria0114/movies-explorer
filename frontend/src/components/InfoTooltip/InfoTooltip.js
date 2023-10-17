import React from 'react';
import './InfoTooltip.css';

function InfoToolTip({isOpen, onClose, onCloseOverlay, isActionSuccess}) {
	return (
		<div
			className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}
			onClick={onCloseOverlay}
		>
			<div className='popup__container'>
				{isActionSuccess ? (
					<>
						<p className='popup__signup-title'>Добро пожаловать!</p>
					</>
				) : (
					<>
						<p className='popup__signup-title'>
							Что-то пошло не так. Попробуйте ещё раз!
						</p>
					</>
				)}

				<button
					type='button'
					className='popup__close-button'
					onClick={onClose}
				></button>
			</div>
		</div>
	);
}

export default InfoToolTip;
