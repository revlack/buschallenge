var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8061/v1");

// UNIT test begin

describe("No tests? No way!",function(){


  // #0 should return no acess

  it("Should return an access denied!",function(done){

    // calling home page api
    server
    .get("/home")
    .expect("Content-type",/json/)
    .expect(403) 
    .end(function(err,res){      
      res.status.should.equal(403);      
      res.body.message.should.equal("access denied!");
      done();
    });
  });



  // #1 

  it("Should return home page",function(done){

    server
    .get("/home")
    .expect("Content-type",/json/)
    .auth('Usuario', 'Senha')    
    .expect(200)    
    .end(function(err,res){      
      res.status.should.equal(200);      
      res.body.mensagem.should.equal("WebService rodando corretamente");
      done();
    });
  });


  // #2 

  it("it should create a new user",function(done){

     server
    .post('/users')
    .send({ name: "TesteMocha", email: "TesteMocha@TesteMocha.com", cardId: "TesteMocha", password: "TesteMocha" })
    .expect("Content-type",/json/)
    .auth('Usuario', 'Senha')    
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);      
      res.body.code.should.equal("success");
      done();
    });
  });

   // #2.1
  it("it should not create a new user - campos insuficientes",function(done){
    
         server
        .post('/users')
        .send({ name: "TesteMocha", cardId: "TesteMocha", password: "TesteMocha" })
        .expect("Content-type",/json/)
        .auth('Usuario', 'Senha')    
        .expect(500)
        .end(function(err,res){
          res.status.should.equal(500);      
          res.body.code.should.equal("error");
          res.body.message.should.equal("Campos insuficientes");
          done();
        });
      });
    


  
  // #3 
  it("It should delete the user",function(done){
    server
   .delete('/users')
   .send({ cardId: "TesteMocha" })
   .expect("Content-type",/json/)
   .auth('Usuario', 'Senha')    
   .expect(200)
   .end(function(err,res){
     res.status.should.equal(200);      
     res.body.code.should.equal("success");
     done();
   });
 });

 
  
  // #4
  it("It Should not find the user",function(done){
    server
   .delete('/users')
   .send({ cardId: "TesteMocha____1223" })
   .expect("Content-type",/json/)
   .auth('Usuario', 'Senha')    
   .expect(200)
   .end(function(err,res){
     res.status.should.equal(500);      
     res.body.message.should.equal("Usuário não encontrado");
     done();
   });
 });

 
  
  // #5
  it("It Should not return a list of debts by user",function(done){
    server
   .get('/debits?cardId=Card03')   
   .expect("Content-type",/json/)
   .auth('Usuario', 'Senha')    
   .expect(200)
   .end(function(err,res){
     res.status.should.equal(200);      
     res.body.should.be.instanceof(Array);
     done();
   });
 });


 
  
  // #6
  it("It Should return a list by date",function(done){
    server
   .get('/debits?initialDate=2016-01-01&finalDate=2018-10-01')   
   .expect("Content-type",/json/)
   .auth('Usuario', 'Senha')    
   .expect(200)
   .end(function(err,res){
     res.status.should.equal(200);      
     res.body.should.be.instanceof(Array);
     done();
   });
 });


   
  // #6
  it("It Should create a new debit",function(done){
    server
   .post('/debits')   
   .send({ cardId: "Card03", code: "1510", value: -1})
   .expect("Content-type",/json/)
   .auth('Usuario', 'Senha')    
   .expect(200)
   .end(function(err,res){
     res.status.should.equal(200);      
     res.body.code.should.equal("success");
     done();
   });
  });

     
  // #6
  it("It Should not create a new debit  - Campos insuficientes",function(done){
    server
   .post('/debits')   
   .send({ cardId: "Card03", value: 0})
   .expect("Content-type",/json/)
   .auth('Usuario', 'Senha')    
   .expect(200)
   .end(function(err,res){
     res.status.should.equal(500);      
     res.body.message.should.equal("Campos insuficientes");
     done();
  });
  });

    // #6
    it("It Should not create a new debit  - Sem credito",function(done){
      server
     .post('/debits')   
     .send({ cardId: "Card03", code: "1510", value: 100000000})
     .expect("Content-type",/json/)
     .auth('Usuario', 'Senha')    
     .expect(200)
     .end(function(err,res){
       res.status.should.equal(500);      
       res.body.message.should.equal("Saldo insuficiente");
       done();
    });
    });


});