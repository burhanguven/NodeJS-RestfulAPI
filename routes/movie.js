var express = require('express');
var router = express.Router();

//models
const Movie=require('../models/Movie');

/* insert */
router.post('/', (req, res, next) => {
	
	/*const {title,imdb_score,category,country,year}=req.body;
	 	const movie=new Movie({
  		title:title,
  		imdb_score:imdb_score,
  		category:category,
  		country:country,
  		year:year
  	});
  	*/

  	//bir üstteki yapı ile bir alttaki yapı aynı işe yarar.
  	//sadece üst kısımdaki yapıda istediğin kolonları çekebilirsin.
  	//alttaki yapıda gönderilen bütün datayı çekersin.
  	
  	/*const movie=new Movie(req.body);

  	movie.save((err,data)=>{
  		if(err)
  			res.json(err);
  		
  		res.json(data);
  	})*/

  	//promise yapısı ile de post işlemi yapılır.
  	const movie=new Movie(req.body);
  	const promise=movie.save();

  	promise.then((data)=>{
  		res.json({status:1});
  	}).catch((err)=>{
  		res.json(err);
  	})

});

module.exports = router;
