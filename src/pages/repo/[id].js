import { useUserRepoList } from "@/utils/API";
import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoopIcon from "@mui/icons-material/Loop";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Image from "next/image";
import ErrorIcon from "@mui/icons-material/Error";

function UserRepoListPage() {
  const router = useRouter();
  const { data, isLoading, error } = useUserRepoList(router.query.id);

  if (isLoading)
    return (
      <div className="flex flex-row justify-center h-screen">
        <div className="flex flex-row items-center">
          <LoopIcon />
          <p className="ml-2 tracking-widest text-2xl text-center">
            {" "}
            Loading...{" "}
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-row justify-center h-screen">
        <div className="flex flex-row items-center">
          <ErrorIcon />
          <p className="ml-2 tracking-widest text-2xl text-center">
            {" "}
            Failed to Load{" "}
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-center my-8">
        <div
          className="flex flex-row justify-center items-center mr-7"
          onClick={router.back}
        >
          <ArrowBackIcon fontSize="large" />
        </div>
        <div className="flex flex-row justify-center">
          <Image
            className="rounded-full"
            src={data ? data[0]?.owner.avatar_url : ""}
            alt={`Avatar ${data ? data[0]?.owner.login : ""}`}
            style={{ objectFit: "cover" }}
            width={100}
            height={100}
          />
          <p className="text-center mx-4 my-auto font-semibold text-3xl tracking-wider">
            {`"${router?.query?.id}"`} Repository List{" "}
          </p>
        </div>
      </div>
      <div className="grid mb:grid-cols-1 sm:grid-cols-2 mb:gap-2 sm:gap-4 mb:m-2 sm:m-4">
        {data.map((repo) => (
          <div
            key={repo.id}
            className="m-5 bg-indigo-500 rounded-xl p-5 text-center text-white"
          >
            <h1 className="font-bold text-2xl mt-2 mb-4 text-ellipsis overflow-hidden tracking-wider">
              {repo.name}
            </h1>
            <div className="description my-1">
              <h2 className="text-xl font-semibold">Description</h2>
              <p>
                {repo.description
                  ? repo.description
                  : "No description available"}
              </p>
            </div>
            <div className="visibility my-1">
              <h2 className="text-xl font-semibold">Visibility</h2>
              <p className="capitalize">{repo.visibility}</p>
            </div>
            <div className="language my-1">
              <h2 className="text-xl font-semibold">Language</h2>
              <p>{repo.language}</p>
            </div>
            <div className="button my-3">
              <a
                target="_blank"
                href={repo.owner.html_url}
                rel="noopener noreferrer"
              >
                <button className="border-2 rounded-xl py-1 px-4 font-semibold min-w-[200px] flex flex-row justify-center m-auto">
                  <AccountCircleIcon /> <p className="pl-1">User Github Page</p>
                </button>
              </a>
            </div>
            <div className="button my-3">
              <a target="_blank" href={repo.html_url} rel="noopener noreferrer">
                <button className="border-2 rounded-xl py-1 px-4 font-semibold min-w-[200px] flex flex-row justify-center m-auto">
                  <GitHubIcon /> <p className="pl-1">Repository Page</p>
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
      {data && data.length == 0 && (
        <div className="flex flex-row justify-center">
          <div className="flex flex-row items-center">
            <PriorityHighIcon />
            <p className="ml-2 tracking-widest text-2xl text-center">
              {" "}
              Repository Not Found{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRepoListPage;
