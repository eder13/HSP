export const scrollToElement = (element) => {
    console.log(element);
    scrollBy({
        top: element.getBoundingClientRect().top - 30,
        behavior: 'smooth'
    });
};
