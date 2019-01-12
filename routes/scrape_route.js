var express = require("express");
var router = express.Router();

var axios = require("axios");
var cheerio = require("cheerio");

var md = require("../models");

router.get("/",function(req,res){
    res.render("index");
});

router.get("/scrape", function(req,res){
    console.log("entering scraping");
    axios.get("https://politics.theonion.com/").then(function(response){
        var $ = cheerio.load(response.data);

        $(".headline").each(function(i,element){
            var result = {};
            console.log(result);
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            md.Article.create(result).then(function(dbArticle){
                console.log(dbArticle);
            }).catch(function(err){
                console.log(err);
            });
        });
    });
});

router.get("/articles",function(req,res){
    md.Article.find({}).then(function(dbArticle){
        console.log(dbArticle);
        var artobj = {
            dbArticle: dbArticle
        }
        res.render("articles", artobj);
    }).catch(function(err){
        res.json(err);
    });
});

router.get("/article_details/:id",function(req,res){
    console.log("get the details");
    md.Article.findOne({ _id: req.params.id}).populate("Note").then(function(dbArticle){
        console.log(dbArticle);
        var artdtlobj = {
            dbArticle: dbArticle
        }
        res.render("article_detail", artdtlobj);
    }).catch(function(err){
        res.json(err);
    });
});

router.post("/article_details/:id",function(req,res){
    console.log(req.body);
    md.Note.create(req.body).then(function (Note) {
        return md.Article.findOneAndUpdate({ _id: req.params.id }, {$push: {Note: Note._id}},{ new: true})
    }).then(function(result){
        var artdtlobj = {
            dbArticle: result
        };
        res.render("article_detail", artdtlobj);
    }).catch(function(err){
        res.json(err);
    });
});

module.exports = router;