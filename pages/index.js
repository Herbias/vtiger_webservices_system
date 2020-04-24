import MainLayout from "../layout/MainLayout";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHttp } from "../hooks/http";

export default () => {
  const [message, setMessage] = useState({ style: "", str: "" });
  const settings = useSelector((state) => state.settings);

  let getChallenge = useHttp("GET", {
    operation: "getchallenge",
    username: settings.user,
  });

  console.log(getChallenge ? getChallenge : []);

  const success = getChallenge ? getChallenge.success : false;
  const result = getChallenge ? getChallenge.result : null;

  useEffect(() => {
    if (
      settings.url === "" ||
      settings.user === "" ||
      settings.accesKey === "" ||
      success === false
    ) {
      setMessage({
        style: "text-red-500",
        str: "It seems web services is not configure correctly",
      });
    } else {
      setMessage({
        style: "text-green-500",
        str: "Welcome to VTiger Web Services",
      });
    }
  }, [settings, getChallenge]);

  return (
    <MainLayout>
      <div className="p-4 shadow rounded bg-white">
        <h1 className={message.style + " leading-normal"}> {message.str}</h1>
      </div>
    </MainLayout>
  );
};
