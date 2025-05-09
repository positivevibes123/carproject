// https://stackoverflow.com/questions/69932559/how-do-i-fix-or-work-around-this-memory-leak-in-fetch

/*export async function api(subDirectory) {
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
}*/

export async function api(subDirectory) {
  try {
    let availableProducts = [];
    let data = {}

      const res = await fetch(
        `https://wheelcollectors.com/collections/${subDirectory}/products.json?limit=250`
      )

      data = await res.json()
      availableProducts.push(...data.products)

    // Filter available products - have to do this manually since CORS is enabled on the website
    availableProducts = availableProducts.filter(
      (product) => product.variants[0].available === true
    )
    return availableProducts;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
