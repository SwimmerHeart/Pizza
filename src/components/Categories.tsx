import React from "react";

type CategoriesProps = {
    categoryId : number
    onChangeCategoryId : (i:number)=> void
}
export const Categories:React.FC<CategoriesProps> = ({categoryId, onChangeCategoryId}) => {
    const categories:string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => <li key={index}
                                                     className={categoryId === index ? 'active' : ''}
                                                     onClick={() => {
                                                         onChangeCategoryId(index)
                                                     }}
                >{item}</li>)}
            </ul>
        </div>
    )
}