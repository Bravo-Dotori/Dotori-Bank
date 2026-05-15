import { useNavigate } from 'react-router-dom';

import '@/App.css'
import styles from './button.module.css'

const Btn = ({
  name,
  value,
  active,
  disabled,
  onClick,
  size,
  type,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();

    if (value) {
      navigate(value);
    }
  };

  if (type === 'radio') {
    return (
      <label
        className={`
          ${styles.radioBtn}
          ${active ? styles.active : ''}
        `}
      >
        <input
          type="radio"
          checked={active}
          onChange={onClick}
          className={styles.radioInput}
        />

        {name}
      </label>
    );
  }

  return (
    <button
      className={`
    ${styles.btn}
    ${active && !disabled ? styles.active : ''}
    ${disabled ? styles.disabled : ''}
    ${size === 'big' ? styles.big : ''}
    ${size === 'middle' ? styles.middle : ''}
  `}
      onClick={handleClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Btn;