import '@/App.css'
import styles from './pageHeader.module.css'

const PageHeader = ({ title, description}) => {

  return (
    <div className='pageHeader'>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
    </div>
  );
};

export default PageHeader;