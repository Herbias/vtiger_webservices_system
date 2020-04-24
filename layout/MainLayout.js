import { useState, useEffect, useCallback } from "react";
import Navigation from "../components/Navigation";
import SettingsModal from "../components/SettingsModal";
import { SetSettings } from "../redux/action";
import { useDispatch } from "react-redux";

export default function (props) {
  const [showModal, setModal] = useState(false);
  const dispatch = useDispatch();

  const createCredential = useCallback(
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

  return (
    <React.Fragment>
      <Navigation Show={toggleModal} />
      {props.children}
      {showModal && <SettingsModal SetCredential={createCredential} />}
    </React.Fragment>
  );
}
