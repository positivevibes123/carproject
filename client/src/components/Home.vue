<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { api } from '../api.js'

let products = ref([])

onMounted(async () => {
    let data = await api("hot-wheels-premium-collection")
    //console.log(data)

    products.value = data.map((item) => {
        let name = item.title.split("*")[0]
        let brand = item.title.split("*")[2]
        let link = `https://wheelcollectors.com/products/${item.handle}`
        
        return {
            brand: brand,
            name: name,
            price: parseFloat(item.variants[0].price),
            link: link
        }
    })
})
</script>

<template>
    <div class="container">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <td>{{ product.brand }}</td>
                    <td>{{ product.name }}</td>
                    <td>${{ product.price.toFixed(2) }}</td>
                    <td><a :href="product.link" target="_blank">View Product</a></td>
                </tr>
            </tbody>          
        </table>
    </div>
</template>