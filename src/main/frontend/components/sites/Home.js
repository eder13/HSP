import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Reaptcha from "reaptcha";

/**
 * This is just an Example for setting login/logout
 */

axios.interceptors.request.use((req) => {
    if (
        req.method === "post" ||
        req.method === "delete" ||
        req.method === "put" ||
        req.method === "patch"
    ) {
        if (!(/^http:.*/.test(req.url) || /^https:.*/.test(req.url))) {
            req.headers.common = {
                ...req.headers.common,
                "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            };
        }
    }

    return req;
});

const Home = () => {

    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [errorLogging, setErrorLogging] = useState("");
    const [recaptchaParams, setRecaptchaParams] = useState({});

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const req = await axios.post("/test", { name: "Simon" }, recaptchaParams);
            console.log(req.data, req.status);
        } catch (e) {
            console.error(e.response.data, e.response.status);
        }
    }

    const handleSubmission = () => {

        // Hack, idk why it only works this way
        var input = document.querySelector('input[type="file"]')
        const formData = new FormData();
        formData.append('file', input.files[0]);

        axios.post('http://localhost:8081/upload', formData, {
            headers: {
                "Content-Type": "multipart/mixed"
            }
        })
        .then(result => console.log('Success:', result.data))
        .catch(error => console.error('Error:', error));
    };

    const logout = async (e) => {
        await axios.post("/logout");
        window.location.href = "http://localhost:8081";
    };

    useEffect(() => {
        const loadData = async () => {
            return await axios.get("/user");
        }

        // "authentication check" -> check if we can access /user endpoint
        loadData().then(async (userData) => {
            setUser(userData.data.email);
            setIsLoggedIn('succeeded');
        }).catch(async e => {
            setIsLoggedIn('failed');
            const req = await axios.get("/error?message=true");
            if(req.data !== "") {
                setErrorLogging(req.data);
            }
        });
    }, []);

    const onVerify = recaptchaResponse => {
        setRecaptchaParams({
            params: {
                "g-recaptcha-response": recaptchaResponse
            }
        });
        console.log();
    };

    const onExpire = () => {
        console.log('Check expired, please validate again');
    }

    if(isLoggedIn === 'succeeded') {
        return (
            <Fragment>
                <div>Hello {user}</div>


{/*                <form onSubmit={handleSubmission} style={{marginTop: '2rem', marginBottom: '2rem'}}>
                    <input type="file" name="file" onChange={changeHandler} />
                    {isSelected ? (
                        <div>
                            <p>Filename: {selectedFile.name}</p>
                            <p>Size in bytes: {selectedFile.size}</p>
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}
                    <div className="g-recaptcha" data-sitekey="6Lce_ZsaAAAAAE9qyYGAWPQ1ZCpWrVSv3fFl-I7d">{}</div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>*/}

                <form onSubmit={onSubmit}>
                    <Reaptcha sitekey={process.env.CAPTCHA_SITE_KEY} onVerify={onVerify} onExpire={onExpire} />
                    <input type="submit" value="submit" />
                </form>

                <button onClick={logout}>Logout</button>
            </Fragment>
        );
    } else {
        return(
            <Fragment>
                <h1>Login</h1>
                <strong style={{color: 'red'}}>
                    { errorLogging !== "" ? errorLogging : "" }
                </strong>
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