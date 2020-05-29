import Link from "next/link";
import { SkipNavLink } from "@reach/skip-nav";

export default function Header() {
  return (
    <div className="container">
      <SkipNavLink>Skip to content</SkipNavLink>
      <nav className="main container--grid">
        <Link href="/">
          <a className="no-border">
            <img src="/connect-extend.svg" alt="logo" />
          </a>
        </Link>
        <ul className="mono">
          <li>
            <Link href="/">
              <a className="no-border">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="no-border">About</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a className="no-border">Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/writing">
              <a className="no-border">Writing</a>
            </Link>
          </li>
          <li>
            <Link href="/reads">
              <a className="no-border">Reads</a>
            </Link>
          </li>
          <li>
            <Link href="#contact">
              <a className="no-border">Contact</a>
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
          grid-gap: 10px;
        }
        li {
          font-size: 0.7rem;
          //   text-align: center;
        }
        img {
          width: 50px;
          height: auto;
        }
      `}</style>
    </div>
  );
}
