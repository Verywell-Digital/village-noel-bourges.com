import Link from "next/link";

function Copyright() {
  return (
    <div className="flex main-color pt-0 sm:pt-7 py-7">
      <ul className="flex w-full flex-col sm:flex-row justify-between main-color text-base font-normal">
        <li className="sm:pr-3 text-base font-normal main-color">
          Réalisé avec ❤ par{" "}
          <Link
            className="main-color text-base font-normal"
            href="https://www.verywell.digital/"
          >
            Verywell Digital &copy; {new Date().getFullYear()}
          </Link>
        </li>
        <li className="sm:pr-3 text-base main-color font-normal">Mentions légales - Politiques de confidentialité </li>
      </ul>
    </div>
  );
}

export default Copyright;
