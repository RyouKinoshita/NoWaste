const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.newProduct = async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    let imageDataUri = images[i];
    // console.log(imageDataUri)
    try {
      const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
        folder: "products",
        width: 150,
        crop: "scale",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  if (!product)
    return res.status(400).json({
      success: false,
      message: "Product not created",
    });

  res.status(201).json({
    success: true,
    product,
  });
};


exports.getProducts = async (req, res, next) => {
  const productsCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();


    const productss = await Product.find();
    console.log(productss);

  const products = await apiFeatures.query;
  let filteredProductsCount = products.length;
  res.status(200).json({
    success: true,
    filteredProductsCount,
    productsCount,
    products,
  });
};

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  // await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
};

exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

// exports.updateProduct = async (req, res, next) => {
//   let product = await Product.findById(req.params.id);
//   // console.log(req.body)
//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }
//   let images = [];

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }
//   if (images !== undefined) {
//     // Deleting images associated with the product
//     for (let i = 0; i < product.images.length; i++) {
//       const result = await cloudinary.v2.uploader.destroy(
//         product.images[i].public_id
//       );
//     }
//   }
//   let imagesLinks = [];
//   for (let i = 0; i < images.length; i++) {
//     const result = await cloudinary.v2.uploader.upload(images[i], {
//       folder: "products",
//     });
//     imagesLinks.push({
//       public_id: result.public_id,
//       url: result.secure_url,
//     });
//   }
//   req.body.images = imagesLinks;
//   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindandModify: false,
//   });
//   // console.log(product)
//   return res.status(200).json({
//     success: true,
//     product,
//   });
// };

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  let images = req.body.images;

  if (images !== undefined) {
    // Deleting images associated with the service
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  return res.status(200).json({
    success: true,
    product,
  });
};

exports.getSellerProducts = async (req, res, next) => {
  try {
    // Fetch all products
    const allProducts = await Product.find();

    // Find the current user with the role "seller"
    const currentUser = await User.findOne({
      _id: req.user.id,
      role: "seller",
    });

    if (!currentUser) {
      return res.status(403).json({
        success: false,
        message: "Current user is not authorized as a seller",
      });
    }

    // Filter products where the seller's name matches the current user's name
    const sellerProducts = allProducts.filter(
      (product) => product.seller === currentUser.name
    );

    res.status(200).json({
      success: true,
      products: sellerProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
