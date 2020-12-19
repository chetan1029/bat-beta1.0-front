import jwtDecode from 'jwt-decode';
import axios from 'axios';

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
        window.location.href = '/not-found';
    } else {
        switch (error.response.status) {
            case 401: message = 'Invalid credentials'; break;
            case 403: message = "Access Forbidden"; break;
            case 404: message = "Sorry! the data you are looking for could not be found"; break;
            default: {
                message = error.response && error.response.data ? error.response.data['message'] || error.response.data['non_field_errors'] || error.response.data['detail'] || error.response.data : error.message || error;
            }
        }
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
            sessionStorage.setItem("_bat_session_", JSON.stringify(session));
        else
            sessionStorage.removeItem("_bat_session_");
    }

    /**
     * Returns the logged in user
     */
    getLoggedInUser = () => {
        const user = sessionStorage.getItem("_bat_session_");
        return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
    }

    setUserInSession = (modifiedUser: any) => {
        let userInfo = sessionStorage.getItem("_bat_session_");
        if (userInfo) {
            const { token, user } = JSON.parse(userInfo);
            this.setLoggedInUser({ token, ...user, ...modifiedUser });
        }
    }
}

/*
Check if token available in session
*/
let user = sessionStorage.getItem("_bat_session_");
if (user) {
    const { token } = JSON.parse(user);
    if (token) {
        setAuthorization(token);
    }
}

export { APICore, setAuthorization };