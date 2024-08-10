import React, { useEffect, useState } from 'react';
import "./home.css";
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import star from "../../assets/images/star.svg"
import Nav from '../nav/Nav';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios("products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className='home'>
      <div className="container">
        <div className="home__wrapper">
          <Nav/>
          <div className="products__cards">
            {products.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product__link">
                <div className='product'>
                  <div className='product__img'>
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className='product__info'>
                    <h2>{product.title.slice(0, 16)}...</h2>
                    <p>{product.description.slice(0, 30)}...</p>
                    <div className="product__price">${product.price}</div>
                    <div className="product__rating">
                      <span className="product__rate"><img className='star' src={star} alt="" /> {product.rating.rate}</span>
                      <span className="product__reviews">({product.rating.count} reviews)</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
