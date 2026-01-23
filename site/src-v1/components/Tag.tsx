type TagProps = {
  name: string;
};

const colorClasses = [
  "bg-blue-100 text-blue-600 border border-blue-200",
  "bg-yellow-100 text-yellow-600 border border-yellow-200",
  "bg-indigo-100 text-indigo-600 border border-indigo-200",
  "bg-purple-100 text-purple-600 border border-purple-200",
  "bg-orange-100 text-orange-600 border border-orange-200",
  "bg-teal-100 text-teal-600 border border-teal-200",
  "bg-cyan-100 text-cyan-600 border border-cyan-200",
  "bg-lime-100 text-lime-600 border border-lime-200",
  "bg-rose-100 text-rose-600 border border-rose-200",
  "bg-emerald-100 text-emerald-600 border border-emerald-200",
  "bg-violet-100 text-violet-600 border border-violet-200",
  "bg-cyan-100 text-cyan-600 border border-cyan-200",
  "bg-amber-100 text-amber-600 border border-amber-200",
  "bg-fuchsia-100 text-fuchsia-600 border border-fuchsia-200",
];

const getHashCode = (str: string) => {
  // only positive integers
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const Tag = (props: TagProps) => {
  const tagIndex = getHashCode(props.name) % colorClasses.length;
  console.log(colorClasses, tagIndex, colorClasses[tagIndex]);
  return (
    <span className={`${colorClasses[tagIndex]} + px-1 rounded-sm font-mono`}>
      {props.name}
    </span>
  );
};
