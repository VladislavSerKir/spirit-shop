import React, { useState } from "react";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { Footer } from "../footer/footer";
import { ScrollUp } from "../scroll-up/scroll-up";
import { Navigate, Router } from "react-router-dom";

function App() {
  const [isAdmin, setIsAdmin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Header />
      {/* {!isLoggedIn && <Navigate to="/login" replace={true} />}
      {!isLoggedIn && <Navigate to="/register" replace={true} />} */}
      <Main />
      <Footer />
      <ScrollUp />
    </>
  );
}

export default App;
