import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { get, size, map, forEach, isEmpty } from 'lodash';

import {
    getComponents, getComponent, createComponent, deleteComponent, editComponent, uploadComponentImages, uploadVariationImages, archiveComponent
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
function* createNewComponent({ payload: { companyId, data, images } }: any) {
    try {
        const response = yield call(createComponent, companyId, data);
        if (response.data && response.data.id) {
            if (size(images.productImages) > 0) {
                yield call(uploadComponentImages, companyId, response.data.id, images.productImages);
            }
            const variationIds: any[]= map(get(response, "data.products"), product => product.id);
            if (size(variationIds) > 0 && size(images.variationImages) > 0) {
                yield all(images.variationImages.map((file, i) =>
                    !isEmpty(file) && call(uploadVariationImages, companyId, variationIds[i], [file])
                ));
            }
        }
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

/**
 * archive component
 */
function* archiveComponentById({ payload: { companyId, componentId, data, filters } }: any) {
    try {
        const response = yield call(archiveComponent, companyId, componentId, data);
        const res = yield call(getComponents, companyId, filters);
        yield put(componentsApiResponseSuccess(ComponentsTypes.ARCHIVE_COMPONENT, response.data));
        yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENTS, res.data));
    } catch (error) {
        yield put(componentsApiResponseError(ComponentsTypes.ARCHIVE_COMPONENT, error));
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

export function* watchArchiveComponent() {
    yield takeEvery(ComponentsTypes.ARCHIVE_COMPONENT, archiveComponentById)
}


function* componentsSaga() {
    yield all([
        fork(watchGetComponents),
        fork(watchGetComponent),
        fork(watchAddComponent),
        fork(watchEditComponent),
        fork(watchDeleteComponent),
        fork(watchArchiveComponent),
    ]);
}

export default componentsSaga;