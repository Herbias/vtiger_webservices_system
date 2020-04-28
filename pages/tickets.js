import MainLayout from "../layout/MainLayout";
import { useHttp } from "../hooks/http";
import { useSelector } from "react-redux";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import GetQueryData from "../hooks/getQueryData";
import GetCellData from "../hooks/getCellData";

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const Cell = ({ id }) => {
  let credentials = useSelector((state) => state.credentials);
  let settings = useSelector((state) => state.settings);
  let queryData = GetQueryData(id.replace(/([x]\d).*/, ""));
  const [result, setResult] = useState("");
  const [cellData, setCellData] = useState("");

  useEffect(() => {
    setResult(
      `SELECT ${queryData.column} FROM ${queryData.name} WHERE id = ${id};`
    );
  }, [queryData]);

  useEffect(() => {
    fetch(
      settings.url +
        `/webservice.php?${encodeFormData({
          operation: "query",
          sessionName: credentials.sessionName,
          query: result,
        })}`,
      {
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          Mode: "no-cors",
        },
      }
    )
      .then((res) => {
        try {
          if (res.ok) return res.json();
        } catch (err) {
          console.warn(e);
        }
      })
      .then((data) => {
        setCellData(data.result);
      });
  }, [result]);
  return (
    <>
      <td className="border px-4 py-2">
        {cellData ? cellData[0][Object.keys(cellData[0])[0]] : ""}
      </td>
    </>
  );
};

const Row = ({ data }) => {
  return (
    <>
      {data.map((data, i) => {
        return (
          <tr key={i} id={data.id}>
            <td className="border px-4 py-2">
              {data.id.replace(/.(\d[x])/, "")}
            </td>
            <td className="border px-4 py-2">{data.ticket_no}</td>
            <td className="border px-4 py-2">{data.ticket_title}</td>
            <Cell id={data.parent_id} />
            <td className="border px-4 py-2">{data.ticketpriorities}</td>
            <td className="border px-4 py-2">{data.ticketstatus}</td>
            <Cell id={data.assigned_user_id} />
            <Cell id={data.modifiedby} />
          </tr>
        );
      })}
    </>
  );
};

export default () => {
  const credentials = useSelector((state) => state.credentials);
  const [list, setList] = useState([]);
  let getTicketList = useHttp("GET", {
    operation: "query",
    sessionName: credentials.sessionName,
    query: `SELECT id, ticket_no, ticket_title, parent_id, ticketpriorities, ticketstatus,assigned_user_id, modifiedby  FROM HelpDesk;`,
  });

  useEffect(() => {
    getTicketList ? setList(getTicketList.result) : setList([]);
  }, [getTicketList]);

  return (
    <MainLayout>
      <div className="p-4 shadow rounded bg-white">
        <h1>Tickets</h1>
        <div className="flex">
          <div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Number</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Organization</th>
                  <th className="px-4 py-2">Priority</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Assigned To</th>
                  <th className="px-4 py-2">Modified By</th>
                </tr>
              </thead>
              <tbody>{list && <Row data={list} />}</tbody>
            </table>
          </div>
          {/* <div className="shadow rounded p-4 ml-2">
            <h1>Add new record</h1>
          </div> */}
        </div>
      </div>
    </MainLayout>
  );
};
