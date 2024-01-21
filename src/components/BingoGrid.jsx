import { BingoGridCell } from "./BingoGridCell.jsx";
import { createRef, useEffect, useMemo } from "react";
import { range } from "../utils.js";

const containsWin = (items, size) => {
  const checked = items.map((row) => row.map((cell) => cell.checked));

  const rows = range(size).map((i) => checked[i]);
  const columns = range(size).map((y) => range(size).map((x) => checked[x][y]));
  const diagonals = [
    range(size).map((i) => checked[i][i]),
    range(size).map((i) => checked[i][size - (i + 1)]),
  ];

  return [...rows, ...columns, ...diagonals].some((it) =>
    it.every((state) => state)
  );
};

export const BingoGrid = ({
  size,
  items,
  editable,
  toggleCellChecked,
  updateCellValue,
}) => {
  const win = useMemo(
    () => !editable && containsWin(items, size),
    [editable, items, size]
  );
  const winSound = createRef();

  useEffect(() => {
    if (win) {
      winSound.current = new Audio(
        "https://www.myinstants.com/media/sounds/chipi-chipi-chapa-chapa.mp3"
      );
      winSound.current.volume = 0.3;
      winSound.current.play();
    }

    return () => {
      winSound.current = null;
    };
  }, [winSound, win]);

  return (
    <>
      <div className="relative flex flex-row gap-3 content-center py-5 items-center place-content-center">
        <div className={`grid grid-cols-${size} gap-4 rounded-md max-w-full`}>
          {items.map((row, y) =>
            row.map((item, x) => (
              <BingoGridCell
                key={`${x}-${y}`}
                value={item.value}
                checked={item.checked}
                editable={editable}
                onToggle={() => toggleCellChecked(x, y)}
                onChange={(value) => updateCellValue(x, y, value)}
              />
            ))
          )}
        </div>
        {win && (
          <img
            className="absolute w-full h-full"
            src="https://media.tenor.com/ger0WV_a2WMAAAAj/happy-cat.gif"
          />
        )}
      </div>
    </>
  );
};
