import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const SettingsModal = ({ SetCredential }) => {
  const [user, setUser] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [url, setUrl] = useState("");

  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    setUser(settings.user);
    setAccessKey(settings.accessKey);
    setUrl(settings.url);
  }, []);

  return (
    <div className="w-screen flex flex-col items-center justify-center absolute text-white">
      <div className="w-2/4 p-4 shadow rounded-t-lg bg-teal-300">
        <h1 className="text-lg">Settings</h1>
      </div>
      <div className="flex-col items-center w-2/4 p-4 shadow rounded-b-lg bg-white">
        <form>
          <p className="text-sm mb-2 text-gray-600">URL</p>
          <input
            className="bg-white text-gray-600 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <p className="text-sm mb-2 text-gray-600">Username</p>
          <input
            className="bg-white text-gray-600 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <p className="text-sm mb-2 text-gray-600">Access Key</p>
          <input
            className="bg-white text-gray-600 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            onChange={(e) => setAccessKey(e.target.value)}
            value={accessKey}
          />
          <div className="flex justify-end mt-2">
            <button
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) =>
                SetCredential(e, { url: url, user: user, accessKey: accessKey })
              }
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
