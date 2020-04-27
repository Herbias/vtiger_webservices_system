import { useState, useEffect, useCallback } from "react";

import Navigation from "../components/Navigation";
import SettingsModal from "../components/SettingsModal";

import { SetSettings, SetCredential } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../hooks/http";
import { GetCredential } from "../hooks/getCredential";

import md5 from "md5";

const MainLayout = (props) => {
  const [showModal, setModal] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  let settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  let getChallenge = useHttp("GET", {
    operation: "getchallenge",
    username: settings.user,
  });

  let getCredential = GetCredential(accessKey);

  const challengeSuccess = getChallenge ? getChallenge.success : false;
  const challengeResult = getChallenge ? getChallenge.result : null;

  console.log(challengeResult != null ? challengeResult.token : "");
  console.log(accessKey != "" ? accessKey : "");

  const createSettings = useCallback(
    (e, data) => {
      e.preventDefault();

      dispatch(SetSettings(data));
      setModal(!showModal);
    },
    [showModal]
  );

  const toggleModal = useCallback(
    (e) => {
      e.preventDefault();
      setModal(!showModal);
    },
    [showModal]
  );

  useEffect(() => {
    if (
      challengeSuccess == false ||
      settings.accessKey == "" ||
      challengeResult == null
    )
      return;
    console.log("from useEffect: " + accessKey);
    setAccessKey(md5(challengeResult.token + settings.accessKey));
  }, [getChallenge]);

  useEffect(() => {
    if (getCredential == null || getCredential.result == undefined) return;
    console.log(getCredential);
    dispatch(
      SetCredential({
        sessionName: getCredential.result.sessionName,
        userId: getCredential.result.userId,
      })
    );
  }, [getCredential]);

  return (
    <React.Fragment>
      <Navigation Show={toggleModal} />
      {props.children}
      {showModal && <SettingsModal SetSettings={createSettings} />}
    </React.Fragment>
  );
};

export default React.memo(MainLayout);
