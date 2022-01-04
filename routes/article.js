const express = require('express');
const Article = require('../models/article')
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new',{article:new Article});
});

router.get('/edit/:id', async (req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        res.render('articles/edit', { article: article });
    }
    catch(err)
    {
        console.log(err);
    }
});

router.get('/:slug', async (req, res) => {
    
    try{
        const article = await Article.findOne({slug:req.params.slug});
        res.render('articles/show', { article: article });
        //console.log(req.params.slug);
        //console.log(article.slug); 
    }
    catch(err){
        // console.log(err);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    let article = new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })

    try{
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    }
    catch(err){
        console.log(err);
        res.render('articles/new',{article});
    }
});

router.put('/:id',async (req,res)=>{

    try {
        req.article = await Article.findById(req.params.id);

        let article = req.article;

        article.title = req.body.title,
        article.description = req.body.description,
        article.markdown = req.body.markdown

        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    }
    catch (err) {
        console.log(err);
        res.render(`articles/${article.slug}`, { article });
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;

