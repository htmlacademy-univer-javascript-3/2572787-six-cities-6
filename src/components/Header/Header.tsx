import { Link } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import Logo from '../Logo/Logo';
import useAppSelector from '../../hooks/use-app-selector';
import useAppDispatch from '../../hooks/use-app-dispatch';
import { logoutUser } from '../../store/api-actions';
import { getUserInfo } from '../../store/selectors/user-selectors';

type HeaderProps = {
  showUserInfo?: boolean;
};

function Header({ showUserInfo }: HeaderProps): JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {showUserInfo && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {userInfo !== undefined ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img
                            className="header__avatar user__avatar"
                            src={userInfo.avatarUrl}
                            width="54"
                            height="54"
                            alt="Header avatar"
                          />
                        </div>
                        <span className="header__user-name user__name">
                          {userInfo.email}
                        </span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
