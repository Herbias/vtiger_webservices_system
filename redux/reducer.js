export let initState = {
  settings: {
    url: "",
    user: "",
    accessKey: "",
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
    default:
      return state;
  }
}
