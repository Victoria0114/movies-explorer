import React, { useState, useEffect } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header"
import { filterMovies, filterDurationFilm } from "../../utils/config"

function SavedMovies({ loggedIn, onDeleteCard, userSavedFilms, likeMovie }) {
  const [filteredMovies, setFilteredMovies] = useState(userSavedFilms)
  const [searchQuery, setSearchQuery] = useState("")
  const [isShortMovies, setisShortMovies] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  function handleToggleShortMovies() {
    setisShortMovies(!isShortMovies)
  }

  function getSearchQueryValue(query) {
    setSearchQuery(query)
  }

  useEffect(() => {
    const moviesFilmList = filterMovies(userSavedFilms, searchQuery)
    setFilteredMovies(
      isShortMovies ? filterDurationFilm(moviesFilmList) : moviesFilmList
    )
  }, [userSavedFilms, isShortMovies, searchQuery])

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilterMovies={handleToggleShortMovies}
        getSearchQueryValue={getSearchQueryValue}
      />
      <MoviesCardList
        cards={filteredMovies}
        userSavedFilms={userSavedFilms}
        isSavedFilms={true}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
        likeMovie={likeMovie}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies
