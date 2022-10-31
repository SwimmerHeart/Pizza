import styles from './Search.module.scss'
import {useCallback, useContext, useRef, useState} from "react";
import {SearchContext} from "../../App";
import debounce from 'lodash.debounce';

export function Search() {
    const [value, setValue] = useState('')
    const {setSearchValue} = useContext(SearchContext)
    const inputRef = useRef()

    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }
    const updateSearchValue = useCallback(
            debounce((str) => {
                setSearchValue(str)
            },500)
        , []
    )
    const onChangeValue = (e) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }
    return (
        <div className={styles.root}>
            <svg enableBackground="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50"
                 width="50px" xmlns="http://www.w3.org/2000/svg" className={styles.icon}
            >
                <rect fill="none" height="50" width="50"/>
                <circle cx="21" cy="20" fill="none" r="16" stroke="#000000" strokeLinecap="round"
                        strokeMiterlimit="10" strokeWidth="2"/>
                <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="32.229" x2="45.5"
                      y1="32.229" y2="45.5"/>
            </svg>
            <input className={styles.input}
                   placeholder={'Поиск пиццы...'}
                   ref={inputRef}
                   value={value}
                   onChange={onChangeValue}/>


            {value && <svg className={styles.closeIcon}
                           onClick={onClickClear}
                           viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                </g>
            </svg>}
        </div>

    )
}