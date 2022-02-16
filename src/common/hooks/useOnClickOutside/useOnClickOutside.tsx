import {useEffect} from 'react';
import _castArray from 'lodash/castArray';

function useOnClickOutside(elements: HTMLElement | HTMLElement[], handler: () => void) {
  useEffect(() => {
    function isClickedInsideElement(event: MouseEvent) {
      const elementsAsArray = _castArray(elements);

      return (
        elementsAsArray.length === 0 ||
        elementsAsArray.some((element) => element.contains(event.target as Node))
      );
    }

    const handleOutsideClick = (event: MouseEvent) => {
      // Do nothing if clicking one of the ref elements or their descendent elements
      if (elements && !isClickedInsideElement(event)) {
        handler();
      }
    };

    handler && document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [elements, handler]);
}

export default useOnClickOutside;
