import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';

const MyRoutes = ({
	isUserLoggedIn,
	isLoading,
	loginUser,
	registerUser,
	likeMovie,
	removeMovie,
	userSavedFilms,
	updateProfileInfo,
	logoutUser
}) => {
	return (
		<Routes>
			<Route
				path={'/'}
				element={
					<>
						<Header loggedIn={isUserLoggedIn} />
						<Main />
						<Footer />
					</>
				}
			/>
			<Route
				path={'/signin'}
				element={
					isUserLoggedIn ? (
						<Navigate
							to='/movies'
							replace
						/>
					) : (
						<Login
							isLoading={isLoading}
							onAuthorization={loginUser}
						/>
					)
				}
			/>
			<Route
				path={'/signup'}
				element={
					isUserLoggedIn ? (
						<Navigate
							to='/movies'
							replace
						/>
					) : (
						<Register
							isLoading={isLoading}
							registerUser={registerUser}
						/>
					)
				}
			/>
			<Route
				path={'*'}
				element={<NotFound />}
			/>
			<Route
				path={'/movies'}
				element={
					<ProtectedRoute
						path='/movies'
						loggedIn={isUserLoggedIn}
						component={Movies}
						likeMovie={likeMovie}
						onDeleteCard={removeMovie}
						userSavedFilms={userSavedFilms}
					/>
				}
			/>
			<Route
				path={'/saved-movies'}
				element={
					<ProtectedRoute
						path='/saved-movies'
						loggedIn={isUserLoggedIn}
						component={SavedMovies}
						userSavedFilms={userSavedFilms}
						onDeleteCard={removeMovie}
						likeMovie={likeMovie}
					/>
				}
			/>
			<Route
				path={'/profile'}
				element={
					<ProtectedRoute
						path='/profile'
						loggedIn={isUserLoggedIn}
						component={Profile}
						isLoading={isLoading}
						onUpdateUser={updateProfileInfo}
						signOut={logoutUser}
					/>
				}
			/>
		</Routes>
	);
};

export default MyRoutes;
