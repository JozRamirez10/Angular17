create database if not exists db_backend_users;

create table user(
    id int primary key not null auto_increment,
    name varchar(45) null,
    lastname varchar(45) null,
    email varchar(70) null,
    username varchar(45) unique null,
    password varchar(60) null
);

insert into user(name, lastname, email, username, password)
    values ("José", "Ramírez", "jose@email.com", "jose", "1234");
insert into user(name, lastname, email, username, password)
    values ("Miguel", "González", "miguel@email.com", "miguel", "1234");
