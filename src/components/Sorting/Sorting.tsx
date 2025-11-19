import { useState } from 'react';
import { sortOptions, SortOption } from '../../types/sort-options';
import classNames from 'classnames';

type SortingProps = {
  currentSortOption: SortOption;
  onSortChange: (sortOption: SortOption) => void;
};

function Sorting({
  currentSortOption,
  onSortChange,
}: SortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (sortOption: SortOption) => {
    setIsOpen(false);
    onSortChange(sortOption);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((actualIsOpen) => !actualIsOpen)}
      >
        {currentSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {sortOptions.map((option) => (
          <li
            key={btoa(option)}
            className={classNames('places__option', {
              'places__option--active': option === currentSortOption,
            })}
            tabIndex={0}
            onClick={() => handleSortChange(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
