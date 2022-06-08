import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './TablePagination.module.scss';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import iconsObj from 'assets/icons/iconsObj';

function TablePagination({page, total, onPageChange}) {
  const theme = useTheme();

  const onChange = (type: string) => {
    let nextPage = 1;

    switch (type) {
      case 'prev':
        nextPage = page - 1;
        break;
      case 'next':
        nextPage = page + 1;
        break;
      default:
        nextPage = page;
        break;
    }

    nextPage === total || nextPage === 0 ? onPageChange(page) : onPageChange(nextPage);
  };

  return (
    <div className={classNames(style[theme], style.pagination)}>
      <MaskIcon
        src={iconsObj.leftArrow}
        onClick={() => onChange('prev')}
        className={classNames(style.arrow, style.left, page === 1 ? style.disabled : '')}
      />
      <span>{`Page ${page} ${total === 0 ? '' : 'of ' + total}`}</span>
      <MaskIcon
        src={iconsObj.rightArrow}
        onClick={() => onChange('next')}
        className={classNames(style.arrow, style.right, page <= total ? style.disabled : '')}
      />
    </div>
  );
}

export default TablePagination;
