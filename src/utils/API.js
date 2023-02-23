import useSWR from "swr";

let fetcher = (...args) => fetch(...args).then((res) => res.json());

function useSearchUser(filter) {
  let url = `https://api.github.com/users`;
  if (filter) {
    url = `https://api.github.com/search/users?q=${filter}`;
  }

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data: data?.items ? data?.items : data,
    error,
    isLoading,
  };
}

function useUserRepoList(userName) {
  let url = `https://api.github.com/users/${userName}/repos`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}

export { useSearchUser, useUserRepoList };
