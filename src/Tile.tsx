interface Props {
  color: number;
  changeTile: (i: number) => void;
  i: number;
}

const Tile = (props: Props) => {
  return (
    <div className="tile-div">
      {props.color === 0 && <button className={"tile tile-color-0"}></button>}
      {props.color === 1 && (
        <button
          className={"tile tile-color-1"}
          onClick={() => props.changeTile(props.i)}
        ></button>
      )}
      {props.color === 2 && <button className={"tile tile-color-2"}></button>}
    </div>
  );
};

export default Tile;
