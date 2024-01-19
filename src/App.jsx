import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <BingoGrid />
    </>
  );
}

function Header() {
  return (
    <h1 className="text-2xl uppercase py-3 fixed top-0 left-0 right-0">
      bingo
    </h1>
  );
}

function GridSize({ currentGridNumber, updateGrid, setGridNumber }) {
  return (
    <div className="flex flex-row gap-3 content-center py-5 items-center">
      <h2>Kolik polí má mít Bingo?</h2>
      <select
        value={currentGridNumber}
        onChange={(e) => setGridNumber(Number(e.target.value))}
      >
        {[3, 4, 5].map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <button
        onClick={(e) => {
          updateGrid();
        }}
        className="bg-white text-black"
      >
        Confirm
      </button>
    </div>
  );
}

function BingoGrid() {
  const [boxGrid, setBoxGrid] = useState([]);
  const [colSize, setColSize] = useState(3);

  const changeText = (id, newText) => {
    const arr = boxGrid;
    arr[id].text = newText;
    setBoxGrid(arr);
  };

  const createGrid = () => {
    setBoxGrid([]);
    const powerNumber = Math.pow(colSize, 2);
    const boxArray = [];
    for (let i = 0; i < powerNumber; i++) {
      boxArray.push({ id: i, text: "", check: false });
    }
    setBoxGrid(boxArray);
  };

  return (
    <>
      <GridSize
        updateGrid={createGrid}
        currentGridNumber={colSize}
        setGridNumber={setColSize}
      />
      <div className={`grid grid-cols-${Math.sqrt(boxGrid.length)} gap-4`}>
        {boxGrid.map((boxData) => {
          return <Box key={`box-key-${boxData.id}`} boxData={boxData} />;
        })}
      </div>
    </>
  );
}

function Box({ boxData }) {
  return (
    <div className="bg-white text-black p-3 hover:cursor-pointer rounded-md">
      <input
        className="bg-transparent outline outline-1 rounded-md px-3"
        type="text"
        placeholder="Enter Value"
        value="Nazdar"
      ></input>
    </div>
  );
}
export default App;
