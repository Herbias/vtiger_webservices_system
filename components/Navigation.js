export default ({ Show }) => {
  return (
    <nav className="p-4 mb-2 shadow rounded bg-white text-gray-600">
      <ul className="flex">
        <li className="mr-6">
          <a className="text-blue-500 hover:text-blue-800" href="#">
            Tickets
          </a>
        </li>
        <li className="mr-6">
          <a className="text-blue-500 hover:text-blue-800" href="#">
            Organization
          </a>
        </li>
        <li className="mr-6">
          <a
            className="text-blue-500 hover:text-blue-800"
            href="#"
            onClick={Show}
          >
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};
