const mongoose=require('mongoose');
//{ useNewUrlParser: true }
//normalde {useMongoClient:true} Kullanılırken uzak sunucu ile bağlantıda üstteki kullanılır.
module.exports=()=>{
	mongoose.connect('mongodb://movie_user:abcd1234@ds115854.mlab.com:15854/movie-api', { useNewUrlParser: true });
	mongoose.connection.on('open', ()=>{
		console.log("MongoDB: Connection");
	});
	mongoose.connection.on('error', (err)=>{
		console.log("MongoDB: Error" ,err);
	});
};