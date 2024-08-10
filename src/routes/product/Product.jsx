import React, { useEffect, useState } from 'react'
import "./product.css"
import { useParams} from 'react-router-dom'
import axios from '../../api/axios'
import star from "../../assets/images/star.svg"
import Nav from '../nav/Nav'

const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios(`products/${id}`)
        .then(responce => setProduct(responce.data))
    }, [])
    console.log(product)
    return (
        <>
        <Nav/>
        {
            product && (
                
                <div className='product__profile'>
                    <div className='product__image'>
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className='product__information'>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <div className="product__prices">${product.price}</div>
                        <div className="product__ratings">
                            <span className="product__rates"><img className='star' src={star} alt="" /> {product.rating.rate}</span>
                            <span className="product__review">({product.rating.count} reviews)</span>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Product