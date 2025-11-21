
const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    console.log(data);
    return data;
};
export default fetchProducts;



