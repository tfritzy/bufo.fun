import { Modal } from "./components/Modal";
import type { BufoDetails } from "./BufoData";
import { Tag } from "./components/Tag";
import { proverbs } from "./proverbs";
import { TruncatedText } from "./components/TruncatedText";
import { downloadBufo } from "./downloadBufo";

const copyBufoToClipboard = async (filename: string) => {
  try {
    const response = await fetch(`/bufos/${filename}`);
    const blob = await response.blob();
    
    const clipboardItem = new ClipboardItem({
      [blob.type]: blob
    });
    
    await navigator.clipboard.write([clipboardItem]);
  } catch (error) {
    console.error("Failed to copy image to clipboard:", error);
  }
};

const Updoot = (props: { bufo: BufoDetails }) => {
 const updootCount = Math.floor(Math.random() * 10) + 1;
 return (
  <div className="rounded-full bg-gray-100 flex flex-row items-center space-x-1 w-min px-[6px] py-[2px]">
   <img
    src={"/smolBufos/" + props.bufo.filename}
    alt={props.bufo.name}
    className="min-w-[16px] min-h-[16px]"
   />
   <span className="text-sm">{updootCount}</span>
  </div>
 );
};

const Message = (props: { bufo: BufoDetails }) => {
 const truncatedName =
  props.bufo.name.length > 30
   ? props.bufo.name.substring(0, 30) + "..."
   : props.bufo.name;

 const hashCode = (s: string) => {
  return s.split("").reduce(function (a, b) {
   a = (a << 5) - a + b.charCodeAt(0);
   return a & a;
  }, 0);
 };
 const proverb =
  proverbs[
   Math.abs(hashCode(props.bufo.name)) % proverbs.length
  ];

 return (
  <div>
   <div className="flex flex-row space-x-2 bg-gray-50 shadow-sm  p-2 border border-gray-200 min-w-80">
    <img
     src={"/smolBufos/" + props.bufo.filename}
     alt={props.bufo.name}
     className=" w-[36px] h-[36px] min-w-[36px] min-h-[36px]"
    />

    <div className="flex flex-col space-y-1">
     <div className="flex flex-row space-x-1 items-end">
      <div className="font-bold text-xs">
       {truncatedName}
      </div>
      <div className="text-gray-600 text-xs">
       {new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
       })}
      </div>
     </div>

     <div className="whitespace-normal">
      {proverb}{" "}
      <img
       src={"/smolBufos/" + props.bufo.filename}
       alt={props.bufo.name}
       className="w-[18px] h-[18px] align-middle mr-10 inline whitespace-nowrap"
      />
     </div>

     <Updoot bufo={props.bufo} />
    </div>
   </div>
  </div>
 );
};

const DetailsSection = (props: { bufo: BufoDetails }) => {
 return (
  <div className="text-sm">
   <div className="font-semibold mb-1">Details</div>

   <table className="">
    <tbody>
     <tr>
      <td className="text-gray-700 min-w-20">Name</td>
      <td className="font-mono">:{props.bufo.name}:</td>
     </tr>

     <tr>
      <td className="text-gray-700">Tags</td>
      <td className="">
       {props.bufo.tags.size > 0 ? (
        <div className="flex flex-row flex-wrap">
         {Array.from(props.bufo.tags).map((tagName) => (
          <div key={tagName} className="m-1">
           <Tag name={tagName} />
          </div>
         ))}
        </div>
       ) : (
        <div>&mdash;</div>
       )}
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 );
};

type BufoInspectorProps = {
 bufo: BufoDetails;
 onClose: () => void;
 isOpen: boolean;
};

export const BufoInspector = (
 props: BufoInspectorProps
) => {
 if (!props.bufo) {
  return null;
 }

 return (
  <Modal isOpen={props.isOpen} onClose={props.onClose}>
   <div className="p-3 text-sm flex flex-col space-y-3">
    <div className="font-semibold text-md w-full flex flex-row justify-between">
     <div className="flex-grow">
      <TruncatedText text={props.bufo.name} />
     </div>
     <button onClick={props.onClose}>
      <svg
       width="24px"
       height="24px"
       stroke-width="1.5"
       viewBox="0 0 24 24"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
       className="stroke-gray-700"
      >
       <path
        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
       ></path>
      </svg>
     </button>
    </div>

    <Message bufo={props.bufo} />

    <DetailsSection bufo={props.bufo} />

    <div className="flex flex-row justify-end space-x-2">
     <button
      className="text-gray-700 rounded px-2 py-1 mt-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:shadow-sm transition-all duration-150 ease-in-out"
      onClick={() => copyBufoToClipboard(props.bufo.filename)}
     >
      Copy
     </button>
     <button
      className="bg-bufo-400 text-white rounded-md px-2 mt-2 border border-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 focus:shadow-sm transition-all duration-150 ease-in-out"
      onClick={() => {
       downloadBufo(props.bufo.filename);
      }}
     >
      Download
     </button>
    </div>
   </div>
  </Modal>
 );
};