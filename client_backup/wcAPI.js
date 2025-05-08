export async function api(subDirectory) {
    const response = await fetch(`https://wheelcollectors.com/collections/${subDirectory}/products.json?limit=999`)
    const data = await response.json()
    //return data.products

    // Filter out products that are not available
    return data.products.filter(product => product.variants[0].available === true)
}
