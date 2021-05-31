import React, {useState} from 'react';
import Reaptcha from 'reaptcha';
import {axios} from '../util/axiosConfig';

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
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    console.log(percentCompleted)
                }
            });
            console.log('Success:', result);
        } catch (e) {
            console.log('Error:', e);
        }
    };

    const handleCaptcha = async (e) => {

        e.preventDefault();
        e.stopPropagation();

        try {
            const result = await axios.post('/captcha', "", {

                params: {
                    ...recaptchaParams
                },
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    const onVerify = (recaptchaResponse) => {
        setRecaptchaParams({
            'g-recaptcha-response': recaptchaResponse,
        });
    };

    const onExpire = () => {
        console.log('Check expired, please validate again');
        setRecaptchaParams({});
    };

    return (
        <>
            <div>Validate Captcha</div>
            <form onSubmit={handleCaptcha}>
                <div
                    className="g-recaptcha"
                    data-sitekey="6Lce_ZsaAAAAAE9qyYGAWPQ1ZCpWrVSv3fFl-I7d"
                >
                    {}
                </div>

                <Reaptcha
                    sitekey={process.env.CAPTCHA_SITE_KEY}
                    onVerify={onVerify}
                    onExpire={onExpire}
                />

                <div>
                    <input type="submit" value="Validate"/>
                </div>
            </form>

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

                    <div>
                        <input disabled={!isSelected} type="submit" value="Submit"/>
                    </div>
                </form>
            }
            {/* TESTING DELETE */}
            <button onClick={async e => {
                const req = await axios.delete(`/delete/1622406510335_ad_maurer_reviews-yugoslavia's-successor-states_Content File-PDF.pdf`);
                console.log(req.status, req.data, req.statusText)
            }}/>
        </>
    );
};

export default Dashboard;
