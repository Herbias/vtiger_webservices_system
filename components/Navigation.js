import Link from "next/link";

export default ({ Show }) => {
  return (
    <nav className="p-4 mb-2 shadow rounded bg-white text-gray-600">
      <ul className="flex">
        <li className="mr-6">
          <Link href="/">
            <a className="text-blue-500 hover:text-blue-800">Home</a>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/Tickets">
            <a className="text-blue-500 hover:text-blue-800">Tickets</a>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/Organization">
            <a className="text-blue-500 hover:text-blue-800">Organization</a>
          </Link>
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
