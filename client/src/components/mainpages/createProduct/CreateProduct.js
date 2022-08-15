import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utlis/loading/Loading";
import { useHistory, useParams } from "react-router-dom";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css"

// import moment from "moment";

// import AlgoliaPlaces from 'algolia-places-react'

// const config ={
//     appId : process.env.REACT_APP_ALGOLIA_APP_ID,
//     apiKey:process.env.REACT_APP_ALGOLIA_API_KEY,
//     language:"en",
//     countries:["au"],
// };

const initialState = {
  product_id: "",
  tag: "",
  title: "",
  price: "",
  pricemk: "",
  description: "",
  content: "",
  location: "",
  startDate: "",
  endDate: "",
  foodtype: "",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [foodtypes] = state.foodtypesAPI.foodtypes;
  const [images, setImages] = useState(false);
  const [imageData, setImageData] = useState({});
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;
  const getProduct = async (id) => {
    const response = await axios.get(`/api/product/${id}`);
    setProduct(response.data.product);
    setImageData(response.data.product.images);
    setImages(true);
  };
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      getProduct(param.id);
    } else {
      setOnEdit(false);
      setProduct(initialState);
    }
  }, [param.id]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(true);
      setImageData(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: imageData.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(product);
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");
      // console.log(images)

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images: imageData },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images: imageData },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? imageData.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>
      

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="pricemk">MRP</label>
          <input
            type="number"
            name="pricemk"
            id="pricemk"
            value={product.pricemk == null ? "" : product.pricemk}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <label htmlFor="foodtypes">Food Type: </label>
          <select
            name="foodtype"
            value={product.foodtype}
            onChange={handleChangeInput}
          >
            <option value="">Please select a Type</option>
            
              <option value={"veg"}>
               Vegeterian
              </option>
              <option value={"non-veg"}>
              Non Vegeterian
              </option>
            
          </select>
        </div>

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
