import React from "react"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__paragraph">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__wrapper">
        <p className="footer__year">
          {" "}
          © {new Date().getFullYear()}
        </p>
        <a
          className="footer__link"
          href="https://practicum.yandex.ru"
          target="_blank"
          rel="noreferrer"
        >
          Яндекс.Практикум
        </a>
        <a
          className="footer__link"
          href="https://github.com/Victoria0114"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  )
}

export default Footer
