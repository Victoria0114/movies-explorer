import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import * as api from '../../utils/MainApi';
import MyRoutes from './MyRoutes';
import PopUps from './PopUps';

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const path = location.pathname;
	const [user, setUser] = useState({});
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isPopUpEditOpen, setIsPopUpEditOpen] = useState(false);
	const [isPopUpOpen, setIsPopUpOpen] = useState(false);
	const [userSavedFilms, setUserSavedFilms] = useState([]);
	const [isActionSuccess, setIsActionSuccess] = useState(false);
	const [isProfileUpdating, setIsProfileUpdating] = useState(false);

	function registerUser({ name, email, password }) {
		api
			.register(name, email, password)
			.then(() => {
				loginUser({ email, password });
				setIsPopUpOpen(true);
				setIsActionSuccess(true);
			})
			.catch((error) => {
				setIsPopUpOpen(true);
				setIsActionSuccess(false);
				console.log(error);
			});
	}

	function loginUser({ email, password }) {
		setIsLoading(true);
		api
			.authorize(email, password)
			.then((res) => {
				if (res) {
					setIsActionSuccess(true);
					setIsPopUpOpen(true);
					localStorage.setItem('jwt', res.token);
					navigate('/movies', { replace: true });
					setIsUserLoggedIn(true);
				}
			})
			.catch((error) => {
				setIsPopUpOpen(true);
				setIsActionSuccess(false);
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}


	function likeMovie(card) {
		api
			.postCard(card)
			.then((newMovieFilm) => {
				setUserSavedFilms([newMovieFilm, ...userSavedFilms]);
			})
			.catch((error) => {
				setIsActionSuccess(false);
				console.log(error);
				authErrHandler(error);
			});
	}

	function removeMovie(card) {
		api
			.deleteCard(card._id)
			.then(() => {
				setUserSavedFilms((state) => state.filter((item) => item._id !== card._id));
			})
			.catch((error) => {
				setIsActionSuccess(false);
				console.log(error);
				authErrHandler(error);
			});
	}

	function updateProfileInfo(userInfo) {
		setIsLoading(true);
		api
			.setUserInfo(userInfo)
			.then((data) => {
				setIsPopUpEditOpen(true);
				setIsProfileUpdating(true);
				setUser(data ? data.user : data);
			})
			.catch((error) => {
				setIsPopUpEditOpen(true);
				setIsProfileUpdating(false);
				console.log(setIsProfileUpdating);
				console.log(error);
				authErrHandler(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	function authErrHandler(error) {
		if (error === 'Error: 401') {
			logoutUser();
		}
	}

	function allModalsClose() {
		setIsPopUpOpen(false);
		setIsPopUpEditOpen(false);
	}

	const isOpen = isPopUpOpen || isPopUpEditOpen;


	function closeModalByOverlay(event) {
		if (event.target === event.currentTarget) {
			allModalsClose();
		}
	}

	const logoutUser = () => {
		setIsUserLoggedIn(false);
		localStorage.removeItem('jwt');
		localStorage.removeItem('films');
		localStorage.removeItem('filmsSearch');
		localStorage.removeItem('shortFilms');
		localStorage.removeItem('allFilms');
		localStorage.clear();
		navigate('/');
	};

	useEffect(() => {
		if (isUserLoggedIn) {
			api
				.getUserInfo()
				.then((profileInfo) => {
					setUser(profileInfo);
				})
				.catch((error) => {
					console.log(error);
				});
			api
				.getMovies()
				.then((cardsSavedFilms) => {
					console.log(cardsSavedFilms);
					console.log('вывод массива coхраненных фильмов');
					setUserSavedFilms(cardsSavedFilms.reverse());
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [isUserLoggedIn]);

	useEffect(() => {
		function closeModalByEscape(evt) {
			if (evt.key === 'Escape') {
				allModalsClose();
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', closeModalByEscape);
			return () => {
				document.removeEventListener('keydown', closeModalByEscape);
			};
		}
	}, [isOpen]);

	useEffect(() => {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			api
				.getContent(jwt)
				.then((res) => {
					if (res) {
						setIsUserLoggedIn(true);
						localStorage.removeItem('allFilms');
					}
					navigate(path);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	return (
		<CurrentUserContext.Provider value={user}>
			<div className='page'>
				<div className='page__wrapper'>
					<MyRoutes
						isUserLoggedIn={isUserLoggedIn}
						isLoading={isLoading}
						loginUser={loginUser}
						registerUser={registerUser}
						likeMovie={likeMovie}
						removeMovie={removeMovie}
						userSavedFilms={userSavedFilms}
						updateProfileInfo={updateProfileInfo}
						logoutUser={logoutUser}
					/>
					<PopUps
						isActionSuccess={isActionSuccess}
						isPopUpOpen={isPopUpOpen}
						allModalsClose={allModalsClose}
						closeModalByOverla={closeModalByOverlay}
						isProfileUpdating={isProfileUpdating}
						isPopUpEditOpen={isPopUpEditOpen}
					/>
				</div>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
