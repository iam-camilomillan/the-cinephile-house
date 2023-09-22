import { PuffLoader } from "react-spinners";
import { FaFilm } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <div className="absolute z-50 flex h-screen w-full items-center justify-center bg-white">
      <PuffLoader
        color="rgba(220, 38 ,38, 1)"
        loading={true}
        size={256}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      <FaFilm className="absolute -rotate-45 text-4xl text-red-600" />
    </div>
  );
};

export default LoadingScreen;
