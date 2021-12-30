/**
 *
 * CSS Classnames Helper Function to filter
 * out classes that should be active depending on boolean
 *
 * @param {string[]} classNames
 * @returns String with classNames concatenated
 */
const cssClassNamesHelper = classNames => {
    return classNames.filter(val => !!val).join(' ');
};

export default cssClassNamesHelper;
