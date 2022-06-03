import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

import Usermockado from '../tests/mocks/user'

chai.use(chaiHttp);

const { expect } = chai;

describe('01 - Login com sucesso', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(User, 'findOne')
       .resolves({
         ...Usermockado
       } as User);
   });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('quando dados são passados corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'hellokitty@hellokitty.com',
        password: 'secret_admin'
       });
       
     expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse.body.user).to.have.property('id');
     expect(chaiHttpResponse.body.user).to.have.property('username');
     expect(chaiHttpResponse.body.user).to.have.property('role');
     expect(chaiHttpResponse.body.user).to.have.property('email');
     expect(chaiHttpResponse.body).to.have.property('token');
     expect(chaiHttpResponse.body.user).to.not.have.property('password');
   });
})

describe('01 - Login - rota sem sucesso quando', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(null);
      });
 
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('é passado e-mail errado', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({
          email: 'hello@hellokitty.com',
          password: 'secret_admin'
         });

       expect(chaiHttpResponse.status).to.be.equal(401);
     });
  });
