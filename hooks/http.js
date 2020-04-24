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
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        Mode: "no-cors",
      },
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
  }, [settings]);

  return fetchedData;
};
