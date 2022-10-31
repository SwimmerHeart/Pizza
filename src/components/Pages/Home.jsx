import {Categories} from "../Categories";
import {Sort} from "../Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import {PizzaBlock} from "../PizzaBlock";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {SearchContext} from "../../App";
import { useSelector, useDispatch } from 'react-redux'
import {setCategoryId, setCurrentPage} from "../../redux/slices/filterSlice";
import Pagination from "../Pagination";


function Home() {
    const {categoryId, sortType,currentPage } = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const {searchValue} = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [currentPage, setCurrentPage] = useState(1)

    const basicUrl = 'https://6357e538c26aac906f3577a5.mockapi.io/items'

    useEffect(()=>{
        setIsLoading(true)
        const sortBy = sortType.sortProperty.replace('-','')
        const order = sortType.sortProperty.includes('-') ? `desc` : `asc`
        const search = searchValue ? `${searchValue}` : ''

         axios.get(`${basicUrl}?page=${currentPage}&limit=4${categoryId.categoryId > 0
             ? `category=${categoryId}` : '' }&sortBy=${sortBy}&order=${order}&search=${search}`)
             .then(response=>{
                 setItems(response.data)
                 setIsLoading(false)
             })
        window.scroll(0,0)
    },[categoryId,sortType, searchValue, currentPage])

    const onChangeCategoryId = (id)=>{
        dispatch(setCategoryId(id))
    }
    const onChangePage = (number)=>{
        dispatch(setCurrentPage(number))
    }
    // const pizzas = items.filter(item=>item.title.toLowerCase().includes(searchValue.toLowerCase()))
    // поиск по статичному объекту

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategoryId={onChangeCategoryId}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(6)].map((_,index)=><Skeleton key={index}/>)
                    : items.map((pizza)=><PizzaBlock key={pizza.id} {...pizza}/>)
                }
            </div>
            <Pagination onChangePage={onChangePage} currentPage={currentPage}/>
        </div>
    )
}
export default Home