export async function api(subDirectory) {
  try {
    const res = await fetch(
      `https://wheelcollectors.com/collections/${subDirectory}/products.json?limit=1`
    )

    const data = await res.json()

    const availableProducts = data.products.filter(
      (product) => product.variants[0].available === true
    )

    return availableProducts
  } catch (error) {
    console.error("Error fetching data:", error)
    return [] // Important to avoid undefined returns
  }
}
