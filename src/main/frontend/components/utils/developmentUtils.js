export const bootstrapBreakpointIndicator = () => {
    const mediaScreenSizeElement = document.createElement('div');
    mediaScreenSizeElement.style.position = 'fixed';
    mediaScreenSizeElement.style.bottom = '6px';
    mediaScreenSizeElement.style.right = '6px';
    mediaScreenSizeElement.style.padding = '5px';
    mediaScreenSizeElement.style.border = '3px solid #333';
    mediaScreenSizeElement.style.backgroundColor = '#fff';
    mediaScreenSizeElement.style.zIndex = '999999999999999';

    document.body.appendChild(mediaScreenSizeElement);

    const checkSize = () => {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        let size;

        if (width >= 1400) {
            size = 'XXL';
        } else if (width >= 1200 && width < 1400) {
            size = 'XL';
        } else if (width >= 992 && width < 1200) {
            size = 'LG';
        } else if (width >= 768 && width < 992) {
            size = 'MD';
        } else if (width >= 576 && width < 768) {
            size = 'SM';
        } else {
            size = 'XS';
        }

        mediaScreenSizeElement.textContent = size;
    };

    window.addEventListener('resize', checkSize);
    checkSize();
};
