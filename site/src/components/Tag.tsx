type TagProps = {
  name: string;
};

export const Tag = (props: TagProps) => {
  return (
    <span className="bg-blue-100 text-blue-600 px-1 rounded-sm font-mono">
      {props.name}
    </span>
  );
};
