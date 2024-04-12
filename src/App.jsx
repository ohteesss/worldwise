import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import City from "./components/City";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
// import CreateAccount from "./pages/CreateAccount";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-384536cc.css   30.15 kB │ gzip:   5.06 kB
// dist/assets/index-ce8bf5dc.js   526.56 kB │ gzip: 149.18 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="cities" element={<p>List of testing</p>} />
              <Route path="pricing" element={<Pricing />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    {" "}
                    <AppLayout />{" "}
                  </ProtectedRoute>
                }
              >
                {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities/:id" element={<City />} />

                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />

              <Route path="createAccount" element={<CreateAccount />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
