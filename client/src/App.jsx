import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import LayoutLoader from "./components/layout/Loaders";
// import AdminLogin from "./pages/admin/AdminLogin";
// import Dashboard from "./pages/admin/Dashboard";
// import Home from './pages/Home'
const App = () => {
  const Home = lazy(() => import("./pages/Home"));
  const Chat = lazy(() => import("./pages/Chat"));
  const Groups = lazy(() => import("./pages/Groups"));
  const Login = lazy(() => import("./pages/Login"));
  const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
  const DashBoard = lazy(() => import("./pages/admin/Dashboard"));
  const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
  const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
  const UserManagement = lazy(() => import("./pages/admin/UserManagement"));

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
          <Route path="/admin" element={<AdminLogin /> } />
          <Route path="/admin/dashboard" element={<DashBoard /> } />
          <Route path="/admin/users" element={<UserManagement /> } />
          <Route path="/admin/chats" element={<ChatManagement /> } />
          <Route path="/admin/messages" element={<MessageManagement /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
