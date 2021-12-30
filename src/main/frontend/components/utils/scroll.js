/**
 *
 * Function to scroll to a DOM Element.
 *
 * @param {HTMLElement} element
 */
export const scrollToElement = element => {
    scrollBy({
        top: element.getBoundingClientRect().top - 30,
        behavior: 'smooth'
    });
};
