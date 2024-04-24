import { useEffect } from "react";
export default function useOutsideClick(ref, cb, expetaionId) {
  useEffect(() => {
    function handleClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== expetaionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, expetaionId, cb]);
}
