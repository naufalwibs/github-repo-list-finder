import { useRouter } from "next/router";
import ErrorIcon from "@mui/icons-material/Error";

function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row items-center">
        <ErrorIcon fontSize="large" />
        <p className="ml-2 tracking-widest text-2xl text-center">
          {" "}
          404 | Page Not Found{" "}
        </p>
      </div>
      <button
        className="border-2 rounded-xl px-2 py-2 mt-4 tracking-wider"
        onClick={router.back}
      >
        Back
      </button>
    </div>
  );
}

export default NotFoundPage;
