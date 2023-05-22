



// import Product from './Product';
// import { useEffect, useState } from 'react';
// // import ProductsData from './data.js';
// import axios from 'axios';
// // axios.defaults.baseURL = 'http://localhost:8080';


// // Here we set authorization
// axios.defaults.headers.common['Authorization'] =
//   'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNiZXJtaW5naGFtaEBjaHJvbi5jb20iLCJpYXQiOjE2ODQ2NTIxNzJ9.mN_G9egckDoSF3sCk-gEMRXUQJS8oDBim4EkzdNTBmGGeXOTfTgZDl8R8_zQ5vx37U3UTbOb6WbxVIlMI9B1zGJSTu7ph_RF6icsAd0TIgLoRzxT8ECNslq-VPHGBniLkzSBsvBXH9OPk74ODM70dDHWEz0XwuKsFzRHoUSt62R3veKiBSB4ek0HhYfjdLYriBUY_gCTT_g7n--hMfADtw-DGXYlWZH10wuoLqsDmnOCZoFcTsr8uB20Dhb16-fTeFx5w1ruAvKUIp2OGfb-vzmWfehd13sXynKZDQ7V4Kk257QVlm5rop5TnLVthyuaVouNQO938v6wzxwkUltsjA';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);

//   const getProducts = async () => {
//     const res = await axios.get('/products');
//     console.log(res.data);
//     setProducts(res.data);
//     setTotal(res.data.length)
//   };

//   const handleClick = async (id) => {
//     const res = await axios.delete(`/products/${id}`);
//     console.log(res.data);
//     if (res.data._id) {
//       setProducts(products.filter((p) => p._id !== res.data._id));
//     }
//     // setProducts(res.data);
//   };
//   const handlePage = async (page) => {
//     const res = await axios.get('/products?page='+page);
//     console.log(res.data);
//     setProducts(res.data);
//   };

//   const handleSort = async (e) => {
//     const field = e.target.value.split('.');
//     const res = await axios.get(`/products?sort=${field[0]}&order=${field[1]}`);
//     console.log(res.data);
//     setProducts(res.data);
//   };


//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <>
//      <select onChange={handleSort}>
//       <option value="price.desc">Price High to Low</option>
//       <option value="price.asc">Price Low to High</option>
//       <option value="rating.desc">Rating High to Low</option>
//       <option value="rating.asc">Rating Low to High</option>


//      </select>



//       {Array(Math.ceil(total / 4))
//         .fill(0)
//         .map((e, i) => (
//           <button onClick={() => handlePage(i + 1)}>{i + 1}</button>
//         ))}
//       {products.map((product, index) => (
//         <Product {...product} key={index} handleClick={handleClick}></Product>
//       ))}
//     </>
//   );
// };

// export default ProductList;











import React from 'react'
import { useEffect, useState } from "react";
// import ProductsData from "./data.js";
import Product from "./Product.js"
import axios from 'axios';



axios.defaults.baseURL = 'http://localhost:8080';


// Here we set authorization key for reactjs 
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFlYXRvY2tqQHBzdS5lZHUiLCJpYXQiOjE2ODQ3Nzc0ODd9.dbQpG8EP5O39r_XFsbQiW8aras-7qwd2gJaUMoinP2P3Q0FmgtaX5ZRpPXmmquoVYhPQgYPWhZUnLSFoa2U4Oee7UOh67iVRHD3Bc-MJ_xf0WLwY6hCvDiGkxX6tHrgmiszx4davIglkGIMT3wBR6sg8Ea2XY4RQK7jIQ8lehcUAFVk0u3IdFZIvACs_mxf-J6mnXhNADVOKAED1Hixk0mCc5qUfQ0mnvbt0jRoZGCfRJm7SM9qp6vShgQ9fgmx15rje9CNwGSTG8qti-J1VEeJbiZoiTHRhH2ETUOcWT9O3-mQd9N8M252YGuK1OCELlRg8qJ2dRBQI5sh5comWPQ';



const ProductList = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0);


  const getProducts = async () => {
    const res = await axios.get('http://localhost:8080/products')  // api call
    // OR
    // const res = await axios.get('/products')  // api call
    console.log(res.data);
    setProducts(res.data);
    // setTotal(res.data.length)
  }


  const handleSort = async (e) => {
    const field = e.target.value.split('.');
    const res = await axios.get(`/products?sort=${field[0]}&order=${field[1]}`);
    console.log(res.data);
    setProducts(res.data);
  };

  //  http://localhost:8080/products?sort=rating&order=desc&limit=3

  const handlePage = async (page) => {
    const res = await axios.get('/products?page=' + page);
    console.log(res.data);
    setProducts(res.data);
  };

  const handleClick = async (id) => {
    const res = await axios.delete(`http://localhost:8080/products/${id}`);
    //OR
    // const res = await axios.delete(`/products'/${id}`);
    console.log(res.data);

    //isse data fastly change ho jaayega delete karte hi screen se remove ho jaayega
    if (res.data._id) {
      setProducts(products.filter(p => p._id !== res.data._id));
    }
    // setProducts(res.data);
  };


  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      {products.map((product, index) => (
        <Product {...product}
          key={index}
          handleClick={handleClick}>
        </Product>
      ))}

      {/* to handle sorting  in reactjs or frontend */}
      <select onChange={handleSort}>
        <option value="price.desc">Price High to Low</option>
        <option value="price.asc">Price Low to High</option>
        <option value="rating.desc">Rating High to Low</option>
        <option value="rating.asc">Rating Low to High</option>
      </select>



      {/* {Array(Math.ceil(total / 4))
                    .fill(0)
                    .map((e, i) => (
                      <button onClick={() => handlePage(i + 1)}>{i + 1}</button>
                    ))} */}





    </>
  );
};

export default ProductList;














