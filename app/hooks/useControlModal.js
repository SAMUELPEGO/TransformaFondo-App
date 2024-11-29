import { useState } from "react";

export default function useControlModal(){
 const [isOpen, setIsOpen] = useState(false);
  const openModalPrompt = () => {
    setIsOpen(true);
  };
  const closeModalPrompt = () => {
    setIsOpen(false);
  };
  return {isOpen,openModalPrompt,closeModalPrompt}
}