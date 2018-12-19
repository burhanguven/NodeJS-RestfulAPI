const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');

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



module.exports = router;
