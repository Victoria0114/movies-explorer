import React, { useEffect, useState } from "react"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import "./MoviesCardList.css"
import Preloader from "../Preloader/Preloader"
import { useLocation } from "react-router-dom"
import {
  NUMBER_MOVIES_DESKTOP,
  NUMBER_MOVIES_TABLET,
  NUMBER_MOVIES_MOBIL,
} from "../../utils/constants"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  userSavedFilms,
  isReqError,
  isNotFound,
  likeMovie,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0)
  const { pathname } = useLocation()

  function handleShowFilmsDisplay() {
    const display = window.innerWidth
    if (display > 1279) {
      setShownMovies(16)
    } else if (display > 767) {
      setShownMovies(8)
    } else {
      setShownMovies(5)
    }
  }

  useEffect(() => {
    handleShowFilmsDisplay()
  }, [cards])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", handleShowFilmsDisplay)
    }, 500)
  })

  function handleShownMoviesCountPlayButton() {
    const display = window.innerWidth
    if (display > 1279) {
      setShownMovies(shownMovies + NUMBER_MOVIES_DESKTOP)
    } else if (display > 767) {
      setShownMovies(shownMovies + NUMBER_MOVIES_TABLET)
    } else {
      setShownMovies(shownMovies + NUMBER_MOVIES_MOBIL)
    }
  }

  function getSavedMovieFromList(userSavedFilms, card) {
    return userSavedFilms.find((savedMovie) => savedMovie.movieId === card.id)
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
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
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieFromList(userSavedFilms, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    likeMovie={likeMovie}
                    onDeleteCard={onDeleteCard}
                    userSavedFilms={userSavedFilms}
                  />
                ))}
              </ul>
              <div className="cards__button-wrapper">
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button"
                    onClick={handleShownMoviesCountPlayButton}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
