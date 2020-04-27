import { useHttp } from "./http";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const GetCredential = (props) => {
  console.log("from getCredential: " + props);
  const settings = useSelector((state) => state.settings);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    let body = encodeFormData({
      operation: "login",
      username: settings.user,
      accessKey: props,
    });
    fetch(settings.url + `/webservice.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body,
    })
      .then((res) => {
        try {
          if (res.ok) return res.json();
        } catch (err) {
          console.warn(e);
        }
      })
      .then((data) => {
        setFetchedData(data);
      });
  }, [props]);

  //   let getCredential = useHttp("POST", {
  //     operation: "login",
  //     username: settings.user,
  //     accessKey: accessKey,
  //   });

  return fetchedData;
};
