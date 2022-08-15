import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { useHistory } from "react-router-dom";
import Search from "../../headers/icon/search.svg";

import { isEmpty } from "../../mainpages/utlis/validation/Validation";

// const initialState = {
//     search: '',

//     err: '',

//     success: ''
// }

function Filters({ details }) {
  const state = useContext(GlobalState);
  // const [categories] = state.categoriesAPI.categories;
  const [foodtypes] = state.foodtypesAPI.foodtypes;

  const [category, setCategory] = state.productsAPI.Category;
  const [landing_sort, setLanding_Sort] = state.productsAPI.LandingSort;
  const [category_sort, setCategory_sort] = state.productsAPI.CategorySort;
  const [landing_page, setLanding_Page] = state.productsAPI.LandingPage;
  const [category_page, setCategory_page] = state.productsAPI.CategoryPage;
  const [offer_page, setOffer_page] = state.productsAPI.OfferPage;
  // const [search, setSearch] = state.productsAPI.search
  // const [startDate,setStartDate] =state.productsAPI.sort
  let sort, setSort, setPage;
  const sorts = {
    Landing: landing_sort,
    Category: category_sort,
  };
  const sortSetMethods = {
    Landing: setLanding_Sort,
    Category: setCategory_sort,
  };
  const setPageMethods = {
    Landing: setLanding_Page,
    Category: setCategory_page,
    Offer: setOffer_page,
  };

  const [search, setSearch] = useState("");
  const history = useHistory();
  const [user, setUser] = useState({});

  if (details !== "Offer") {
    sort = sorts[details];
    setSort = sortSetMethods[details];
  }
  setPage = setPageMethods[details];

  const handleSubmit = () => {
    if (isEmpty(search))
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    history.push({
      pathname: "/search-result",
      state: search,
    });
  };

  const handleSort = (e) => {
    setPage(1);
    setSort(e.target.value);
    // setSearch('')
  };

  return (
    <div className="filter_menu">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <input
          style={{
            height: "35px",
          }}
          type="text"
          placeholder="Enter Your Product Name!"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <button className="search_btn" onClick={handleSubmit}>
          <img src={Search} alt="search" width="24" />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "8px",
        }}
      >
        <div className="row sort">
          {/* <span>Sort By   : </span> */}
          <select value={sort} onChange={handleSort}>
            <option value="">Newest</option>
            <option value="veg">Vegeterian</option>
            <option value="non-veg">Non Vegeterian</option>
            <option value="sort=-price">Price: Hight-Low</option>
            <option value="sort=price">Price: Low-Hight</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
