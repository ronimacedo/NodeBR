DROP TABLE IF EXISTS TB_HEROIS
CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

INSERT INTO TB_HEROIS(NOME,PODER) VALUES
('Flash','Velocidade'),
('Aquaman','Falar com os animais'),
('Batman','Dinheiro')


--READ
SELECT * FROM TB_HEROIS;
SELECT * FROM TB_HEROIS WHERE NOME= 'Flash'

--update
UPDATE TB_HEROIS
SET NOME = 'Goku',PODER='deus' 
WHERE ID = 1

--delete

DELETE FROM TB_HEROIS WHERE id = 2;
SELECT * FROM TB_HEROIS;