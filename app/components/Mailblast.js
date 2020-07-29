import axios from "axios";
import { useRef, useState } from "react";
import Link from "next/link";
import { renderHTML } from "../helpers";

const MB_LIST = process.env.NEXT_PUBLIC_MAILBLAST_LIST;
const MB_TOKEN = process.env.NEXT_PUBLIC_MAILBLAST_TOKEN;
const MB_USER = process.env.NEXT_PUBLIC_MAILBLAST_USER;

function renderMessage(message) {
  if (message.status === "success") {
    return (
      <div>
        <p
          className="message success"
          dangerouslySetInnerHTML={renderHTML(message.content)}
        ></p>
        <style jsx>{`
          .message.success {
            padding: 1rem;
            background: var(--success-bg);
            color: var(--main-bg-color);
          }
        `}</style>
      </div>
    );
  } else if (message.status === "error") {
    return (
      <div>
        <p
          className="message error"
          dangerouslySetInnerHTML={renderHTML(message.content)}
        ></p>
        <style jsx>{`
          .message.error {
            padding: 1rem;
            background: var(--error-bg);
            color: var(--main-bg-color);
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <div>
        <p
          className="message"
          dangerouslySetInnerHTML={{ __html: message.content }}
        ></p>
        <style jsx>{`
          .message {
            padding: 1rem;
          }
        `}</style>
      </div>
    );
  }
}

export default function Mailblast() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  const honeyEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState({
    status: "normal",
    content:
      "I'll only send emails when each newsletter is posted.<br/>No emails being shared. No spam."
  });

  const subscribe = async e => {
    e.preventDefault();
    if (!honeyEl.current.checked) {
      if (
        inputEl.current.value == "" ||
        !inputEl.current.value.replace(/\s/g, "").length
      ) {
        setMessage({
          status: "error",
          content:
            "Please enter an email address, or email 'hello@emilydelacruz.com', so I can add you."
        });
      } else {
        // TKNOTE: First send this to an api with bcrypt-ed info
        // 3. Send a request to our API with the user's email address.
        await axios({
          method: "post",
          url: `https://api.mailblast.io/v1/lists/${MB_LIST}/subscribers`,
          data: {
            data: {
              attributes: {
                email: inputEl.current.value
              }
            }
          },
          headers: {
            "Content-Type": "application/json",
            "X-USER-TOKEN": MB_TOKEN,
            "X-USER-EMAIL": MB_USER
          }
        })
          .then(function(response) {
            // handle success
            // 5. Clear the input value and show a success message.
            inputEl.current.value = "";
            setMessage({
              status: "success",
              content:
                "Success! 🎉 You'll receive an email from 'do-not-reply@emdecr.com' to confirm your subscription shortly. Check your spam folder if you can't find the confirmation email, or send me a note at '<a href='mailto:hello@emilydelacruz.com'>hello@emilydelacruz.com</a>'. Thanks!"
            });
          })
          .catch(function(error) {
            // handle error
            console.log(error);
            // 4. If there was an error, update the message in state.
            setMessage({
              status: "error",
              content:
                "Oops! Tech-related shenanigans on my end messed up – please try again later, or email 'hello@emilydelacruz.com', so I can add you."
            });
          });
      }
    } else if (
      inputEl.current.value == "" ||
      !inputEl.current.value.replace(/\s/g, "").length
    ) {
      setMessage({
        status: "error",
        content:
          "Please enter an email address, or email 'hello@emilydelacruz.com', so I can add you."
      });
    } else {
      setMessage({
        status: "error",
        content:
          "Oops! Tech-related shenanigans on my end messed up – please try again later, or email 'hello@emilydelacruz.com', so I can add you."
      });
    }
  };

  return (
    <div className="mailblast mt--sm mono fs--sm grid--span-8 grid--start-3 text-align--c">
      <p>
        Hi 👋 – I'm working on a newsletter. It'll cover psychology, books,
        music...among other topics. Here's content I find interesting to
        discuss:{" "}
        <Link href="/about/the-link-shelf">
          <a>The Link Shelf</a>
        </Link>
        ,{" "}
        <Link href="/records">
          <a>Records</a>
        </Link>
        . Sound up your alley? Sign up below. At most it'll be a monthly email.
      </p>
      <form onSubmit={subscribe}>
        <label htmlFor="contact-box">If you’re human, leave me blank</label>
        <input
          ref={honeyEl}
          type="checkbox"
          id="contact-box"
          name="contact-box"
          value="1"
          tabIndex="-1"
          autoComplete="off"
        ></input>
        <label htmlFor="email-input">{"Email Address"}</label>
        <input
          className="mono"
          id="email-input"
          name="email"
          placeholder="you@your-email.com"
          ref={inputEl}
          type="email"
        />
        {renderMessage(message)}
        <button className="btn mono fs--sm" type="submit">
          Join the list
        </button>
      </form>
      <style jsx>{`
        .mailblast {
          padding: 1rem;
          background: var(--secondary-bg-color);
        }
        .mailblast > *:first-child {
          margin-top: 0;
        }
        button:hover {
          cursor: pointer;
        }
        label {
          font-weight: bold;
          margin-right: 1rem;
        }
        input[type="email"] {
          padding: 0.5rem;
        }
        input[type="checkbox"] {
          display: none;
        }
        label[for="contact-box"] {
          display: none;
        }
        @media only screen and (max-width: 500px) {
          .mailblast {
            margin-top: 2rem;
          }
          input[type="email"] {
            display: block;
            width: 100%;
          }
        }
        @media only screen and (min-width: 700px) {
          .mailblast {
            padding: 2rem;
          }
          input[type="email"] {
            width: 50%;
          }
        }
      `}</style>
    </div>
  );
}
