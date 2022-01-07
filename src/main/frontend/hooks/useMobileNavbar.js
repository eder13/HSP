import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const useMobileNavbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(100);
    const [initial, setInitial] = useState(true);

    useEffect(() => {
        if (initial) {
            console.log('##### initial');
            setLastScrollTop(window.pageYOffset || document.documentElement.scrollTop);
            setInitial(false);
        }

        console.log('##### lastScrollTop', lastScrollTop);

        const scrollListener = () => {
            console.log('##### lastScrollTop', lastScrollTop);

            const st = window.pageYOffset || document.documentElement.scrollTop;

            console.log('##### st', st);

            if (st > lastScrollTop) {
                if (st - lastScrollTop > 80) {
                    setShowNavbar(false);
                }
            } else {
                if (lastScrollTop - st > 3) {
                    setShowNavbar(true);
                }
            }

            setLastScrollTop(st <= 0 ? 0 : st);
        };

        const debouncedScrollListener = debounce(scrollListener, 17);
        document.addEventListener('scroll', debouncedScrollListener);

        return () => {
            document.removeEventListener('scroll', debouncedScrollListener);
        };
    }, [showNavbar, lastScrollTop, initial]);

    return showNavbar;
};

export default useMobileNavbar;
