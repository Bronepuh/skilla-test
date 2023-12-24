import React, { useEffect } from "react";

interface IClickOutsideProps {
  ref: React.MutableRefObject<any>,
  handleClickOutside: () => void
}
export const useClickOutside = ({ref, handleClickOutside}: IClickOutsideProps) => {
  useEffect(() => {
    function onOutsideClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        handleClickOutside()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [ref]);
}
