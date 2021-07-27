export const parseSQLDateToJavaScript = (sqlDate) => {
    return new Date(Date.parse(sqlDate?.toString()));
}