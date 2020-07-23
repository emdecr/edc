import Mailblast from "../components/Mailblast";

export default function Footer() {
  return (
    <footer className="container container--grid">
      <div className="flex-all flex--jc-fe mono grid--span-all container--grid">
        <div className="grid--span-5 grid--start-8">
          <p className="text-align--r fs--sm">
            What's your story?
            <br />
            What do you need help with?
            <br />
            <strong>Let's chat.</strong>
          </p>
          <ul className="reset-list text-align--r fs--sm ">
            <li>
              <a href="mailto:hello@emilydelacruz.com">
                hello@emilydelacruz.com
              </a>
            </li>
            <li>
              <a href="https://twitter.com/emdecr" target="_blank">
                twitter
              </a>{" "}
              |{" "}
              <a href="https://github.com/emdecr" target="_blank">
                github
              </a>{" "}
              |{" "}
              <a
                href="https://www.linkedin.com/in/emilydelacruz/"
                target="_blank"
              >
                linkedin
              </a>
            </li>
          </ul>
          <p className="made mono text-align--r fs--xs mt--md">
            This site is built with{" "}
            <a href="https://nextjs.org/" target="_blank">
              Next.js
            </a>
            , using a{" "}
            <a href="https://en-ca.wordpress.org/" target="_blank">
              WordPress-powered headless CMS
            </a>
            , and is hosted on{" "}
            <a href="https://www.linode.com/" target="_blank">
              Linode
            </a>
            .{" "}
            <a href="https://github.com/emdecr/edc" target="_blank">
              Github
            </a>{" "}
            hosts the source code.
          </p>
          <p className="made mono text-align--r fs--xs">
            &copy; 2020 Emily Dela Cruz.
          </p>
        </div>
      </div>
      <Mailblast />
      <style jsx>{`
        footer {
          padding-top: 4rem;
          padding-bottom: 4rem;
        }
      `}</style>
    </footer>
  );
}
