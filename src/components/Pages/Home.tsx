import {Categories} from "../Categories";
import Sort from "../Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import {PizzaBlock} from "../PizzaBlock";
import React, {useEffect} from "react";
import {useSelector} from 'react-redux'
import {setCategoryId, setCurrentPage} from "../../redux/slices/filterSlice";
import Pagination from "../Pagination";
import {fetchPizzas, PizzaItem} from "../../redux/slices/pizzaSlice";
import {RootState, useAppDispatch} from "../../redux/store";


const Home: React.FC = () => {
    const {categoryId, sortType, currentPage, searchValue} = useSelector((state: RootState) => state.filter)
    const {items, status} = useSelector((state: RootState) => state.pizzas)
    const dispatch = useAppDispatch()

    const basicUrl = `https://6357e538c26aac906f3577a5.mockapi.io/items`

    const getPizzas = () => {
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? `desc` : `asc`
        const search = searchValue ? `${searchValue}` : ''
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        dispatch(fetchPizzas({sortBy, order, search, category, currentPage: String(currentPage), basicUrl}))
    }
    useEffect(() => {
        getPizzas()
        window.scroll(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const onChangeCategoryId = (id: number) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }

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
                        : items.map((pizza: PizzaItem) => <PizzaBlock key={pizza.id} {...pizza}/>)
                    }
                </div>}
            <Pagination onChangePage={onChangePage} currentPage={currentPage}/>
        </div>
    )
}

export default Home