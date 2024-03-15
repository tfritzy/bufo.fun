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
      <div className="p-2 flex flex-row space-x-4">
        <img
          src={`/all-the-bufo/${props.bufo.name}.${props.bufo.type}`}
          alt={props.bufo.name}
          className="rounded-lg w-[128px] h-[128px] border border-lime-400 shadow-md shadow-lime-50 bg-lime-50"
        />

        <div>
          <div>
            <b>Name</b>
          </div>
          <span className="text-lime-700 font-mono bg-green-50 rounded">
            :{props.bufo.name}:
          </span>

          <div>
            <b>Tags</b>
          </div>
          {props.bufo.tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      </div>
    </Modal>
  );
};
