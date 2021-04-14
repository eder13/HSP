import React, {Fragment, useState} from 'react';
import Reaptcha from "reaptcha";
import {axios} from "../utils/axiosConfig";

const Home = (props) => {

    // TODO: Move this somewhere different (Routes?)
    const logout = async (e) => {
        await axios.post("/logout");
        window.location.href = "http://localhost:8081";
    };

    /**
     * Props
     */
    const {user, loggedIn} = props;

    /**
     * State
     */
    const [recaptchaParams, setRecaptchaParams] = useState({});
    const [isSelected, setIsSelected] = useState(false);

    const handleSubmission = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const input = document.querySelector('input[type="file"]');
        const formData = new FormData();
        formData.append('file', input.files[0]);

        try {
            const result = await axios.post('http://localhost:8081/upload', formData, {
                headers: {
                    "Content-Type": "multipart/mixed"
                }
            });
            console.log('Success:', result);
        } catch (e) {
            console.log('Error:', e);
        }
    };

    /* TODO: Example with Captcha validation (1) */
    const onVerify = recaptchaResponse => {
        setRecaptchaParams({
            params: {
                "g-recaptcha-response": recaptchaResponse
            }
        });
    };
    const onExpire = () => {
        console.log('Check expired, please validate again');
        setRecaptchaParams({});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = await axios.post("/test", {name: "Simon"}, recaptchaParams);
            console.log(req.data, req.status);
        } catch (e) {
            console.error(e.response.data, e.response.status);
        }
    };

    /**
     * Render
     */
    if (loggedIn) {
        return (
            <Fragment>
                <div>Hello {user}</div>
                {<form onSubmit={handleSubmission}>
                    {!isSelected && (
                        <p><strong><em>Please select a file</em></strong></p>
                    )}

                    <input type="file" name="file" onChange={e =>
                        e.target.value.length > 0 ? setIsSelected(true) : setIsSelected(false)
                    }/>

                    <div className="g-recaptcha" data-sitekey="6Lce_ZsaAAAAAE9qyYGAWPQ1ZCpWrVSv3fFl-I7d">{}</div>
                    <div>
                        <button disabled={!isSelected} type="submit">Submit</button>
                    </div>
                </form>}

                {/* TODO: Example with Captcha validation (2) */}
                <form onSubmit={onSubmit}>
                    <Reaptcha sitekey={process.env.CAPTCHA_SITE_KEY} onVerify={onVerify} onExpire={onExpire}/>
                    <input type="submit" value="submit"/>
                </form>

                <button onClick={logout}>Logout</button>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <h1>Login</h1>
                <div className="container">
                    <div>
                        With Google: <a href="/oauth2/authorization/google">click here</a>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;
