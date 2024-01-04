import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useAuth } from "@clerk/nextjs";

export default function useClerkSWRInfinite(url: string) {
  const { getToken } = useAuth();

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${url}?offset=${pageIndex}&limit=10`;
  };

  const fetcher = async (...args: [RequestInfo]) => {
    return fetch(...args, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    }).then((res) => res.json());
  };

  return useSWRInfinite(getKey, fetcher);
}
