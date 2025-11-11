// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:5000",
// });
// export const fetchProducts = async () => {
//     const res = await api.get("/products");
//     return res.data;
// };



const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    console.log(data);
    return data;
};
export default fetchProducts;