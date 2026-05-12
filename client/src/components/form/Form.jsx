import '@/App.css'
import styles from './form.module.css'

const Form = ({ name, type, placeholder }) => {

    return (
        <div className={styles.form}>
            <label>{name}</label>
            <input name={name} type={type} placeholder={placeholder}></input>
        </div>
    );
};

export default Form;