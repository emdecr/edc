import Link from "next/link";
import { useRouter } from "next/router";
import { SkipNavLink } from "@reach/skip-nav";

export default function Header() {
  const router = useRouter();

  const getHomeClass = () => {
    if (router.pathname === "/") {
      return "active";
    } else {
      return null;
    }
  };

  const getClass = linkRoute => {
    if (
      linkRoute === router.pathname ||
      router.pathname.indexOf(linkRoute) > -1
    ) {
      return "active";
    } else {
      return null;
    }
  };

  const getArrow = () => {
    if (router.pathname === "/records/reads") {
      return <span> →</span>;
    } else {
      return null;
    }
  };

  return (
    <div className="container">
      <SkipNavLink>Skip to content</SkipNavLink>
      <nav className="main container--grid">
        <Link href="/">
          <a className="no-border logo">
            <img src="/connect-extend.svg" alt="logo" />
          </a>
        </Link>
        <ul className="mono">
          <li>
            <Link href="/">
              <a className={`${getHomeClass()} no-border`}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className={`${getClass("/about")} no-border`}>About</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a className={`${getClass("/projects")} no-border`}>Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/records">
              <a className={`${getClass("/records")} no-border`}>Records</a>
            </Link>
            {getArrow()}
          </li>
          <li>
            <Link href="/records/reads">
              <a className={`${getClass("/records/reads")} no-border`}>Reads</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className={`${getClass("/contact")} no-border`}>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        nav.main {
          padding: 1rem 0;
        }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          //   grid-column-start: 7;
          grid-column: 7 / span 6;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 20px;
        }
        li {
          font-size: 0.7rem;
          //   text-align: center;
        }
        img {
          width: 50px;
          height: auto;
        }
        .logo:hover,
        .logo:active,
        .logo:focus {
          border-bottom: none;
        }
        a.active {
          border-bottom: 3px solid #0071f3cc;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
