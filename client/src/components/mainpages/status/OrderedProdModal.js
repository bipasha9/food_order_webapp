import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import PDF from "../images/pdf.svg";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Unmarked_Star from "../review/Unmarked.svg";
import Marked_Star from "../review/Marked.svg";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
// import UserAPI from "../../../api/UserAPI";
import axios from "axios";
import "./status.css";
import produce from "immer";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const MARKED = 1;
const UNMARKED = 0;
export default function OrderedProdModal({
  setOpenModal,
  products,
  address,
  openModal,
  additional,
  // order,
}) {
  // console.log(additional);
  const initialState = {
    name: "",
    ratings: 0,
    description: "",
  };
  const [redirect, setRedirect] = useState(false);
  const [review, setReview] = useState(initialState);
  const [disabled, setDisabled] = useState(false);
  const [stars, setStars] = useState([
    UNMARKED,
    UNMARKED,
    UNMARKED,
    UNMARKED,
    UNMARKED,
  ]);
  useEffect(() => {
    if (additional.review && Object.keys(additional.review).length !== 0) {
      setReview({
        ...review,
        name: additional.review.name,
        ratings: additional.review.ratings,
        description: additional.review.description,
      });
      const updatedStars = produce(stars, (draftState) => {
        additional.review.ratings--; //0 based indexing
        while (additional.review.ratings >= 0) {
          console.log(additional.review.ratings);
          draftState[additional.review.ratings] = MARKED;
          additional.review.ratings--;
        }
      });
      setStars(updatedStars);
      setDisabled(true);
    } else setDisabled(false);
  }, [additional?.review?.name]);
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // const state = useContext(GlobalState);

  // const [token] = state.token;
  // const userState = UserAPI(token);
  // const [order] = userState.order;
  const addReview = async () => {
    const finalReview = { ...review };
    finalReview.order_id = additional._id;
    finalReview.avatar = additional.avatar;
    finalReview.user_id = additional.user_id;
    finalReview.ratings = [...stars].reduce(
      (prevValue, currentValue) => (prevValue += currentValue)
    );
    const response = await axios.post("/user/review", finalReview, {
      headers: { Authorization: additional.token },
    });
    if (response.status === 200) {
      alert("Review Added");
      setRedirect(true);
    }
  };
  const updateReview = async () => {
    const updatedReview = { ...review };
    updatedReview.order_id = additional._id;
    updatedReview.avatar = additional.avatar;
    updatedReview.user_id = additional.user_id;
    updatedReview.ratings = [...stars].reduce(
      (prevValue, currentValue) => (prevValue += currentValue)
    );
    console.log(updatedReview);
    const response = await axios.put("/user/review", updatedReview, {
      headers: { Authorization: additional.token },
    });
    if (response.status === 200) {
      alert("UPDATED");
      setDisabled(true);
    }
  };
  const deleteReview = async () => {
    const response = await axios.delete(`/user/review/${additional._id}`, {
      headers: { Authorization: additional.token },
    });
    if (response.status === 200) {
      alert("Review Deleted");
      setReview(initialState);
    }
  };
  const updateRatings = (index) => {
    const MAX_RATINGS = 5;
    const INITIAL_OF_ARRAY = 0;
    let updatedRatings = [];
    console.log(index);
    console.log(stars);
    if (stars[index] === 1) {
      //update all the MARKED stars above to UNMARKED
      updatedRatings = produce(stars, (draftState) => {
        if (index === 0 && draftState[index + 1] === UNMARKED) {
          //corner case if first star is only marked
          draftState[index] = UNMARKED;
          return;
        }
        ++index; //keeps that current star marked
        while (index <= MAX_RATINGS - 1) {
          draftState[index] = UNMARKED;
          index++;
        }
      });
    } else {
      updatedRatings = produce(stars, (draftState) => {
        while (index >= INITIAL_OF_ARRAY) {
          draftState[index] = MARKED;
          index--;
        }
      });
    }
    console.log(updatedRatings);
    //update state
    setStars(updatedRatings);
  };
  if (redirect) return <Redirect to="/reviews" />;
  const generatePdf = (products) => {
    var docDefinition = {
      pageSize: "A5",
      content: [
        {
          text: "Food Order by Bipasha Mazumder",
          fontSize: 16,
          alignment: "right",
          color: "#ff0000",
        },
        {
          text: "Order Details",
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 10],
        },

        {
          text: `Order Id: ${additional.id}`,
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          fontSize: 10,
          width: "40%",

          // layout: "lightHorizontalLines",
        },
        {
          text: `Order Date: ${DisplayLocalDate(additional.date)}`,
          fontSize: 9,
        },

        { text: `Name: ${address.name}`, fontSize: 8 },
        { text: `Number: ${address.number}`, fontSize: 8 },
        { text: `Address: ${address.address}`, fontSize: 8 },
        { text: `City: ${address.city}`, fontSize: 8 },
        { text: `Pincode: ${address.pincode}`, fontSize: 8 },
        { text: `Order Status:${additional.status}`, fontSize: 8, bold: true },

        {
          text: `Total: ${additional.netPayable}`,
          fontSize: 10,
          bold: true,
          margin: [0, 0, 10, 20],
          alignment: "left",
        },
      ],
    };

    // console.log(docDefinition);
    products?.map((product) => {
      const productDetails = [
        [
          {
            text: `Product : ${product.product.title}`,
            fontSize: 9,
            bold: true,
            alignment: "left",
            margin: [10, 0, 0, 0],
          },
          {
            text: `Qty: ${product.quantity}`,
            fontSize: 8,
            alignment: "right",
            margin: [0, 0, 10, 0],
          },
          {
            text: `Rs: ${product.product.price}`,
            fontSize: 8,
            alignment: "right",
            margin: [0, 0, 10, 0],
          },
          {
            text: `                  Rs: ${
              product.product.price * product.quantity
            }`,
            alignment: "right",
            margin: [0, 0, 10, 5],
            fontSize: 9,
            bold: true,
            italics: true,
            decoration: "overline",
            background: "#ccc",
          },
        ],
      ];
      docDefinition.content.push(...productDetails);
    });
    docDefinition.content.push({
      text: `Total: ${additional.netPayable}`,
      fontSize: 12,
      bold: true,
      margin: [0, 5, 10, 5],
      alignment: "right",
    });
    docDefinition.content.push({
      text: `Shipping Charge: ${additional.shippingPrice}`,
      fontSize: 8,
      bold: true,
      margin: [0, 0, 10, 5],
      alignment: "right",
    });
    docDefinition.content.push({
      text: `${additional.offer}`,
      fontSize: 8,
      bold: true,
      margin: [0, 0, 10, 5],
      alignment: "right",
    });

    docDefinition.content.push({
      text: "THANKYOU",
      alignment: "center",
      fontSize: 12,
      bold: true,
      margin: [0, 15, 0, 0],
      color: "dimgrey",
      characterSpacing: 5,
    });
    docDefinition.content.push({
      text: "Visit Again",
      alignment: "center",
      fontSize: 10,
      bold: true,
      margin: [0, 15, 0, 0],
      color: "dimgrey",
    });

    pdfMake.createPdf(docDefinition).download("invoice");
  };
  function DisplayLocalDate(date) {
    let localDate = new Date(date).toLocaleDateString();

    return localDate.split(",")[0].replaceAll("/", "-");
  }

  return (
    <div>
      <Modal open={openModal} onClose={onCloseModal}>
        <h4>Ordered Products</h4>

        {/* products details  */}
        <div className="ordered_prod_container">
          {products?.map((product) => (
            <div className="ordered_prod" key={product._id}>
              <div className="ordered_prod">
                <Link
                  to={`/detail/${product.product._id}/${product.product.category}`}
                >
                  <img
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "5px",
                      textAlign: "left",
                      marginRight: "10px",
                    }}
                    src={product.product.images.url}
                    alt=""
                  />
                </Link>
                <div style={{ fontWeight: "400" }}>
                  Quantity : <span>{product.quantity}</span>
                  <br />
                  Name : <span>{product.product.title}</span>
                  <br />
                  Price : Rs <span>{product.product.price}</span>
                  <br />
                  Description :<span>{product.product.description}</span>
                  <br />
                </div>
              </div>
            </div>
          ))}

          <div>
            <div style={{ fontWeight: "400" }}>
              <span style={{ fontWeight: "bold" }}>
                Amount To be Paid: Rs <span>{additional.netPayable}</span>
              </span>
              <br />
              Shipping Price: Rs <span>{additional.shippingPrice}</span>
              <br />
              <span>{additional.offer}</span>
            </div>

            <br />
            <div style={{ fontWeight: "400" }}>
              Name:<span>{address.name}</span>
              <br />
              Address : <span>{address.address}</span>
              <br />
              Phone : <span>{address.number}</span>
              <br />
              City : <span>{address.city}</span>
              <br />
              Pincode : <span>{address.pincode}</span>
              {address.landmark && (
                <p>
                  Landmark : <span>{address.landmark}</span>
                </p>
              )}
              {address.alternate && (
                <p>
                  Alt Phone : <span>{address.alternate}</span>
                </p>
              )}
            </div>
            <button
              className="pdfdownload"
              onClick={() => generatePdf(products)}
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "0 5px 5px 5px",
                height: "2rem",
                marginTop: "5px",
                color: "black",
              }}
            >
              Download as PDF
              <img
                src={PDF}
                alt=""
                style={{
                  height: "20px",
                  width: "20px",
                  marginLeft: "5px",
                  position: "relative",
                  top: "3px",
                }}
              />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
