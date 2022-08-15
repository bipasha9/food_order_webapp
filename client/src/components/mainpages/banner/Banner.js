import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utlis/loading/Loading";
import axios from "axios";

function Banners() {
  const state = useContext(GlobalState);
  const [banners] = state.bannersAPI.banners;
  const [images, setImages] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [banner, setBanner] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.bannersAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState("");

  const createBanner = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        const res = await axios.put(
          `/api/banners/${id}`,
          { name: banner, images },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/banners",
          { name: banner, images },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setBanner("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
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
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editBanner = async (id, name) => {
    setID(id);
    setBanner(name);
    setOnEdit(true);
  };

  const deleteBanner = async (id) => {
    try {
      const res = await axios.delete(`/api/banners/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
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
        { public_id: images.public_id },
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
  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="create_category">
      <div className="upload1">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>
      <div className="categories">
        <form onSubmit={createBanner}>
          <label htmlFor="category">Banner</label>
          <input
            type="text"
            name="banner"
            value={banner}
            required
            onChange={(e) => setBanner(e.target.value)}
          />

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>

        <div className="col">
          {banners.map((banner) => (
            <div className="row" key={banner._id}>
              <div>
                <img
                  style={{ width: "150px", height: "90px" }}
                  src={banner.images.url}
                  alt=""
                />
              </div>
              <div>
                <p style={{ marginLeft: "55px", marginBottom: "15px" }}>
                  {banner.name}
                </p>
                <button onClick={() => editBanner(banner._id, banner.name)}>
                  Edit
                </button>
                <button onClick={() => deleteBanner(banner._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banners;
