INSERT INTO users (name, email, password, role)
VALUES
    ('Eliza', 'eliza@example.com', 'password', 'ADMIN'),
    ('John', 'john@email.com', 'password', 'USER'),
    ('Jane', 'jane@email.com', 'password', 'USER'),
    ('Titan', 'titan@cat.com', 'password', 'USER');

INSERT INTO requests (user_id, hardware_type, parameters, justification, request_time, status)
VALUES
    (1, 'LAPTOP', '16GB RAM, 512GB SSD, i7 Processor', 'Need a powerful laptop for software development', '2024-02-02 10:30:00', 'PENDING'),
    (2, 'MONITOR', '27-inch, 144Hz, 4K resolution', 'Better display for graphic design work', '2024-02-02 11:00:00', 'APPROVED'),
    (3, 'KEYBOARD', 'Mechanical, RGB backlight, Cherry MX Red', 'Need a more comfortable keyboard for typing', '2024-02-02 11:30:00', 'REJECTED'),
    (4, 'MOUSE', 'Wireless, ergonomic design, programmable buttons', 'Ergonomic improvement for long work hours', '2024-02-02 12:00:00', 'PENDING'),
    (1, 'OTHER', 'External SSD, 1TB', 'Need additional storage for large projects', '2024-02-02 12:30:00', 'PENDING'),
    (2, 'LAPTOP', '8GB RAM, 256GB SSD, i5 Processor', 'Basic laptop for office work', '2024-02-02 13:00:00', 'APPROVED'),
    (3, 'MONITOR', '24-inch, 75Hz, Full HD', 'Second monitor for productivity', '2024-02-02 13:30:00', 'PENDING'),
    (4, 'KEYBOARD', 'Wireless, low-profile keys', 'Wireless convenience for remote work', '2024-02-02 14:00:00', 'APPROVED');
