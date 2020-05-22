var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();
var server = require('../auth/AuthController');
chai.use(chaiHttp);

describe('Authentication Controller', () => {
    const testUser = {
        username: 'test@test.com',
        password: 'test'
    };

    describe('login success', () => {
        it('responds with status 200', () => {
            chai.request(server)
                .post('/api/auth/login')
                .send(testUser)
                .end((res) => {
                    expect(res).to.have.status(200);
                });
        });
    });

    describe('apply json patch success', () => {
        const data = {
            jsonObject: { "baz": "qux", "foo": "bar" },
            jsonPatch: { "op": "replace", "path": "/baz", "value": "boo" }
        };
        
        it('responds with status 200', () => {
            chai.request(server)
                .post('/api/auth/applyjsonpatch')
                .send(data)
                .end((res) => {
                    expect(res).to.have.status(200);
                });
        });
    });

    const url = {
        'imageUri': 'https://www.google.com/images/srpr/logo3w.png'
    };
    describe('create thumbnail success', () => {
        it('responds with status 200', () => {
            chai.request(server)
                .post('/api/auth/createthumbnail')
                .send(url)
                .end((res) => {
                    expect(res).to.have.status(200);
                });
        });
    });
});