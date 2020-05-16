import store from "../../core/store";
import { useState, useEffect } from "react";
import { CloudinarySettings } from "chillhood";

export function useSettings() {
  const [cloudinary, setCloudinary] = useState<CloudinarySettings>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    store.settings.cloudinary().then((data) => {
      setCloudinary(data);
      setReady(true);
    });
  }, []);

  return {
    cloudinary,
    ready,
  };
}
