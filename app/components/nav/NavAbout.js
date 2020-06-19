import Link from "next/link";
import { useRouter } from "next/router";

function NavAbout() {
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
      {renderLink("/about", "About")}
      {renderLink("/now", "Now")}
      {renderLink("/about/the-link-shelf", "The Link Shelf")}
      {/* {renderLink("/life-overview", "Life Overview")} */}
      <a href="https://emilydelacruz.com/life-overview">Life Overview</a>
      <style jsx>{`
        nav {
          font-size: 0.6rem;
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

export default NavAbout;
