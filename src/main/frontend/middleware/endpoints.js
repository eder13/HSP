const API_ENDPOINTS = {
    USER_INFO: (id) => `/users/${id}`,
    USER_UPLOAD_INFO: (id, sortBy, sortDirection, page) =>
        `/uploads/search/findAllByUserId?id=${id}&page=${page ?? 0}&size=10${
            sortBy && sortDirection ? `&sort=${sortBy},${sortDirection}` : ''
        }`,
    USER_DOWNLOAD_INFO: (id, sortBy, sortDirection, page) =>
        `/uploads/search/getDownloads?id=${id}&page=${page ?? 0}${sortBy && sortDirection ? `&sort=${sortBy},${sortDirection}` : ''}`
};

export default API_ENDPOINTS;
