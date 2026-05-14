import '@/App.css'
import styles from './form.module.css'

const Form = ({
    name,
    type,
    placeholder,
    onChange,
    unit,
}) => {

    return (
        <div className={styles.form}>
            <label>{name}</label>

            <div className={styles.inputWrapper}>
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                />

                {unit && (
                    <div className={styles.unit}>
                        {unit}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Form;