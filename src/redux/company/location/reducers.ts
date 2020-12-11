import { LocationTypes } from './constants';

const INIT_STATE: any = {
    locations: []
};


const Location = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case LocationTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case LocationTypes.GET_LOCATION: {
                    return {
                        ...state,
                        locations: action.payload.data,
                        isLocationFetched: true,
                    }
                }
                case LocationTypes.CREATE_LOCATION: {
                    return {
                        ...state,
                        newLocation: action.payload.data,
                        isLocationCreated: true,
                        loading: false
                    }
                }
                case LocationTypes.EDIT_LOCATION: {
                    return {
                        ...state,
                        isLocationUpdated: true,
                        loading: false
                    }
                }
                case LocationTypes.DELETE_LOCATION: {
                    return {
                        ...state,
                        isLocationDeleted: true,
                        loading: false
                    }
                }
                case LocationTypes.ARCHIVE_LOCATION: {
                    return {
                        ...state,
                        isLocationArchived: true,
                        loading: false
                    }
                }
                case LocationTypes.RESTORE_LOCATION: {
                    return {
                        ...state,
                        isLocationArchived: false,
                        isLocationRestored: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case LocationTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case LocationTypes.GET_LOCATION: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isLocationFetched: false,
                    }
                }
                case LocationTypes.CREATE_LOCATION: {
                    return {
                        ...state,
                        createLocationError: action.payload.error,
                        isLocationCreated: false,
                        loading: false
                    }
                }
                case LocationTypes.EDIT_LOCATION: {
                    return {
                        ...state,
                        editLocationError: action.payload.error,
                        isLocationUpdated: false,
                        loading: false
                    }
                }
                case LocationTypes.DELETE_LOCATION: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isLocationDeleted: false,
                        loading: false
                    }
                }
                case LocationTypes.ARCHIVE_LOCATION: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isLocationArchived: false,
                        loading: false
                    }
                }
                case LocationTypes.RESTORE_LOCATION: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isLocationRestored: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }
        case LocationTypes.GET_LOCATION:
            return { ...state, isLocationFetched: false };
        case LocationTypes.CREATE_LOCATION:
            return { ...state, isLocationCreated: false, loading: true };
        case LocationTypes.EDIT_LOCATION:
            return {
                ...state,
                isLocationUpdated: false, isLocationCreated: false,
                isLocationDeleted: false, isLocationRestored: false, isLocationArchived: false,
                loading: true
            };
        case LocationTypes.DELETE_LOCATION:
            return {
                ...state, isLocationDeleted: false, loading: true,
                isLocationUpdated: false, isLocationCreated: false,
                isLocationRestored: false, isLocationArchived: false,
            };
        case LocationTypes.ARCHIVE_LOCATION: {
            return {
                ...state,
                isLocationArchived: false, isLocationRestored: false,
                isLocationUpdated: false, isLocationCreated: false,
                isLocationDeleted: false,
                loading: true
            }
        }
        case LocationTypes.RESTORE_LOCATION: {
            return {
                ...state,
                isLocationRestored: false, isLocationArchived: false,
                isLocationUpdated: false, isLocationCreated: false,
                isLocationDeleted: false,
                loading: true
            }
        }
        case LocationTypes.RESET: {
            return {
                ...state,
                editLocationError: null,
                isLocationCreated: false,
                isLocationDeleted: false,
                isLocationRestored: false,
                isLocationArchived: false,
            }
        }
        default: return { ...state };
    }
}

export default Location;
