import axios from "axios";
import { useState, useEffect, useContext } from "react";
import OrderedProdModal from "./OrderedProdModal";
import { GlobalState } from "../../../GlobalState";
import PushNotification from "./PushNotification";
import Loading from "../utlis/loading/Loading";
// import { format } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";
import "./status.css";
export default function Status() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [subcriptionOptions] = state.userAPI.subscription;
  const [user_id] = state.userAPI.user_id;
  const [order, setOrder] = useState([]);
  const [action, setAction] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [additional, setAdditional] = useState({});
  const [address, setAddress] = useState({});
  var reversedOrder = order.slice().reverse();
  const [isUpdate, setIsUpdate] = useState({
    ok: false,
    id: "",
  });
  const loadStatus = () => {
    axios
      .get("/user/status")
      .then((response) => {
        setOrder(response.data);
        response.data.forEach((item) => {
          if (item.status === "Placed") setAction((action) => action + 1);
        });
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  useEffect(() => {
    loadStatus();
  }, []);
  const updateStatus = (id) => {
    setIsUpdate({ ...isUpdate, ok: true, id: id });
    //rest is history
  };
  const changeUpdateStatus = (e) => {
    setStatus(e.target.value);
  };
  function finalUpdate(id) {
    if (status === "") {
      alert("Please Select Status");
      return;
    }
    axios
      .post(`/user/update/${id}`, { status })
      .then((success) => {
        const initialOrder = [...order];
        let index;
        initialOrder.forEach((item, ind) => {
          if (item._id === id) {
            index = ind;
            return;
          }
        });
        initialOrder[index].status = success.data.status;
        setOrder(initialOrder);
        setIsUpdate({ ...isUpdate, ok: false });
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  }

  function trigerView(
    prods,
    address,
    shipPrice,
    netPay,
    status,
    id,
    date,
    offer
  ) {
    // console.log(prods)
    setOpenModal(true);
    setAddress(address);
    setProducts(prods);
    const priceDetail = {
      shippingPrice: shipPrice,
      netPayable: netPay,
      status: status,
      date: date,
      id: id,
      offer: offer,
    };
    setAdditional(priceDetail);
  }
  function DisplayLocalDate(date) {
    let localDate = new Date(date).toLocaleDateString();
    // console.log(localDate);
    return localDate.split(",")[0].replaceAll("/", "-");
  }

  return (
    <>
      {/* <PushNotification
        user_id={user_id}
        subscription={subcriptionOptions}
        token={token}
      /> */}
      {order.length > 0 ? (
        <div className="status_container">
          {openModal && (
            <OrderedProdModal
              setOpenModal={setOpenModal}
              openModal={openModal}
              products={[...products]}
              address={{ ...address }}
              additional={{ ...additional }}
            />
          )}

          {action !== 0 && (
            <p
              style={{ textAlign: "center", padding: "5px", fontWeight: "500" }}
            >
              {" "}
              {action} Order Needs Action
            </p>
          )}
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {reversedOrder?.map((item) => (
                <tr
                  key={item._id}
                  className={
                    item.status === "Placed"
                      ? "placed"
                      : item.status === "On the way"
                      ? "on_the_way"
                      : item.status === "Delivered"
                      ? "delivered"
                      : "cancelled"
                  }
                >
                  <td>{item.order_id}</td>
                  {isUpdate.ok && isUpdate.id === item._id ? (
                    <td>
                      <select
                        className="update_input"
                        onChange={changeUpdateStatus}
                      >
                        <option defaultValue={"Select"}>Select</option>
                        <option>Delivered</option>
                        <option>On the way</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  ) : (
                    <td style={{ fontWeight: "600" }}>{item.status}</td>
                  )}
                  <td>
                    {DisplayLocalDate(item.date) +
                      " " +
                      new Date(item.date).toLocaleTimeString()}{" "}
                  </td>
                  {item.status === "Delivered" ||
                  item.status === "Cancelled" ? (
                    <td>
                      {" "}
                      <button
                        className="btn_update"
                        onClick={() =>
                          trigerView(
                            item.products,
                            item.address,
                            item.shipping_price,
                            item.net_paybale,
                            item.status,
                            item.order_id,

                            item.date,
                            item.offer
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                  ) : isUpdate.ok && isUpdate.id === item._id ? (
                    <td>
                      <span className="btn_wrap">
                        <button
                          className="btn_update"
                          onClick={() => finalUpdate(item._id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn_update"
                          onClick={() => {
                            setIsUpdate({ ...isUpdate, ok: false });
                            setStatus("");
                          }}
                        >
                          Cancel
                        </button>
                      </span>
                    </td>
                  ) : (
                    <td>
                      <button
                        onClick={() => updateStatus(item._id)}
                        className="btn_update"
                      >
                        Update
                      </button>
                      <button
                        className="btn_update"
                        onClick={() =>
                          trigerView(
                            item.products,
                            item.address,
                            item.shipping_price,
                            item.net_paybale,
                            item.status,
                            item.order_id,

                            item.date,
                            item.offer
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                  )}
                  <td style={{ fontWeight: "bold" }}>
                    {item.status === "Delivered" ? "Paid" : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="status_container">
          <Loading />
        </div>
      )}
    </>
  );
}
