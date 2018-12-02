const express = require('express');
const router = express.Router();

//models 
const Director=require('../models/Director');

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
  	const director=new Director(req.body);
  	const promise=director.save();

  	promise.then((data)=>{
  		res.json(data);
  	}).catch((err)=>{
  		res.json(err);
  		});

});

//
router.get('/getir', (req,res)=>{
  const promise=Director.aggregate();

  promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
      });
});

//yönetmenlerin çektiği filmleri listeleme
//bir yönetmenin 1 den fazla filmi varsa onu kendi adı altında listeler

router.get('/', (req,res)=>{
  const promise=Director.aggregate([
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'director_id',
        as:'movies'
      }
    },
    {
      $unwind:{
        path:'$movies',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      //yönetmenleri kaç filmi varsa tek bir isim altında toplmak için 
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          surname:'$surname',
          bio:'$bio'
        },
        movies:{
          $push:'$movies'
        } 
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        movies:'$movies'
      }
    }
  ]);

  promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
      });
  
});

module.exports=router;