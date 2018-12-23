const jws=require('jsonwebtoken');

module.exports=(req,res,next)=>{

	//localhost:3000/api/movies/?token=adafdsafdfssfads
	//token kısmını req.query.token ile yakalanır.
	//posmande header kısmına bu image deki gibi yazılanilir => http://prntscr.com/lykhco
	const token=req.headers['x-access-token'] || req.body.token || req.query.token

	if(token)
	{
		jws.verify(token, req.app.get('api_secret_key'), (err,decoded)=>{
			//token geçersiz ise hata basacak.
			if(err){
				res.json({
					status:false,
					message:'Failed to authenticate token'
				})
			}else{
				//token doğru ise
				req.decode=decoded;
				//sonuc olarak:
				//username, iat (tarih), exp (tokenın süresi)
				console.log(decoded);
				next();
			}
		});
	}else{
		res.json({
			status:false,
			message:'No token provided'
		});
	}

}