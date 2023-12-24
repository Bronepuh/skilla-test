import React, { useEffect } from 'react';

type HookParams = {
  /** ref-компонента обертки */
  ref: React.RefObject<Element>;
  /** функция-колбек, выполняющаяся при клике во вне */
  callbackFunc: () => void;
};

export default function (params: HookParams) {
  useEffect(() => {
    function handleClose(this: Document, event: MouseEvent) {
      if (params.ref.current && !params.ref.current.contains(event.target as Node)) {
        event.stopPropagation();
        params.callbackFunc();
      }
    }

    document.addEventListener('mousedown', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, [params]);
}
