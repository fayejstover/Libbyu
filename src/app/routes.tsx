import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Home } from "./components/pages/Home";
import { Explore } from "./components/pages/Explore";
import { Shelf } from "./components/pages/Shelf";
import { Annotations } from "./components/pages/Annotations";
import { BookReader } from "./components/pages/BookReader";
import { AudiobookPlayer } from "./components/pages/AudiobookPlayer";
import { DesignLab } from "./components/pages/DesignLab";
import { DesignLabHome, HomeRefined } from "./components/pages/DesignLabHome";
import { DesignLabDiscoverability } from "./components/pages/DesignLabDiscoverability";
import { HomeVariantA, HomeVariantB, HomeVariantC, HomeVariantD, HomeVariantE, HomeVariantRefined } from "./components/pages/HomeVariants";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "explore", Component: Explore },
      { path: "shelf", Component: Shelf },
      { path: "annotations", Component: Annotations },
      { path: "home-a", Component: HomeVariantA },
      { path: "home-b", Component: HomeVariantB },
      { path: "home-c", Component: HomeVariantC },
      { path: "home-d", Component: HomeVariantD },
      { path: "home-e", Component: HomeVariantE },
      { path: "home-refined", Component: HomeVariantRefined },
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
  {
    path: "/design-lab-home",
    Component: DesignLabHome,
  },
  {
    path: "/design-lab-home/refined",
    Component: HomeRefined,
  },
  {
    path: "/design-lab-discoverability",
    Component: DesignLabDiscoverability,
  },
]);
