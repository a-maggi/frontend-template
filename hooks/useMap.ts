import { useEffect, useRef } from "react";
import { Popup, Marker, Map } from "mapbox-gl";

export const generateNewMarker = ({ lat, lng, map }: { lng: number; lat: number; map: Map }) => {
  const popUp = new Popup({ closeButton: false, anchor: "left" }).setHTML(
    `<div class="popup">You click here: <br/>[${lng},  ${lat}]</div>`
  );

  new Marker({ color: "#63df29", scale: 1.5 }).setLngLat([lng, lat]).setPopup(popUp).addTo(map);
};

export const initMap = (container: HTMLDivElement, coords: [number, number]) => {
  const map = new Map({
    container,
    style: "mapbox://styles/mapbox/dark-v10",
    pitchWithRotate: false,
    center: coords,
    zoom: 15,
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
    doubleClickZoom: false
  });
  return map;
};

export const useMap = (container: React.RefObject<HTMLDivElement>) => {
  const mapInitRef = useRef<Map | null>(null);

  useEffect(() => {
    if (container.current) {
      mapInitRef.current = initMap(container.current, [-100.31019063199852, 25.66901932031443]);
    }
  }, []);

  useEffect(() => {
    mapInitRef.current &&
      mapInitRef.current.on("dblclick", ({ lngLat }) => generateNewMarker({ map: mapInitRef.current!, ...lngLat }));

    return () => {
      //mapInitRef.current?.off("dblclick", generateNewMarker);
    };
  }, []);

  useEffect(() => {
    mapInitRef.current &&
      mapInitRef.current.on("load", () =>
        generateNewMarker({
          map: mapInitRef.current!,
          ...mapInitRef.current!.getCenter()
        })
      );

    return () => {
      //mapInitRef.current?.off("load", generateNewMarker);
    };
  }, []);
};
