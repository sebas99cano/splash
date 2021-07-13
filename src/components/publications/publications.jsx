import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createPublication, deletePublication, getRealtimePublications} from "../../store/actions/PublicationActions";
import { v4 as uuidv4 } from 'uuid';

const Publications = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const auth = useSelector((state) => state.auth);
    const publication = useSelector((state) => state.publication);
    const dispatch = useDispatch();

    let unsubscribePublications

    useEffect(() => {
        unsubscribePublications = dispatch(getRealtimePublications()).then(
            unsubscribePublications => unsubscribePublications).catch(error => {
            console.log(error)
        })
    }, [])

    //component will unmount
    useEffect(() => {
        return () => {
            //clear
            unsubscribePublications.then(f => f()).catch(error => console.log(error));
        };
    }, []);

    const submitPublication = () => {
        const publication = {
            publication_id: uuidv4(),
            user_uid: auth.uid,
            title: title,
            content: content,
            email: auth.email
        }
        if (title !== "" && content !== "") {
            dispatch(createPublication(publication)).then(() => {
                setTitle('')
                setContent('')
            })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <div>
                        <div className={"border border-radius rounded border-dark mb-3"}>
                            <div className="text-center p-3">
                                <h3 className={"text-center"}>Post it</h3>
                                <label>Title</label>
                                <input placeholder={"Title"}
                                       className={"form-control"}
                                       name={"title"}
                                       onChange={(event => setTitle(event.target.value))}
                                       value={title}
                                       minLength={10}
                                       maxLength={100}
                                       required={true}/>
                                <label>Content</label>
                                <textarea placeholder={"escribe algo"}
                                          className="form-control"
                                          name="content"
                                          onChange={event => setContent(event.target.value)}
                                          value={content}
                                          minLength={20}
                                          maxLength={500}
                                          required={true}/>
                                <div className="text-center">
                                    <button onClick={submitPublication} className="btn btn-primary px-5 mt-4 ">Post <i
                                        className="bi bi-mailbox"/></button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {publication.loadingPublication ?
                                <div className="spinner-border text-success" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : (publication.publications.length ?
                                    publication.publications.map(element => {
                                        return (
                                            <PublicationSummary
                                                key={element.publication_id}
                                                publication={element}
                                                dispatch={dispatch}
                                                uid={auth.uid}/>
                                        )
                                    }) : null)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PublicationSummary = (props) => {
    const {publication, uid, dispatch} = props;

    const deleteSubmit = () => {
        dispatch(deletePublication(publication))
    }

    return (
        <div>
            <div className="card border border-radius rounded border-dark">
                <div className="card-body">
                    <h5 className="card-title">{publication.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{publication.email}</h6>
                    <p className="card-text">{publication.content}</p>
                    {(uid === publication.user_uid) ?
                        <button className={"btn btn-danger mr-1 px-5"} onClick={deleteSubmit}>Delete <i
                            className="bi bi-trash"/>
                        </button> : ""}
                </div>
            </div>
            <br/>
        </div>
    )
}

export default Publications
