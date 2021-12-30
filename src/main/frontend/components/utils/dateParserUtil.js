/**
 *
 * Helper Function to Format Date to German standard date.
 *
 * @param {any} sqlDate
 * @returns A String that represents the date
 */
export const parseSQLDateToJavaScript = sqlDate => {
    const dateParsed = new Date(Date.parse(sqlDate?.toString()));
    return `${dateParsed?.getDate()}.${dateParsed?.getMonth() + 1}.${dateParsed?.getUTCFullYear()}`;
};
