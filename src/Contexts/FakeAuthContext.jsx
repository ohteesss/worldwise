import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:9000";
function validLogin(data, email, password) {
  if (!data.map((el) => el.email).includes(email)) return;
  return data.find((el) => el.email === email && el.password === password);
}
const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    case "error":
      return { ...initialState, error: action.payload };

    default:
      throw new Error("No such action");
  }
}
const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [loginData, setLogindata] = useState(null);
  useEffect(function () {
    async function fetchUsers() {
      const res = await fetch(`${BASE_URL}/users`);
      const data = await res.json();
      setLogindata(data);
      // console.log(loginData);
    }
    fetchUsers();
  }, []);
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  async function createAccount(email, password, name) {
    const newUser = {
      name,
      email,
      password,
      avatar: "https://i.pravatar.cc/100?u=z",
    };
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLogindata((dat) => [...dat, data]);
  }
  function login(email, password) {
    // if (email === FAKE_USER.email && password === FAKE_USER.password)
    //   dispatch({ type: "login", payload: FAKE_USER });
    const user_data = validLogin(loginData, email, password);
    console.log(user_data);
    console.log(loginData);
    if (user_data.length !== 0) dispatch({ type: "login", payload: user_data });
    else dispatch({ type: "error", payload: "Invalid Login" });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error, createAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Authcontext was used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
