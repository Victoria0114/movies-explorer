import React from "react"
import Form from "../Form/Form"
import "../Form/Form.css"
import { PATTERN_REGEX_EMAIL } from "../../utils/constants"
import useForm from "../../hooks/useForm"

function Login({ onAuthorization, isLoading }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()
  function handleEditUserInfo(event) {
    event.preventDefault()
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      linkText=" Регистрация"
      question="Еще не зарегистрированы?"
      link="/signup"
      isDisablBtn={!isFormValid}
      isLoading={isLoading}
      onSubmit={handleEditUserInfo}
    >
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          placeholder="pochta@yandex.ru"
          pattern={PATTERN_REGEX_EMAIL}
          onChange={handleChangeInput}
          value={enteredValues.email || ""}
          required
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          placeholder="Пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
          minLength="6"
          maxLength="12"
          required
        />
        
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Login
