import { allowedGridSizes } from "../const.js";

export const BingoSizeSelection = ({ currentSize, onSizeChange }) => {
  const handleGridSizeChange = (event) =>
    onSizeChange(Number(event.target.value));

  return (
    <div className="flex flex-row gap-3 content-center py-5 items-center place-content-center text-lg">
      <h2>Zvol X, aby Bingo bylo X krát X</h2>
      <select
        value={currentSize}
        onChange={handleGridSizeChange}
        className="py-2 px-4 rounded-lg"
      >
        {allowedGridSizes.map((size) => (
          <option value={size} key={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};
