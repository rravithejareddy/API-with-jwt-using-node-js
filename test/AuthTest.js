var chai = require('chai');  
var chaiHttp = require('chai-http');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();
var server = require('../auth/AuthController'); 
chai.use(chaiHttp);

describe('Authentication Controller', () => {

    const testUser = {
        userName: 'test@test.com',
        password: 'test'
    };

    describe('login success', () => {
        it('responds with status 200', done => {
            chai.request(server)
                .post('/api/auth/login')
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    const data = {
       
        jsonObject: {"baz": "qux","foo": "bar"},
        jsonPatch:{ "op": "replace", "path": "/baz", "value": "boo" }

    };
    
    describe('apply json patch success', () => {
        it('responds with status 200', done => {
            chai.request(server)
                .post('/api/auth/applyjsonpatch')
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    const url = {
        'imageUri' : 'https://www.google.com/images/srpr/logo3w.png'
       };
    describe('create thumbnail success', () => {
        it('responds with status 200', done => {
            chai.request(server)
                .post('/api/auth/createthumbnail')
                .send(url)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});