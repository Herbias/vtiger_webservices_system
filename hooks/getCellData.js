import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default ({ query, id }) => {
  let credentials = useSelector((state) => state.credentials);
  let settings = useSelector((state) => state.settings);
  const [fetchedData, setFetchedData] = useState(null);
  let result = fetchedData ? fetchedData.result : null;

  useEffect(() => {
    fetch(
      settings.url +
        `/webservice.php?${encodeFormData({
          operation: "query",
          sessionName: credentials.sessionName,
          query: query,
        })}`,
      {
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          Mode: "no-cors",
        },
      }
    )
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
  }, [query, id]);
  console.log(fetchedData);
  return fetchedData;
};
