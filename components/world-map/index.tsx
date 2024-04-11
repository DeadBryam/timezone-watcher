import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./map"), {
  ssr: false,
});

export { WorldMap };
