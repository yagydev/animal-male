import useSWR from "swr";

export default function useUser() {
  const { data, error, isLoading } = useSWR(`/api/user`, (url: string) =>
    fetch(url).then((res) => res.json())
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
