import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { SkipNavContent } from "@reach/skip-nav";
import { Provider, connect } from "react-redux";
import { wrapper, State } from "../store";
import { getPages } from "../store/actions";

import { renderHTML } from "../helpers";

import DefaultLayout from "../components/layouts/Default";
import ProjectList from "../components/ProjectList";

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store, req, res }) => {
    // getPages();
  }
);

const Home = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Emily Dela Cruz</title>
      </Head>
      <SkipNavContent>
        <main className="container container--grid mt--lg" id="main-content">
          <div className="grid--span-all title flex-all flex--ai-c">
            <h1>emily dela cruz</h1>
            <div>
              <a
                className="pronouns mono fs--sm"
                href="https://www.mypronouns.org/she-her"
                target="_blank"
              >
                she/her
              </a>
            </div>
          </div>
          {/* <div
            className="content grid--span-6"
            dangerouslySetInnerHTML={renderHTML(data.page.content.rendered)}
          ></div>
          <div className="learn-more fs--sm grid--span-all mono">
            <Link href="/about">
              <a>Learn more...</a>
            </Link>
          </div>
          <section className="grid--span-all mt--md">
            <h2>Projects</h2>
            <ProjectList items={data.projectList} />
          </section>
          <div className="learn-more fs--sm grid--span-all mono">
            <Link href="/projects">
              <a>View all projects...</a>
            </Link>
          </div> */}
        </main>
      </SkipNavContent>

      <style jsx>{`
        .title > div {
          margin-left: 20px;
        }
        h1 {
          margin: 0;
          line-height: 1;
        }
      `}</style>
    </DefaultLayout>
  );
};

const mapStateToProps = state => {
  return { pages: state.pages };
};

export default connect(
  mapStateToProps,
  null
)(Home);

// This gets called on every request
// export async function getServerSideProps() {
//   // Fetch page
//   let page;
//   await axios
//     .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
//     .then(function(response) {
//       const pages = response.data;
//       page = pages.filter(p => p.slug == "home")[0];
//     })
//     .catch(function(error) {
//       console.log("Projects page error: " + error);
//       page = null;
//     });
//   // Fetch projects
//   let projectList;
//   await axios
//     .get(
//       process.env.CMS_API_URL +
//         "wp-json/wp/v2/project?per_page=3&order=asc&_embed"
//     )
//     .then(function(response) {
//       projectList = response.data;
//     })
//     .catch(function(error) {
//       console.log("Projects error: " + error);
//       projectList = null;
//     });

//   const data = {
//     page,
//     projectList
//   };

//   return { props: { data } };
// }
