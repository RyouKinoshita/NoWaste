const Article = require("../models/article");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.createArticle = async (req, res) => {
    try {
        const { title, author, description } = req.body;

        // console.log(req.file)

        const imageData = [];
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'articles/images',
            width: 150,
            crop: "scale"
        })
        imageData.push({ public_id: result.public_id, url: result.secure_url });

        const newArticle = {
            title,
            author,
            description,
            image: imageData
        };
        const article = new Article(newArticle);
        await article.save()
        return res.status(201).send({
            success: true,
            message: 'Article Created Successfully',
            article
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        // console.log(users)

        return res.status(200).send({
            success: true,
            data: articles
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error retrieving users'
        });
    }
}

exports.getSingleArticle = async (req, res) => {
    const articleID = req.params._id;

    try {
        const article = await Article.findById(articleID);

        // console.log(article)

        if (!article) {
            return res.status(404).json({ success: false, message: 'Article not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Article found',
            article
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

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
            folder: 'articles/images',
            width: 150,
            crop: "scale"
        })
        imageData.push({ public_id: result.public_id, url: result.secure_url });

        const updatedArticle = {
            title,
            author,
            description,
            image: imageData
        };

        const article = await Article.findByIdAndUpdate(id, updatedArticle, { new: true });
        // console.log(updatedUser)

        res.status(200).json({ success: true, user: article });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.deleteArticle = async (req, res, next) => {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }
    // await product.remove();
    res.status(200).json({
      success: true,
      message: "Article deleted",
    });
  };
