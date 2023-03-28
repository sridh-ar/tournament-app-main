import Image from "next/image";

export default function CustomButton({ logo, title, color, onClick }) {
  let bgcolor = color
    ? `w-full rounded ${color} h-10 p-2 flex justify-center items-center m-3 cursor-pointer text-white relative`
    : "w-full rounded bg-indigo-400 h-10 p-2 flex justify-center items-center m-3 cursor-pointer text-white relative";
  return (
    <div className={bgcolor} onClick={onClick}>
      {logo && (
        <Image
          src="/google.png"
          alt="Next.js Logo"
          width={20}
          height={30}
          className="absolute left-5"
        />
      )}
      <p className="text-sm">{title}</p>
    </div>
  );
}
