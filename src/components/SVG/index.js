const getViewBox = (name) => {
  switch (name) {
    case "menu":
      return "0 0 24 24"; // Eg. 0 0 32 32
    case "search":
        return "0 0 96 96"; // Eg. 0 0 32 32
    default:
      return "";
  }
};

const getPath = (name, props) => {
  switch (name) {
    case "menu":
      return (
        <g data-name="menu">
          <rect
            width="24"
            height="24"
            opacity="0"
            transform="rotate(180 12 12)"
          />
          <rect width="18" height="2" x="3" y="11" rx=".95" ry=".95" />
          <rect width="18" height="2" x="3" y="16" rx=".95" ry=".95" />
          <rect width="18" height="2" x="3" y="6" rx=".95" ry=".95" />
        </g>
      );
    case "search":
      return (
        <switch>
          <g>
            <path d="M90.829 85.172L68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z" />
          </g>
        </switch>
      );
    default:
      return <path />;
  }
};
const SVG = ({
  name = "",
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  height = "100%",
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    className={className}
    viewBox={getViewBox(name)}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {getPath(name, { fill })}
  </svg>
);

export default SVG;
