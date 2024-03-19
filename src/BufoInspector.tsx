import { Modal } from "./components/Modal";
import { BufoDetails } from "./BufoData";
import { Tag } from "./components/Tag";
import { proverbs } from "./proverbs";

type BufoInspectorProps = {
  bufo: BufoDetails;
  onClose: () => void;
  isOpen: boolean;
};

const Updoot = (props: { bufo: BufoDetails }) => {
  const updootCount = Math.floor(Math.random() * 10) + 1;
  return (
    <div className="rounded-full bg-gray-100 flex flex-row items-center space-x-1 w-min px-[6px] py-[2px]">
      <img
        src={`/all-the-bufo/${props.bufo.name}.${props.bufo.type}`}
        alt={props.bufo.name}
        className="min-w-[16px] min-h-[16px]"
      />
      <span className="text-sm">{updootCount}</span>
    </div>
  );
};

const Message = (props: { bufo: BufoDetails }) => {
  const proverb = proverbs[Math.floor(Math.random() * proverbs.length)];

  return (
    <div className="flex flex-row space-x-2 bg-gray-50 shadow-sm rounded p-2 border border-gray-200">
      <img
        src={`/all-the-bufo/${props.bufo.name}.${props.bufo.type}`}
        alt={props.bufo.name}
        className="rounded-lg w-[48px] h-[48px]"
      />

      <div className="flex flex-col space-y-1">
        <div className="flex flex-row space-x-1 items-end">
          <div className="font-bold text-xs">{props.bufo.name}</div>
          <div className="text-gray-600 text-xs">
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>

        <div className="min-w-80 max-w-80">
          {proverb}{" "}
          <img
            src={`/all-the-bufo/${props.bufo.name}.${props.bufo.type}`}
            alt={props.bufo.name}
            className="w-[18px] h-[18px] align-middle mr-10 inline whitespace-nowrap"
          />
        </div>

        <Updoot bufo={props.bufo} />
      </div>
    </div>
  );
};

const DetailsSection = (props: { bufo: BufoDetails }) => {
  return (
    <div className="text-sm p-3">
      <div className="font-semibold mb-1">Details</div>

      <table className="">
        <tbody>
          <tr>
            <td className="text-gray-700 min-w-20">Name</td>
            <td className="">:{props.bufo.name}:</td>
          </tr>

          <tr>
            <td className="text-gray-700">Tags</td>
            <td className="">
              {props.bufo.tags.length > 0 ? (
                <div className="flex flex-row space-x-2">
                  {props.bufo.tags.map((tag) => (
                    <Tag key={tag} name={tag} />
                  ))}
                </div>
              ) : (
                <div>&mdash;</div>
              )}
            </td>
          </tr>

          <tr>
            <td className="text-gray-700">Created</td>
            <td className="">
              {new Date(props.bufo.created).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const BufoInspector = (props: BufoInspectorProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="font-semibold text-md p-3 w-full flex flex-row justify-between">
        <div>{props.bufo.name}</div>
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

      <div className="px-3 w-max flex flex-col space-y-2">
        <Message bufo={props.bufo} />
      </div>

      <DetailsSection bufo={props.bufo} />

      <div className="flex flex-row justify-end space-x-1 px-3 pb-2">
        <button
          onClick={props.onClose}
          className="text-gray-700 rounded px-2 py-1 mt-2"
        >
          Close
        </button>
        <button className="bg-lime-500 text-white rounded-md px-2 py-1 mt-2 border border-lime-600">
          Download
        </button>
      </div>
    </Modal>
  );
};
