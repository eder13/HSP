export const parseSQLDateToJavaScript = sqlDate => {
    const dateParsed = new Date(Date.parse(sqlDate?.toString()));
    return `${dateParsed?.getDate()}.${dateParsed?.getMonth() + 1}.${dateParsed?.getUTCFullYear()}`;
};
