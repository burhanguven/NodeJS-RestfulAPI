var express = require('express');
var router = express.Router();

//models
const Movie=require('../models/Movie');

//get metodu
//http://localhost:3000/api/movie/getir
//api si ile postman den vt den veri alınır.
router.get('/getir',(req,res)=>{
	const promise=Movie.find({ });
	promise.then((data)=>{
		res.json(data);
	}).catch((err)=>{
		res.json(err);
	});
});

//id bazlı veri çekme
// örneğin sonuna http://localhost:3000/api/movie/5bfd8462c2264117d46d2566 id sini yazarak bu id li datayı çekebilirsin.
router.get('/:movie_id', (req,res,next)=>{

	const promise=Movie.findById(req.params.movie_id);
	promise.then((data)=>{
		//if bloğu hatalı id girildiğinde dönülcek olan hata mesajı içindir.
		//code kısmı kendin belirleyebilirsin.
		if(!data)
			next({message:'The movie was not found.', code:99});
		res.json(data);
	}).catch((err)=>{
		res.json(err);
	});
});

//update

router.put('/:movie_id', (req,res,next)=>{

	const promise=Movie.findByIdAndUpdate(
		req.params.movie_id,
		req.body
	);

	promise.then((data)=>{
		//if bloğu hatalı id girildiğinde dönülcek olan hata mesajı içindir.
		//code kısmı kendin belirleyebilirsin.
		if(!data)
			next({message:'The movie was not found.', code:99});
		res.json(data);
	}).catch((err)=>{
		res.json(err);
	});
});

/* insert */
//http://localhost:3000/api/movie/ekle 
//api si ile postman den ekleme yapılır.
router.post('/ekle', (req, res, next) => {
	
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
  		res.json(data);
  	}).catch((err)=>{
  		res.json(err);
  		});

});

module.exports = router;
