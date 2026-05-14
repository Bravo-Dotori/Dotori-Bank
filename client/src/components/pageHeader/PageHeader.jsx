import '@/App.css'
import styles from './pageHeader.module.css'

const PageHeader = ({
  title,
  description,
  big,
  left,
}) => {
  return (
    <div
      className={`
        ${styles.pageHeader}
        ${big ? styles.big : ''}
        ${left ? styles.left : ''}
      `}
    >
      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
};

export default PageHeader;