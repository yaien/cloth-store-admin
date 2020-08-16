import { useState } from "react";

export function useToggler() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return {
    isOpen,
    toggle,
  };
}

export default useToggler;
