import {Categories} from "../Categories";
import Sort, {list} from "../Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import {PizzaBlock} from "../PizzaBlock";
import React, {useEffect, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {setCategoryId, setCurrentPage, setFilters} from "../../redux/slices/filterSlice";
import Pagination from "../Pagination";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../../redux/slices/pizzaSlice";

type fetchPizzasProps = {
    sortBy: string
    order: string
    search: string
    category: string
    currentPage: number
    basicUrl: string
}

const Home: React.FC = () => {
    const {categoryId, sortType, currentPage, searchValue} = useSelector(state =>//@ts-ignore
        state.filter)
    const {items, status} = useSelector(state => //@ts-ignore
        state.pizzas)
    const dispatch = useDispatch()
    // const isSearchRef = useRef(false)
    const isMounted = useRef(false)
    const navigate = useNavigate()

    const basicUrl = `https://6357e538c26aac906f3577a5.mockapi.io/items`

    const getPizzas = () => {
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? `desc` : `asc`
        const search = searchValue ? `${searchValue}` : ''
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        dispatch(//@ts-ignore
            fetchPizzas({sortBy, order, search, category, currentPage, basicUrl}))
    }
    useEffect(() => {
        if (isMounted.current) {
            const params = {
                currentPage,
                categoryId: categoryId > 0 ? categoryId : null,
                sortType: sortType.sortProperty
            }
            // const queryString = qs.stringify({
            //     currentPage,
            //     categoryId : categoryId > 0 ? categoryId : null,
            //     sortType: sortType.sortProperty
            // })
            // navigate(`?${queryString}`)
            const queryString = qs.stringify(params, {skipNulls: true})
            navigate(`?${queryString}`)
        }
        isMounted.current = true
        // console.log('закидываем параметры в get строку', 'isMounted.current', isMounted.current)
    }, [categoryId, sortType, searchValue, currentPage])

    useEffect(() => {
        if (window.location.search) {
            // if (!isSearchRef.current){
            // fetchPizzas()
            getPizzas()
        }
        // isSearchRef.current = false
        window.scroll(0, 0)
        // console.log('dispatch(fetchPizzas)', 'isSearchRef.current')
    }, [categoryId, sortType, searchValue, currentPage])

    useEffect(() => {
        if (window.location.search) {
            let params = qs.parse(window.location.search.slice(1))
            const sort = list.find(obj => obj.sortProperty === params.sortType)
            dispatch(setFilters({
                ...params,
                sort
            }))
        }
        // isSearchRef.current = true
        getPizzas()
        // console.log('закидываем данные в redux setFilters', 'isSearchRef')
    }, [])

    const onChangeCategoryId = (id: number) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }
    // const pizzas = items.filter(item=>item.title.toLowerCase().includes(searchValue.toLowerCase()))
    // поиск по статичному объекту

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategoryId={onChangeCategoryId}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? <div className="content__error-info">
                    <h2>Произошла ошибка</h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div> :
                <div className="content__items">
                    {status === 'loading' ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items.map((pizza:any) => <PizzaBlock key={pizza.id} {...pizza}/>)
                    }
                </div>}
            <Pagination onChangePage={onChangePage} currentPage={currentPage}/>
        </div>
    )
}

export default Home