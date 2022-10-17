/*------------------------
-- AGUSTIN IANCHINA
 MODULO SQL TRABAJO FINAL
--------------------------*/
-- crear base de datos
drop database if exists tiendasaplicaciones;
create database tiendasaplicaciones;
use tiendasaplicaciones;
-- borrar tablas
drop table if exists empleados;
drop table if exists empresa;
drop table if exists aplicaciones;
drop table if exists tienda;
drop table if exists usuario;
drop table if exists suben;
drop table if exists descarga;
drop table if exists trabajan;
drop table if exists desarrolla;
drop table if exists empleados_empresa;

-- crear tablas
create table empleados(
dni char(9) NOT NULL,
dirección varchar(50) default NULL,
pais varchar(50) default NULL,
cp varchar(10) default NULL,
telefono char(9) default null,
email_empleado varchar(50) default NULL,
primary key(dni),
check (99999999<dni<=999999999)
);
create table empresa(
nombre_empresa varchar(50) not null,
web varchar(50) default null, 
pais varchar(50) default null, 
año_creacion year default null,
email_empresa varchar(50) unique key default null,
primary key(nombre_empresa)
);
create table aplicaciones(
nombre_app varchar(50) not null, 
codigo varchar(50) unique key not null, 
memoria decimal not null,
categoria varchar(50) not null, 
precio decimal not null,
dni char(9) not null, -- empleado quien dirige el desarrollo de la app
nombre_empresa varchar(50) not null, -- empresa que desarrolla la app
fecha_incio_app date not null, -- fecha de inicio de desarrollo de la app
fecha_fin_app date not null, -- fecha de finalización de desarrollo de la app
primary key(nombre_app),
foreign key(dni) references empleados(dni) on delete restrict on update cascade,
foreign key(nombre_empresa) references empresa(nombre_empresa) on delete restrict on update cascade
);
create table tienda(
nombre_tienda varchar(50) not null,
web varchar(50) unique key not null,
primary key(nombre_tienda)
);
create table usuario(
cuenta varchar(50) not null,
direción_usu varchar(50),
pais varchar(50) not null,
nombre_usuario varchar(50) not null,
primary key(cuenta)
);
create table suben(
nombre_tienda varchar(50) not null,
nombre_app varchar(50) not null,
primary key(nombre_tienda, nombre_app),
foreign key(nombre_tienda) references tienda(nombre_tienda) on delete restrict on update cascade,
foreign key(nombre_app) references aplicaciones(nombre_app) on delete restrict on update cascade
);
create table descarga(
cuenta varchar(50) not null,
nombre_app varchar(50) not null,
puntuacion dec,
comentario varchar(100),
numero_celular char(9) not null,
fecha_desc date not null,
primary key(cuenta, nombre_app),
foreign key (cuenta) references usuario(cuenta) on delete restrict on update cascade,
foreign key (nombre_app) references aplicaciones(nombre_app) on delete restrict on update cascade,
check (0<=puntuacion<=5)
);
create table trabajan(
dni char(9) not null,
nombre_empresa varchar(50) not null,
fecha_inicio_work date not null,
fecha_fin_work date default null, -- si null entonces trabajo actual 
primary key(dni, nombre_empresa, fecha_inicio_work),
foreign key(dni) references empleados(dni) on delete restrict on update cascade,
foreign key(nombre_empresa) references empresa(nombre_empresa) on delete restrict on update cascade
);
create table desarrolla(
dni char(9) not null,
nombre_app varchar(50) not null,
primary key(dni, nombre_app),
foreign key(dni) references empleados(dni) on delete restrict on update cascade,
foreign key(nombre_app) references aplicaciones(nombre_app) on delete restrict on update cascade
);

-- insertar valores en las tablas
insert into empleados values('111111111', 'avenida 1 123', 'pais_1', '2244', '012345678', 'empleado1@hola.com');
insert into empleados values('222222222', 'avenida 2 456', 'pais_2', '7777', '777888444', 'empleado2@hola.com');
insert into empleados values('333333333', 'avenida 3 8484', 'pais_2', '0127777', '888444666', 'empleado3@hola.com');
insert into empleados values('444444444', 'avenida 11 884', 'pais_2', '9789', '555222111', 'empleado4@hola.com');

insert into empresa values('empresa1', 'www.empresa1.com', 'pais_1', '2015', 'info@empresa1.com');
insert into empresa values('empresa2', 'www.empresa2.com', 'pais_1', '2005', 'info@empresa2.com');
insert into empresa values('empresa3', 'www.empresa3.com', 'pais_2', '2010', 'info@empresa3.com');
insert into empresa values('empresa4', 'www.empresa4.com', 'pais_3', '2012', 'info@empresa4.com');

insert into aplicaciones values('app1', 'codigoapp1', '50', 'audiolibros', '32', '111111111', 'empresa1', '2015-01-19', '2015-09-21');
insert into aplicaciones values('app2', 'codigoapp2', '12', 'musica', '15', '111111111', 'empresa1', '2015-02-19', '2017-12-21');
insert into aplicaciones values('app3', 'codigoapp3', '20', 'entretenimiento', '21', '222222222', 'empresa2', '2011-02-19', '2012-12-21');
insert into aplicaciones values('app4', 'codigoapp4', '31', 'turismo', '11', '444444444', 'empresa3', '2011-02-19', '2012-12-21');

insert into tienda values('tienda1', 'www.tienda1.com');
insert into tienda values('tienda2', 'www.tienda2.com');
insert into tienda values('tienda3', 'www.tienda3.com');

insert into usuario values('cuenta1', 'avenida 4 123', 'pais_2', 'usuario1');
insert into usuario values('cuenta2', 'avenida 5 123', 'pais_2', 'usuario2');
insert into usuario values('cuenta3', 'avenida 6 123', 'pais_3', 'usuario3');
insert into usuario values('cuenta4', 'avenida 6 13', 'pais_3', 'usuario3');

insert into suben values('tienda1', 'app1');
insert into suben values('tienda2', 'app1');
insert into suben values('tienda1', 'app2');

insert into descarga values('cuenta1', 'app1', '5', 'una genialidad', '456456789','2021-05-31');
insert into descarga values('cuenta1', 'app2', '4', 'excelente', '456456789','2021-06-30');
insert into descarga values('cuenta2', 'app1', '2', 'no me gusta', '987978987','2021-05-31');
insert into descarga values('cuenta4', 'app1', '3', 'no me gusta', '484595484','2020-05-20');

insert into trabajan(dni, nombre_empresa, fecha_inicio_work) values('111111111', 'empresa1', '2016-05-05');
insert into trabajan(dni, nombre_empresa, fecha_inicio_work) values('222222222', 'empresa2', '2007-06-06');
insert into trabajan(dni, nombre_empresa, fecha_inicio_work) values('333333333', 'empresa1', '2016-07-07');
insert into trabajan(dni, nombre_empresa, fecha_inicio_work, fecha_fin_work) values('444444444', 'empresa1', '2016-05-05', '2021-05-05');
insert into trabajan(dni, nombre_empresa, fecha_inicio_work, fecha_fin_work) values('444444444', 'empresa3', '2010-05-05', '2012-05-05');

insert into desarrolla values('333333333', 'app1');
insert into desarrolla values('444444444', 'app2');

-- 1) cuáles son las empresas que han desarrollado apps?
select (nombre_empresa) from aplicaciones inner join desarrolla on aplicaciones.nombre_app=desarrolla.nombre_app group by nombre_empresa;

-- 2) empresas que tienen aplicaciones
select distinct(nombre_empresa) from trabajan;

-- 3) empresas que no tienen aplicaciones
select empresa.nombre_empresa from empresa left join aplicaciones on empresa.nombre_empresa = aplicaciones.nombre_empresa where aplicaciones.nombre_empresa is null;

-- 4) empresas que han subido apps a alguna tienda
select nombre_empresa from aplicaciones inner join suben on aplicaciones.nombre_app=suben.nombre_app group by nombre_empresa;

-- 5) empresas que tienen apps pero no las han subido a la tienda
select nombre_empresa from aplicaciones left join suben on aplicaciones.nombre_app=suben.nombre_app where suben.nombre_app is null group by nombre_empresa;

-- 6) cual es la app mas descargada?
 select nombre_app, count(nombre_app) from descarga group by nombre_app having count(nombre_app) =
 (select max(cuenta) from (select nombre_app, count(nombre_app) cuenta from descarga group by nombre_app)
 as table1);
 
 -- 7) en que país hay más descargas?
select pais, count(pais) from descarga left join usuario on descarga.cuenta = usuario.cuenta group by pais order by count(pais) desc;

-- 8) en qué país se ha descargado más veces la app más descargada? utilizamos la consulta 6 para crear una view
create view app_mas_descargada as SELECT nombre_app, count(nombre_app) from descarga group by nombre_app having count(nombre_app) =
 (select max(cuenta) from (select nombre_app, count(nombre_app) cuenta from descarga group by nombre_app)
 as table1);
select pais, count(pais) from descarga left join usuario on descarga.cuenta = usuario.cuenta where descarga.nombre_app = (select nombre_app from app_mas_descargada);

-- 9) cuál es la experiencia de los empleados en su trabajo actual?
select dni, (datediff(curdate(),fecha_inicio_work))/365 as 'experiencia trabajo actual' FROM TRABAJAN where fecha_fin_work is null;

-- 10) cuál es la experiencia de los empleados en su trabajo previo?
select dni, sum((datediff(fecha_fin_work, fecha_inicio_work)/365)) as 'experiencia trabajo previo' from trabajan where fecha_fin_work is not null group by dni;

-- 11) cuál es la experiencia en años, sumada, de cada uno de los empleados?
create view experiencia_previa as SELECT dni, (datediff(fecha_fin_work, fecha_inicio_work)/365) as experiencia_trabajo_previo from trabajan where fecha_fin_work is not null;
create view experiencia_actual as SELECT dni, (datediff(curdate(),fecha_inicio_work))/365 as experiencia_trabajo_actual FROM TRABAJAN where fecha_fin_work is null;
select dni, sum(experiencia_trabajo_previo) from (select * from experiencia_previa union all select * from experiencia_actual) as table2 group by dni;

-- 12) cuál es el promedio de puntuación de cada app?
select nombre_app, avg(puntuacion) from descarga group by nombre_app order by avg(puntuacion) desc;

-- 13) cuál trabajador dirigió la app con el mejor promedio de puntuación? tomamos la consulta 12 para la puntuación media de cada app.
create view avg_app as select nombre_app, avg(puntuacion) as avg_puntuacion from descarga group by nombre_app order by avg_puntuacion desc;
select dni, avg_puntuacion from aplicaciones left join avg_app on aplicaciones.nombre_app = avg_app.nombre_app where avg_app.nombre_app is not null
having(avg_puntuacion = (select max(avg_puntuacion) from avg_app as table3));

-- 14) en qué época del año hay más descargas?
select year(fecha_desc), month(fecha_desc), count(fecha_desc) from descarga group by year(fecha_desc), month(fecha_desc);

-- 15) cuál es el precio y categoría de la app más descargada? (tomamos la consulta 6 para identificar la app más descargada)
create view app_masdesc as select nombre_app, count(nombre_app) from descarga group by nombre_app having count(nombre_app) =
 (select max(cuenta) from (select nombre_app, count(nombre_app) cuenta from descarga group by nombre_app)
 as table1);
 select aplicaciones.nombre_app, precio, categoria from aplicaciones inner join app_masdesc on aplicaciones.nombre_app = app_masdesc.nombre_app;
 
-- 16) cuál es la edad de cada una de las empresas que ha subido apps?
-- tomamos la consulta 12 para la puntuación promedio(esta view ya fue creada, por eso se coloca como comentario):
-- create view avg_app as select nombre_app, avg(puntuacion) as avg_puntuacion from descarga group by nombre_app order by avg_puntuacion desc;
-- tomamos la consulta 4 para las empresas que han subido apps:
create view empr_suben as select nombre_empresa from aplicaciones inner join suben on aplicaciones.nombre_app=suben.nombre_app group by nombre_empresa;
create view edad_empr as select nombre_empresa, (year(curdate())-año_creacion) as edad_empresa from empresa;
select empr_suben.nombre_empresa, edad_empresa from empr_suben inner join edad_empr on empr_suben.nombre_empresa = edad_empr.nombre_empresa group by nombre_empresa;

-- 17) cuál es la puntuación promedio de todas las descargas por empresa?
-- tomamos la consulta 12 para la puntuación promedio(esta view ya fue cread, por eso se coloca como comentario):
-- create view avg_app as select nombre_app, avg(puntuacion) as avg_puntuacion from descarga group by nombre_app order by avg_puntuacion desc;
select nombre_empresa, avg(avg_puntuacion) from aplicaciones inner join avg_app on aplicaciones.nombre_app = avg_app.nombre_app group by nombre_empresa;

-- 18) en qué país hay más empleados actualemnte? en qué empresas trabajan?
create view trabajadores_actuales as select * from trabajan where fecha_fin_work is null;
select * from trabajadores_actuales;
select pais, count(pais) from empleados inner join trabajadores_actuales on empleados.dni = trabajadores_actuales.dni group by pais;
select nombre_empresa, count(nombre_empresa) from empleados inner join trabajadores_actuales on empleados.dni = trabajadores_actuales.dni group by nombre_empresa;

-- 19) cantidad de empleados trabjando en la empresa
create view empleados_empresa_view as select nombre_empresa, count(dni) from trabajan where fecha_fin_work is null group by nombre_empresa;

-- trigger "contar empleados en cada empresa"
create table empleados_empresa(
id int auto_increment,
nombre_empresa varchar(50) not null,
cantidad_empleados_contratados int default 0, 
primary key(id),
foreign key(nombre_empresa) references empresa(nombre_empresa) on delete restrict on update cascade
);

-- trigger
-- drop trigger if exists contar_empleados_empresa;
delimiter $$
create trigger empleados_empresa before insert on trabajan for each row begin
insert into empleados(dni) values(new.dni);
-- insert into empresa(nombre_empresa) values(new.nombre_empresa);
insert into empleados_empresa(nombre_empresa) values(new.nombre_empresa);
update empleados_empresa set cantidad_empleados_contratados = cantidad_empleados_contratados + 1 where nombre_empresa = new.nombre_empresa;
end$$
delimiter ;

insert into trabajan(dni, nombre_empresa, fecha_inicio_work) values('999999999', 'empresa1', '2017-05-05');
insert into trabajan(dni, nombre_empresa, fecha_inicio_work) values('888888888', 'empresa1', '2017-05-05');
insert into trabajan(dni, nombre_empresa, fecha_inicio_work) values('499499499', 'empresa2', '2017-05-05');

select nombre_empresa, count(cantidad_empleados_contratados) as contrataciones_llevadas_a_cabo from empleados_empresa group by nombre_empresa;

select * from empleados_empresa_view;