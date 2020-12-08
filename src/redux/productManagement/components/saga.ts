import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getComponents, getComponent, createComponent, deleteComponent, editComponent
} from "../../../api";

import { componentsApiResponseSuccess, componentsApiResponseError } from "./actions";
import { ComponentsTypes } from './constants';


/**
 * get all components
 */
function* getAllComponents({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getComponents, companyId, filters);
        yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENTS, response.data));
    } catch (error) {
        yield put(componentsApiResponseError(ComponentsTypes.GET_COMPONENTS, error));
    }
}


/**
 * get single component
 */
function* getComponentById({ payload: { companyId, componentId } }: any) {
    try {
        const response = yield call(getComponent, companyId, componentId);
        yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT, response.data));
    } catch (error) {
        yield put(componentsApiResponseError(ComponentsTypes.GET_COMPONENT, error));
    }
}


/**
 * create new component
 */
function* createNewComponent({ payload: { companyId, data } }: any) {
    try {
        const response = yield call(createComponent, companyId, data);
        yield put(componentsApiResponseSuccess(ComponentsTypes.CREATE_COMPONENT, response.data));
    } catch (error) {
        yield put(componentsApiResponseError(ComponentsTypes.CREATE_COMPONENT, error));
    }
}

/**
 * edit the component
 */
function* updateComponent({ payload: { companyId, componentId, data } }: any) {
    try {
        const response = yield call(editComponent, companyId, componentId, data);
        yield put(componentsApiResponseSuccess(ComponentsTypes.EDIT_COMPONENT, response.data));
    } catch (error) {
        yield put(componentsApiResponseError(ComponentsTypes.EDIT_COMPONENT, error));
    }
}

/**
 * delete component
 */
function* deleteComponentById({ payload: { companyId, componentId } }: any) {
    try {
        const response = yield call(deleteComponent, companyId, componentId);
        yield put(componentsApiResponseSuccess(ComponentsTypes.DELETE_COMPONENT, response.data));
    } catch (error) {
        yield put(componentsApiResponseError(ComponentsTypes.DELETE_COMPONENT, error));
    }
}

export function* watchGetComponents() {
    yield takeEvery(ComponentsTypes.GET_COMPONENTS, getAllComponents)
}

export function* watchGetComponent() {
    yield takeEvery(ComponentsTypes.GET_COMPONENT, getComponentById)
}

export function* watchAddComponent() {
    yield takeEvery(ComponentsTypes.CREATE_COMPONENT, createNewComponent)
}

export function* watchEditComponent() {
    yield takeEvery(ComponentsTypes.EDIT_COMPONENT, updateComponent)
}

export function* watchDeleteComponent() {
    yield takeEvery(ComponentsTypes.DELETE_COMPONENT, deleteComponentById)
}


function* componentsSaga() {
    yield all([
        fork(watchGetComponents),
        fork(watchGetComponent),
        fork(watchAddComponent),
        fork(watchEditComponent),
        fork(watchDeleteComponent),
    ]);
}

export default componentsSaga;