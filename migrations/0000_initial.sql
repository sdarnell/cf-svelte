-- Migration number: 0000 	 2023-09-25T21:00:01.014Z

CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	email TEXT,
	createdAt DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
