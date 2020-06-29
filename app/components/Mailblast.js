import axios from "axios";
import { useRef, useState } from "react";

const MB_LIST = process.env.NEXT_PUBLIC_MAILBLAST_LIST;
const MB_TOKEN = process.env.NEXT_PUBLIC_MAILBLAST_TOKEN;
const MB_USER = process.env.NEXT_PUBLIC_MAILBLAST_USER;

export default function Mailblast() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState("");

  const subscribe = async e => {
    e.preventDefault();

    // 3. Send a request to our API with the user's email address.
    const res = await axios({
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
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
        // 4. If there was an error, update the message in state.
        setMessage(
          "Oops! Something went wrong on our end – please try again later, or email 'hello@emilydelacruz.com', so I can add you."
        );

        return;
      });

    // 5. Clear the input value and show a success message.
    inputEl.current.value = "";
    setMessage(
      "Success! 🎉 You'll receive an email to confirm your subscription shortly."
    );
  };
  return (
    <div className="grid--span-all">
      <form onSubmit={subscribe}>
        <label htmlFor="email-input">{"Email Address"}</label>
        <input
          id="email-input"
          name="email"
          placeholder="you@your-email.com"
          ref={inputEl}
          type="email"
        />
        <div>
          {message
            ? message
            : `I'll only send emails when new content is posted. No spam.`}
        </div>
        <button className="btn btn--ghost mono fs--sm" type="submit">
          Join the list
        </button>
      </form>
    </div>
  );
}
