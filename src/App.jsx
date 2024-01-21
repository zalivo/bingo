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
  const handleGridSizeChange = (e) => {
    setGridNumber(Number(e.target.value));
  };

  return (
    <div className="flex flex-row gap-3 content-center py-5 items-center place-content-center">
      <h2>Zvol X, aby Bingo bylo X krát X</h2>
      <select value={currentGridNumber} onChange={handleGridSizeChange}>
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
    setBoxGrid((prevGrid) => {
      const updatedGrid = prevGrid.map((box) =>
        box.id === id ? { ...box, text: newText } : box
      );
      return updatedGrid;
    });
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
      <div className={`grid grid-cols-${colSize} gap-4 rounded-md max-w-full`}>
        {boxGrid.map((boxData) => {
          return (
            <Box
              key={`box-key-${boxData.id}`}
              boxData={boxData}
              changeText={changeText}
            />
          );
        })}
      </div>
    </>
  );
}

function Box({ boxData, changeText }) {
  const [clicked, setClicked] = useState(false);

  const handleInputChange = (e) => {
    changeText(boxData.id, e.target.value);
  };

  const handleBoxClick = (e) => {
    // Check if the click occurred on the input element
    if (e.target.tagName.toLowerCase() !== "input") {
      setClicked(!clicked);
    }
  };

  return (
    <div
      className={`p-3 hover:cursor-pointer rounded-md ${
        clicked ? "bg-green-500" : "bg-white"
      }`}
      onClick={handleBoxClick}
    >
      <input
        className="bg-transparent outline outline-1 rounded-md px-3 text-black"
        type="text"
        placeholder={`Enter Value for Box ${boxData.id}`}
        value={boxData.text}
        onChange={handleInputChange}
      ></input>
    </div>
  );
}
export default App;
