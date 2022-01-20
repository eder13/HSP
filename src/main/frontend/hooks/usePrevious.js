import React, { useRef, useEffect } from 'react';

export const usePrevious = val => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [val]);
    return ref.current;
};
