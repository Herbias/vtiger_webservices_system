const SetSettings = (data) => {
  return {
    type: "SET_SETTINGS",
    payload: {
      url: data.url,
      user: data.user,
      accessKey: data.accessKey,
    },
  };
};

const SetCredential = (data) => {
  return {
    type: "SET_CREDENTIAL",
    payload: data,
  };
};

export { SetSettings, SetCredential };
