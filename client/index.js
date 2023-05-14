async function getProductsTable(){
    const response = await fetch ('getProductsTable')
    let obj;
    let table;
    if (response.ok){
        obj = await response.json()
        console.log(obj)
    } else {
        obj = [{msg : "failed to load table"}]
        console.log(obj)
    }
}
