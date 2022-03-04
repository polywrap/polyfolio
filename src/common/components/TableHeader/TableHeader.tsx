import React, { useState, useCallback } from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './TableHeader.module.scss';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import Input from 'common/components/Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import TablePagination from '../TablePagination/TablePagination';
import { filteredDropdown } from 'utils/filteredDropdown';
import { dropdownItems } from './TableHeader.config';

function TableHeader() {
  const total = 2
  const theme = useTheme()
  const [value, setValue] = useState<string>()
  const [page, setPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState(dropdownItems[0]);

  const onChangeCurrency = (item) => {
    setCurrency(item);
    setIsOpen(false);
  };

  const onPageChange = useCallback((nextPage: number) => {
    setPage(nextPage)
  }, [setPage])

  return (
    <div className={classNames(style[theme], style.controlls)}>
      <div>
        <Input
          value={value}
          onChange={setValue}
          icon={iconsObj.search}
          wrapperClassName={classNames(style.input)}
          placeholder='Search by date or event type (ex: send)'
        />
      </div>
      <div className={style.right}>
        <div className={style.networks}>
          <Dropdown
            array={filteredDropdown(dropdownItems, currency?.id)}
            onСhangeСurrency={onChangeCurrency}
            className={style.dropdownIcon}
            setIsOpen={setIsOpen}
            current={currency}
            isOpen={isOpen}
          />
        </div>
        <div className={style.pagination}>
          <TablePagination page={page} total={total} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  )
}

export default TableHeader
