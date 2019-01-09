const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

//kurulum
//npm install --global mocha

chai.use(chaiHttp);

describe('Node Server', ()=>{
	it('(GET /) anasayfayı döndürür', (done)=>{
		chai.request(server)
			.get('/')
			.end((err, res)=>{
				res.should.have.status(200);
				//console.log("index.test.js dosyası");
				done();
		})
	});
});

/*describe('Node Server', ()=>{
	it('(GET /) anasayfayı döndürür', (done)=>{
		done();
	});
});

describe('Node Server', ()=>{
	it('(GET /) movies döndürür', (done)=>{
		done();
	});
});*/