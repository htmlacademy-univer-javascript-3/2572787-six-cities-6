import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header showUserInfo />
      <main className="page__main">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
