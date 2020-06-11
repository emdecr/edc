import Link from "next/link";
import { useRouter } from "next/router";

function NavSub({ links }) {
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

  function renderLinkList(links) {}

  return (
    <nav className="sub-nav mono flex-all flex--ai-fe">
      {renderLinkList(links)}
      <style jsx>{`
        nav {
          font-size: 0.7rem;
          margin: 0.5rem 0 1.5rem;
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

export default NavSub;
