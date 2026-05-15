import '@/App.css'
import styles from './questionCard.module.css'

import Btn from '@/components/button/Btn';

const QuestionCard = ({
  number,
  title,
  options,
  selected,
  onSelect,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        {number}. {title}
      </div>

      <div className={styles.optionWrapper}>
        {options.map((option) => (
          <Btn
            key={option}
            type="radio"
            name={option}
            active={selected === option}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;