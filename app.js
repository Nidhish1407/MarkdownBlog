const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/article');
const Article = require('./models/article');
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();


mongoose.connect(process.env.MONGO_URI)
.catch(err=>console.log(err)); 


app.use(express.urlencoded({ extended: false}))
app.set('view engine','ejs');
app.use(methodOverride('_method'))

app.use('/articles',articleRouter);

app.get('/',async (req,res)=>{

    // const articles = [{
    //     title: 'article title',
    //     createdAt: new Date(),
    //     description: 'Test description'
    // },
    // {
    //     title: 'article title2',
    //     createdAt: new Date(),
    //     description: 'Test description2'
    // }, 
    // {
    //     title: 'article title2',
    //     createdAt: new Date(),
    //     description: 'Test description3'
    // }
    // ];

    const articles = await Article.find().sort({createdAt:'desc'});
    res.render('articles/index',{articles});
});

const port = process.env.PORT || 3000;

//Start server
app.listen(port,()=>{
    console.log(`The application running at port ${port}`);
});  