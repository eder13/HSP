import React, { useEffect, useState, useMemo } from 'react';
import { create } from 'ladda';

const useLaddaBtn = buttonRef => {
    const [laddaBtnInstance, setLaddaBtnInstance] = useState(null);
    useEffect(() => {
        if (buttonRef?.current) setLaddaBtnInstance(create(buttonRef.current));
    }, []);

    const memo = useMemo(
        () => ({
            startLoading: laddaBtnInstance !== null ? () => laddaBtnInstance.start() : null,
            stopLoading: laddaBtnInstance !== null ? () => laddaBtnInstance.stop() : null
        }),
        [laddaBtnInstance]
    );

    return memo;
};

export default useLaddaBtn;
