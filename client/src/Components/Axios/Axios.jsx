import axios from "axios"

const API = axios.create({
    baseURL: "/api/v1/product/get-product"
})



export default API