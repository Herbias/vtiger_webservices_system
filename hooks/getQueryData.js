import { useState, useEffect } from "react";
export default (id) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (id == 11) setData({ column: "accountname", name: "Accounts" });
    if (id == 19) setData({ column: "user_name", name: "Users" });
    if (id == 20) setData({ column: "groupname", name: "Groups" });
  }, []);
  return data;
};
