import React from 'react';
import logo from '../../images/logo.svg';
import './Header.css';
import SignInSignUp from './SignInSignUp';
import Entered from './Entered';

function Header({ loggedIn }) {
	return (
		<>
			{!loggedIn ? (
				<SignInSignUp logo={logo} />
			) : (
				<Entered
					logo={logo}
				/>
			)}
		</>
	);
}

export default Header;
