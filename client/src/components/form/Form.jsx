import '@/App.css'
import styles from './form.module.css'

const Form = ({
    name,
    type,
    placeholder,
    onChange,
    unit,
    value,
    error
}) => {

    return (
        <>
            <div className={styles.form}>
                <label>{name}</label>

                <div className={styles.inputWrapper}>
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                    />

                    {unit && (
                        <div className={styles.unit}>
                            {unit}
                        </div>
                    )}

                    <div className={styles.error}>
                        {error}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;