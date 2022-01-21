import React from 'react';
import Reaptcha from 'reaptcha';

const Step1NotARobot = () => {
    return (
        <div>
            <p>Bestätige bitte zuerst, dass du kein Roboter bist.</p>

            <Reaptcha sitekey={process.env.CAPTCHA_SITE_KEY} />
        </div>
    );
};

export default Step1NotARobot;
