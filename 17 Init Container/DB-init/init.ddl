-- init.ddl
CREATE TABLE example (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll INTEGER NOT NULL
);

INSERT INTO example(name,roll) VALUES('TAMIM',43);
INSERT INTO example(name,roll) VALUES('SABIT',34);
