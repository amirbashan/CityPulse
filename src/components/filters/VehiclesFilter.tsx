import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
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

  const formatOptionValue = (timestamp: any) => timestamp.toString();
  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const handleStartTimeChange = (event: any) => {
    dispatch(setSelectedTime(event.target.value));
  };

  const handleShow = async () => {
    // addogic if key exist
    try {
      console.log("Loading SIRI data for time:", startTime);
      await getSiriData(startTime);
    } catch (error) {
      console.error("Error loading SIRI data:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <FormControl fullWidth disabled={isLoading}>
        <InputLabel id="start-time-label">Displayed Time</InputLabel>
        <Select
          value={startTime || ""}
          onChange={handleStartTimeChange}
          displayEmpty
          fullWidth
        >
          {siri.map((timestamp) => (
            <MenuItem key={timestamp} value={formatOptionValue(timestamp)}>
              {formatTimestamp(timestamp)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleShow}
        disabled={isLoading || !startTime}
        sx={{ minWidth: "auto" }}
        size="large"
      >
        {isLoading ? <CircularProgress size={20} /> : "Show"}
      </Button>
    </Box>
  );
}
