import Cookies from "js-cookie"
import jwt_decode from "jwt-decode";
import axios from "axios";

const SITE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL + "api/v1/";

const changeLink = (link) => {
	return link.replace("http://3.65.253.196:80", "https://g6bcybbjx1.execute-api.eu-central-1.amazonaws.com");
}

const getToken = () => {
    return Cookies.get("jwt_session")
}

const getLoginInfo = () => {
    const token = getToken("jwt_session");
    const user_id = token ? jwt_decode(token).user_id : 0;
    return {token: token, user_id: user_id}
}

const axios_request = axios.create(
    {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": 'JWT ' + getToken()
          }
    }
)

export {changeLink, getToken, getLoginInfo, axios_request, BASE_URL, SITE_URL}
