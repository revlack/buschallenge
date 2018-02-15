CREATE DATABASE BusChallenge;   
go
USE BusChallenge;
go

CREATE TABLE [dbo].Passageiro(
	[codigoPassageiro] [bigint] IDENTITY(1,1) NOT NULL,
	[nome] [nvarchar](150) NOT NULL,
	[email] [nvarchar](150) NOT NULL,
	[cardID] [nvarchar](150) NOT NULL,
	[senha] [nvarchar](150) NOT NULL,
	[InseridoEm] [datetime] NOT NULL,
 CONSTRAINT [PK_Passageiro] PRIMARY KEY CLUSTERED 
(
	[CodigoPassageiro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].Linha(
	[codigoLinha] [int] IDENTITY(1,1) NOT NULL,
	[nome] [nvarchar](250) NOT NULL,
	[code] [nvarchar](150) NOT NULL
 CONSTRAINT [PK_Linha] PRIMARY KEY CLUSTERED 
(
	[codigoLinha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE Linha
ADD CONSTRAINT UC_Linhacode UNIQUE (code);
go

CREATE TABLE [dbo].Unidade(
	[codigoUnidade] [int] IDENTITY(1,1) NOT NULL,
	[nome] [nvarchar](150) NOT NULL	,
	[endereco] [nvarchar](750) NOT NULL	
 CONSTRAINT [PK_Unidade] PRIMARY KEY CLUSTERED 
(
	[codigoUnidade] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].Lancamento(
	[codigoLancamento] [bigint] IDENTITY(1,1) NOT NULL,
	[codigoPassageiro] [bigint] NOT NULL,
	[codigoLinha] [int],
	[codigoUnidade] [int],
	[dataLancamento] [datetime] NOT NULL,
	[valor] [decimal] NOT NULL
 CONSTRAINT [PK_Lancamento] PRIMARY KEY CLUSTERED 
(
	[codigoLancamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Lancamento]  WITH CHECK ADD  CONSTRAINT [FK_Lancamento_FK_Passageiro] FOREIGN KEY([codigoPassageiro])
REFERENCES [dbo].[Passageiro] ([codigoPassageiro])
GO

ALTER TABLE [dbo].[Lancamento]  WITH CHECK ADD  CONSTRAINT [FK_Lancamento_FK_Linha] FOREIGN KEY([codigoLinha])
REFERENCES [dbo].[Linha] ([codigoLinha])
GO

ALTER TABLE [dbo].[Lancamento]  WITH CHECK ADD  CONSTRAINT [FK_Lancamento_FK_Unidade] FOREIGN KEY([codigoUnidade])
REFERENCES [dbo].[Unidade] ([codigoUnidade])
GO
