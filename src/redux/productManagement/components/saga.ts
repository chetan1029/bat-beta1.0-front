import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { get, isEmpty, map, size, forEach, omit } from 'lodash';

import {
	archiveComponent,
	restoreComponent,
	createComponent,
	deleteComponent,
	editComponent,
	exportCSVFile,
	exportXLSFile,
	getComponent,
	getComponents,
	getTagsAndTypes,
	uploadComponentImages,
	uploadVariationImages,
	getVariation,
	editVariation,
	deleteVariationImages,
	discontinueComponent,
	createComponentPackingBox,
	getComponentpackingboxes,
	deleteComponentPackingBox,
	archiveComponentPackingBox,
	restoreComponentPackingBox,
	editComponentPackingBox,
	createComponentME, getComponentME, deleteComponentME, archiveComponentME, restoreComponentME, editComponentME, uploadComponentMEFile, deleteComponentMEFile,
	createComponentProducts, getComponentProducts, deleteComponentProducts, archiveComponentProducts, restoreComponentProducts, editComponentProducts,

} from "../../../api";

import { downloadFile } from "../../../api/utils";

import { componentsApiResponseError, componentsApiResponseSuccess } from "./actions";
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
				let imagesData: any = {};
				forEach(images.productImages, (image, i) => imagesData[i === 0 ? "main_image" : i] = image);
				yield call(uploadComponentImages, companyId, response.data.id, imagesData);
			}
			const variationIds: any[] = map(get(response, "data.products"), product => product.id);
			if (size(variationIds) > 0 && size(images.variationImages) > 0) {
				yield all(images.variationImages.map((file, i) =>
					!isEmpty(file) && call(uploadVariationImages, companyId, variationIds[i], { main_image: file })
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
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENTS, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.ARCHIVE_COMPONENT, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.ARCHIVE_COMPONENT, error));
	}
}

/**
 * restore component
 */
function* restoreComponentById({ payload: { companyId, componentId, filters } }: any) {
	try {
		const response = yield call(restoreComponent, companyId, componentId);
		const res = yield call(getComponents, companyId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENTS, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.RESTORE_COMPONENT, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.RESTORE_COMPONENT, error));
	}
}

/**
 * discontinue component
 */
function* discontinueComponentById({ payload: { companyId, componentId, data, filters } }: any) {
	try {
		const response = yield call(discontinueComponent, companyId, componentId, data);
		const res = yield call(getComponents, companyId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENTS, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.DISCONTINUE_COMPONENT, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.DISCONTINUE_COMPONENT, error));
	}
}

/**
 * get Tags and Types
 */
function* getTagsAndTypesById({ payload: { companyId } }: any) {
	try {
		const response = yield call(getTagsAndTypes, companyId);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_TAGS_TYPES, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.GET_TAGS_TYPES, error));
	}
}

/**
 * export component
 */
function* exportComponent({ payload: { companyId, fileType, filters } }: any) {
	try {
		if (fileType) {
			const response = yield call(fileType === "csv" ? exportCSVFile : exportXLSFile, companyId, filters);
			if (fileType === 'csv') {
				downloadFile(response.data, `components.${fileType}`);
			} else {
				downloadFile(response.data, `components.${fileType}`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			}
			yield put(componentsApiResponseSuccess(ComponentsTypes.EXPORT_COMPONENT, true));
		}
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.EXPORT_COMPONENT, error));
	}
}

/**
 * get variation
 */
function* getVariationById({ payload: { companyId, variationId } }: any) {
	try {
		const response = yield call(getVariation, companyId, variationId);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_VARIATION, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.GET_VARIATION, error));
	}
}

/**
 * edit the component
 */
function* editVariationById({ payload: { companyId, variationId, data, images } }: any) {
	try {
		const response = yield call(editVariation, companyId, variationId, data);
		if (size(images.deletedImages) > 0) {
			yield call(deleteVariationImages, companyId, variationId, images.deletedImages.toString());
		}
		if (size(images.newImages) > 0) {
			let imagesData: any = {};
			forEach(images.newImages, (image, i) => imagesData[i === 0 ? "main_image" : i] = image);
			yield call(uploadVariationImages, companyId, variationId, imagesData);
		}
		yield put(componentsApiResponseSuccess(ComponentsTypes.EDIT_VARIATION, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.EDIT_VARIATION, error));
	}
}

/**
 * create new component packing box
 */
function* createNewComponentPackingBox({ payload: { companyId, componentId, data } }: any) {
	try {
		const response = yield call(createComponentPackingBox, companyId, componentId, data);
		yield put(componentsApiResponseSuccess(ComponentsTypes.CREATE_COMPONENT_PACKING_BOX, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.CREATE_COMPONENT_PACKING_BOX, error));
	}
}


/**
 * get all components packing box
 */
function* getAllComponentsPackingBox({ payload: { companyId, componentId, filters } }: any) {
	try {
		const response = yield call(getComponentpackingboxes, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_PACKING_BOX, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.GET_COMPONENT_PACKING_BOX, error));
	}
}

/**
 * delete component packing box
 */
function* deleteComponentByIdPackingBox({ payload: { companyId, componentId, id, filters } }: any) {
	try {
		const response = yield call(deleteComponentPackingBox, companyId, componentId, id);
		const res = yield call(getComponentpackingboxes, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_PACKING_BOX, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.DELETE_COMPONENT_PACKING_BOX, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.DELETE_COMPONENT_PACKING_BOX, error));
	}
}

/**
 * archive component packing box
 */
function* archiveComponentByIdPackingBox({ payload: { companyId, componentId, id, data, filters } }: any) {
	try {
		const response = yield call(archiveComponentPackingBox, companyId, componentId, id, data);
		const res = yield call(getComponentpackingboxes, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_PACKING_BOX, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.ARCHIVE_COMPONENT_PACKING_BOX, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.ARCHIVE_COMPONENT_PACKING_BOX, error));
	}
}

/**
 * restore component packing box
 */
function* restoreComponentByIdPackingBox({ payload: { companyId, componentId, id, data, filters } }: any) {
	try {
		const response = yield call(restoreComponentPackingBox, companyId, componentId, id, data);
		const res = yield call(getComponentpackingboxes, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_PACKING_BOX, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.RESTORE_COMPONENT_PACKING_BOX, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.RESTORE_COMPONENT_PACKING_BOX, error));
	}
}

/**
 * update component packing box
 */
function* updateComponentPackingBox({ payload: { companyId, componentId, id, data } }: any) {
	try {
		const response = yield call(editComponentPackingBox, companyId, componentId, id, data);
		yield put(componentsApiResponseSuccess(ComponentsTypes.EDIT_COMPONENT_PACKING_BOX, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.EDIT_COMPONENT_PACKING_BOX, error));
	}
}

/**
 * create new component ME
 */
function* createNewComponentME({ payload: { companyId, componentId, data } }: any) {
	try {
		const response = yield call(createComponentME, companyId, componentId, omit(data, ['files']));
		if (response.data && response.data.id) {
			if (data.files.length > 0) {
				yield* data.files.map(function (v) {
					if (!!v.file) {
						return call(uploadComponentMEFile, companyId, response.data.id, v);
					}
				});
			}
		}
		yield put(componentsApiResponseSuccess(ComponentsTypes.CREATE_COMPONENT_ME, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.CREATE_COMPONENT_ME, error));
	}
}

/**
 * get all components ME
 */
function* getAllComponentsME({ payload: { companyId, componentId, filters } }: any) {
	try {
		const response = yield call(getComponentME, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_ME, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.GET_COMPONENT_ME, error));
	}
}

/**
 * delete component ME
 */
function* deleteComponentByIdME({ payload: { companyId, componentId, id, files = [], filters } }: any) {
	try {
		const response = yield call(deleteComponentME, companyId, componentId, id);
		// if (files.length > 0) {
		// 	yield* files.map(function (fileId) {
		// 		return call(deleteComponentMEFile, companyId, id, fileId);
		// 	});
		// }
		const res = yield call(getComponentME, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_ME, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.DELETE_COMPONENT_ME, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.DELETE_COMPONENT_ME, error));
	}
}

/**
 * archive component ME
 */
function* archiveComponentByIdME({ payload: { companyId, componentId, id, data, filters } }: any) {
	try {
		const response = yield call(archiveComponentME, companyId, componentId, id, data);
		const res = yield call(getComponentME, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_ME, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.ARCHIVE_COMPONENT_ME, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.ARCHIVE_COMPONENT_ME, error));
	}
}

/**
 * restore component ME
 */
function* restoreComponentByIdME({ payload: { companyId, componentId, id, data, filters } }: any) {
	try {
		const response = yield call(restoreComponentME, companyId, componentId, id, data);
		const res = yield call(getComponentME, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_ME, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.RESTORE_COMPONENT_ME, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.RESTORE_COMPONENT_ME, error));
	}
}

/**
 * delete component File ME
 */
function* deleteComponentFileME({ payload: { companyId, meId, fileId } }: any) {
	try {
		const response = yield call(deleteComponentMEFile, companyId, meId, fileId);
		yield put(componentsApiResponseSuccess(ComponentsTypes.DELETE_COMPONENT_FILE_ME, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.DELETE_COMPONENT_FILE_ME, error));
	}
}

/**
 * update component ME
 */
function* updateComponentME({ payload: { companyId, componentId, id, data } }: any) {
	try {
		const response = yield call(editComponentME, companyId, componentId, id, omit(data, ['files']));
		if (response.data && response.data.id) {
			if (data.files.length > 0) {
				yield* data.files.map(function (v) {
					if (!!v.file) {
						return call(uploadComponentMEFile, companyId, response.data.id, v);
					}
				});
			}
		}
		yield put(componentsApiResponseSuccess(ComponentsTypes.EDIT_COMPONENT_ME, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.EDIT_COMPONENT_ME, error));
	}
}


/**
 * create new component Products
 */
function* createNewComponentProducts({ payload: { companyId, componentId, data } }: any) {
	try {
		const responses = yield* data.map(item => call(createComponentProducts, companyId, componentId, item))
		// const response = yield call(createComponentProducts, companyId, componentId, data);
		yield put(componentsApiResponseSuccess(ComponentsTypes.CREATE_COMPONENT_PRODUCTS, responses));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.CREATE_COMPONENT_PRODUCTS, error));
	}
}

/**
 * get all components Products
 */
function* getAllComponentsProducts({ payload: { companyId, componentId, filters } }: any) {
	try {
		const response = yield call(getComponentProducts, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_PRODUCTS, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.GET_COMPONENT_PRODUCTS, error));
	}
}

/**
 * delete component Products
 */
function* deleteComponentByIdProducts({ payload: { companyId, componentId, id, filters } }: any) {
	try {
		const response = yield call(deleteComponentProducts, companyId, componentId, id);
		const res = yield call(getComponentProducts, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_PRODUCTS, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.DELETE_COMPONENT_PRODUCTS, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.DELETE_COMPONENT_PRODUCTS, error));
	}
}

/**
 * archive component Products
 */
function* archiveComponentByIdProducts({ payload: { companyId, componentId, id, data, filters } }: any) {
	try {
		const response = yield call(archiveComponentProducts, companyId, componentId, id, data);
		const res = yield call(getComponentProducts, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_PRODUCTS, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.ARCHIVE_COMPONENT_PRODUCTS, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.ARCHIVE_COMPONENT_PRODUCTS, error));
	}
}

/**
 * restore component Products
 */
function* restoreComponentByIdProducts({ payload: { companyId, componentId, id, data, filters } }: any) {
	try {
		const response = yield call(restoreComponentProducts, companyId, componentId, id, data);
		const res = yield call(getComponentProducts, companyId, componentId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_COMPONENT_PRODUCTS, res.data));
		yield put(componentsApiResponseSuccess(ComponentsTypes.RESTORE_COMPONENT_PRODUCTS, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.RESTORE_COMPONENT_PRODUCTS, error));
	}
}

/**
 * update component Products
 */
function* updateComponentProducts({ payload: { companyId, componentId, id, data } }: any) {
	try {
		const response = yield call(editComponentProducts, companyId, componentId, id, omit(data, ['files']));
		yield put(componentsApiResponseSuccess(ComponentsTypes.EDIT_COMPONENT_PRODUCTS, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.EDIT_COMPONENT_PRODUCTS, error));
	}
}

export function* watchGetComponents() {
	yield takeEvery(ComponentsTypes.GET_COMPONENTS, getAllComponents);
}

export function* watchGetComponent() {
	yield takeEvery(ComponentsTypes.GET_COMPONENT, getComponentById);
}

export function* watchAddComponent() {
	yield takeEvery(ComponentsTypes.CREATE_COMPONENT, createNewComponent);
}

export function* watchEditComponent() {
	yield takeEvery(ComponentsTypes.EDIT_COMPONENT, updateComponent);
}

export function* watchDeleteComponent() {
	yield takeEvery(ComponentsTypes.DELETE_COMPONENT, deleteComponentById);
}

export function* watchArchiveComponent() {
	yield takeEvery(ComponentsTypes.ARCHIVE_COMPONENT, archiveComponentById);
}

export function* watchDiscontinueComponent() {
	yield takeEvery(ComponentsTypes.DISCONTINUE_COMPONENT, discontinueComponentById);
}

export function* watchGetTagsAndTypes() {
	yield takeEvery(ComponentsTypes.GET_TAGS_TYPES, getTagsAndTypesById);
}

export function* watchExportComponent() {
	yield takeEvery(ComponentsTypes.EXPORT_COMPONENT, exportComponent);
}

export function* watchGetVariation() {
	yield takeEvery(ComponentsTypes.GET_VARIATION, getVariationById);
}

export function* watchEditVariation() {
	yield takeEvery(ComponentsTypes.EDIT_VARIATION, editVariationById);
}

export function* watchRestoreComponent() {
	yield takeEvery(ComponentsTypes.RESTORE_COMPONENT, restoreComponentById);
}

export function* watchAddComponentPackingBox() {
	yield takeEvery(ComponentsTypes.CREATE_COMPONENT_PACKING_BOX, createNewComponentPackingBox);
}


export function* watchGetAllComponentPackingBox() {
	yield takeEvery(ComponentsTypes.GET_COMPONENT_PACKING_BOX, getAllComponentsPackingBox);
}

export function* watchDeleteComponentByIdPackingBox() {
	yield takeEvery(ComponentsTypes.DELETE_COMPONENT_PACKING_BOX, deleteComponentByIdPackingBox);
}

export function* watchArchiveComponentByIdPackingBox() {
	yield takeEvery(ComponentsTypes.ARCHIVE_COMPONENT_PACKING_BOX, archiveComponentByIdPackingBox);
}

export function* watchRestoreComponentByIdPackingBox() {
	yield takeEvery(ComponentsTypes.RESTORE_COMPONENT_PACKING_BOX, restoreComponentByIdPackingBox);
}

export function* watchUpdateComponentPackingBox() {
	yield takeEvery(ComponentsTypes.EDIT_COMPONENT_PACKING_BOX, updateComponentPackingBox);
}

export function* watchCreateNewComponentME() {
	yield takeEvery(ComponentsTypes.CREATE_COMPONENT_ME, createNewComponentME);
}

export function* watchGetAllComponentsME() {
	yield takeEvery(ComponentsTypes.GET_COMPONENT_ME, getAllComponentsME);
}

export function* watchDeleteComponentByIdME() {
	yield takeEvery(ComponentsTypes.DELETE_COMPONENT_ME, deleteComponentByIdME);
}

export function* watchArchiveComponentByIdME() {
	yield takeEvery(ComponentsTypes.ARCHIVE_COMPONENT_ME, archiveComponentByIdME);
}

export function* watchRestoreComponentByIdME() {
	yield takeEvery(ComponentsTypes.RESTORE_COMPONENT_ME, restoreComponentByIdME);
}

export function* watchUpdateComponentME() {
	yield takeEvery(ComponentsTypes.EDIT_COMPONENT_ME, updateComponentME);
}

export function* watchDeleteComponentFileME() {
	yield takeEvery(ComponentsTypes.DELETE_COMPONENT_FILE_ME, deleteComponentFileME);
}


export function* watchCreateNewComponentProducts() {
	yield takeEvery(ComponentsTypes.CREATE_COMPONENT_PRODUCTS, createNewComponentProducts);
}

export function* watchGetAllComponentsProducts() {
	yield takeEvery(ComponentsTypes.GET_COMPONENT_PRODUCTS, getAllComponentsProducts);
}

export function* watchDeleteComponentByIdProducts() {
	yield takeEvery(ComponentsTypes.DELETE_COMPONENT_PRODUCTS, deleteComponentByIdProducts);
}

export function* watchArchiveComponentByIdProducts() {
	yield takeEvery(ComponentsTypes.ARCHIVE_COMPONENT_PRODUCTS, archiveComponentByIdProducts);
}

export function* watchRestoreComponentByIdProducts() {
	yield takeEvery(ComponentsTypes.RESTORE_COMPONENT_PRODUCTS, restoreComponentByIdProducts);
}

export function* watchUpdateComponentProducts() {
	yield takeEvery(ComponentsTypes.EDIT_COMPONENT_PRODUCTS, updateComponentProducts);
}

function* componentsSaga() {
	yield all([
		fork(watchGetComponents),
		fork(watchGetComponent),
		fork(watchAddComponent),
		fork(watchEditComponent),
		fork(watchDeleteComponent),
		fork(watchArchiveComponent),
		fork(watchGetTagsAndTypes),
		fork(watchExportComponent),
		fork(watchGetVariation),
		fork(watchEditVariation),
		fork(watchDiscontinueComponent),
		fork(watchRestoreComponent),

		fork(watchAddComponentPackingBox),
		fork(watchGetAllComponentPackingBox),
		fork(watchDeleteComponentByIdPackingBox),
		fork(watchArchiveComponentByIdPackingBox),
		fork(watchRestoreComponentByIdPackingBox),
		fork(watchUpdateComponentPackingBox),

		fork(watchCreateNewComponentME),
		fork(watchGetAllComponentsME),
		fork(watchDeleteComponentByIdME),
		fork(watchArchiveComponentByIdME),
		fork(watchRestoreComponentByIdME),
		fork(watchUpdateComponentME),
		fork(watchDeleteComponentFileME),

		fork(watchCreateNewComponentProducts),
		fork(watchGetAllComponentsProducts),
		fork(watchDeleteComponentByIdProducts),
		fork(watchArchiveComponentByIdProducts),
		fork(watchRestoreComponentByIdProducts),
		fork(watchUpdateComponentProducts),
	]);
}

export default componentsSaga;