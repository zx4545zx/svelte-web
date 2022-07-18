import { writable } from "svelte/store";
import axios from "axios";

export default function (url = null) {
  const loading = writable(false);
  const error = writable(false);
  const data = writable([]);

  async function get() {
    loading.set(true);
    error.set(false);

    try {
      const res = await axios.get(url);

      if (!res.data) {
        loading.set(false);
        error.set(true);
      }

      data.set(await res.data);
    } catch (e) {
      console.log(e);

      loading.set(false);
      error.set(true);
    }

    loading.set(false);
  }

  return [data, loading, error, get];
}
