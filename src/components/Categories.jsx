
export function Categories({categoryId, onChangeCategoryId}) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

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