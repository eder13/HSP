/**
 * A Helper class that returns the specified property
 * as a string. Example:
 *
 * @param {*} obj: person
 * @param {*} type: person.age
 * @returns 'age'
 */
export const getPropertyNameAsString = (obj, type) => Object.keys(obj).find(key => obj[key] === type);
