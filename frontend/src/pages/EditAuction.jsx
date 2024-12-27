import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleAuctionById,
  reset,
  updateSingleAuction,
} from "../store/auction/auctionSlice.js";
import { getAllCategories } from "../store/category/categorySlice.js";
import { getAllCities } from "../store/city/citySlice.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloudUploadOutline } from "react-icons/io5";
const EditAuction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleAuction, isLoading, message, isError, isSuccess } = useSelector(
    (state) => state.auction
  );

  const [singleAuctionData, setSingleAuctionData] = useState(singleAuction);
  const [imgUrls, setImgUrls] = useState(singleAuction?.images || []);
  const imgRef = useRef(null);

  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);

  useEffect(() => {
    dispatch(getSingleAuctionById(id));
  }, [id]);

  useEffect(() => {
    if (singleAuction) {
      setSingleAuctionData(singleAuction);
    }
  }, [singleAuction]);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, []);

  useEffect(() => {
    if (isSuccess && isError) {
      toast.error(message, { autoClose: 500 });
      dispatch(reset());
    } else if (isSuccess && isError === undefined) {
      toast.success(message, { autoClose: 500 });
      dispatch(reset());
      setFormData({
        name: "",
        category: "",
        location: "",
        startingPrice: "",
        description: "",
        materialUsed: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        workmanshipFee: "",
        incrementPrice: "",
      });
      setImgUrls([]);
    }
  }, [isSuccess, isError, isLoading]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    startingPrice: 0,
    materialUsed: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    workmanshipFee: "",
    incrementPrice: "",
  });

  useEffect(() => {
    setFormData({
      name: singleAuctionData?.name,
      description: singleAuctionData?.description || "",
      category: singleAuctionData?.category?._id || "",
      location: singleAuctionData?.location?._id || "",
      startingPrice: parseFloat(singleAuctionData?.startingPrice) || 0,
      materialUsed: singleAuctionData?.materialUsed || "",
      length: singleAuctionData?.length || "",
      width: singleAuctionData?.width || "",
      height: singleAuctionData?.height || "",
      weight: singleAuctionData?.weight || "",
      workmanshipFee: singleAuctionData?.workmanshipFee || "",
      incrementPrice: singleAuctionData?.incrementPrice || "",
    });
    setImgUrls(singleAuctionData?.images || []);
  }, [singleAuctionData]);

  const handleProductUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    imgUrls.forEach((img) => {
      data.append("images", img);
    });

    dispatch(updateSingleAuction({ data: data, id: id }));
    dispatch(reset());
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImgUrls = files.map((file) => URL.createObjectURL(file));
    setImgUrls(updatedImgUrls);
  };

  return (
    <div>
      <form
        className="flex flex-col lg:flex-row gap-8 justify-center md:w-[80%] lg:w-[100%] m-auto px-4 py-20"
        onSubmit={handleProductUpload}
      >
        <div className="text-white lg:w-[22%] lg:min-w-[350px] ">
          <h1 className="text-white text-2xl font-bold mb-4">Edit Item</h1>

          <div className="grid gap-4">
            {imgUrls.length > 0 ? (
              imgUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded Image ${index}`}
                  className="w-full h-40 rounded-lg border-2 border-solid p-2 object-contain"
                />
              ))
            ) : (
              <div
                onClick={() => imgRef.current.click()}
                className="w-full h-80 rounded-xl border-2 border-dashed border-border-info-color flex items-center justify-center cursor-pointer"
              >
                <div className="text-center flex flex-col items-center gap-2">
                  <IoCloudUploadOutline
                    size={68}
                    className="text-theme-color"
                  />
                  <p>Click to Upload</p>
                  <span className="text-body-text-color">
                    PNG, JPG, JPEG | Max Size 1MB
                  </span>
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
            ref={imgRef}
            accept=".png, .jpg, .jpeg"
            multiple
          />
        </div>

        {/* INPUTS */}
        <div className="flex flex-col gap-4 lg:w-[50%] inputs:outline-none p-8 inputs:px-4 inputs:py-3 inputs:rounded-xl select:px-4 select:py-3 select:rounded-xl select:cursor-pointer border border-border-info-color inputs:bg-theme-bg inputs:border inputs:border-border-info-color focus:inputs:border-theme-color select:border select:border-border-info-color inputs:placeholder-body-text-color text-slate-300 rounded-2xl [&_label]:mb-2 [&_label]:text-body-text-color [&_*]:transition-all">
          <div className="grid">
            <label htmlFor="product_name">Product Name</label>
            <input
              required
              id="product_name"
              placeholder="e.g (Modern Abstract Painting)"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>

          <div className="grid">
            <label htmlFor="category">Category</label>
            <select
              className="outline-none h-[50px] bg-theme-bg cursor-pointer focus:border-theme-color"
              required
              id="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value="">Select Category</option>
              {categories.data &&
                categories.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mlg:grid-cols-1">
            <div className="grid">
              <label htmlFor="starting_price">Starting Price</label>
              <input
                required
                id="starting_price"
                type="number"
                placeholder="e.g (1000)"
                min="1"
                onChange={(e) =>
                  setFormData({ ...formData, startingPrice: e.target.value })
                }
                onWheel={(e) => e.target.blur()}
                value={formData.startingPrice}
              />
            </div>
            <div className="grid">
              <label htmlFor="location">Area</label>
              <select
                className="outline-none h-[50px] bg-theme-bg cursor-pointer focus:border-theme-color"
                required
                id="location"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                value={formData.location}
              >
                <option value="">Select Area</option>
                {cities.data &&
                  cities.data.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mlg:grid-cols-1">
            <div className="grid">
              <label htmlFor="height">Height (cm)</label>
              <input
                required
                id="height"
                type="number"
                min="1"
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                value={formData.height}
              />
            </div>
            <div className="grid">
              <label htmlFor="weight">Weight (gm)</label>
              <input
                required
                id="weight"
                type="number"
                min="1"
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                value={formData.weight}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mlg:grid-cols-1">
            <div className="grid">
              <label htmlFor="length">Length (cm)</label>
              <input
                required
                id="length"
                type="number"
                min="1"
                onChange={(e) =>
                  setFormData({ ...formData, length: e.target.value })
                }
                value={formData.length}
              />
            </div>
            <div className="grid">
              <label htmlFor="width">Width (cm)</label>
              <input
                required
                id="width"
                type="number"
                min="1"
                onChange={(e) =>
                  setFormData({ ...formData, width: e.target.value })
                }
                value={formData.width}
              />
            </div>
          </div>

          <div className="grid">
            <label htmlFor="material_used">Material Used</label>
            <input
              required
              id="material_used"
              placeholder="e.g. Wood, Steel, Canvas"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, materialUsed: e.target.value })
              }
              value={formData.materialUsed}
            />
          </div>

          <div className="grid">
            <label htmlFor="workmanship_fee">Workmanship Fee</label>
            <input
              required
              id="workmanship_fee"
              placeholder="e.g. 50"
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, workmanshipFee: e.target.value })
              }
              value={formData.workmanshipFee}
            />
          </div>

          <div className="grid">
            <label htmlFor="increment_price">Increment Price</label>
            <input
              required
              id="increment_price"
              type="number"
              min="1"
              onChange={(e) =>
                setFormData({ ...formData, incrementPrice: e.target.value })
              }
              value={formData.incrementPrice || ""}
            />
          </div>

          <div className="grid">
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Describe your product, art, etc."
              required
              id="description"
              rows="7"
              className="outline-none bg-theme-bg rounded-xl px-3 py-4 border border-border-info-color focus:border-theme-color placeholder-body-text-color"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
            />
          </div>

          <button
            type="submit"
            className="px-3 py-4 rounded-xl text-white cursor-pointer font-bold tracking-wide w-full bg-theme-color hover:bg-color-danger"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAuction;
