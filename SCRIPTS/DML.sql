
USE BusChallenge;
go

INSERT INTO Passageiro (NOME,email,cardID,SENHA,InseridoEm) values ('Leandro Ventura', 'ventura.leandro@gmail.com', 'Card01','123', getdate())
INSERT INTO Passageiro (NOME,email,cardID,SENHA,InseridoEm) values ('Benício Ventura', 'benicio.delfino.ventura@gmail.com', 'Card02','123', getdate())
INSERT INTO Passageiro (NOME,email,cardID,SENHA,InseridoEm) values ('Usuario Teste', 'teste@gmail.com', 'Card03','123', getdate())

INSERT INTO Linha (nome,code) values ('Providencia/Altos Pinheiros', '1510')
INSERT INTO Linha (nome,code) values ('Providencia/Altos Pinheiros', '1505')

INSERT INTO Unidade (nome,endereco) values ('Providência', 'Rua x, bairro y')
INSERT INTO Unidade (nome,endereco) values ('Palmares', 'Rua z, bairro h')

insert into Lancamento (codigoPassageiro, codigoUnidade,dataLancamento, valor ) values
 ( 
	 (select codigoPassageiro from Passageiro where nome = 'Leandro Ventura' ) ,  
	 (select codigoUnidade from Unidade where nome = 'Palmares' ),
	 getdate(),
	 200
)

insert into Lancamento (codigoPassageiro, codigoUnidade,dataLancamento, valor ) values
 ( 
	 (select codigoPassageiro from Passageiro where nome = 'Benício Ventura' ) ,  
	 (select codigoUnidade from Unidade where nome = 'Palmares' ),
	 getdate(),
	 150
)

insert into Lancamento (codigoPassageiro, codigoUnidade,dataLancamento, valor ) values
 ( 
	 (select codigoPassageiro from Passageiro where nome = 'Usuario Teste' ) ,  
	 (select codigoUnidade from Unidade where nome = 'Palmares' ),
	 getdate(),
	 430
)

