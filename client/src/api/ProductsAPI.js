import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [Landing_Products, setLanding_Products] = useState([]);
  const [Category_Products, setCategory_Products] = useState([]);
  const [categorywise_products, setCatwiseProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]); // to store products with offer
  const [landing_page, setLanding_page] = useState(1);
  const [category_page, setCategory_page] = useState(1);
  const [offer_page, setOffer_page] = useState(1);
  const [landing_sort, setLanding_sort] = useState("");
  const [categry_sort, setCategory_sort] = useState("");
  const [callback, setCallback] = useState(false);
  const [related, setRelated] = useState(false);
  const [category_flag, setCategoryFlag] = useState(false);
  const [category, setCategory] = useState("");
  const [offerwise, setOfferwise] = useState(""); //to avoid unecessary api calls

  const [loading, setLoading] = useState(false);
  const [landing_result, setLandingResult] = useState(0);
  const [offer_result, setOfferResult] = useState(0);
  const [category_result, setCategoryResult] = useState(0);

  

  const getLandingProducts = async () => {
    setLoading(true);
    const res = await axios.get(
      `/api/products?page=${landing_page * 1}&sort=${landing_sort}`
    );
    if (landing_page === 1) {
      setLanding_Products(res.data.products);
    } else {
      setLanding_Products((Landing_Products) => [
        ...Landing_Products,
        ...res.data.products,
      ]);
    }
    setLandingResult(res.data.available);
    setLoading(false);
  };
  useEffect(() => {
    getLandingProducts();
  }, [landing_page, landing_sort]); // this will triger only once and also when the number of landing_page is altered

  const getProductByCategory = async () => {
    if (category !== "" && !related && category_flag) {
      setLoading(true);

      const res = await axios.get(
        `/api/products?page=${
          category_page * 1
        }&category=${category}&sort=${categry_sort}`
      );
      category_page === 1
        ? setCategory_Products(res.data.products)
        : setCategory_Products((Category_Products) => [
            ...Category_Products,
            ...res.data.products,
          ]);
      setCategoryResult(res.data.available);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductByCategory();
  }, [category_flag, category, category_page, categry_sort]);

  //below function is for the related products
  const loadRelatedProducts = async () => {
    if (category !== "" && related) {
      setLoading(true);
      const res = await axios.get(`/api/products/${category}`);

      if (res.statusText === "OK") setCatwiseProducts(res.data.products);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRelatedProducts();
  }, [category, related]);

  //below function is for loading products with offer
  const getOffer = async () => {
    if (offerwise !== "") {
      setLoading(true);
      const res = await axios.get(
        `/api/offer/${parseInt(offerwise)}?page=${offer_page}`
      );
      if (res.statusText === "OK") {
        if (offer_page === 1) {
          setOfferProducts(res.data.offered_products[0].data);
        } else {
          setOfferProducts((offerProducts) => [
            ...offerProducts,
            ...res.data.offered_products[0].data,
          ]);
        }
        setOfferResult(
          res.data.offered_products[0].metadata[0].total - offer_page * 15
        );
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getOffer();
  }, [offerwise, offer_page]);

  return {
    LandingProducts: [Landing_Products, setLanding_Products],
    CategoryProducts: [Category_Products, setCategory_Products],
    CategorywiseProducts: [categorywise_products, setCatwiseProducts],
    OfferProducts: [offerProducts, setOfferProducts],
    callback: [callback, setCallback],
    LandingPage: [landing_page, setLanding_page],
    CategoryPage: [category_page, setCategory_page],
    OfferPage: [offer_page, setOffer_page],
    LandingSort: [landing_sort, setLanding_sort],
    CategorySort: [categry_sort, setCategory_sort],
    Related: [related, setRelated],
    CategoryFlag: [category_flag, setCategoryFlag],
    Category: [category, setCategory],
    Offerwise: [offerwise, setOfferwise],
    Loading: [loading, setLoading],
    LandingResult: [landing_result, setLandingResult],
    CategoryResult: [category_result, setCategoryResult],
    OfferResult: [offer_result, setOfferResult],
  };
}
export default ProductsAPI;
