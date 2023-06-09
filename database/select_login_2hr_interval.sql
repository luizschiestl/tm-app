SELECT u.username, u.id, la.login_time, la.status
FROM users u
JOIN login_attempts la ON u.id = la.user_id
WHERE la.login_time >= NOW() - INTERVAL 2 MINUTE;