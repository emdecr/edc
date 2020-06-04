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

  return (
    <nav className="sub-nav mono flex-all flex--ai-fe">
      <Link href="/records">
        <a className={getClass("/records")}>All</a>
      </Link>
      <Link href="/records/writing">
        <a className={getClass("/records/writing")}>Writing</a>
      </Link>
      <Link href="/records/reads">
        <a className={getClass("/records/reads")}>Reads</a>
      </Link>
      <Link href="/records/music">
        <a className={getClass("/records/music")}>Music</a>
      </Link>
      <style jsx>{`
        nav {
          margin-left: 20px;
          font-size: 0.7rem;
          // line-height: 1;
        }
        nav a:not(:last-of-type) {
          margin-right: 20px;
        }
        .active {
          // font-size: 1.5rem;
        }
      `}</style>
    </nav>
  );
}

export default NavRecords;
