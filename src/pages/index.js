import Form from "@/components/Form";
import Search from "@/components/Search";
import { useSearchUser } from "@/utils/API";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import GitHubIcon from "@mui/icons-material/GitHub";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LoopIcon from "@mui/icons-material/Loop";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data, error, isLoading } = useSearchUser(router.query.search);

  const methods = useForm({ defaultValues: { search: router.query.search } });

  const onSearchUser = ({ search }) => {
    const query = {
      ...router.query,
      search: search,
    };
    if (!!!search) delete query.search;

    router.replace(
      {
        pathname: router.asPath.split("?")[0],
        query,
      },
      undefined,
      { shallow: true, scroll: true }
    );
  };

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
    <>
      <div className="flex flex-row justify-center items-center align-middle mt-9 mb-14">
        <GitHubIcon fontSize="large" />
        <p className="text-center my-auto mb:text-4xl sm:text-5xl tracking-wider font-medium ml-3">
          GITHUB USERS
        </p>
      </div>

      <Form
        methods={methods}
        onSubmit={onSearchUser}
        className="my-12 mb:mx-2 sm:mx-4 flex flex-row"
      >
        <Search
          name="search"
          placeholder="Search Github Username Here..."
          className="flex-1"
          defaultValue={router?.query?.search}
        />
      </Form>

      <div className="grid mb:grid-cols-2 sm:grid-cols-4 mb:gap-2 sm:gap-4 mb:m-2 sm:m-4">
        {data &&
          data.map((user) => (
            <Link key={user.id} href={`repo/${encodeURIComponent(user.login)}`}>
              <div className="flex flex-col align-middle items-center">
                <div className="relative flex flex-col items-center bg-indigo-500 p-3 rounded-xl w-full h-full">
                  <Image
                    className="rounded-xl"
                    src={user.avatar_url}
                    alt={`Avatar ${user.login}`}
                    style={{ objectFit: "cover" }}
                    width={250}
                    height={250}
                  />
                  <h1 className="w-full text-white text-center my-2 tracking-widest text-ellipsis overflow-hidden">
                    {user.login}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {data && data.length == 0 && (
        <div className="flex flex-row justify-center">
          <div className="flex flex-row items-center">
            <PriorityHighIcon />
            <p className="ml-2 tracking-widest text-2xl text-center">
              {" "}
              Result Not Found{" "}
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-row justify-center">
          <div className="flex flex-row items-center">
            <LoopIcon />
            <p className="ml-2 tracking-widest text-2xl text-center">
              {" "}
              Loading...{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
