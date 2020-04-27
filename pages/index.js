import MainLayout from "../layout/MainLayout";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserInformation from "../components/UserInformation";

export default () => {
  const [message, setMessage] = useState({ style: "", str: "" });
  const settings = useSelector((state) => state.settings);
  const credentials = useSelector((state) => state.credentials);

  useEffect(() => {
    if (
      settings.url === "" ||
      settings.user === "" ||
      settings.accesKey === "" ||
      credentials.sessionName === "" ||
      credentials.userId === ""
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

      console.log(credentials);
    }
  }, [settings, credentials]);

  return (
    <MainLayout>
      <div className="p-4 shadow rounded bg-white">
        <h1 className={message.style + " leading-normal mb-2"}>
          {" "}
          {message.str}
        </h1>
        {credentials.userId != "" && <UserInformation />}
      </div>
    </MainLayout>
  );
};
