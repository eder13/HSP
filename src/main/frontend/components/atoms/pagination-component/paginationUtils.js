export const getPageNumberFromURL = (url) => parseInt(url?.match(/&page=\d+&/g)[0]?.replace(/[^0-9]/g, ''));
