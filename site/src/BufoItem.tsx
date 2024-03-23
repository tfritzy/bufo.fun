import React from "react";
import { TruncatedText } from "./components/TruncatedText";

type BufoProps = {
  name: string;
  onClick?: (index: number) => void;
  blobUrl: string;
  index: number;
};

export const BufoItem = (props: BufoProps) => {
  const [loaded, setLoaded] = React.useState(false);
  const { onClick, name } = props;

  const handleClick = React.useCallback(() => {
    if (props.onClick) {
      props.onClick(props.index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClick, name]);

  return (
    <div className="w-[64px] min-w-[64px] overflow-x-hidden m-2">
      <button onClick={handleClick}>
        <div className="rounded w-[64px] min-w-[64px] h-[64px] min-h-[64px] border border-bufo-400 bg-bufo-100">
          <img
            src={props.blobUrl}
            alt={props.name}
            title={props.name}
            onLoad={() => setLoaded(true)}
            style={{ display: loaded ? "block" : "none" }}
            className="w-full h-full"
          />

          {!loaded && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72pt"
              height="72pt"
              viewBox="0 0 72 72"
              className="stroke-bufo-300 stroke-1 w-full h-full animate-pulse"
              style={{ strokeDasharray: "0.5,0.25", strokeDashoffset: "0" }}
            >
              <defs />
              <path
                id="shape0"
                transform="translate(1.15590351173505, 10.8807938324689)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="bevel"
                d="M2.93897 61.1599C6.91645 52.2055 9.30293 46.7007 10.0984 44.6457C11.2917 41.5632 11.6894 40.5688 9.50181 38.7789C7.31419 36.9891 5.52433 35.8953 5.32546 32.1167C-1.23738 29.4319 -3.35041 15.0135 8.48258 7.05856C8.09726 6.61109 6.48971 1.8452 13.4876 0.00562109C24.0039 -0.200685 21.9314 5.36813 36.1509 0.893471C53.3203 -1.02898 66.5123 11.6989 75.7268 39.0772"
              />
              <path
                id="shape1"
                transform="translate(11.3291021287999, 34.0224626381571)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="bevel"
                d="M0 1.78418C0.708984 0.94043 1.5293 0.345703 2.46094 0"
              />
              <path
                id="shape2"
                transform="translate(5.11159752114868, 31.6406249975052)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="bevel"
                strokeDasharray="2.25,1.125"
                d="M0.0387931 0C-0.0549569 0.996094 0.021215 1.86328 0.267309 2.60156"
              />
              <path
                id="shape3"
                transform="translate(6.7617086377592, 42.8573003363856)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="bevel"
                d="M0 0C4.30893 4.17635 16.4734 5.20386 36.4933 3.08254C42.6584 7.25889 47.9949 10.9381 52.5027 14.12"
              />
              <path
                id="shape4"
                transform="translate(59.4632612555883, 52.5026788343656)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="bevel"
                d="M0 0C0.861786 11.0706 2.2539 17.9649 4.17635 20.6829"
              />
              <path
                id="shape5"
                transform="translate(10.3853059570428, 55.4857855863182)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="bevel"
                d="M1.54712 0C0.022422 13.7223 -0.375326 22.4396 0.353878 26.1519"
              />
            </svg>
          )}
        </div>
      </button>
      <span className="block text-center text-[10px] text-bufo-500 whitespace-nowrap">
        <TruncatedText text={props.name} />
      </span>
    </div>
  );
};
