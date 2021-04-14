import axios from "axios";
import Cookies from "js-cookie";

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

export { axios };