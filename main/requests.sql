create table requests
(
    id            INTEGER
        primary key autoincrement,
    hardware_type TEXT not null,
    parameters    TEXT not null,
    justification TEXT not null,
    request_time  DATETIME default CURRENT_TIMESTAMP,
    status        TEXT not null,
    user_id       INTEGER
        constraint userId
            references users
            on delete cascade,
    check (hardware_type IN ('LAPTOP', 'MONITOR', 'KEYBOARD', 'MOUSE', 'OTHER')),
    check (status IN ('PENDING', 'APPROVED', 'REJECTED'))
);

