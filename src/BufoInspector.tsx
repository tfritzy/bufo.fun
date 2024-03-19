import { Modal } from "./components/Modal";
import { BufoDetails } from "./BufoData";
import { Tag } from "./components/Tag";

type BufoInspectorProps = {
  bufo: BufoDetails;
  onClose: () => void;
  isOpen: boolean;
};

export const BufoInspector = (props: BufoInspectorProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="p-3">
        <div className="flex flex-row space-x-4">
          <img
            src={`/all-the-bufo/${props.bufo.name}.${props.bufo.type}`}
            alt={props.bufo.name}
            className="rounded-lg w-[64px] h-[64px] border border-lime-400 shadow-md shadow-lime-50 bg-lime-50"
          />

          <div>
            <span className="font-bold">{props.bufo.name}</span>{" "}
            <span className="text-gray-600 text-sm">
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
            <div>In a complex world, be simply amphibious.</div>
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
