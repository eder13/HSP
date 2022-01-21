import Cookies from 'js-cookie';

/// Data Fetching Endpoints
const API_ENDPOINTS = {
    USER_INFO: id => `/users/${id}`,
    USER_UPLOAD_INFO: (id, sortBy, sortDirection, page) =>
        `/uploads/search/findAllByUserId?id=${id}&page=${page ?? 0}&size=5${
            sortBy && sortDirection ? `&sort=${sortBy},${sortDirection}` : ''
        }`,
    USER_DOWNLOAD_INFO: (id, sortBy, sortDirection, page) =>
        `/uploads/search/getDownloads?id=${id}&page=${page ?? 0}&size=5${
            sortBy && sortDirection ? `&sort=${sortBy},${sortDirection}` : ''
        }`,
    CAPTCHA: '/captcha',
    LOGOUT: '/logout'
};

/// Headers for Fetching JSON Content
export const getDefaultHeader = () => {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.set('X-XSRF-TOKEN', Cookies.get('XSRF-TOKEN'));
    return header;
};

/// HTTP Methods
export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export default API_ENDPOINTS;
