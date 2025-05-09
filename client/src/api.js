export async function api(subDirectory) {
    let allProducts = []
    let page = 1
    let keepFetching = true

    while (keepFetching) {
        const response = await fetch(`https://wheelcollectors.com/collections/${subDirectory}/products.json?limit=250&page=${page}`)
        const data = await response.json()
        
        if (data.products.length > 0) {
            allProducts.push(...data.products)
            page++
        } else {
            keepFetching = false
        }
    }

    // Filter available products - have to do this manually since CORS is enabled on the website
    let availableProducts = allProducts.filter(product => product.variants[0].available === true)
    return availableProducts
}
