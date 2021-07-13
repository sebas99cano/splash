import {firestore} from "../../services/Firebase";
import {publicationConstants} from "../../utils/Constants";

export const createPublication = (publication) =>{
    return async dispatch =>{
        dispatch({type:publicationConstants.SEND_PUBLICATION_REQUEST})
        const db = firestore();
        const timesTamp = new Date();
        db.collection("publications").doc(publication.publication_id).set({
            ...publication,
            timesTamp: timesTamp
        }).then((data)=>{
            dispatch({
                type: publicationConstants.SEND_PUBLICATION_SUCCESSFUL})
        }).catch((error) => {
            console.log(error)
            dispatch({
                type: publicationConstants.SEND_PUBLICATION_FAILURE,
                payload: {error:error}
            })
        })
    }
}

export const getRealtimePublications = () => {
    return async dispatch => {
        dispatch({type: publicationConstants.GET_PUBLICATIONS_REQUEST});
        const db = firestore();
        return db.collection("publications").orderBy('timesTamp','desc')
            .onSnapshot((querySnapshot) => {
            const publications = [];
            querySnapshot.forEach(function (doc) {
                publications.push(doc.data());
            })
            dispatch({
                type: publicationConstants.GET_PUBLICATIONS_SUCCESS,
                payload: {publications: publications}
            })
        });
    }
}

export const deletePublication = (publication) => {
    return async dispatch =>{
        dispatch({type: publicationConstants.DELETE_PUBLICATION_REQUEST});
        const db = firestore();
        db.collection('publications').doc(publication.publication_id).delete().then(() =>{
            dispatch({type:publicationConstants.DELETE_PUBLICATION_SUCCESSFUL})
        }).catch(error=>{
            dispatch({
                type:publicationConstants.DELETE_PUBLICATION_FAILURE,
                payload:{error:error}
            })
        })
    }
}
