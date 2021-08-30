import React, { useState } from 'react';

const useForceRerender = () => {
    const [_, setValue] = useState(0);

    return () => setValue(1);
};

export default useForceRerender;
