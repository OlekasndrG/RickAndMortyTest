import { useState } from 'react';
import type { Character } from '../API/interfaces';
import styles from './DashboardItem.module.css';
import ModalItem from './ModalItem';
export interface CardProps {
  item: Character;
}

export default function Card({ item }: CardProps) {
  const [openModal, setOpenModal] = useState(false);
  const {
    image,

    name,
  } = item;
  const onItemClick = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className={styles.container} onClick={onItemClick}>
        <img src={image} alt={name} width={300} height={420} />
        <h3>{name}</h3>
      </div>

      {openModal && (
        <ModalItem closeModal={() => setOpenModal(false)} item={item} />
      )}
    </>
  );
}
