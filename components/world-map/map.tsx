"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import styles from "@/styles/components/world-map.module.css";
import { classNames } from "@/utils/classname.util";

interface MapProps {
  className?: string;
  lat: number;
  lng: number;
  description?: string;
}

function Map(props: MapProps) {
  const { className, lat = 0, lng = 0, description } = props;

  return (
    <div className={classNames(styles.mapContainer, className)}>
      <MapContainer
        className={styles.worldMap}
        center={[lat, lng]}
        zoom={0.5}
        zoomControl={false}
        zoomAnimation={false}
        scrollWheelZoom={false}
        touchZoom={false}
        doubleClickZoom={false}
        dragging={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[lat, lng]}
          icon={L.icon({
            iconUrl: "/images/pin.png",
            iconSize: [40, 40],
          })}
        >
          {description && (
            <Popup>
              <p className={styles.popupDescription}>{description}</p>
            </Popup>
          )}
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
