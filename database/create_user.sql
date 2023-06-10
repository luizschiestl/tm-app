INSERT INTO users (id, first_name, last_name, email, encrypted_password, phone, username)
VALUES (
    UUID(),
    'Luiz',
    'Schiestl',
    'luiz@example.com',
    '$2b$10$UF4n.IFsgZvBDL/YFVb.eO5VkEZrLUWBNbySHZt4HSHdXmDmlwWXW',
    '1234567890',
    'luiz'
);