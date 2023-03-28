import html2canvas from "html2canvas";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeamImage({
  teamData,
  ownerData = [],
  handleDownload,
}) {
  useEffect(() => {
    const element = document.getElementById("myHiddenDiv");
    html2canvas(element).then((canvas) => {
      const url = canvas.toDataURL("image/jpg");
      handleDownload(url);
    });
  }, []);
  return (
    <div
      id="myHiddenDiv"
      className="p-3 w-full flex flex-wrap wrap absolute -z-10"
    >
      {ownerData.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <Image
            src={`data:image/*;base64,${ownerData[0].ownerphoto}`}
            alt="Rounded avatar"
            width={100}
            height={100}
            className="w-40 h-40 object-cover  m-2 rounded-full ring-2 ring-gray-300 p-0.5"
          />
          <p className="font-semibold capitalize my-2">
            {ownerData[0].owner}(Owner)
          </p>
        </div>
      )}
      {ownerData.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <Image
            src={`data:image/*;base64,${ownerData[0].captainphoto}`}
            alt="Rounded avatar"
            width={100}
            height={100}
            className="w-40 h-40 object-cover  m-2 rounded-full ring-2 ring-gray-300 p-0.5"
          />
          <p className="font-semibold capitalize">
            {ownerData[0].captain}(Captain)
          </p>
        </div>
      )}

      {teamData.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={`data:image/*;base64,${item.photo}`}
            alt="Rounded avatar"
            width={100}
            height={100}
            className="w-40 h-40 object-cover  m-2 rounded-full ring-2 ring-gray-300 p-0.5"
          />
          <p className="font-semibold capitalize">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
