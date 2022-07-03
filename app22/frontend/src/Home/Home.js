import React from "react";
import MenuLayout from "../MenuLayout";
import axios from "axios";

const baseURL = "endpoint1/";

function APICALL(callbackSuccess, callbackError) {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  const params = {};
  axios
    .post(baseURL, params)
    .then(function (response) {
      console.log("response:", response);
      callbackSuccess(response);
    })
    .catch((err) => {
      console.log("err:", err);
      callbackError(err);
    });
}

const Home = () => {

  React.useEffect(() => {
    APICALL(onResponceSuccess, onResponceError);
  }, []);

  function onResponceSuccess(response) {

  }
  function onResponceError(error) {

  }

  return (
    <MenuLayout>
      <h1>Home</h1>
    </MenuLayout>
  );
};

export default Home;
