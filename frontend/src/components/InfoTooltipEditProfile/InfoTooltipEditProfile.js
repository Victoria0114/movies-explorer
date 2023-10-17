import React from 'react';
import '../InfoTooltip/InfoTooltip.css';

function InfoTooltipEditProfile({isOpen, onClose, onCloseOverlay, isProfileUpdating}) {
	return (
		<div
			className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}
			onClick={onCloseOverlay}
		>
			<div className='popup__container'>
				{isProfileUpdating ? (
					<>
						<p className='popup__signup-title'>Редактирование прошло успешно!</p>
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

export default InfoTooltipEditProfile;
