import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const CAMBAY_SOURCE_ID = "cambay-overlay";

function MapWithCambayOverlay() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_VIETMAP_API_KEY;

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !apiKey) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://maps.vietmap.vn/api/maps?apikey=${apiKey}`,
      center: [106.6297, 10.8231],
      zoom: 11,
      attributionControl: true,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    const cambayTiles =
      "https://cambay.mod.gov.vn/geoserver/cambay/wms?service=WMS&" +
      "request=GetMap&version=1.1.1&layers=cambay:cambay&styles=&format=image/png&" +
      "transparent=true&srs=EPSG:3857&width=256&height=256&bbox={bbox-epsg-3857}";

    map.on("load", () => {
      try {
        map.addSource(CAMBAY_SOURCE_ID, {
          type: "raster",
          tiles: [cambayTiles],
          tileSize: 256,
        });

        map.addLayer({
          id: CAMBAY_SOURCE_ID,
          type: "raster",
          source: CAMBAY_SOURCE_ID,
          paint: {
            "raster-opacity": 0.7,
          },
        });
      } catch (e) {
        console.error("Không thể thêm lớp cấm bay", e);
        setError("Không thể tải lớp cấm bay từ cambay.mod.gov.vn");
      }
    });

    map.on("error", (evt) => {
      if (!error) {
        setError("Không thể tải lớp cấm bay từ cambay.mod.gov.vn");
      }
      console.error(evt?.error || evt);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [apiKey, error]);

  if (!apiKey) {
    return (
      <div className="w-full h-[480px] rounded-3xl border border-red-200 bg-red-50 text-red-700 flex items-center justify-center text-center px-6">
        <p>
          Thiếu API key Vietmap (REACT_APP_VIETMAP_API_KEY). Thêm key để tải bản đồ nền và lớp
          cambay.mod.gov.vn.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        ref={mapContainerRef}
        className="w-full h-[520px] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl shadow-black/10"
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

export default MapWithCambayOverlay;
