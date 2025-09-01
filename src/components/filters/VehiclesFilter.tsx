import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetBucketQuery,
  useLazyGetSiriDataByKeyQuery,
} from "../../store/slices/eliabsApi";
import {
  selectedTimeSelector,
  siriKeysSelector,
} from "../../store/selectors/baseSelectors";
import { setSelectedTime } from "../../store/slices/baseSlice";

export default function VehiclesFilter() {
  const { isLoading } = useGetBucketQuery();
  const dispatch = useDispatch();
  const siri = useSelector(siriKeysSelector);
  const [getSiriData] = useLazyGetSiriDataByKeyQuery();

  const startTime = useSelector(selectedTimeSelector);
  const [isPlaying, setIsPlaying] = useState(false);

  const formatOptionValue = (timestamp: any) => timestamp.toString();
  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedTime(e.target.value));
  };
  const handleShow = async () => {
    try {
      // Fetch SIRI data using the selected timestamp
      const result = await getSiriData(startTime);
      console.log("SIRI data loaded:", result);
    } catch (error) {
      console.error("Error loading SIRI data:", error);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    console.log("Pausing...");
  };
  const handlePause = () => {
    setIsPlaying(false);
    console.log("Pausing...");
  };

  const handleStop = () => {
    setIsPlaying(false);
    console.log("stop:");
  };

  return (
    <div>
      <label>Start Time:</label>
      <select
        value={startTime}
        onChange={handleStartTimeChange}
        disabled={isLoading}
      >
        <option value="">Select time to display</option>
        {siri.map((timestamp) => (
          <option key={timestamp} value={formatOptionValue(timestamp)}>
            {formatTimestamp(timestamp)}
          </option>
        ))}
      </select>
      <button onClick={handleShow} className="actionButtons">
        Show
      </button>
      <div>
        <label>animate</label>
        <button
          onClick={handlePlay}
          disabled={isLoading || !startTime}
          className="actionButtons"
        >
          ▶️
        </button>
        <button
          onClick={handlePause}
          // disabled={isLoading || !startTime}
          className="actionButtons"
        >
          ⏸️
        </button>

        <button
          onClick={handleStop}
          disabled={isLoading || !isPlaying}
          className="actionButtons"
        >
          ⏹️
        </button>
      </div>
    </div>
  );
}
