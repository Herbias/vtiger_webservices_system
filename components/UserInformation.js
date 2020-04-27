import { useHttp } from "../hooks/http";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
export default () => {
  const settings = useSelector((state) => state.settings);
  const credentials = useSelector((state) => state.credentials);
  const [[user], setUser] = useState("");

  let getUserInformation = useHttp("GET", {
    operation: "query",
    sessionName: credentials.sessionName,
    query: `SELECT user_name, first_name, last_name FROM Users WHERE id = ${credentials.userId};`,
  });

  let results = getUserInformation ? getUserInformation.result : "";
  let [data] = results;

  useEffect(() => {
    getUserInformation ? setUser(getUserInformation.result) : setUser("");
  }, [getUserInformation]);

  console.log(user);
  return (
    <React.Fragment>
      <h4>User Information</h4>
      {user != undefined && (
        <>
          <p className="ml-4">{`Username: ${user.first_name} ${user.last_name}`}</p>
          <p className="ml-4">{`Name: ${user.user_name}`}</p>
        </>
      )}
    </React.Fragment>
  );
};
