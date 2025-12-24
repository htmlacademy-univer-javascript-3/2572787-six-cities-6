import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import AppRoute from '../../const/app-route';
import useAppDispatch from '../../hooks/use-app-dispatch';
import { fetchFavoritePlacesAction, loginUser } from '../../store/api-actions';
import cityNames from '../../const/cities';
import { changeCity } from '../../store/slices/city';

function LoginPage(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const city = useRef(cityNames[Math.floor(Math.random() * cityNames.length)]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    dispatch(fetchFavoritePlacesAction());
    navigate(AppRoute.Main);
  };

  const handleCityClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(changeCity({ city: city.current }));
    navigate(AppRoute.Main);
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleLoginSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" onClick={handleCityClick}>
                <span>{city.current}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
