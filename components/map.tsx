"use client";
import React, { useRef } from "react";
import { useMap } from "../hooks/useMap";
import { cn } from "lib/utils";

const Map: React.FC<HTMLDivElement> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useMap(mapRef);

  return <div ref={mapRef} className={cn("w-full h-full", props.className)} />;
};

export default Map;
