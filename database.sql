-- DATABASE

CREATE DATABASE HPMS;

-- USER TABLE 

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    dob DATE,
    email VARCHAR(255) UNIQUE,
    profile_image BLOB
);

-- TRACK
CREATE TABLE track (
    track_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    duration TIME,
    genre VARCHAR(255),
    audio BLOB
);


-- RECENTLY PLAYED

CREATE TABLE recently_played (
    user_id INT,
    `order` INT,
    track_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (track_id) REFERENCES track(track_id)
);


-- PLAYLIST

CREATE TABLE playlist (
    playlist_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    image BLOB,
    doc DATE,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES user(user_id)
);

-- USER PLAYLIST

CREATE TABLE user_playlist (
    playlist_id INT,
    user_id INT,
    FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);


-- ARTIST

CREATE TABLE artist (
    artist_id INT PRIMARY KEY AUTO_INCREMENT,
    artist_name VARCHAR(255)
);


-- ALBUM

CREATE TABLE album (
    album_id INT PRIMARY KEY AUTO_INCREMENT,
    artist_id INT,
    doc DATE,
    name VARCHAR(255),
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);


-- PODCAST

CREATE TABLE podcast (
    podcast_id INT PRIMARY KEY AUTO_INCREMENT,
    doc DATE,
    duration TIME,
    artist_id INT,
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);


-- COMPOSED

CREATE TABLE composed (
    track_id INT,
    artist_id INT,
    FOREIGN KEY (track_id) REFERENCES track(track_id),
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);

-- PLAYLIST_SONGS
CREATE TABLE playlist_songs (
    playlist_id INT,
    track_id INT,
    FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id),
    FOREIGN KEY (track_id) REFERENCES track(track_id)
);

-- Indexes to optimse the query

CREATE INDEX idx_track_name ON track(name);
CREATE INDEX idx_playlist_name ON playlist(name);


-- Query to retrive a SONG

-- -- Based on id
    SELECT * FROM track WHERE track_id = <song_id>;

-- -- Based on Full Name
    SELECT * FROM track WHERE name = 'song_name' LIMIT 10;

-- -- Based on Partial Name
    SELECT * FROM track WHERE name LIKE '%search_term%' LIMIT 10;

-- Query to retrive a Playlist

-- -- Based on id
    SELECT * FROM playlist WHERE playlist_id = 'playlist_id'
-- -- Based on Full Name
    SELECT * FROM playlist WHERE name = 'playlist_name' LIMIT 10;
-- -- Based  on Partial Name
    SELECT * FROM playlist WHERE name LIKE '%your_search_term%' LIMIT 10;

-- Query to retrive ALBUM

-- -- Based on id
    SELECT album.*, artist.artist_name FROM album
    JOIN artist ON album.artist_id = artist.artist_id
    WHERE album.name = 'album_name';

-- -- Based on Full Name
    SELECT album.*, artist.artist_name
    FROM album
    JOIN artist ON album.artist_id = artist.artist_id
    WHERE album.album_id = 'album_id' LIMIT 10;



-- -- Based  on Partial Name
    SELECT album.*, artist.artist_name FROM album
    JOIN artist ON album.artist_id = artist.artist_id
    WHERE album.name LIKE '%search_term%' LIMIT 10;






-- Query to retrive all songs of a playlist
SELECT track.*
FROM playlist_songs
JOIN track ON playlist_songs.track_id = track.track_id
WHERE playlist_songs.playlist_id = 'playlist_id';


-- Query to retrive all songs of album
SELECT track.*,album.*
FROM track
JOIN composed ON track.track_id = composed.track_id
JOIN album ON composed.artist_id = album.artist_id
WHERE album.album_id = 'album_id';

-- Query to retrive recently played songs

SELECT 
    track_id,
    name,
    genre
FROM recently_played
JOIN track ON recently_played.track_id = track.track_id
WHERE recently_played.user_id = 'your_user_id'
ORDER BY recently_played.`order` DESC;

--Query to retrive playlist that user created
SELECT * FROM playlist WHERE owner_id = 'user_id';

-- Query to insert user data 

INSERT INTO user (username, password_hash, dob, email, profile_image)
VALUES ('name', 'hash', 'date', 'email', image_data);


-- Query to add a new Playlist

INSERT INTO playlist (name, image, doc, owner_id)
VALUES ('name', image_data, 'date', user_id);

-- Query to add a new song to the playlist

INSERT INTO playlist_songs (playlist_id, track_id)
VALUES ('playlist_id', 'track_id');



-- --- SOME USEFULL QUERY FOR AUTOMATION -- ---

-- Adding tracks to the database
INSERT INTO track (name, duration, genre, audio)
VALUES ('name', '00:03:30', 'Pop,..,', audio_data);

-- Adding artist
INSERT INTO artist (artist_name)
VALUES ('name');

-- Adding album
INSERT INTO album (artist_id, doc, name)
VALUES ('artist_id', '2023-10-20', 'name');

-- Adding songs of album
INSERT INTO album (artist_id, doc, name)
VALUES ('artist_id', '2023-10-20', 'name');
