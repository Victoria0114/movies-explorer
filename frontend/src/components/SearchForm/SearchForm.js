import React, { useState, useEffect } from "react"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"
import { useLocation } from "react-router-dom"
import customIcon from "../../images/customIcon.svg"

function SearchForm({ getSearchQueryValue, onFilterMovies, isShortMovies }) {
  const location = useLocation()
  const [hasSearchError, setHasSearchError] = useState(false)
  const [query, setQuery] = useState("")
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  function handleQueryInputChange(event) {
    setQuery(event.target.value)
  }

  function handleEditUserInfo(event) {
    event.preventDefault()
    if (query.trim().length === 0) {
      setHasSearchError(true)
    } else {
      setHasSearchError(false)
      getSearchQueryValue(query)
    }
  }

  return (
    <section className="search">
      <form className="search__forma" id="form" onSubmit={handleEditUserInfo}>
        <div className="search__field">
          <input
            className="search__input"
            name="query"
            placeholder="Фильм"
            type="text"
            value={query || ""}
            onChange={handleQueryInputChange}
          ></input>
          <button className="search__button" type="submit">
            <img src={customIcon} alt="Поиск" />
          </button>
        </div>
        {hasSearchError && (
          <span className="search__form-error">
            Нужно ввести ключевое слово
          </span>
        )}
        <FilterCheckbox
          isShortMovies={isShortMovies}
          onFilterMovies={onFilterMovies}
        />
      </form>
    </section>
  )
}

export default SearchForm
