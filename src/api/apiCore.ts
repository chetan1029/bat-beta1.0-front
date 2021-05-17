import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'universal-cookie';

import config from "../config";


// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;

// intercepting to capture errors
axios.interceptors.response.use(response => {
    return response;
}, error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message: any;

    if (error && error.response && error.response.status === 404) {
        //window.location.href = '/not-found';
    } else if (error && error.response && error.response.status === 403) {
        window.location.href = '/access-denied';
    } else {
        switch (error.response.status) {
            case 401: message = 'Invalid credentials'; break;
            case 403: message = "Access Forbidden"; break;
            case 404: message = "Sorry! the data you are looking for could not be found"; break;
            default: {
                message = error.response && error.response.data ? error.response.data['message'] || error.response.data['non_field_errors'] || error.response.data['detail'] || error.response.data : error.message || error;
            }
        }

        if (error.response && error.response.data && error.response.data['existing_items']) {
            return Promise.reject({ message, existing_items: error.response.data['existing_items'] });
        }
        else
            return Promise.reject(message);
    }
});

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token)
        axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    else
        delete axios.defaults.headers.common['Authorization'];
}

const cookies = new Cookies();

const getUserFromCookie = () => {
    const user = cookies.get("_bat_session_");
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
}
class APICore {
    /**
     * Fetches data from given url
     */
    get = (url, params?: any) => {
        let response;
        if (params) {
            var queryString = params ? Object.keys(params).map(key => key + '=' + params[key]).join('&') : "";
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }
        return response;
    }

    getFile = (url, params?: any) => {
        let response;
        if (params) {
            var queryString = params ? Object.keys(params).map(key => key + '=' + params[key]).join('&') : "";
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {
            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    }

    getMultiple = (urls: Array<string>, params?: {}) => {
        const reqs: Array<any> = [];
        let queryString = "";
        if (params) {
            queryString = params ? Object.keys(params).map(key => key + '=' + params[key]).join('&') : "";
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`));
        }
        return axios.all(reqs);
    }

    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data);
    }

    /**
     * Updates patch data
     */
    updatePatch = (url, data) => {
        return axios.patch(url, data);
    }

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.put(url, data);
    }

    /**
     * Deletes data
     */
    delete = (url) => {
        return axios.delete(url);
    }

    /**
     * post given data to url with file
     */
    createWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config);
    }

    /**
     * post given data to url with file
     */
    updateWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data'
            }
        }
        return axios.patch(url, formData, config);
    }


    isUserAuthenticated = () => {
        const user = this.getLoggedInUser();
        if (!user) {
            return false;
        }
        const decoded: any = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    }

    setLoggedInUser = (session: any) => {
        if (session)
            cookies.set('_bat_session_', JSON.stringify(session), { maxAge: 86400, domain: window.location.hostname });
        else
            cookies.remove('_bat_session_');
    }

    /**
     * Returns the logged in user
     */
    getLoggedInUser = () => {
        return getUserFromCookie();
    }

    setUserInSession = (modifiedUser: any) => {
        let userInfo = cookies.get("_bat_session_");
        if (userInfo) {
            if (typeof userInfo === 'string' || userInfo instanceof String) {
                const { token, user } = JSON.parse(userInfo + "");
                this.setLoggedInUser({ token, ...user, ...modifiedUser });
            } else {
                const { token, user } = userInfo;
                this.setLoggedInUser({ token, ...user, ...modifiedUser });
            }
        }
    }
}

/*
Check if token available in session
*/
let user = getUserFromCookie();
if (user) {
    const { token } = user;
    if (token) {
        setAuthorization(token);
    }
}

export { APICore, setAuthorization };
