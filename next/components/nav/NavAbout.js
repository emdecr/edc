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
    <nav className="sub-nav mono">
      <Link href="/about">
        <a className={getClass("/about")}>General</a>
      </Link>
      <Link href="/about/now">
        <a className={getClass("/about/now")}>Now</a>
      </Link>

      <a href="https://emilydelacruz.com/life-overview" target="_blank">
        Life Overview
      </a>
      <style jsx>{`
        nav {
          margin-left: 20px;
          font-size: 0.7rem;
        }
        nav {
        }
        nav a:not(:last-of-type) {
          margin-right: 20px;
        }
      `}</style>
    </nav>
  );
}

export default NavAbout;
