import { useState } from 'react';

type BookmarkProps = {
  block: 'place-card' | 'offer';
  bookmarkSize: {
    width: string;
    height: string;
  };
  inBookmarks?: boolean;
};

function Bookmark({
  block,
  bookmarkSize: { width, height },
  inBookmarks,
}: BookmarkProps): JSX.Element {
  const [checked, setChecked] = useState(inBookmarks ?? false);

  const handleBookmarkClick = () => {
    setChecked((previousChecked) => !previousChecked);
  };

  return (
    <button
      className={`${block}__bookmark-button ${checked ? `${block}__bookmark-button--active` : ''} button`}
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
