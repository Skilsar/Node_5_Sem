drop table AUDITORIUM_TYPE;
drop table FACULTY;
drop table AUDITORIUM;
drop table PULPIT;
drop table TEACHER;
drop table SUBJECT;
-------------------------------DATABASE------------------------------
CREATE TABLE FACULTY
  (
   FACULTY      CHAR(10)      NOT NULL,
   FACULTY_NAME VARCHAR(50), 
   CONSTRAINT PK_FACULTY PRIMARY KEY(FACULTY) 
  );
--select * from FACULTY;
--delete FACULTY;
insert into FACULTY   (FACULTY,   FACULTY_NAME )
             values  ('PAP',   'Publishing and printing');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  ('CTAE',   'Chemical technology and engineering');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  ('FOF',     'Faculty of Forestry');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  ('FOEAE',     'Faculty of Engineering and Economics');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  ('TAEFFI',    'Technology and equipment of the forest industry');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  ('TOOS',     'Technology of organic substances');
--------------------------------------------------------------------------------------------
CREATE TABLE PULPIT 
(
 PULPIT       CHAR(10)      NOT NULL,
 PULPIT_NAME  VARCHAR(100), 
 FACULTY      CHAR(10)      NOT NULL, 
 CONSTRAINT FK_PULPIT_FACULTY FOREIGN KEY(FACULTY)   REFERENCES FACULTY(FACULTY), 
 CONSTRAINT PK_PULPIT PRIMARY KEY(PULPIT) 
 ); 
-- select * from PULPIT;
--delete PULPIT;  
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY )
             values  ('ISIT',    'Information systems and technologies',                         'PAP'  );
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY )
             values  ('PEAIPS', 'Printing equipment and information processing systems', 'PAP'  );
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
              values  ('FF',      'Forestry',                                                 'FOF') ;         
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('HS',      'Hunting studies',                                                 'FOF') ;   
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('FM',      'Forest management',                                              'FOF');           
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('FPAWS',   'Forest protection and wood science',                               'FOF');                
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('LDALC',  'Landscape design and landscape construction','FOF');                  
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('FT',     'Forest transport',                                              'TAEFFI');                        
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('FMALT',  'Forest machines and logging technologies',                      'TAEFFI');                        
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('OC',     'Organic Chemistry',                                           'TOOS');            
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                              FACULTY)
             values  ('TOPSAPOPM','Technologies of petrochemical synthesis and processing of polymer materials','TOOS');             
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                      FACULTY)
             values  ('TOISAGCT','Technologies of inorganic substances and general chemical technology','CTAE');                    
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                                         FACULTY)
             values  ('CTOEPAMOEE','Chemistry technology of electrochemical production and materials of electronic equipment', 'CTAE');
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                      FACULTY)
             values  ('ETAM',    'economic theory and marketing',                              'FOEAE');   
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                      FACULTY)
             values  ('MAEOEM',   'Management and economics of environmental management',                      'FOEAE');    
------------------------------------------------------------------------------------------------------------------------        
CREATE TABLE TEACHER
 ( 
  TEACHER       CHAR(10) NOT  NULL,
  TEACHER_NAME  VARCHAR(50), 
  PULPIT        CHAR(10) NOT NULL, 
  CONSTRAINT PK_TEACHER  PRIMARY KEY(TEACHER), 
  CONSTRAINT FK_TEACHER_PULPIT FOREIGN   KEY(PULPIT)   REFERENCES PULPIT(PULPIT)
 ) ;
 
 
--delete  TEACHER;
insert into  TEACHER    (TEACHER,   TEACHER_NAME, PULPIT )
                       values  ('SVV',    'Smelov Vladimir Vladimirovich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('ASI',    'Akynovich Stanislav Ivanovich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('KLV',    'Kolesnikov Leonid Valerevich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('GOV',    'German Oleg Vitoldovich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('LAP',    'Lashenko Anatoliy Pavlovich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('BAV',    'Brakovich Andrey Victorovich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('DDA',     'Dedko Alexander Arkadevich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('KAS',     'Kabaylo Alexander Seraphimovich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('YPP',     'Yrbanovich Pavel Pavlovich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('RDM',     'Romanenko Dmitriy Mihaylovich',  'ISIT');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('PNN',  'Pystovalova Natalia Nikolaevna', 'ISIT' );
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('BSA',   'Bartashevich Svytoslav Alexandrovich',  'PEAIPS');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('BSI',   'Baranovskiy Stasislav Ivanovich',  'ETAM');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('NAV',   'Neverov Alexander Vasilevich',  'MAEOEM');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('RAI',   'Rokovich Andrey Ivanovich',  'HS');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('DMN', 'Demidko Marina Nikolaevna',  'LDALC');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('MVP',   'Mashkovskiy Vladimir Petrovich',  'FM');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('LKV',   'Laboha Konstantin Valentinovich',  'FF');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('ZVB',   'Zvyagincev Vacheslav Borisovich',  'FPAWS'); 
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('BVS',   'Bezborodov Vladimir Stepanovic',  'OC'); 
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('PNR',   'Prokopchyk Nikalay Romanovich',  'TOPSAPOPM'); 
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('NMT',   'Nasovec Mihail Trofimovich',  'FT'); 
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('MSP',   'Mohov Sergey Petrovich',  'FMALT'); 
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('ELS',   'Eshenko Ludmila Semenovna',  'TOISAGCT'); 
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('JIM',   'Jarski Ivan Mihaylovich',  'CTOEPAMOEE'); 
---------------------------------------------------------------------------------------------------------------------
CREATE TABLE SUBJECT
    (
     SUBJECT      CHAR(10)     NOT NULL, 
     SUBJECT_NAME VARCHAR(50)  NOT NULL,
     PULPIT       CHAR(10)     NOT NULL,  
     CONSTRAINT PK_SUBJECT PRIMARY KEY(SUBJECT),
     CONSTRAINT FK_SUBJECT_PULPIT FOREIGN  KEY(PULPIT)  REFERENCES PULPIT(PULPIT)
    );
--select * from SUBJECT;
--delete SUBJECT;
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('DMS',   'Database management systems',                   'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT)
                       values ('DB',     'Data base',                                        'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('InfT',    'Information technology',                          'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('FOAAP',  'Fundamentals of algorithmization and programming',            'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('KRICS',     'Knowledge representation in computer systems',       'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('PNA',    'Programming network applications',                 'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('MOIPS',     'Modeling of information processing systems',        'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('ISD',     'Information systems design',              'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('CG',      'Computer geometry',                           'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('PMAMAPL',   'Printing machines automatic machines and pr. lines', 'PEAIPS');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('CMS',     'Computer multimedia systems',               'ISIT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('OFPP',     'Organization of printing production',         'PEAIPS');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('EOEM',     'Economics of environmental management',                       'MAEOEM');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('ECT',     'Economic theory',                               'ETAM');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('BOFAABW','Biology of forest animals and birds with osn hunting',      'HS');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('FOGAF','Fundamentals of gardening and forestry',  'LDALC');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('EG',     'Engineering geodesy',                              'FM');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('FORE',    'Forestry',                                        'FPAWS');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('ORGCH',    'Organic Chemistry',                                 'OC');   
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('TORPR',    'Technology of rubber products',                      'TOPSAPOPM'); 
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('WTOTF',    'Water transport of the forest',                             'FT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('LTAE',   'Logging technology and equipment',           'FMALT'); 
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('MPT',   'Mineral processing technology',        'TOISAGCT');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('AELEC',    'Applied Electrochemistry',                           'CTOEPAMOEE');          
---------------------------------------------------------------------------------------------------------------------
create table AUDITORIUM_TYPE 
(
  AUDITORIUM_TYPE   char(10) constraint AUDITORIUM_TYPE_PK  primary key,  
  AUDITORIUM_TYPENAME  varchar(30) constraint AUDITORIUM_TYPENAME_NOT_NULL not null         
);

--delete AUDITORIUM_TYPE;
--select * from AUDITORIUM_TYPE;
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,   AUDITORIUM_TYPENAME )
                       values  ('LH',   'Lecture hall');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,   AUDITORIUM_TYPENAME )
                       values  ('LEWC', 'Lecture with comp');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,   AUDITORIUM_TYPENAME )
                       values  ('CHLA', 'chemistry lab');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,   AUDITORIUM_TYPENAME )
                       values  ('SCS', 'spec comp class');
---------------------------------------------------------------------------------------------------------------------
create table AUDITORIUM 
(
 AUDITORIUM           char(10) primary key,  -- ??? ?????????
 AUDITORIUM_NAME      VARCHAR(200),          -- ????????? 
 AUDITORIUM_CAPACITY  int,              -- ???????????
 AUDITORIUM_TYPE      char(10) not null      -- ??? ?????????
                      references AUDITORIUM_TYPE(AUDITORIUM_TYPE)  
);

--delete  AUDITORIUM;
--select * from  AUDITORIUM;
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('206-1',   '206-1', 'LH', 15);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY)
                       values  ('301-1',   '301-1', 'LEWC', 15);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('236-1',   '236-1', 'LH',   60);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('313-1',   '313-1', 'LH',   60);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('324-1',   '324-1', 'LH',   50);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('413-1',   '413-1', 'LEWC', 15);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('423-1',   '423-1', 'LEWC', 90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('408-2',   '408-2', 'LH',  90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('103-4',   '103-4', 'LH',  90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('105-4',   '105-4', 'LH',  90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('107-4',   '107-4', 'LH',  90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('110-4',   '110-4', 'LH',  30);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('111-4',   '111-4', 'LH',  30);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                      values  ('114-4',   '114-4', 'LEWC',  90 );
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values ('132-4',   '132-4', 'LEWC',   90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values ('02B-4',   '02B-4', 'LH',   90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values ('229-4',   '229-4', 'LH',   90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('304-4',   '304-4','LEWC', 90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('314-4',   '314-4', 'LH',  90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('320-4',   '320-4', 'LH',  90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('429-4',   '429-4', 'LH',  90);
                       
                       commit;
-----------------------------------------------------------------------------------------------------------------------
select * from AUDITORIUM_TYPE;
select * from AUDITORIUM;
select * from FACULTY;
select * from PULPIT;
select * from TEACHER;