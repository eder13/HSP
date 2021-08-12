export const scrollToElement = (element) => {
    scrollBy({
        top: element.getBoundingClientRect().top - 30,
        behavior: 'smooth'
    });
};
