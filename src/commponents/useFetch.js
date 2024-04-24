import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData( data );
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, query]);
  return { loading, data };
}
