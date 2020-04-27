export let initState = {
  token: "",
  settings: {
    url: "",
    user: "",
    accessKey: "",
  },
  credentials: {
    sessionName: "",
    userId: "",
  },
};

export default function (state = initState, action) {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        ...state,
        settings: {
          url: action.payload.url,
          user: action.payload.user,
          accessKey: action.payload.accessKey,
        },
      };
    case "SET_CREDENTIAL":
      console.log("From reducer: " + JSON.stringify(action.payload));
      return {
        ...state,
        credentials: action.payload,
      };
    default:
      return state;
  }
}
