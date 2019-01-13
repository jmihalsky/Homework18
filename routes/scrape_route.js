var express = require("express");
var router = express.Router();

var axios = require("axios");
var cheerio = require("cheerio");

var md = require("../models");

router.get("/",function(req,res){
    res.redirect("/articles");
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
        }).then(function(){
            res.redirect("/articles");
        });
       
    });
});

router.get("/articles",function(req,res){
    md.Article.find({}).then(function(dbArticle){
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
    md.Article.findOne({ _id: req.params.id}).populate("note").then(function(dbArticle){
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
    console.log(req.params.id);
    var art_id = req.params.id;
    md.Note.create(req.body).then(function (note) {
        return md.Article.findOneAndUpdate({ _id: art_id }, {$push: {note: note._id}},{ new: true})
    }).then(function(result){
        var artdtlobj = {
            dbArticle: result
        };
        console.log(artdtlobj);
        res.render("article_detail", artdtlobj);
    }).catch(function(err){
        console.log(err);
    });
});

router.delete("/article_details/:note_id",function(req,res){
    console.log("delete a note");
    md.Note.findByIdAndRemove(req.params.note_id).then(function (note) {
        console.log(note);
    }).catch(function (err){
        console.log(error);
    });
});

module.exports = router;