import React, { useState } from 'react';
import Reaptcha from 'reaptcha';
import API_ENDPOINTS, { getDefaultHeader, HTTP_METHOD } from '../../middleware/APIHelper';
import { stringify } from 'query-string';
import axios from 'axios';
import UploadMultistepForm from '../organisms/upload/UploadMultistepForm';

const Dashboard = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [isValidated, setIsValidated] = useState(false);

    const handleSubmission = async e => {
        e.preventDefault();
        e.stopPropagation();

        const input = document.querySelector('input[type="file"]');
        const formData = new FormData();
        formData.append('file', input.files[0]);

        try {
            const result = await axios.post('/upload', formData, {
                headers: {
                    ...getDefaultHeader(),
                    'Content-Type': 'multipart/mixed'
                },
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(percentCompleted);
                }
            });
            console.log('Success:', result);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const onVerify = async recaptchaResponse => {
        const params = {
            'g-recaptcha-response': recaptchaResponse
        };

        try {
            const req = await fetch(`${API_ENDPOINTS.CAPTCHA}?${stringify(params)}`, {
                method: HTTP_METHOD.POST,
                headers: getDefaultHeader()
            });
            await req.json();
            setIsValidated(true);
        } catch (e) {
            console.log('Failed To Validate Captcha!', e);
            setIsValidated(false);
        }
    };

    const onError = () => {
        // Weird Error ... maybe try reloading the site and check if your internet connection is stable
    };

    return (
        <main style={{ backgroundColor: 'rgb(242, 244, 254)' }}>
            <div className="container">
                <UploadMultistepForm />
            </div>

            {/* <form onSubmit={handleSubmission}>
                {!isValidated && (
                    <Reaptcha sitekey={process.env.CAPTCHA_SITE_KEY} onVerify={onVerify} onError={onError} />
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

            <a href={'/download/1642788153372_UNO_Srebrenica.pdf'}>download</a> */}
        </main>
    );
};

export default Dashboard;
