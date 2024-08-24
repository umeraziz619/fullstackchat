import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import LayoutLoader from "./components/layout/Loaders";
// import Home from './pages/Home'
const App = () => {
  const Home = lazy(() => import("./pages/Home"));
  const Chat = lazy(() => import("./pages/Chat"));
  const Groups = lazy(() => import("./pages/Groups"));
  const Login = lazy(() => import("./pages/Login"));
  const NotFound = lazy(() => import("./pages/NotFound"));

  let user = true;
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route
              path="/"
              element={
                <ProtectRoute user={user}>
                  <Home />
                </ProtectRoute>
              }
            />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
