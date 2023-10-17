import React from 'react';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import InfoTooltipEditProfile from '../InfoTooltipEditProfile/InfoTooltipEditProfile';

const PopUps = ({
	isActionSuccess,
	isPopUpOpen,
	allModalsClose,
	closeModalByOverlay,
	isProfileUpdating,
	isPopUpEditOpen
}) => {
	return (
		<>
			<InfoTooltip
				isActionSuccess={isActionSuccess}
				isOpen={isPopUpOpen}
				onClose={allModalsClose}
				onCloseOverlay={closeModalByOverlay}
			/>
			<InfoTooltipEditProfile
				isProfileUpdating={isProfileUpdating}
				isOpen={isPopUpEditOpen}
				onClose={allModalsClose}
				onCloseOverlay={closeModalByOverlay}
			/>
		</>
	);
};

export default PopUps;
