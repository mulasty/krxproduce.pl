"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./gl-scene").then((m) => ({ default: m.Scene3D })), {
  ssr: false,
});

export default function SceneWrapper() {
  return <Scene3D />;
}
