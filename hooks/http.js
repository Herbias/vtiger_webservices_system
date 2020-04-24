import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const useHttp = (method, data) => {
  const settings = useSelector((state) => state.settings);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    fetch(settings.url + `/webservice.php?${encodeFormData(data)}`, {
      method: "GET",
    })
      .then((res) => {
        try {
          return res.json();
        } catch (err) {
          console.warn(e);
        }
      })
      .then((data) => {
        console.log(data);
        setFetchedData(data);
      });
  }, [settings]);

  return [fetchedData];
};
