import { useState } from 'react';
import type { Character } from '../../API/interfaces';

import ModalItem from './ModalItem';
export interface CardProps {
  item: Character;
}

export default function Card({ item }: CardProps) {
  const [openModal, setOpenModal] = useState(false);
  const { image, name } = item;
  const onOpenModal = () => {
    setOpenModal(true);
    document.body.style.overflow = 'hidden';
  };
  const onCloseModal = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };

  return (
    <>
      <div
        className="flex flex-col items-center text-m bg-blue-200 gap-3 font-bold p-4 hover:scale-105 cursor-pointer w-24 sm:w-64 "
        onClick={onOpenModal}
      >
        <img src={image} alt={name} width={300} height={420} />
        <h3 className="text-sm sm:text-base text-center">{name}</h3>
      </div>

      {openModal && <ModalItem closeModal={onCloseModal} item={item} />}
    </>
  );
}
