import MainLayout from "../layout/MainLayout";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default () => {
  const [message, setMessage] = useState({ style: "", str: "" });
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    settings.url === "" || settings.user === "" || settings.accesKey === ""
      ? setMessage({
          style: "text-red-500",
          str: "It seems web services is not configure correctly",
        })
      : setMessage({
          style: "text-green-500",
          str: "Welcome to VTiger Web Services",
        });
  }, [settings]);

  return (
    <MainLayout>
      <div className="p-4 shadow rounded bg-white">
        <h1 className={message.style + " leading-normal"}> {message.str}</h1>
      </div>
    </MainLayout>
  );
};
