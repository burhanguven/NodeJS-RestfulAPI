const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);

let token;

//get metodu testi
/*describe('Node Server', ()=>{
	it('(GET /) anasayfayı döndürür', (done)=>{
		chai.request(server)
			.get('/')
			.end((err,res)=>{
				res.should.have.status(200);
				done();
			})
	});
});*/
describe('/api/movie tests', ()=>{
	before((done)=>{
		chai.request(server)
			.post('/authenticate')
			.send({username: 'burhanCan', password:'1234'})
			.end((err,res)=>{
				token=res.body.token;
				console.log(token);
			done();
			});
	});
	describe('Post(token) metod test', ()=>{
		it('test', (done)=>{
			done();
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