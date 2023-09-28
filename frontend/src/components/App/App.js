import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import Main from "../Main/Main"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import Footer from "../Footer/Footer"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import NotFound from "../NotFound/NotFound"
import "./App.css"
import * as api from "../../utils/MainApi"
import Profile from "../Profile/Profile"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import InfoTooltipEditProfile from "../InfoTooltipEditProfile/InfoTooltipEditProfile"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  //основные сосотояния
  const [user, setUser] = useState({})
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userSavedFilms, setUserSavedFilms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isPopUpEditOpen, setIsPopUpEditOpen] = useState(false)
  const [isProfileUpdating, setIsProfileUpdating] = useState(false)
  const [isActionSuccess, setIsActionSuccess] = useState(false)

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsUserLoggedIn(true)
            localStorage.removeItem("allFilms")
          }
          navigate(path)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  function registrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        loginUser({ email, password })
        setIsPopUpOpen(true)
        setIsActionSuccess(true)
      })
      .catch((error) => {
        setIsPopUpOpen(true)
        setIsActionSuccess(false)
        console.log(error)
      })
  }

  function loginUser({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsActionSuccess(true)
          setIsPopUpOpen(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsUserLoggedIn(true)
        }
      })
      .catch((error) => {
        setIsPopUpOpen(true)
        setIsActionSuccess(false)
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          setUser(profileInfo)
        })
        .catch((error) => {
          console.log(error)
        })
      api
        .getMovies()
        .then((cardsSavedFilms) => {
          setUserSavedFilms(cardsSavedFilms.reverse())
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isUserLoggedIn])

  function likeMovie(card) {
    api
      .postCard(card)
      .then((newMovieFilm) => {
        setUserSavedFilms([newMovieFilm, ...userSavedFilms])
      })
      .catch((error) => {
        setIsActionSuccess(false)
        console.log(error)
        authErrHandler(error)
      })
  }

  function removeMovie(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setUserSavedFilms((state) =>
          state.filter((item) => item._id !== card._id)
        )
      })
      .catch((error) => {
        setIsActionSuccess(false)
        console.log(error)
        authErrHandler(error)
      })
  }

  function updateProfileInfo(userInfo) {
    setIsLoading(true)
    api
      .setUserInfo(userInfo)
      .then((data) => {
        setIsPopUpEditOpen(true)
        setIsProfileUpdating(true)

        setUser(data)
      })
      .catch((error) => {
        setIsPopUpEditOpen(true)
        setIsProfileUpdating(false)

        console.log(error)
        authErrHandler(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function authErrHandler(error) {
    if (error === "Error: 401") {
      logoutUser()
    }
  }

  function allModalsClose() {
    setIsPopUpOpen(false)
    setIsPopUpEditOpen(false)
  }

  const isOpen = isPopUpOpen || isPopUpEditOpen

  useEffect(() => {
    function closeModalByEscape(evt) {
      if (evt.key === "Escape") {
        allModalsClose()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeModalByEscape)
      return () => {
        document.removeEventListener("keydown", closeModalByEscape)
      }
    }
  }, [isOpen])

  function closeModalByOverlay(event) {
    if (event.target === event.currentTarget) {
      allModalsClose()
    }
  }

  const logoutUser = () => {
    setIsUserLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("films")
    localStorage.removeItem("filmsSearch")
    localStorage.removeItem("shortFilms")
    localStorage.removeItem("allFilms")
    localStorage.clear()
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <div className="page__wrapper">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isUserLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isUserLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login isLoading={isLoading} onAuthorization={loginUser} />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isUserLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    isLoading={isLoading}
                    registrationUser={registrationUser}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  loggedIn={isUserLoggedIn}
                  component={Movies}
                  likeMovie={likeMovie}
                  onDeleteCard={removeMovie}
                  userSavedFilms={userSavedFilms}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={isUserLoggedIn}
                  component={SavedMovies}
                  userSavedFilms={userSavedFilms}
                  onDeleteCard={removeMovie}
                  likeMovie={likeMovie}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  loggedIn={isUserLoggedIn}
                  component={Profile}
                  isLoading={isLoading}
                  onUpdateUser={updateProfileInfo}
                  signOut={logoutUser}
                />
              }
            />
          </Routes>
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
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
