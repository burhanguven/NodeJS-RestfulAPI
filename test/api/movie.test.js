const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);


//get metodu testi
describe('GET', ()=>{
	it('(GET /) anasayfayı döndürür', (done)=>{
		chai.request(server)
			.get('/')
			.end((err,res)=>{
				res.should.have.status(200);
				done();
			});
	});
	describe('Get metod test', ()=>{
		it('GET', (done)=>{
			done();
		})
	})
});
//token 
//authenticate metodundan token alıp movie metodundan array döndüğünün kontrolü.
let token, movieId;

describe('/api/movie tests', ()=>{
	before((done)=>{
		chai.request(server)
			.post('/authenticate')
			.send({username: 'burhanCan', password:'1234'})
			.end((err,res)=>{
				token=res.body.token;
				//console.log("Token: ", token);
			done();
			});
	});
	describe('/GET movie', ()=>{
		it('It should GET all the movies', (done)=>{
			chai.request(server)
				.get('/api/movie')
				.set('x-access-token', token)
				.end((err,res)=>{
					res.should.have.status(200);
					//dönen datanın array olduğunu test etmek gerekir.
					res.body.should.be.a('array');
					done();
				});
		})
	});
	//bir filmi kayıt eden endpoint in testi
	describe('/POST movie',()=>{
		it('it should POST a movie',(done)=>{
			const movie={
				director_id: '5c03c9e713e99823b8dfac07',
				title: 'Logan',
				imdb_score: 9,
				category: 'lorem',
				country: 'italy',
				year: 1980,
			};
			chai.request(server)
				.post('/api/movie/ekle')
				.send(movie)
				.set('x-access-token', token)

				.end((err,res)=>{
					res.should.have.status(200);
					//değerler obje dönmesi gerektiği kontrolü
					res.body.should.be.a('object');
					res.body.should.have.property('director_id');
					res.body.should.have.property('title');
					res.body.should.have.property('imdb_score');
					res.body.should.have.property('category');
					res.body.should.have.property('country');
					res.body.should.have.property('year');
					//bir sonraki test metodunda kullanılacak.
					movieId=res.body._id;
					done();
				})
		})
	});
	//movie_id ile get metodu test
	describe('/GET/:movie_id movie',()=>{
		it('it should GET a movie by the given id',(done)=>{
			chai.request(server)
				.get('/api/movie/'+movieId)
				.set('x-access-token',token)
				.end((err,res)=>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('director_id');
					res.body.should.have.property('title');
					res.body.should.have.property('imdb_score');
					res.body.should.have.property('category');
					res.body.should.have.property('country');
					res.body.should.have.property('year');
					done();
				});
		});
	});
	//update metod test
	describe('/PUT/:movie_id movie',()=>{
		it('it should POST a movie',(done)=>{
			const movie={
				director_id: '5c03c9e713e99823b8dfac08',
				title: 'Atın İntikamı',
				imdb_score: 5,
				category: 'korku',
				country: 'Merzifon',
				year: 2000,
			};
			chai.request(server)
				.put('/api/movie/'+ movieId)
				.send(movie)
				.set('x-access-token', token)
				.end((err,res)=>{
					res.should.have.status(200);
					//değerler obje dönmesi gerektiği kontrolü
					res.body.should.be.a('object');
					res.body.should.have.property('director_id').eql(movie.director_id);
					res.body.should.have.property('title').eql(movie.title);
					res.body.should.have.property('imdb_score').eql(movie.imdb_score);
					res.body.should.have.property('category').eql(movie.category);
					res.body.should.have.property('country').eql(movie.country);
					res.body.should.have.property('year').eql(movie.year);
					done();
				})
		})
	});
	//delete
	describe('/DELETE/:movie_id movie', ()=>{
		it('it should DELETE a movie given by id', (done)=>{
			chai.request(server)
				.delete('/api/movie/'+movieId)
				.set('x-access-token',token)
				.end((err,res)=>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql(1);
					done();
				})
		})
	})
});

//sıralama görmek için test
/*describe('/api/movie tests', ()=>{
	before((done)=>{
		console.log("ilk ben çalışacağım");
		done();
	});
	describe('asdaşsljdasd', ()=>{
		it('test', (done)=>{
			done();
		})
	})
});*/

