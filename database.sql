-- DATABASE

CREATE DATABASE HPMS;

-- USER TABLE 


CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    dob DATE,
    profile_image BLOB
);

INSERT INTO User (username, email) VALUES ('JohnDoe', 'johndoe@example.com');

UPDATE User SET username = 'NewUsername', email = 'newemail@example.com',dob = '1992-03-20',image = 'binary_image_data' WHERE id = 'user_id';

SELECT * FROM User WHERE id = 'your_user_id';

-----------------------------------------------------------------------

-- TRACK
CREATE TABLE track (
    track_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    duration TIME,
    audio_blob BLOB,
    audio_url VARCHAR(255),
    image_url VARCHAR(255),
    image_blob BLOB
);

DELIMITER $$

CREATE PROCEDURE SearchItemsByTypeAndName(
    IN itemType ENUM('track', 'album', 'podcast', 'playlist'),
    IN partialName VARCHAR(255)
)
BEGIN
    DECLARE query VARCHAR(500);

    SET query = CASE
        WHEN itemType = 'track' THEN
            CONCAT(
                'SELECT track.track_id, track.name AS track_name, track.image_url, track.image_blob, artist.artist_name ',
                'FROM track ',
                'LEFT JOIN composed ON track.track_id = composed.track_id ',
                'LEFT JOIN artist ON composed.artist_id = artist.artist_id ',
                'WHERE track.name LIKE ? LIMIT 10;'
            )
        WHEN itemType = 'album' THEN
            CONCAT(
                'SELECT album.album_id, album.name AS album_name, artist.artist_name, album.image_url, album.image_blob ',
                'FROM album ',
                'INNER JOIN artist ON album.artist_id = artist.artist_id ',
                'WHERE album.name LIKE ? LIMIT 10;'
            )
        WHEN itemType = 'podcast' THEN
            CONCAT(
                'SELECT podcast.podcast_id, podcast.name AS podcast_name, artist.artist_name, podcast.image_blob, user.username AS user_name ',
                'FROM podcast ',
                'INNER JOIN artist ON podcast.artist_id = artist.artist_id ',
                'INNER JOIN user ON artist.user_id = user.user_id ',
                'WHERE podcast.name LIKE ? LIMIT 10;'
            )
        WHEN itemType = 'playlist' THEN
            CONCAT(
                'SELECT playlist.playlist_id, playlist.name AS playlist_name, user.username AS user_name, playlist.image_blob ',
                'FROM playlist ',
                'INNER JOIN user ON playlist.owner_id = user.user_id ',
                'WHERE playlist.name LIKE ? LIMIT 10;'
            )
        ELSE
            CONCAT(
                'SELECT * FROM ',
                itemType,
                ' WHERE name LIKE ? LIMIT 10;'
            )
    END;

    SET @partialName = CONCAT('%', partialName, '%');

    PREPARE stmt FROM query;
    EXECUTE stmt USING @partialName;
    DEALLOCATE PREPARE stmt;
END $$

DELIMITER ;





DELIMITER $$

CREATE PROCEDURE RetrieveItemDetailsByID(
    IN itemType ENUM('track', 'album', 'podcast', 'playlist'),
    IN itemID INT
)
BEGIN
    CASE itemType
        WHEN 'track' THEN
            SELECT  track.audio_url, track.audio_blob
            FROM track
            WHERE track.track_id = itemID;

        WHEN 'album' THEN
            SELECT  track.track_id, track.name AS track_name, track.image_blob, track.image_url
            FROM album
            INNER JOIN artist ON album.artist_id = artist.artist_id
            LEFT JOIN composed ON album.album_id = composed.track_id
            LEFT JOIN track ON composed.track_id = track.track_id
            WHERE album.album_id = itemID;

        WHEN 'podcast' THEN
            SELECT  podcast.audio_blob
            FROM podcast
            WHERE podcast.podcast_id = itemID;

        WHEN 'playlist' THEN
            SELECT  track.track_id, track.name AS track_name, track.image_blob, track.image_url
            FROM playlist
            INNER JOIN user ON playlist.owner_id = user.user_id
            LEFT JOIN playlist_songs ON playlist.playlist_id = playlist_songs.playlist_id
            LEFT JOIN track ON playlist_songs.track_id = track.track_id
            WHERE playlist.playlist_id = itemID;
    END;
END $$

DELIMITER ;



------------------------------------------------------------


-- RECENTLY PLAYED
CREATE TABLE recently_played (
    user_id INT,
    `order` INT,
    track_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (track_id) REFERENCES track(track_id)
);

SELECT recently_played.`order`, track.name, track.image_url, track.image_blob FROM recently_played JOIN track ON recently_played.track_id = track.track_id
WHERE recently_played.user_id = 'your_user_id'
ORDER BY recently_played.`order` DESC;


DELIMITER $$

CREATE PROCEDURE UpdateRecentlyPlayed(
    IN user_id INT,
    IN track_id INT
)
BEGIN
    DECLARE track_order INT;

    -- Check if the track is already in recently_played
    SELECT `order` INTO track_order
    FROM recently_played
    WHERE user_id = user_id AND track_id = track_id;

    IF track_order IS NOT NULL THEN
        -- The track is already in recently_played, set its order to 1
        UPDATE recently_played
        SET `order` = 1
        WHERE user_id = user_id AND track_id = track_id;

        -- Update the order for other tracks
        UPDATE recently_played
        SET `order` = `order` + 1
        WHERE user_id = user_id AND track_id <> track_id AND `order`<track_order;
    ELSE
        -- The track is not in recently_played, insert with order 1
        INSERT INTO recently_played (user_id, track_id, `order`)
        VALUES (user_id, track_id, 1);

        -- Update the order for other tracks
        UPDATE recently_played
        SET `order` = `order` + 1
        WHERE user_id = user_id;

        -- Remove excess tracks (if more than 10)
        DELETE FROM recently_played
        WHERE user_id = user_id AND `order` > 10;
    END IF;
END $$

DELIMITER ;



-- PLAYLIST

CREATE TABLE playlist (
    playlist_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    image_blob BLOB,
    doc DATE,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES User(id)
);

INSERT INTO playlist (name, owner_id, doc, image_blob)
VALUES ('Your Playlist Name', 'owner_id_value', '2023-10-20', 'binary_image_data');

DELETE FROM playlist WHERE playlist_id = 'your_playlist_id';

-- USER PLAYLIST

CREATE TABLE user_playlist (
    playlist_id INT,
    user_id INT,
    FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

SELECT p.*
FROM playlist p
WHERE p.owner_id = 'your_user_id'
UNION
SELECT p.*
FROM playlist p
WHERE p.playlist_id IN (
    SELECT up.playlist_id
    FROM user_playlist up
    WHERE up.user_id = 'your_user_id'
);


SELECT playlist.*
FROM playlist
WHERE playlist.owner_id = 'your_user_id';



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
    name VARCHAR(255) NOT NULL,
    doc DATE,
    duration TIME,
    user_id INT,
    image_blob BLOB,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

INSERT INTO podcast (name, doc, duration, artist_id, image_blob)
VALUES ('Your Podcast Name', '2023-10-20', '00:45:00', 'user_id_value', 'binary_image_data');


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
CREATE INDEX idx_album_name ON album(name);
CREATE INDEX idx_podcast_name ON podcast(name);



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



INSERT INTO user (username, password_hash, dob, email, profile_image)
VALUES ('name', 'hash', 'date', 'email', image_data);


-- Query to add a new Playlist

INSERT INTO playlist (name, image, doc, owner_id)
VALUES ('name', image_data, 'date', user_id);

-- Query to add a new song to the playlist

INSERT INTO playlist_songs (playlist_id, track_id)
VALUES ('playlist_id', 'track_id');



