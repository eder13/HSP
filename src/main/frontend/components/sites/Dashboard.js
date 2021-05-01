import React, { useState } from 'react';
import Reaptcha from 'reaptcha';
import { axios } from '../util/axiosConfig';

const Dashboard = () => {
    const [recaptchaParams, setRecaptchaParams] = useState({});
    const [isSelected, setIsSelected] = useState(false);

    const handleSubmission = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const input = document.querySelector('input[type="file"]');
        const formData = new FormData();
        formData.append('file', input.files[0]);

        try {
            const result = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/mixed',
                },
            });
            console.log('Success:', result);
        } catch (e) {
            console.log('Error:', e);
        }
    };

    /* TODO: Example with Captcha validation (1) */
    const onVerify = (recaptchaResponse) => {
        setRecaptchaParams({
            params: {
                'g-recaptcha-response': recaptchaResponse,
            },
        });
    };
    const onExpire = () => {
        console.log('Check expired, please validate again');
        setRecaptchaParams({});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const req = await axios.post(
                '/test',
                { name: 'Simon' },
                recaptchaParams
            );
            console.log(req.data, req.status);
        } catch (e) {
            console.error(e.response.data, e.response.status);
        }
    };

    return (
        <>
            <div>Upload File</div>
            {
                <form onSubmit={handleSubmission}>
                    {!isSelected && (
                        <p>
                            <strong>
                                <em>Please select a file</em>
                            </strong>
                        </p>
                    )}

                    <input
                        type="file"
                        name="file"
                        onChange={(e) =>
                            setIsSelected(e.target.value.length > 0)
                        }
                    />

                    <div
                        className="g-recaptcha"
                        data-sitekey="6Lce_ZsaAAAAAE9qyYGAWPQ1ZCpWrVSv3fFl-I7d"
                    >
                        {}
                    </div>
                    <div>
                        <button disabled={!isSelected} type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            }

            {/* TODO: Example with Captcha validation (2) */}
            <form onSubmit={onSubmit}>
                <Reaptcha
                    sitekey={process.env.CAPTCHA_SITE_KEY}
                    onVerify={onVerify}
                    onExpire={onExpire}
                />
                <input type="submit" value="submit" />
            </form>
        </>
    );
};

export default Dashboard;
