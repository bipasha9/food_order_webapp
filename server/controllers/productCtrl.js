const Products = require("../models/productModel");

const { v4: uuidv4 } = require("uuid");
const SortProducts = async (_sort, limit, skip) => {
  let products = [];
  if (_sort === "veg") {
    products = await Products.find({ foodtype: "veg" })
      .limit(limit)
      .sort({ createdAt: 1, _id: 1 })
      .skip(skip);
  }

  if (_sort === "non-veg") {
    products = await Products.find({ foodtype: "non-veg" })
      .limit(limit)
      .sort({ sold: -1, _id: 1 })
      .skip(skip);
  }
  if (_sort === "sort=-price") {
    products = await Products.find()
      .limit(limit)
      .sort({ price: -1, _id: 1 })
      .skip(skip);
  }
  if (_sort === "sort=price") {
    products = await Products.find()
      .limit(limit)
      .sort({ price: 1, _id: 1 })
      .skip(skip);
  }
  if (!_sort || _sort === "") {
    products = await Products.find()
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .skip(skip);
  }
  return products;
};
const CategoryWiseSort = async (category, _sort, limit, skip) => {
  let products = [];
  if (_sort === "veg") {
    products = await Products.find({
      $and: [{ foodtype: "veg", category: category }],
    })
      .sort({ createdAt: 1, _id: 1 })
      .skip(skip)
      .limit(limit);
  }

  if (_sort === "non-veg") {
    products = await Products.find({
      $and: [{ foodtype: "non-veg", category: category }],
    })
      .limit(limit)
      .sort({ sold: -1, _id: 1 })
      .skip(skip);
  }
  if (_sort === "sort=-price") {
    products = await Products.find({ category: category })
      .limit(limit)
      .sort({ price: -1, _id: 1 })
      .skip(skip);
  }
  if (_sort === "sort=price") {
    products = await Products.find({ category: category })
      .limit(limit)
      .sort({ price: 1, _id: 1 })
      .skip(skip);
  }
  if (!_sort || _sort === "") {
    products = await Products.find({ category: category })
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .skip(skip);
  }
  return products;
};
const FoodTypeWiseSort = async (foodtype, _sort, limit, skip) => {
  let products = [];
  if (_sort === "sort=oldest") {
    products = await Products.find({ foodtype: foodtype })

      .sort({ createdAt: 1, _id: 1 })
      .skip(skip)
      .limit(limit);
  }

  if (_sort === "sort=-sold") {
    products = await Products.find({ foodtype: foodtype })
      .limit(limit)
      .sort({ sold: -1, _id: 1 })
      .skip(skip);
  }
  if (_sort === "sort=-price") {
    products = await Products.find({ foodtype: foodtype })
      .limit(limit)
      .sort({ price: -1, _id: 1 })
      .skip(skip);
  }
  if (_sort === "sort=price") {
    products = await Products.find({ foodtype: foodtype })
      .limit(limit)
      .sort({ price: 1, _id: 1 })
      .skip(skip);
  }
  if (!_sort || _sort === "") {
    products = await Products.find({ foodtype: foodtype })
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .skip(skip);
  }
  return products;
};

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      let { page, size, category, sort } = req.query;
      const count = category
        ? await Products.countDocuments({ category: category })
        : await Products.countDocuments();
      if (!page) {
        page = 1;
      }
      if (!size) {
        size = 20;
      }
      const limit = parseInt(size);
      const skip = (page - 1) * size;
      let products = category
        ? await CategoryWiseSort(category, sort, limit, skip)
        : await SortProducts(sort, limit, skip);
      res.status(200).json({
        page: page,
        size: size,
        products: products,
        available: count - page * size,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },
  getProductsByCategory: async (req, res) => {
    try {
      const cat_id = req.params.cat_id;
      const products = await Products.find({ category: cat_id });
      if (!products || products.length === 0) {
        return res.status(404).json({ msg: "Product Not Found" });
      }
      return res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  getProduct: async (req, res) => {
    try {
      const prod_id = req.params.id;
      const prodFound = await Products.findById(prod_id);
      if (prodFound) return res.status(200).json({ product: prodFound });
      return res.status(404).json({ msg: "NOT FOUND PRODUCT" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        pricemk,
        description,
        content,
        images,
        category,
        foodtype,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "This  product already exists." });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        pricemk,
        description,
        content,
        images,
        category,
        foodtype,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        pricemk,
        description,
        content,
        images,
        category,
        foodtype,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          pricemk,
          description,
          content,
          images,
          category,
          foodtype,
        }
      );

      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  searchListings: async (req, res) => {
    try {
      // const regex = new RegExp(req.params.title,'i');
      const { search } = req.body;

      // const products = await Products.find({ title: regex })
      // res.json({ products })

      // console.log(search, date);
      // console.log(date);

      let result = await Products.find({
        // title: regex,
        title: { $regex: search, $options: "i" },
      }).exec();
      // console.log("SEARCH LISTINGS", result);
      res.json({ result });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getOffer: async (req, res) => {
    try {
      const { check_offer } = req.params;
      const page = parseInt(req.query.page);
      console.log(page);
      const limit = 20;
      const skip = (page - 1) * limit;
      console.log(check_offer);
      const offered_products = await Products.aggregate([
        {
          $addFields: {
            discountMrp: {
              $cond: {
                if: { $eq: ["$pricemk", null] },
                then: 0,
                else: { $subtract: ["$pricemk", "$price"] },
              },
            },
          },
        },

        {
          $addFields: {
            offer: {
              $multiply: ["$discountMrp", 100],
            },
          },
        },
        {
          $addFields: {
            finalOffer: {
              $divide: ["$offer", "$pricemk"],
            },
          },
        },

        {
          $match: {
            $expr: {
              $gte: ["$finalOffer", parseInt(check_offer)],
            },
          },
        },
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: page } }],
            data: [{ $skip: skip }, { $limit: limit }, { $sort: { _id: 1 } }],
          },
        },
      ]);
      return res.status(200).json({ offered_products });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = productCtrl;
