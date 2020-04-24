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

export { SetSettings };
