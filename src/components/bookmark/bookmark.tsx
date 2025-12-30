import { useState } from 'react';
import useAppSelector from '../../hooks/use-app-selector';
import { getIsAuth } from '../../store/selectors/auth-selectors';
import { useNavigate } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import classNames from 'classnames';

type BookmarkProps = {
  block: 'place-card' | 'offer';
  bookmarkSize: {
    width: string;
    height: string;
  };
  inBookmarks?: boolean;
  onBookmarkClick?: (checked: boolean) => void;
};

function Bookmark({
  block,
  bookmarkSize: { width, height },
  inBookmarks,
  onBookmarkClick,
}: BookmarkProps): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(inBookmarks ?? false);

  const handleBookmarkClick = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
      return;
    }

    setChecked((previousChecked) => !previousChecked);
    if (onBookmarkClick) {
      onBookmarkClick(!checked);
    }
  };

  const bookmarkActiveClass = `${block}__bookmark-button--active`;
  return (
    <button
      className={classNames(`${block}__bookmark-button`, 'button', {
        [bookmarkActiveClass]: checked,
      })}
      type="button"
      onClick={handleBookmarkClick}
    >
      <svg className={`${block}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {checked ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

export default Bookmark;
