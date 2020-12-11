import { ComponentsTypes } from './constants';

const INIT_STATE: any = {
    components: []
};


const Components = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ComponentsTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ComponentsTypes.GET_COMPONENTS: {
                    return {
                        ...state,
                        components: action.payload.data,
                        isComponentsFetched: true,
                        loading: false,
                    }
                }
                case ComponentsTypes.GET_COMPONENT: {
                    return {
                        ...state,
                        component: action.payload.data,
                    }
                }
                case ComponentsTypes.CREATE_COMPONENT: {
                    return {
                        ...state,
                        newComponent: action.payload.data,
                        isComponentCreated: true,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT: {
                    return {
                        ...state,
                        isComponentEdited: true,
                        loading: false
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT: {
                    return {
                        ...state,
                        isComponentDeleted: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case ComponentsTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ComponentsTypes.GET_COMPONENTS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isComponentsFetched: false
                    }
                }
                case ComponentsTypes.GET_COMPONENT: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                }
                case ComponentsTypes.CREATE_COMPONENT: {
                    return {
                        ...state,
                        createComponentError: action.payload.error,
                        isComponentCreated: false,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT: {
                    return {
                        ...state,
                        editComponentError: action.payload.error,
                        isComponentEdited: false,
                        loading: false
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT: {
                    return {
                        ...state,
                        deleteComponentError: action.payload.error,
                        isComponentDeleted: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case ComponentsTypes.GET_COMPONENTS:
            return { ...state, isComponentsFetched: false, loading: true };

        case ComponentsTypes.CREATE_COMPONENT:
            return { ...state, isComponentCreated: false, loading: true };

        case ComponentsTypes.EDIT_COMPONENT:
            return { ...state, isComponentEdited: false, loading: true };

        case ComponentsTypes.DELETE_COMPONENT:
            return { ...state, isComponentDeleted: false, isComponentCreated: false, isComponentEdited: false, loading: true };


        case ComponentsTypes.RESET: {
            return {
                ...state,
                editComponentError: null,
                isComponentCreated: false,
                isComponentEdited: false,
                isComponentDeleted: false
            }
        }
        default: return { ...state };
    }
}

export default Components;