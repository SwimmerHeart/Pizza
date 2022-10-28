
export function Categories({categoryId, setCategoryId}) {

    const categories = ['Все', 'Мясные','Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return(
        <div className="categories">
            <ul>
                {categories.map((item, index)=><li key={index}
                                                   className={categoryId === index ? 'active' : ''}
                                                   onClick={()=>{setCategoryId(index)}}
                >{item}</li>)}
            </ul>
        </div>
    )
}