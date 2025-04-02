"use client";
import { createContext, useContext, useState } from "react";

const MapContext = createContext({
  isMapOpen: false,
  setIsMapOpen: () => {},
});

export const MapProvider = ({ children }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <MapContext.Provider value={{ isMapOpen, setIsMapOpen }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
