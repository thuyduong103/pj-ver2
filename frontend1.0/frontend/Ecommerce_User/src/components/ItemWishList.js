/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import watch2 from "../images/watch-1.avif";
import wish from "../images/wish.svg";
import heartSvg from "../images/heart.png";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { base_url, base_url_image } from "../utils/axiosConfig";


const ItemWishList = ({ item, index, location, grid, addToWish }) => {

  const [heart, setHeart] = useState(false)
  const totalRating = item?.totalrating || 0; // fallback rating if undefined
  const description = item?.description || "No description available"; // fallback description
  const price = item?.price || 0; // fallback price if undefined
  const brand = item?.brand?.title || "Unknown Brand"; // fallback brand if undefined
  const title = item?.title || "Untitled"; // fallback title if undefined



  return (
    <div
      key={index}
      style={{ opacity: item.quantity === 0 ? 0.7 : 1, zIndex: 1 }}
      className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"
        }`}
    >
      <div className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent">
            <img
              onClick={() => {
                addToWish(item?._id)
                setHeart(!heart)
              }}
              src={heart ? heartSvg : wish}
              alt="wishlist"
              style={{ width: 30, height: 30 }}
            />
          </button>


        </div>

        {item.quantity === 0 && <div style={{ position: 'absolute', right: 5, top: 50, background: '#f5f5f7', padding: 5, borderRadius: 10 }}>
          <span>Hết hàng</span>
        </div>}
        {/* Bọc ảnh và tên trong Link */}
        <Link
          to={`/product/${item?._id}`}
          className="text-decoration-none text-dark"
        >
          <div className="product-image" style={{ position: 'relative' }}>
            <img
              src={`${base_url_image}${item?.images}`}
              className="img-fluid mx-auto"
              alt="product image"
              width={160}
            />


          </div>
          <div className="product-details">
            <h6 className="brand">{brand}</h6>
            <h5 className="product-title">{title}</h5>
          </div>
        </Link>
        {/* Các thông tin khác */}
        <div className="product-details">
          <ReactStars
            count={5}
            size={24}
            value={totalRating}
            edit={false}
            activeColor="#ffd700"
          />
          <p
            className={`description ${grid === 12 ? "d-block" : "d-none"
              }`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <p className="price">
          {Math.round(Number(price || 0))?.toLocaleString()} VND</p>
          {/* <p className="price">{price} VND</p> */}
        </div>
      </div>
    </div>
  );
}

export default ItemWishList