import Link from "next/link";
import { useRouter } from "next/router";

function NavAbout({ active }) {
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
      <Link href="/about">
        <a className={getClass("/about")}>General</a>
      </Link>
      <Link href="/now">
        <a className={getClass("/now")}>Now</a>
      </Link>
      <Link href="/about/the-link-shelf">
        <a className={getClass("/about/the-link-shelf")}>The Link Shelf</a>
      </Link>
      <a href="https://emilydelacruz.com/life-overview">Life Overview</a>
      <style jsx>{`
        nav {
          font-size: 0.7rem;
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

export default NavAbout;
