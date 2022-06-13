const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe("flickr", () => {
  describe("GET /", () => {
    it("should get all image", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    
  

      it("should get all image with tag", (done) => {
        const tag = 'cats';
        chai.request(app)
          .get(`/tags/${tag}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});