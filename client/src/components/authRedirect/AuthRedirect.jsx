import '@/App.css'
import styles from './authRedirect.module.css'

import { Link } from 'react-router-dom';

const AuthRedirect = ({ text, linkText, to }) => {

    return (
        <div className={styles.text}>
            {text}

            <Link to={to} className={styles.link}>
                {linkText}
            </Link>
        </div>
    );
};

export default AuthRedirect;