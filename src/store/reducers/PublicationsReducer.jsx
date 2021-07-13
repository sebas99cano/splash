import {publicationConstants} from "../../utils/Constants";

const initState = {
    publications: [],
    loadingPublication: false,
    error: null,
    deleting: false
}

const publicationsReducer = (state = initState, action) => {
    switch (action.type) {
        case publicationConstants.GET_PUBLICATIONS_REQUEST:
            state={
                ...state,
                loadingPublication: true
            }
            break;
        case publicationConstants.GET_PUBLICATIONS_SUCCESS:
            state={
                ...state,
                loadingPublication: false,
                publications: action.payload.publications
            }
            break;
        case publicationConstants.SEND_PUBLICATION_REQUEST:
            state={
                ...state,
                loadingPublication: true
            }
            break;
        case publicationConstants.SEND_PUBLICATION_SUCCESSFUL:
            state={
                ...state,
                loadingPublication: false,
                error: null
            }
            break;
        case publicationConstants.SEND_PUBLICATION_FAILURE:
            state={
                ...state,
                loadingPublication: false,
                error: action.payload.error
            }
            break;
        case publicationConstants.DELETE_PUBLICATION_REQUEST:
            state={
                ...state,
                deleting: true
            }
            break;
        case publicationConstants.DELETE_PUBLICATION_SUCCESSFUL:
            state={
                ...state,
                deleting: false,
                error: null
            }
            break;
        case publicationConstants.DELETE_PUBLICATION_FAILURE:
            state={
                ...state,
                deleting: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
}

export default publicationsReducer