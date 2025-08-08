import { useEffect, useState } from "react";
import { usePostFlightMutation } from "../rtk-query/features/flights/flightsApi";

const useAccessToken = () => {
  const [token, setToken] = useState("");
  const [postFlight, { error, isLoading }] = usePostFlightMutation();

  useEffect(() => {
    const handlePostData = async () => {
      try {
        const response = await postFlight({
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        }).unwrap();

        setToken(response.access_token);
        console.log("RTK Response:", response);
      } catch (e) {
        if (typeof e === "object" && e !== null && "status" in e) {
          console.error("RTK Query Error (status):", e.status, e.data);
        } else if (typeof e === "object" && e !== null && "error" in e) {
          console.error("RTK Query Error (error):", e.error);
        } else if (e instanceof Error) {
          console.error("Native JS Error:", e.name, e.message);
        } else {
          console.error("Unknown Error:", e);
        }
      }
    };

    handlePostData();
  }, [postFlight]);

  return { token, error, isLoading };
};

export default useAccessToken;
