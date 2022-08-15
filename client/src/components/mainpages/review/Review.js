import { useState, useEffect } from "react";
import axios from "axios";
import "./review.css";
import Marked from "./Marked.svg";
import Unmarked from "./Unmarked.svg";
import LoadingNew from "../utlis/loading/LoadingNew";
function Review() {
  const [reviews, setReviews] = useState([]);
  const LoadReviews = async () => {
    const response = await axios.get("/user/review");
    if (response) {
      setReviews(response.data);
      console.log(response.data);
    }
  };
  function showRatings(ratings) {
    let counter = 5;
    let Ratings = [];
    while (ratings--) {
      counter--;
      Ratings.push(<img src={Marked} className="star" />);
    }
    while (counter--) {
      Ratings.push(<img src={Unmarked} className='star' />)
    }
    return Ratings;
  }
  useEffect(() => {
    LoadReviews();
  }, []);
  return (
    <div>
      <div className="review_card">
        <div
          style={{
            paddingBottom: "30px",
            borderBottom: "2px solid #E5EAF9",
            marginBottom: "5px",
          }}
        >
          <h2 style={{ color: "#334680", fontSize: "20px", textAlign: 'center', marginTop: "15px" }}>Customer Review</h2>
        </div>

        {reviews.length > 0 ? (
          reviews.map((review) => (

            <div

            >
              <div key={review._id} className="review_card_container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span className="avatar-border">
                    <img src={review.avatar} className="review-avatar" />
                  </span>
                  <h5 className="review-name"

                  >
                    {review.name}
                  </h5>
                </span>
                <span>
                  {" "}
                  {showRatings(review.ratings)}
                </span>
              </div>
              <p className="review-text"
               
              >
                {review.description}
              </p>
            </div>
          ))
        ) : (
          <h3><LoadingNew/></h3>
        )}
      </div>
    </div>
  );
}

export default Review;
