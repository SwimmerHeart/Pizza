import styles from './Errors.module.scss'
import React from "react";

const ErrorsBlock:React.FC = () => {
    return (
        <div className={styles.root} >
            <h1>Ничего не найдено :(</h1>
            <p>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
        </div>
    )
}
export default ErrorsBlock