import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Home } from "./components/pages/Home";
import { Explore } from "./components/pages/Explore";
import { Shelf } from "./components/pages/Shelf";
import { Annotations } from "./components/pages/Annotations";
import { BookReader } from "./components/pages/BookReader";
import { AudiobookPlayer } from "./components/pages/AudiobookPlayer";
import { DesignLab } from "./components/pages/DesignLab";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "explore", Component: Explore },
      { path: "shelf", Component: Shelf },
      { path: "annotations", Component: Annotations },
    ],
  },
  {
    path: "/book/:id",
    Component: BookReader,
  },
  {
    path: "/audiobook/:id",
    Component: AudiobookPlayer,
  },
  {
    path: "/design-lab",
    Component: DesignLab,
  },
]);
