CREATE SEQUENCE refresh_token_seq START 1;




CREATE TABLE refresh_token (
    id BIGINT PRIMARY KEY DEFAULT nextval('refresh_token_seq'),
    token VARCHAR(500) UNIQUE NOT NULL,
    user_id INTEGER NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_refresh_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
