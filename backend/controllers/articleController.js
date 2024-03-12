const Article = require("../models/article");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.createArticle = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    // console.log(req.file)

    const imageData = [];
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "articles/images",
      width: 150,
      crop: "scale",
    });
    imageData.push({ public_id: result.public_id, url: result.secure_url });

    const newArticle = {
      title,
      author,
      description,
      image: imageData,
      isDeleted: false,
    };
    const article = new Article(newArticle);
    await article.save();
    return res.status(201).send({
      success: true,
      message: "Article Created Successfully",
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isDeleted: false });

    return res.status(200).send({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error retrieving articles",
    });
  }
};

exports.getSingleArticle = async (req, res) => {
  const articleID = req.params._id;

  try {
    const article = await Article.findOne({ _id: articleID, isDeleted: false }); // Exclude soft-deleted articles

    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Article found",
      article,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description } = req.body;
    // console.log(id)
    // console.log(title, author, description)
    // console.log(req.file)

    // console.log(req.file);
    const imageData = [];
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "articles/images",
      width: 150,
      crop: "scale",
    });
    imageData.push({ public_id: result.public_id, url: result.secure_url });

    const updatedArticle = {
      title,
      author,
      description,
      image: imageData,
      isDeleted: false,
    };

    const article = await Article.findByIdAndUpdate(id, updatedArticle, {
      new: true,
    });
    // console.log(updatedUser)

    res.status(200).json({ success: true, user: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Article soft deleted",
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
