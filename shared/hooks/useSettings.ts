import axios from "axios";
import { useState, useEffect } from "react";
import { CloudinarySettings } from "chillhood";

export function useSettings() {
  const [cloudinary, setCloudinary] = useState<CloudinarySettings>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get<CloudinarySettings>("/api/settings/cloudinary").then((res) => {
      setCloudinary(res.data);
      setReady(true);
    });
  }, []);

  return {
    cloudinary,
    ready,
  };
}
