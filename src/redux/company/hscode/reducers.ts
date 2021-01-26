import { HscodeTypes } from './constants';

const INIT_STATE: any = {
    hscodes: []
};


const Hscode = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case HscodeTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case HscodeTypes.GET_HSCODE: {
                    return {
                        ...state,
                        hscodes: action.payload.data,
                        isHscodeFetched: true,
                    }
                }
                case HscodeTypes.CREATE_HSCODE: {
                    return {
                        ...state,
                        newHscode: action.payload.data,
                        isHscodeCreated: true,
                        loading: false
                    }
                }
                case HscodeTypes.EDIT_HSCODE: {
                    return {
                        ...state,
                        isHscodeUpdated: true,
                        loading: false
                    }
                }
                case HscodeTypes.DELETE_HSCODE: {
                    return {
                        ...state,
                        isHscodeDeleted: true,
                        loading: false
                    }
                }
                case HscodeTypes.ARCHIVE_HSCODE: {
                    return {
                        ...state,
                        isHscodeArchived: true,
                        loading: false
                    }
                }
                case HscodeTypes.RESTORE_HSCODE: {
                    return {
                        ...state,
                        isHscodeArchived: false,
                        isHscodeRestored: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case HscodeTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case HscodeTypes.GET_HSCODE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isHscodeFetched: false,
                    }
                }
                case HscodeTypes.CREATE_HSCODE: {
                    return {
                        ...state,
                        createHscodeError: action.payload.error,
                        isHscodeCreated: false,
                        loading: false
                    }
                }
                case HscodeTypes.EDIT_HSCODE: {
                    return {
                        ...state,
                        editHscodeError: action.payload.error,
                        isHscodeUpdated: false,
                        loading: false
                    }
                }
                case HscodeTypes.DELETE_HSCODE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isHscodeDeleted: false,
                        loading: false
                    }
                }
                case HscodeTypes.ARCHIVE_HSCODE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isHscodeArchived: false,
                        loading: false
                    }
                }
                case HscodeTypes.RESTORE_HSCODE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isHscodeRestored: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }
        case HscodeTypes.GET_HSCODE:
            return { ...state, isHscodeFetched: false };
        case HscodeTypes.CREATE_HSCODE:
            return { ...state, isHscodeCreated: false, loading: true, createHscodeError: null };
        case HscodeTypes.EDIT_HSCODE:
            return {
                ...state,
                isHscodeUpdated: false, isHscodeCreated: false,
                isHscodeDeleted: false, isHscodeRestored: false, isHscodeArchived: false,
                createHscodeError: null, editHscodeError: null,
                loading: true
            };
        case HscodeTypes.DELETE_HSCODE:
            return {
                ...state, isHscodeDeleted: false, loading: true,
                isHscodeUpdated: false, isHscodeCreated: false,
                isHscodeRestored: false, isHscodeArchived: false,
                createHscodeError: null
            };
        case HscodeTypes.ARCHIVE_HSCODE: {
            return {
                ...state,
                isHscodeArchived: false, isHscodeRestored: false,
                isHscodeUpdated: false, isHscodeCreated: false,
                isHscodeDeleted: false,
                createHscodeError: null,
                loading: true
            }
        }
        case HscodeTypes.RESTORE_HSCODE: {
            return {
                ...state,
                isHscodeRestored: false, isHscodeArchived: false,
                isHscodeUpdated: false, isHscodeCreated: false,
                isHscodeDeleted: false,
                loading: true, createHscodeError: null
            }
        }
        case HscodeTypes.RESET: {
            return {
                ...state,
                createHscodeError: null,
                editHscodeError: null,
                isHscodeCreated: false,
                isHscodeDeleted: false,
                isHscodeRestored: false,
                isHscodeArchived: false,
            }
        }
        default: return { ...state };
    }
}

export default Hscode;
