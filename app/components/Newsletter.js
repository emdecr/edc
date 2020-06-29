import axios from "axios";
import React, { useRef, useState } from "react";

export default function Newsletter() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState("");

  const subscribe = async e => {
    e.preventDefault();

    // 3. Send a request to our API with the user's email address.
    const res = await axios.post("", {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    const { error } = await res.json();

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);

      return;
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = "";
    setMessage(
      "Success! 🎉 You'll receive an email to confirm your subscription shortly."
    );
  };
  return (
    <div>
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
        <button type="submit">{"✨ Subscribe 💌"}</button>
      </form>
    </div>
  );
}
