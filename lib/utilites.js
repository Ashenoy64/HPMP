import axios from "axios";

const baseUrl = 'http://100.88.89.141:3010'


export const User = async (username, email) => {
    console.log(username,email)
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

export const GetUserDetails = async(uid)=>{
    try{
        const res = await axios.get(baseUrl+'/userDetails',{
            params:{"userID":uid}
        })
        return res.data.result[0]

    }
    catch(error)
    {
        throw(error)
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
        const res = await axios.get(baseUrl + `/getRecentlyPlayed`,{
            params:{"userID":userID}
        })
        return await res.data
    }
    catch (error) {
        throw (error)
    }
}

export const GetUserPlaylist = async (userID) => {
    try {
        const res = await axios.get(baseUrl + '/getUserPlaylist',{ params:{
            "userID": userID,
        }})
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const GetPlaylistInfo = async (playlistID) => {
    try {
        const res = await axios.get(baseUrl + '/playlistInfo',{ params:{
            "playlistID": playlistID,
        }})

        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const SearchRequest = async (type, name) => {
    try {
        const res = await axios.get(baseUrl + '/getSuggestions',{params: {
            "Mtype": type,
            "search": name
        }})

        return await res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const AddPlaylist = async (userID,name) => {
    try {
        const res = await axios.post(baseUrl + '/addPlaylist',{
            "name": name,
            "image_blob": "",
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
          songID: songID,
          userID: userID,
        });
        console.log(res.data.result);
        return res.data.result;
      } catch (error) {
        throw error;
      }
      
}

export const GetUserPodcast = async (userID) => {
    try {
        const res = await axios.get(baseUrl + '/getUserPodcast', {params:{
            "userID": userID,
        }})

        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const DeleteMedia = async (mediaID, mediaType) => {
    try {
        const res = await axios.get(baseUrl + '/deleteUserMedia', {
            "mediaID": mediaID,
            "mediaType": mediaType
        })
        return await res.json()
    }
    catch (error) {
        throw (error)
    }
}



export const AddTrackToPlaylist = async (userID, playlistID, trackID) => {
    try {
        const res = await axios.get(baseUrl + '/addPlaylistTrack', {
            "userID": userID,
            "playlistID": playlistID,
            "trackID": trackID
        })
        return await res.json()
    }
    catch (error) {
        throw (error)
    }
}

function GetToday()
{

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
            "doc": GetToday()
          })
        return await res.json()
    }
    catch (error) {
        throw (error)
    }
}

export const GetSong = async (songID) => {
    try {
        const res = await axios.get(baseUrl + '/getSong',{params: {
            "songID":songID
          }})
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}


export const GetAllPlaylist = async (userID) => {
    try {
        const res = await axios.get(baseUrl + '/getAllPlaylist', 
        { params:{ "userID":userID}})
        return res.data.result
    }
    catch (error) {
        throw (error)
    }
}