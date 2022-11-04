import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function FullPizza() {
    const [pizza, setPizza] = useState()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchPizza() {
            try{const {data} = await axios.get(`https://6357e538c26aac906f3577a5.mockapi.io/items/${id}`)
                setPizza(data)
            }
            catch {
                console.log('ошибка получения данных пиццы')
                navigate('/')
            }
           }
        fetchPizza()
    },[])
    if (!pizza){
        return (
            <p style={{textAlign:'center'}}>Загрузка...</p>
        )
    }
    return (
        <div className="container" style={{textAlign:'center'}}>
            <img src={pizza.imageUrl} alt="pizza-img"/>
            <h2>{pizza.title}</h2>
            <h4>от {pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza