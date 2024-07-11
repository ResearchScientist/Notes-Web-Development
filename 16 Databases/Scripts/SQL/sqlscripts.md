# Make Tables

```js
CREATE TABLE users (
user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR ( 25 ) UNIQUE NOT NULL,
email VARCHAR ( 50 ) UNIQUE NOT NULL,
full_name VARCHAR ( 100 ) NOT NULL,
last_login TIMESTAMP,
created_on TIMESTAMP NOT NULL 
);

CREATE TABLE boards (
  board_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  board_name VARCHAR (50) UNIQUE NOT NULL,
  board_description TEXT NOT NULL
);

CREATE TABLE comments (
  comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  board_id INT REFERENCES boards(board_id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  time TIMESTAMP
);

CREATE TABLE rich_content (
  content_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  comment_id INT REFERENCES comments(comment_id) ON DELETE CASCADE,
  content JSON NOT NULL
);
```

# Insert Records

```js
INSERT INTO users (username,email,full_name,created_on) VALUES ('suki','lol@meow.com','suki purr',NOW());
```

```js
INSERT INTO boards
  (board_name,board_description)
VALUES
  ('dresses','talk about how your pet dresses'),
  ('drinks','talk about your pets favourite drinks'),
  ('coffee','talk about all things coffee'),
  ('close calls','talk about how your pet has tried to take you out'),
  ('silly','talk about what your pet does'),
  ('ebike','talk about how your pet gets around'),
  ('gourmet','talk about what your pet makes for dinner'),
  ('stuff','talk about anything you want');
```

```sql
INSERT INTO boards (board_name,board_description) VALUES ('nothing','no comments here');
```

```js
INSERT INTO comments
  (user_id,board_id,comment,time)
VALUES
  (1,1,'Im user 1 and this is my first comment.','2020-10-10 10:00:00'),
  (2,2,'Im user 2 and this is my first comment.','2020-11-11 11:00:00'),
  (3,3,'Im user 3 and this is my first comment.','2020-1-1 1:00:00'),
  (4,4,'Im user 4 and this is my first comment.','2019-10-10 10:30:00'),
  (5,5,'Im user 1 and this is my second comment.','2020-11-10 10:45:00'),
  (3,6,'Im user 3 and this is my second comment.','2020-12-10 10:00:00'),
  (1,7,'Im user 1 and this is my first comment.','2020-10-10 10:00:00'),
  (2,8,'Im user 2 and this is my first comment.','2020-11-11 11:00:00'),
  (3,1,'Im user 3 and this is my first comment.','2020-1-1 1:00:00'),
  (4,2,'Im user 4 and this is my first comment.','2019-10-10 10:30:00'),
  (1,3,'Im user 1 and this is my second comment.','2020-11-10 10:45:00'),
  (3,4,'Im user 3 and this is my second comment.','2020-12-10 10:00:00');
```

```sql
INSERT INTO comments (user_id,board_id,comment,time) VALUES (1,1,,);
```

```js
INSERT INTO rich_content
  (comment_id,content)
VALUES
  (20,'{"type":"poll","question":"favourite colour?","options":["red","green","blue"]}'),
  (23,'{"type":"video","url":"https://youtu.be","dimensions":{"height":1080,"width":1920}}'),
  (23,'{"type":"poll","question":"favourite video?","options":["yes","no"]}'),
  (24,'{"type":"img","url":"https://website.com/funny.png","dimensions":{"height":50,"width":50}}');
```
