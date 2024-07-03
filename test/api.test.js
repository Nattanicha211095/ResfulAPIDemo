const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Items', () => {
  describe('/GET items', () => {
    it('it should GET all the items', (done) => {
      chai.request(server)
          .get('/api/items')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2); // หรือจำนวนของ items ที่คุณคาดหวัง
            done();
          });
    });
  });

  describe('/POST item', () => {
    it('it should POST a new item', (done) => {
      let item = {
        name: 'Item Three'
      }
      chai.request(server)
          .post('/api/items')
          .send(item)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Item Three');
            done();
          });
    });
  });

  describe('/GET/:id item', () => {
    it('it should GET an item by the given id', (done) => {
      let itemId = 1; // เปลี่ยนเป็น ID ของ item ที่คุณคาดหวัง
      chai.request(server)
          .get(`/api/items/${itemId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id').eql(itemId);
            done();
          });
    });
  });

  describe('/PUT/:id item', () => {
    it('it should UPDATE an item given the id', (done) => {
      let itemId = 1; // เปลี่ยนเป็น ID ของ item ที่คุณคาดหวัง
      let updatedItem = {
        name: 'Updated Item'
      }
      chai.request(server)
          .put(`/api/items/${itemId}`)
          .send(updatedItem)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Updated Item');
            done();
          });
    });
  });

  describe('/DELETE/:id item', () => {
    it('it should DELETE an item given the id', (done) => {
      let itemId = 1; // เปลี่ยนเป็น ID ของ item ที่คุณคาดหวัง
      chai.request(server)
          .delete(`/api/items/${itemId}`)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
    });
  });
});
