const fetchCategoryWiseProduct = async(category)=>{
    const res = await fetch(`http://localhost:5000/api/product/getcategorywiseproduct?category=${category}`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            category: category
        })
    })
    const data = await res.json()
    return data
}
export default fetchCategoryWiseProduct