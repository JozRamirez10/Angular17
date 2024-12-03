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
insert into user(name, lastname, email, username, password)
    values ("Joz", "Fama", "jozFama@email.com", "jozfama100", "12341234");

create table role(
    id int primary key not null auto_increment,
    name varchar(20) not null
);

create table user_role(
    id_user int not null,
    id_role int not null,
    primary key (id_user, id_role),
    constraint fk_user foreign key (id_user) 
        references user(id),
    constraint fk_role foreign key (id_role) 
        references role(id)
);

insert into role(name) values('ROLE_ADMIN');
insert into role(name) values('ROLE_USER');

insert into user_role(id_user, id_role) values (1, 2);
insert into user_role(id_user, id_role) values (2, 2);
insert into user_role(id_user, id_role) values (3, 1); 
insert into user_role(id_user, id_role) values (3, 2);