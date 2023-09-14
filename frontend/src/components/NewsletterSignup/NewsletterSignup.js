import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.scss";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    console.log(state, data);
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
      setEmail("");
    }
  }, [data, state]);
  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        value={email}
        name="email"
        onChange={emailChangeHandler}
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
