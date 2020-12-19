import { all } from 'redux-saga/effects';
import components from "./components/saga";

export default function* companySaga() {
    yield all([
        components(),
    ]);
}
