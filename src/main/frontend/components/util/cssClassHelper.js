const cssClassNamesHelper = (classNames) => {
    return classNames
        .filter(val => !!val)
        .join(' ');
};

export default cssClassNamesHelper;
