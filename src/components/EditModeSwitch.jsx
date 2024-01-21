export const EditModeSwitch = ({current, onChange}) => {
    return (
        <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row bg-neutral-800 justify-self-center self-center rounded-xl p-2 gap-2">
                <div className={"px-4 cursor-pointer hover:ring-2 ring-white rounded-lg " + (current ? "bg-blue-500 text-white shadow-md shadow-blue-500" : "bg-neutral-900")} onClick={() => onChange(true)}>
                    Edit tiles
                </div>
                <div className={"px-4 cursor-pointer hover:ring-2 ring-white rounded-lg " + (current ? "bg-neutral-900 text-white" : "shadow-md shadow-green-500 bg-green-500 text-white")} onClick={() => onChange(false)}>
                    Play
                </div>
            </div>
        </div>
    );
};
