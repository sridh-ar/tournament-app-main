export default function Pagination({ first, second, third }) {
  return (
    <div className="flex justify-center items-center mt-2">
      <div
        className={`${
          first ? "ring-2 ring-indigo-400" : "ring-1 ring-gray-400"
        } w-8 h-8 rounded-full flex justify-center items-center `}
      >
        1
      </div>
      <div className=" h-px w-14 bg-gray-400" />
      <div
        className={`${
          second ? "ring-2 ring-indigo-400" : "ring-1 ring-gray-400"
        } w-8 h-8 rounded-full flex justify-center items-center `}
      >
        2
      </div>
      <div className=" h-px w-14 bg-gray-400" />
      <div
        className={`${
          third ? "ring-2 ring-indigo-400" : "ring-1 ring-gray-400"
        } w-8 h-8 rounded-full flex justify-center items-center `}
      >
        3
      </div>
    </div>
  );
}
