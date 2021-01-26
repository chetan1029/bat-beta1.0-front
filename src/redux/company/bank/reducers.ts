import { BankTypes } from './constants';

const INIT_STATE: any = {
    banks: []
};


const Bank = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case BankTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case BankTypes.GET_BANK: {
                    return {
                        ...state,
                        banks: action.payload.data,
                        isBankFetched: true,
                    }
                }
                case BankTypes.CREATE_BANK: {
                    return {
                        ...state,
                        newBank: action.payload.data,
                        isBankCreated: true,
                        loading: false
                    }
                }
                case BankTypes.EDIT_BANK: {
                    return {
                        ...state,
                        isBankUpdated: true,
                        loading: false
                    }
                }
                case BankTypes.DELETE_BANK: {
                    return {
                        ...state,
                        isBankDeleted: true,
                        loading: false
                    }
                }
                case BankTypes.ARCHIVE_BANK: {
                    return {
                        ...state,
                        isBankArchived: true,
                        loading: false
                    }
                }
                case BankTypes.RESTORE_BANK: {
                    return {
                        ...state,
                        isBankArchived: false,
                        isBankRestored: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case BankTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case BankTypes.GET_BANK: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isBankFetched: false,
                    }
                }
                case BankTypes.CREATE_BANK: {
                    return {
                        ...state,
                        createBankError: action.payload.error,
                        isBankCreated: false,
                        loading: false
                    }
                }
                case BankTypes.EDIT_BANK: {
                    return {
                        ...state,
                        editBankError: action.payload.error,
                        isBankUpdated: false,
                        loading: false
                    }
                }
                case BankTypes.DELETE_BANK: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isBankDeleted: false,
                        loading: false
                    }
                }
                case BankTypes.ARCHIVE_BANK: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isBankArchived: false,
                        loading: false
                    }
                }
                case BankTypes.RESTORE_BANK: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isBankRestored: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }
        case BankTypes.GET_BANK:
            return { ...state, isBankFetched: false };
        case BankTypes.CREATE_BANK:
            return { ...state, isBankCreated: false, loading: true, createBankError: null };
        case BankTypes.EDIT_BANK:
            return {
                ...state,
                isBankUpdated: false, isBankCreated: false,
                isBankDeleted: false, isBankRestored: false, isBankArchived: false,
                createBankError: null, editBankError: null,
                loading: true
            };
        case BankTypes.DELETE_BANK:
            return {
                ...state, isBankDeleted: false, loading: true,
                isBankUpdated: false, isBankCreated: false,
                isBankRestored: false, isBankArchived: false,
                createBankError: null
            };
        case BankTypes.ARCHIVE_BANK: {
            return {
                ...state,
                isBankArchived: false, isBankRestored: false,
                isBankUpdated: false, isBankCreated: false,
                isBankDeleted: false,
                createBankError: null,
                loading: true
            }
        }
        case BankTypes.RESTORE_BANK: {
            return {
                ...state,
                isBankRestored: false, isBankArchived: false,
                isBankUpdated: false, isBankCreated: false,
                isBankDeleted: false,
                loading: true, createBankError: null
            }
        }
        case BankTypes.RESET: {
            return {
                ...state,
                createBankError: null,
                editBankError: null,
                isBankCreated: false,
                isBankDeleted: false,
                isBankRestored: false,
                isBankArchived: false,
            }
        }
        default: return { ...state };
    }
}

export default Bank;
