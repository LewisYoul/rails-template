import * as React from 'react'

const clickOutside = (ref, whenClickedOutsideOf) => {
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("You clicked outside of me!");
        whenClickedOutsideOf()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref])
}

export default clickOutside;