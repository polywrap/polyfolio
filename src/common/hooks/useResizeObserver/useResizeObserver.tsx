import {RefObject, useCallback, useLayoutEffect, useState} from 'react';
import _isArray from 'lodash/isArray';

export default function useResizeObserver<T extends HTMLElement>(ref: RefObject<T>) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!_isArray(entries)) {
      return;
    }

    const entry = entries[0];
    setWidth(entry.borderBoxSize[0].inlineSize);
    setHeight(entry.borderBoxSize[0].blockSize);
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    let RO = new ResizeObserver((entries: ResizeObserverEntry[]) => handleResize(entries));
    RO.observe(ref.current);

    return () => {
      RO.disconnect();
      RO = null;
    };
  }, [ref, handleResize]);

  return {width, height};
}
