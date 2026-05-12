import '@/App.css'
import styles from './button.module.css'

import { useNavigate } from 'react-router-dom';

const Btn = ({ name, value, active, onClick, size }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();

    if (value) {
      navigate(value);
    }
  };

  return (
    <button
      className={`
        ${styles.btn}
        ${active ? styles.active : ''}
        ${size === 'big' ? styles.big : ''}
      `}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Btn;