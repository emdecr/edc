import Link from "next/link";
import { useRouter } from "next/router";

function NavRecords({ active }) {
  const router = useRouter();

  const getClass = linkRoute => {
    if (linkRoute === router.pathname) {
      return "active";
    } else {
      return null;
    }
  };

  function renderLink(path, label) {
    if (router.pathname != path) {
      return (
        <Link href={path}>
          <a className={getClass(path)}>
            {label}
            <style jsx>{`
              a:not(:last-of-type) {
                margin-right: 20px;
              }
            `}</style>
          </a>
        </Link>
      );
    }
  }

  return (
    <nav className="sub-nav mono flex-all flex--ai-fe">
      {renderLink("/records", "All Records")}
      {renderLink("/records/reads", "Reads")}
      {/* <Link href="/records">
        <a className={getClass("/records")}>All</a>
      </Link> */}
      {/* <Link href="/records/writing">
        <a className={getClass("/records/writing")}>Writing</a>
      </Link> */}
      {/* <Link href="/records/reads">
        <a className={getClass("/records/reads")}>Reads</a>
      </Link> */}
      {/* <Link href="/records/music">
        <a className={getClass("/records/music")}>Music</a>
      </Link> */}
      <style jsx>{`
        nav {
          font-size: 0.6rem;
          margin: 0.5rem 0 1.5rem;
        }
        nav a:not(:last-of-type) {
          margin-right: 20px;
        }
        @media only screen and (min-width: 700px) {
          nav {
            margin: 0 0 0 20px;
          }
        }
      `}</style>
    </nav>
  );
}

export default NavRecords;
