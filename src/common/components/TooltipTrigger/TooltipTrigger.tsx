import React, {ReactNode} from 'react';
import {usePopperTooltip} from 'react-popper-tooltip';

import styles from './TooltipTrigger.module.scss';

import classNames from 'classnames';
import {Placement} from '@popperjs/core';

import useTheme from 'common/hooks/useTheme/useTheme';

function TooltipTrigger({
  isOpen,
  popper,
  children,
  placement = 'bottom',
}: {
  isOpen: boolean;
  popper: ReactNode;
  children: ReactNode;
  placement?: Placement;
}) {
  const theme = useTheme();
  const {getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible} = usePopperTooltip({
    trigger: 'click',
    closeOnOutsideClick: false,
    visible: isOpen,
    placement: placement,
    offset: [10, 10],
    interactive: false,
  });

  return (
    <div className={classNames(styles.common_tooltip_trigger, styles[theme])}>
      <div className={styles.common_tooltip_trigger} ref={setTriggerRef}>
        {children}
      </div>

      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps({className: styles.tooltip_container})}>
          {popper}
          <div {...getArrowProps({className: styles.tooltip_arrow})} />
        </div>
      )}
    </div>
  );
}

export default TooltipTrigger;
