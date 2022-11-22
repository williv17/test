CREATE TABLE IF NOT EXISTS Game (
  game_id int NOT NULL PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE IF NOT EXISTS Game_User (
  play_order int,
  game_id int NOT NULL,
  game_user_game_id int,
  KEY game_user_to_game_id (game_user_game_id),
  CONSTRAINT game_user_to_game_id
    FOREIGN KEY (game_user_game_id)
    REFERENCES Game (game_id),
  user_id int,
  KEY game_user_to_user_id (user_id),
  CONSTRAINT game_user_to_user_id
    FOREIGN KEY (user_id)
    REFERENCES User (user_id)
);

CREATE TABLE IF NOT EXISTS User (
  user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(64) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  game_user_id int,
  KEY user_to_game_user_id (game_user_id),
  CONSTRAINT user_to_game_user_id
    FOREIGN KEY (game_user_id)
    REFERENCES Game_User (game_user_id)
);

CREATE TABLE IF NOT EXISTS Game_Card (
  
)

CREATE TABLE IF NOT EXISTS Job (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(45) NOT NULL,
  skills varchar(2048) NOT NULL,
  salary int NOT NULL,
  details longtext NOT NULL,
  location varchar(45) NOT NULL,
  remote_policy varchar (45) NOT NULL,
  area int NOT NULL,
  KEY job_to_area (area),
  CONSTRAINT job_to_area
    FOREIGN KEY (area)
    REFERENCES JobArea (id),
  employer int NOT NULL,
  KEY job_to_employer_id (employer),
  CONSTRAINT job_to_employer_id
    FOREIGN KEY (employer)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS Alert (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  query varchar(300),
  user int NOT NULL,
  KEY alert_to_user_id (user),
  CONSTRAINT alert_to_user_id
    FOREIGN KEY (user)
    REFERENCES User (id),
  area int,
  KEY alert_to_area (area),
  CONSTRAINT alert_to_area
    FOREIGN KEY (area)
    REFERENCES JobArea (id)
);

INSERT IGNORE INTO JobArea (id, area) VALUES
  ROW(1, "Artificial Intelligence and Machine Learning"),
  ROW(2, "Robotic Process Automation (RPA)"),
  ROW(3, "Edge Computing"),
  ROW(4, "Quantum Computing"),
  ROW(5, "Virtual Reality and Augmented Reality"),
  ROW(6, "Blockchain"),
  ROW(7, "Internet of Things (IoT)"),
  ROW(8, "5G"),
  ROW(9, "Cyber Security");

INSERT IGNORE INTO UserType (id, type) VALUES
  ROW(1, "Admin"),
  ROW(2, "Student"),
  ROW(3, "Employer");