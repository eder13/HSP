import React, { useState } from 'react';
import Reaptcha from 'reaptcha';

const Dashboard = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [isValidated, setIsValidated] = useState(false);

    const handleSubmission = async e => {
        e.preventDefault();
        e.stopPropagation();

        const input = document.querySelector('input[type="file"]');
        const formData = new FormData();
        formData.append('file', input.files[0]);

        /*try {
            const result = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/mixed',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    console.log(percentCompleted);
                },
            });
            console.log('Success:', result);
        } catch (e) {
            console.log('Error:', e);
        }*/
    };

    const onVerify = async recaptchaResponse => {
        /*try {
            const result = await axios.post('/captcha', '', {
                params: {
                    'g-recaptcha-response': recaptchaResponse,
                },
            });
            setIsValidated(true);
            console.log(result);
        } catch (e) {
            console.log(e);
            setIsValidated(false);
        }*/
    };

    const onExpire = () => {
        console.log('Check expired, please validate again');
    };

    const onError = () => {
        // Weird Error ... maybe try reloading the site and check if your internet connection is stable
    };

    return (
        <>
            <form onSubmit={handleSubmission}>
                {!isValidated && (
                    <Reaptcha
                        sitekey={process.env.CAPTCHA_SITE_KEY}
                        onVerify={onVerify}
                        onExpire={onExpire}
                        onError={onError}
                    />
                )}

                {!isSelected && (
                    <p>
                        <strong>
                            <em>Please select a file</em>
                        </strong>
                    </p>
                )}

                <input type="file" name="file" onChange={e => setIsSelected(e.target.value.length > 0)} />

                <div>
                    <input disabled={!isSelected || !isValidated} type="submit" value="Submit" />
                </div>
            </form>

            <a href={'/download/1626904069169_cct_bestaetigung.pdf'}>download</a>
        </>
    );
};

export default Dashboard;
