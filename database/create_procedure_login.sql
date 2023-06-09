DELIMITER //

CREATE PROCEDURE LoginUser(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE v_user_id CHAR(36);
    DECLARE v_encrypted_password VARCHAR(255);
    DECLARE p_login_status ENUM('not_found', 'success', 'fail');
    
    SELECT id, encrypted_password INTO v_user_id, v_encrypted_password
    FROM users
    WHERE users.username = p_username;
    
    IF v_user_id IS NOT NULL THEN
        IF v_encrypted_password = p_password THEN
            SET p_login_status = 'success';
        ELSE
            SET p_login_status = 'fail';
        END IF;
        
        INSERT INTO login_attempts (id, user_id, status)
        VALUES (UUID(), v_user_id, p_login_status);
    ELSE
        SET p_login_status = 'not_found';
    END IF;

    SELECT p_login_status AS login_status;
END //

DELIMITER ;