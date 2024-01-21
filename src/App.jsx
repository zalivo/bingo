import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BingoSizeSelection } from "./components/BingoSizeSelection.jsx";
import { allowedGridSizes } from "./const.js";
import { BingoGrid } from "./components/BingoGrid.jsx";
import { EditModeSwitch } from "./components/EditModeSwitch.jsx";
import { range } from "./utils.js";

const Header = () => {
  return (
    <h1 className="text-2xl uppercase py-3 fixed top-0 left-0 right-0">
      Bingo
    </h1>
  );
};

const App = () => {
  const [size, setSize] = useState(allowedGridSizes[0]);
  const [items, setItems] = useState([]);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (editable) {
      // Uncheck all cells
      setItems((current) =>
        current.map((row) => row.map((cell) => ({ ...cell, checked: false })))
      );
    }
  }, [editable, setItems]);

  useEffect(() => {
    setItems((current) => {
      return range(size).map((y) =>
        range(size).map((x) => {
          const original = current?.[y]?.[x];
          return {
            value: original?.value ?? null,
            checked: original?.checked ?? false,
          };
        })
      );
    });
  }, [size]);

  const updateCellValue = useCallback(
    (updatedCellX, updatedCellY, value) => {
      setItems((current) =>
        current.map((row, y) =>
          row.map((cell, x) => {
            return {
              ...cell,
              value:
                y === updatedCellY && x === updatedCellX ? value : cell.value,
            };
          })
        )
      );
    },
    [setItems]
  );

  const toggleCellChecked = useCallback(
    (updatedCellX, updatedCellY) => {
      setItems((current) =>
        current.map((row, y) =>
          row.map((cell, x) => {
            return {
              ...cell,
              checked:
                y === updatedCellY && x === updatedCellX
                  ? !cell.checked
                  : cell.checked,
            };
          })
        )
      );
    },
    [setItems]
  );

  return (
    <>
      <Header />
      <BingoSizeSelection currentSize={size} onSizeChange={setSize} />
      <BingoGrid
        size={size}
        items={items}
        editable={editable}
        toggleCellChecked={toggleCellChecked}
        updateCellValue={updateCellValue}
      />
      <EditModeSwitch current={editable} onChange={setEditable} />
    </>
  );
};

export default App;
