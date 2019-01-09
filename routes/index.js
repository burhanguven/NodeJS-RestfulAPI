const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User=require('../models/User');

//password db ye şifreli basmak için
//bcrypt dependencies olarak eklemek için
//npm install --save bcryptjs 
router.post('/register', (req,res,next)=>{
	const {username, password}=req.body;

	bcrypt.hash(password,10).then((hash)=>{
		const user= new User({
			username,
			password: hash
		});

		const promise=user.save();
		promise.then((data)=>{
			res.json(data);
		}).catch((err)=>{
			res.json(err);
		})
	})
});

//json web token
//npm install jsonwebtoken --save
router.post('/authenticate',(req,res,next)=>{
	const {username,password}=req.body;

	User.findOne({username},(err,data)=>{
		if(err)
			throw err;

		//şifrelenmiş password doğru mu diye kontrol edilecek.
		if(!data){
			res.json({
				status:false,
				message:'Authenticate failed, user not found.'
			});
		}else{
			//password servisten gelen kullanıcının girdiği 
			//data.password db den alınan data
			bcrypt.compare(password, data.password).then((result)=>{
				//result=false ise 
				if(!result){
					res.json({
						status:false,
						message:'Authenticate failed, wrong password.'
					})
				//result=true ise token oluşturulacak.
				}else{
					//console.log(password);
					const payload={
						username
					};
					const token=jwt.sign(payload, req.app.get('api_secret_key'),{
						expiresIn:720 //12 saat
					});

					res.json({
						status:true,
						token
					});
				}
			});
		}
	});
});


module.exports = router;
