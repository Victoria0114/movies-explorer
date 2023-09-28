import React from "react"
import photo from "../../images/photo.jpg"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__paragraph-block">
          <h3 className="about-me__name">Виктория</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 31 год</h4>
          <p className="about-me__paragraph">
          Я родилась и живу в Долгопрудном. Закончила факультет экономики МГТУ Станкин. 
          У меня есть муж и сын. С 2014 года занимаюсь продажей столешниц, подоконников и т.д. из 
          кварца, натурального и искусственного камня в компании «MyQuartz». 
          В декретном отпуске решила пойти учиться в ЯндексПрактикум на веб-разработчика.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/Victoria0114"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={photo} alt="Мое фото" className="about-me__avatar" />
      </div>
    </section>
  )
}

export default AboutMe
