import axios from "axios";

const baseUrl = 'http://fedora:8000'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const UserSignup = async (username, email,password) => {
    try {
        const res = await axios.post(baseUrl + '/signup', {
            "username": username,
            "email": email,
            "password":password
        })
        console.log(res)
        return res.data
    }
    catch (error) {
        throw (error)
    }
}










function extractTestValue(inputString) {
    const match = inputString.match(/'([^']*)'/);

    // Check if a match is found
    if (match) {
        return match[1];
    } else {
        return inputString;
    }
}











export function readChunks(file, onChunkLoad, onFinished, CHUNK_SIZE = 1024 * 1024) {
    const fileSize = file.size;
    let offset = 0;

    function readNextChunk() {
        const reader = new FileReader();

        reader.onload = function (event) {
            const chunk = new Uint8Array(event.target.result);
            onChunkLoad(chunk);

            if (offset < fileSize) {
                readNextChunk();
            } else {
                onFinished();
            }
        };

        const end = Math.min(offset + CHUNK_SIZE, fileSize);
        const chunk = file.slice(offset, end);
        reader.readAsArrayBuffer(chunk);
        offset = end;
    }

    readNextChunk();
}


export const BlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64data = reader.result.split(',')[1]; // Extract Base64 data
            resolve(base64data);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
};

export const HandleFileChange = async (event, MAX_FILE_SIZE_MB = 50) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        const fileSizeMB = selectedFile.size / (1024 * 1024); // Convert to MB

        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            alert(
                "File size exceeds the limit (50MB). Please choose a smaller file."
            );
            fileInput.value = "";
            return;
        }

        const chunks = [];

        // Process each chunk asynchronously
        await new Promise((resolve) => {
            readChunks(
                selectedFile,
                (chunk) => {
                    chunks.push(chunk);
                },
                resolve
            );
        });

        const concatenatedBlob = new Blob(chunks, { type: selectedFile.type });
        return concatenatedBlob

    }
    return null
}

export const User = async (username, email) => {
    console.log(username, email)
    try {
        const res = await axios.post(baseUrl + '/addUser', {
            "userName": username,
            "email": email
        })
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}

export const GetUserDetails = async (uid) => {
    try {
        const res = await axios.get(baseUrl + '/userDetails', {
            params: { "userID": uid }
        })
        return res.data.result[0]

    }
    catch (error) {
        throw (error)
    }
}


export const UpdateUserDetails = async (uid, profile, dob, userName, email) => {
    try {
        const res = await axios.post(baseUrl + '/updateUserDeatils', {
            "profile": profile,
            "dob": dob,
            "userName": userName,
            "email": email,
            "userID": uid
        })
        // console.log(res.data)
        return res.data.result

    }
    catch (error) {
        throw (error)
    }
}

export const StoreLocal = (key, value) => {
    window.localStorage.setItem(key, value)
}

export const GetLocal = (key) => {
    return window.localStorage.getItem(key)
}


export const GetRecentlyPlayed = async (userID) => {
    try {
        const res = await axios.get(baseUrl + `/getRecentlyPlayed`, {
            params: { "userID": userID }
        })
        return await res.data
    }
    catch (error) {
        throw (error)
    }
}

export const GetTop10 = async () => {
    try {
        const res = await axios.get(baseUrl + `/getTopTracks`)
        return await res.data
    }
    catch (error) {
        throw (error)
    }
}


export const GetUserPlaylist = async (userID) => {
    try {
        const res = await axios.get(baseUrl + '/getUserPlaylist', {
            params: {
                "userID": userID,
            }
        })
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const GetPlaylistInfo = async (playlistID) => {
    try {
        const res = await axios.get(baseUrl + '/playlistInfo', {
            params: {
                "playlistID": playlistID,
            }
        })

        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const SearchRequest = async (type, name) => {
    try {
        const res = await axios.get(baseUrl + '/getSuggestions', {
            params: {
                "Mtype": type,
                "search": name
            }
        })

        return await res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const AddPlaylist = async (userID, name, cover) => {
    try {
        const res = await axios.post(baseUrl + '/addPlaylist', {
            "name": name,
            "image_blob": cover,
            "owner_id": userID
        })
        console.log(res.data)
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}

export const SetRecentlyPlayed = async (userID, songID) => {
    try {
        const res = await axios.post(baseUrl + '/setRecentlyPlayed', {
            'songID': songID,
            'userID': userID,
        });
        return res.data.result;
    } catch (error) {
        throw error;
    }

}


export const FollowPlaylist = async (userID, playlistID) => {
    try {
        const res = await axios.post(baseUrl + '/followPlaylist', {
            'playlistID': playlistID,
            'userID': userID,
        });
        return res.data.result;
    } catch (error) {
        throw error;
    }

}



export const GetUserPodcast = async (userID) => {
    try {
        const res = await axios.get(baseUrl + '/getUserPodcast', {
            params: {
                "userID": userID,
            }
        })

        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const DeleteMedia = async (mediaType, mediaID,uid) => {
    try {
        console.log(mediaID,mediaType,uid)
        const res = await axios.post(baseUrl + '/deleteUserMedia', {
            "mediaID": mediaID,
            "mediaType": mediaType,
            "userID":uid
        })
        return await res.data.result
    }
    catch (error) {
        throw (error)
    }
}

export const AlbumSongs = async (album_id) => {
    try {
        const res = await axios.get(baseUrl + '/getAlbumTracks', {
            params: {
                'albumID': album_id
            }
        })
        return await res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const AddTrackToPlaylist = async (userID, playlistID, trackID) => {
    try {
        const res = await axios.post(baseUrl + '/addPlaylistTrack', {
            "userID": userID,
            "playlistID": playlistID,
            "trackID": trackID
        })
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}

function GetToday() {

    let today = new Date();


    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    return today
}


export const UploadPodcast = async (name, duration, userID, image, audio) => {
    try {
        const res = await axios.post(baseUrl + '/uploadPodcast', {
            "name": name,
            "duration": duration,
            "userID": userID,
            "image": image,
            "audio": audio,
        })
        console.log(res)
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}

export const GetSong = async (songID) => {
    try {
        const res = await axios.get(baseUrl + '/getSong', {
            params: {
                "songID": songID
            }
        })
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const GetAllPlaylist = async (userID) => {
    try {
        const res = await axios.get(baseUrl + '/getAllPlaylists',
            { params: { "userID": userID } })
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}



export const UnfollowPlaylist = async (userID, playlistID) => {
    try {
        const res = await axios.post(baseUrl + '/unfollowPlaylist',
            {
                'userID': userID,
                'playlistID': playlistID
            })
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}

export const RemoveTrackPlaylist = async (playlistID, trackID) => {
    // console.log(playlistID, trackID)
    try {
        const res = await axios.post(baseUrl + '/deletePlaylistSong',
            {
                'trackID': trackID,
                'playlistID': playlistID
            })
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const GetPodcast = async (podcast_id) => {
    // console.log(, trackID)
    try {
        const res = await axios.get(baseUrl + '/getPodcast',
        {params:
            {
                'podcastID': podcast_id,
            }})

        
        return res.data
    }
    catch (error) {
        throw (error)
    }
}