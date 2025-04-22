import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import TodoScreen from "./screens/todo-screens/index.tsx";
import DetailScreen from "./screens/todo-screens/detail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex justify-center items-center h-screen p-8">
        <Routes>
          <Route path="/" element={<div>Homes</div>} />
          <Route path="/todo" element={<TodoScreen />} />
          <Route path="/todo/:id" element={<DetailScreen />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
