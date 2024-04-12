import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Message from "../components/Message";
export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, error } = useAuth();
  useEffect(
    function () {
      isAuthenticated && navigate("/app", { replace: true });
      // isAuthenticated && <Navigate replace to="/app" />;
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    e.preventDefault();
    // if (error) return <Message message={error} />;
    if (email && password) login(email, password);
  }
  function handleClick(e) {
    e.preventDefault();
  }

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  return (
    <main className={styles.login}>
      <PageNav />
      {error && <Message message={error} />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button type="primary">Login</Button>
          </div>
          <Link to="/createAccount">
            {" "}
            <div>
              <Button type="primary">Create Account</Button>
            </div>
          </Link>
        </div>
      </form>
    </main>
  );
}
