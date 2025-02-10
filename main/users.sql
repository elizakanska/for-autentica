create table users
(
    id       INTEGER
        primary key autoincrement,
    name     TEXT not null,
    email    TEXT not null,
    role     TEXT,
    password TEXT not null,
    check (role IN ('ADMIN', 'USER'))
);

