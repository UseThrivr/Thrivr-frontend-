import { Calendar } from "lucide-react";
import React, { useState } from "react";

const TimeRangePicker = ({value, change}: {value: string, change: (time: string) => void}) => {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const togglePicker = () => {
    change(`${startTime} - ${endTime}`)
    setIsPickerOpen(!isPickerOpen)
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        value={value}
        readOnly
        onClick={togglePicker}
        className="border border-neutral-border bg-transparent p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium z-10 cursor-default"
      />
      <Calendar className="absolute right-3 z-0" />

      {isPickerOpen && (
        <div className="absolute top-14 left-0 bg-white shadow-lg border rounded-md p-4 w-full z-10">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="border rounded-md p-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="border rounded-md p-1"
              />
            </div>
            <button
              onClick={togglePicker}
              className="bg-action-default text-white rounded-md py-2 hover:opacity-70"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangePicker;
