import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const UserSignup = async (username, email, password) => {
    try {
        const res = await axios.post(baseUrl + '/signup', {
            "username": username,
            "email": email,
            "password": password
        })
        return res.data
    }
    catch (error) {
        throw (error)
    }
}


export const UserLogin = async (email, password) => {
    try {
        const res = await axios.post(baseUrl + '/login', {
            "email": email,
            "password": password
        })
        return res.data
    }
    catch (error) {
        throw (error)
    }
}


export const SessionStore = (key, value) => {
    return sessionStorage.setItem(key, value)
}

export const SessionRetrive = (key) => {
    return sessionStorage.getItem(key)
}


export const ValidateUser = async (token) => {
    try {
        const res = await axios.get(baseUrl + '/validate', {
            headers: {
                Authorization: token,
            }
        })
        return res.data
    }
    catch (error) {
        throw (error)
    }
}


export const SearchRequest = async (name) => {

    try {
        const res = await axios.get(baseUrl + `/search/${name}`)
        return await res.data
    }
    catch (error) {
        throw (error)
    }
}


export const GetRecentlyPlayed = async (token) => {
    try {
        const res = await axios.get(baseUrl + `/recently_played/`, {
            headers: {
                Authorization: token,
            }
        })
        return await res.data
    }
    catch (error) {
        throw (error)
    }
}


export const SetRecentlyPlayed = async (details) => {
    try {
        const res = await axios.post(baseUrl + "/set_played", {
            'song': details,
        }, {
            headers: {
                Authorization: token,
            }
        });

        return res.data.status;
    } catch (error) {
        throw error;
    }

}

export const GetAllPlaylist = async (token) => {
    try {
        const res = await axios.get(baseUrl + `/get_playlists/`, {
            headers: {
                Authorization: token,
            }
        })

        return res.data
    }
    catch (error) {
        throw (error)
    }
}

export const AddPlaylist = async (token, name, cover) => {
    try {
        const res = await axios.post(baseUrl + '/create_playlist', {
            "title": name,
            "image_url": cover,
            "doc": GetToday(),
        }, {
            headers: {
                Authorization: token,
            }
        })

        return res.data.status
    }
    catch (error) {
        throw (error)
    }
}



export const AddTrackToPlaylist = async (token, playlistID, track_info) => {

    try {
        const res = await axios.post(baseUrl + '/add_playlist_song', {
            "playlist_id": playlistID,
            "song_info": track_info
        },{
            headers: {
              Authorization: token,
            }
          })

        return res.data.status
    }
    catch (error) {
        throw (error)
    }
}



export const GetPlaylistInfo = async (playlistID) => {
    try {

        const res = await axios.get(baseUrl + `/playlist_info/${playlistID}`)

        return res.data
    }
    catch (error) {
        throw (error)
    }
}


export const GetSong = async (songID) => {
    try {
        const res = await axios.get(baseUrl + `/song/${songID}`)
        return res.data
    }
    catch (error) {
        throw (error)
    }
}



export const RemoveTrackPlaylist = async (playlist_id, song_id,token) => {
    try {
        const res = await axios.post(baseUrl + '/delete_playlist_track',
            {
                'song_id': song_id,
                'playlist_id': playlist_id,
            },{
                headers: {
                  Authorization: token,
                }
              })


        return res.data
    }
    catch (error) {
        throw (error)
    }
}

export const DeleteMedia = async (playlist_id,token) => {
    try {

        const res = await axios.post(baseUrl + '/delete_playlist', {
            "playlist_id": playlist_id,
        },{
            headers: {
              Authorization: token,
            }
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


export const Logout = async(token)=>{
    try {
        const res = await axios.post(baseUrl + '/logout',{
            headers: {
              Authorization: token,
            }
          })
        return res.data
    }
    catch (error) {
        throw (error)
    }
}