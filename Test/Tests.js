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

  it("Should create a new user",function(done){

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


  
  // #3 
  it("Should delete the user",function(done){
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
  it("Should dont find the user",function(done){
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

 
  
  // #4
  it("Should dont return a list of debts by user",function(done){
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


 
  
  // #5
  it("Should dont return a list by date",function(done){
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





});