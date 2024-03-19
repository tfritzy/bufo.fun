import { Modal } from "./components/Modal";
import { BufoDetails } from "./BufoData";
import { Tag } from "./components/Tag";

type BufoInspectorProps = {
  bufo: BufoDetails;
  onClose: () => void;
  isOpen: boolean;
};

const Updoot = (props: { bufo: BufoDetails }) => {
  const updootCount = Math.floor(Math.random() * 10) + 1;
  return (
    <div className="rounded-md bg-gray-100 flex flex-row items-center space-x-1 w-min px-[6px] py-[2px]">
      <img
        src={`/all-the-bufo/${props.bufo.name}.${props.bufo.type}`}
        alt={props.bufo.name}
        className="min-w-[18px] min-h-[18px]"
      />
      <span className="text-sm">{updootCount}</span>
    </div>
  );
};

export const BufoInspector = (props: BufoInspectorProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="p-3 w-max">
        <div className="flex flex-row space-x-2">
          <img
            src={`/all-the-bufo/${props.bufo.name}.${props.bufo.type}`}
            alt={props.bufo.name}
            className="rounded-lg w-[48px] h-[48px] shadow-md shadow-lime-50 bg-gray-200"
          />

          <div className="flex flex-col space-y-1">
            <div className="flex flex-row items-center space-x-1 items-center">
              <div className="font-semibold">{props.bufo.name}</div>
              <div className="text-gray-600 text-xs">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </div>

            <div className="flex flex-row space-x-1 items-center">
              <span>In a complex world, be simply amphibious </span>
              <span>
                <img
                  src={`/all-the-bufo/${props.bufo.name}.${props.bufo.type}`}
                  alt={props.bufo.name}
                  className="w-[16px] h-[16px]"
                />
              </span>
            </div>

            <Updoot bufo={props.bufo} />
          </div>
        </div>

        <div>
          <div className="flex flex-row space-x-2">
            <span>Tags: </span>

            {props.bufo.tags.length > 0 ? (
              <div className="flex flex-row space-x-2">
                {props.bufo.tags.map((tag) => (
                  <Tag key={tag} name={tag} />
                ))}
              </div>
            ) : (
              <div className="font-semibold">&mdash;</div>
            )}
          </div>

          <div className="flex flex-row space-x-2">
            <span>Birthday: </span>
            <div className="font-semibold">
              {new Date(props.bufo.created).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-end">
          <button className="bg-lime-600 text-white rounded px-2 py-1 mt-2">
            Download
          </button>
        </div>
      </div>
    </Modal>
  );
};
