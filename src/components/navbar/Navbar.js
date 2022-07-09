import React, { useEffect, useState } from "react";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}


async function checkToken(token) {
  const { status } = await axios({
    method: "post",
    url: "https://g6bcybbjx1.execute-api.eu-central-1.amazonaws.com/auth/jwt/verify/",
    data: token,
    headers: { "Content-Type": "application/json" },
  });

  return status === 200;
}

const checkLogin = async () => {
  const token = getCookie("jwt_session");
  const tokenData = new FormData();
  tokenData.append("token", token);

  return token ? checkToken(tokenData) : false;
};


const Navbar = () => {
  const [isSuccessful, setIsSuccessul] = useState(false);

  useEffect(() => {
    checkLogin().then((res) => setIsSuccessul(res));
  }, []);

  return isSuccessful ? <div>Success!</div> : <div>Oh sh..</div>;
};

export default Navbar;