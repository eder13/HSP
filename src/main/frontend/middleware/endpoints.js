const API_ENDPOINTS = {
    USER_INFO: (id) => `/users/${id}`,
    USER_UPLOAD_INFO: (id, sortBy, sortDirection, page) => `/uploads/search/findAllByUserId?id=${id}&page=${page ?? 0}${(sortBy && sortDirection) ? `&sort=${sortBy},${sortDirection}` : ''}`
}

export default API_ENDPOINTS;