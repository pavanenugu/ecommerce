import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from 'antd';
import { Carousel,Rate } from 'antd';

const Product = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate()

  let { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const fetchProductDetails = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProduct(res);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div>
        <Button onClick={() => {
          navigate(-1);
        }}>Back</Button>
      </div>

      <Carousel className="mt-4">
        {product?.images.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={item}
              style={{
                maxWidth: '100%',
                maxHeight: '50vh',
                objectFit: 'contain',
              }}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
      <div className="flex w-full justify-center font-semibold text-[28px] my-6">{product.title}</div>
      <div className="my-4">{product.description}</div>
      <div className="flex justify-between items-center ">
        <div><span>Brand :</span> {product.brand}</div>
        <div><span>Price :</span> {product.price}$</div>
        <div><span>Rating :</span><Rate value={product.rating} /></div>
        <div><span>Offer :</span>{product.discountPercentage}%</div>
      </div>
      <div className="flex w-full justify-center mt-6" onClick={() => {
        let tempItems = cartItems;
        setCartItems([...tempItems, product])
      }}><Button>Add to cart</Button></div>


    </div>

  );
};

export default Product;
