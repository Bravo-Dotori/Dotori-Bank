import '@/App.css'
import styles from './button.module.css'

import { useNavigate } from 'react-router-dom';

const SmallBtn = ({ name, value, active, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();
    navigate(value);
  };

  return (
    <button
      className={`${styles.btn} ${active ? styles.active : ''}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default SmallBtn;