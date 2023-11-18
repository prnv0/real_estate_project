CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

SELECT * FROM public.users
ORDER BY uid ASC 