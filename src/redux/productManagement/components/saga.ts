import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { get, isEmpty, map, size, forEach } from 'lodash';

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
	getTypesAll,
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
 * get Types and Images
 */
function* getTypesAllById({ payload: { companyId, filters } }: any) {
	try {
		const response = yield call(getTypesAll, companyId, filters);
		yield put(componentsApiResponseSuccess(ComponentsTypes.GET_TYPES_ALL, response.data));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.GET_TYPES_ALL, error));
	}
}

/**
 * export component
 */
function* exportComponent({ payload: { companyId, fileType, filters } }: any) {
	try {
		const isCsv = fileType === "csv" || fileType === "csv-filtered";
		let fileName: string = "components.csv";

		switch (fileType) {
			case 'csv-filtered':
				fileName = 'components-filtered.csv';
				break;
			case 'xls-filtered':
				fileName = 'components-filtered.xls';
				break;
			case 'xls':
				fileName = 'components.xls';
				break;
		}

		if (fileType) {
			const response = yield call(isCsv ? exportCSVFile : exportXLSFile, companyId, filters);
			if (isCsv) {
				downloadFile(response.data, fileName);
			} else {
				downloadFile(response.data, fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			}
			yield put(componentsApiResponseSuccess(ComponentsTypes.EXPORT_COMPONENT, true));
		}
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.EXPORT_COMPONENT, error));
	}
}


/**
 * Import component
 * @param param0 
 */
function* importComponent({ payload: { companyId, file } }: any) {
	try {
		// const response = yield call(importComponents, companyId, file);
		yield put(componentsApiResponseSuccess(ComponentsTypes.IMPORT_COMPONENT, true));
	} catch (error) {
		yield put(componentsApiResponseError(ComponentsTypes.IMPORT_COMPONENT, error));
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

export function* watchGetTypesAll() {
	yield takeEvery(ComponentsTypes.GET_TYPES_ALL, getTypesAllById);
}

export function* watchExportComponent() {
	yield takeEvery(ComponentsTypes.EXPORT_COMPONENT, exportComponent);
}

export function* watchImportComponent() {
	yield takeEvery(ComponentsTypes.IMPORT_COMPONENT, importComponent);
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


function* componentsSaga() {
	yield all([
		fork(watchGetComponents),
		fork(watchGetComponent),
		fork(watchAddComponent),
		fork(watchEditComponent),
		fork(watchDeleteComponent),
		fork(watchArchiveComponent),
		fork(watchGetTagsAndTypes),
		fork(watchGetTypesAll),
		fork(watchExportComponent),
		fork(watchImportComponent),
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
	]);
}

export default componentsSaga;
