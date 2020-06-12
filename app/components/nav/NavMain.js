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
    if (linkRoute === router.pathname) {
      return "active";
    }
    if (router.pathname.indexOf(linkRoute) > -1) {
      return "active-parent";
    }
  };

  const getArrow = () => {
    if (router.pathname === "/records/reads") {
      return (
        <span className="nav-arrow">
          {" "}
          →
          <style jsx>{`
            @media only screen and (max-width: 600px) {
              .nav-arrow {
                display: none;
              }
            }
          `}</style>
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <SkipNavLink>Skip to content</SkipNavLink>
      <nav className="main-nav container--grid">
        <Link href="/">
          <a className="no-border logo logo-home">
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
        nav.main-nav {
          max-width: 1680px;
          margin: 0 auto;
          padding: 1rem 4rem;
        }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          grid-column: 7 / span 6;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 20px;
        }
        li {
          font-size: 0.7rem;
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
          border-bottom: 3px solid var(--link-active);
          font-weight: 500;
        }

        @media only screen and (max-width: 600px) {
          nav.main-nav {
            width: 100vw;
            overflow-x: scroll;
            padding: 1rem;
            position: fixed;
            bottom: 0;
            border-top: 1px solid var(--nav-border);
            z-index: 1;
          }
          .logo-home {
            display: none;
          }
        }
        @media only screen and (min-width: 700px) {
          a.active-parent {
            border-bottom: 3px solid var(--link-active);
            font-weight: 500;
          }
        }
        @media (prefers-color-scheme: light) {
          nav.main-nav {
            background: white;
          }
        }
        @media (prefers-color-scheme: dark) {
          a.active {
            border-bottom: 3px solid var(--link-active);
            font-weight: 500;
          }
        }
      `}</style>
    </div>
  );
}
