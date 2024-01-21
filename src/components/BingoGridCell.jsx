import {useState} from "react";

export const BingoGridCell = ({
    value,
    checked,
    editable,
    onToggle,
    onChange
}) => {
    const [updatedValue, setUpdatedValue] = useState(value);

    return (
        <div className={
            `flex flex-row items-center justify-center p-4 border-2 rounded border-neutral-700 transition
            ${editable ? "" : "cursor-pointer hover:bg-neutral-500"}
            ${checked ? "bg-green-600" : "bg-neutral-800"}`
        }
             onClick={() => { if (!editable) onToggle(); }}
        >
            {
                editable
                    ? (
                        <>
                            <input
                                value={updatedValue}
                                onChange={(event) => setUpdatedValue(event.target.value)}
                                onBlur={() => onChange(updatedValue)}
                                className="px-4 py-2 border rounded-xl"
                            />
                        </>
                    )
                    : (
                        <h1 className={`pointer-events-none text-xl font-medium transition transform ${checked ? "text-white" : "text-neutral-400"}`}>
                            {value}
                        </h1>
                    )

            }
        </div>
    )
};
