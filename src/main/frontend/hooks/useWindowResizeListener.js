import React, { useEffect } from 'react';
import { debounce } from 'lodash';
import { actionSetBrowserWidth } from '../actions/clientActions';

const captureBrowserWidth = dispatch => () => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    dispatch(actionSetBrowserWidth(width));
};

const useWindowResizeListener = dispatch => {
    useEffect(() => {
        captureBrowserWidth(dispatch);
        const debouncedCaptureBrowserWidth = debounce(captureBrowserWidth(dispatch), 200);

        window.addEventListener('resize', debouncedCaptureBrowserWidth);
        return () => {
            window.removeEventListener('resize', debouncedCaptureBrowserWidth);
        };
    }, []);
};

export default useWindowResizeListener;
