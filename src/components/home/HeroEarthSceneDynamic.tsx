"use client";

import dynamic from "next/dynamic";
import { HeroEarthSceneLoader } from "@/components/home/HeroEarthSceneLoader";

export const HeroEarthScene = dynamic(
  () =>
    import("@/components/home/HeroEarthScene").then((mod) => mod.HeroEarthScene),
  {
    ssr: false,
    loading: () => <HeroEarthSceneLoader />,
  },
);
