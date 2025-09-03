import React from "react";
import { Button, ButtonGroup, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  displayedTimeSelector,
  isPlayAnimationSelector,
  selectedTimeSelector,
} from "../../store/selectors/baseSelectors";
import {
  pauseAnimation,
  playAnimation,
  stopAnimation,
} from "../../store/slices/baseSlice";

export default function AnimateFilter() {
  const dispatch = useDispatch();
  const startTime = useSelector(selectedTimeSelector);
  const isPlaying = useSelector(isPlayAnimationSelector);
  const displayedTime = useSelector(displayedTimeSelector);
  const selectedTime = useSelector(selectedTimeSelector);

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const handlePlay = () => dispatch(playAnimation());
  const handlePause = () => dispatch(pauseAnimation());
  const handleStop = () => dispatch(stopAnimation());

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Animate
      </Typography>
      <ButtonGroup variant="outlined" size="small">
        <Button
          onClick={handlePlay}
          disabled={!startTime || isPlaying}
          title="Play"
        >
          ▶️
        </Button>
        <Button onClick={handlePause} disabled={!isPlaying} title="Pause">
          ⏸️
        </Button>
        <Button onClick={handleStop} disabled={!isPlaying} title="Stop">
          ⏹️
        </Button>
      </ButtonGroup>
      {selectedTime !== displayedTime && <span> {formatTimestamp(displayedTime)}</span>}
    </Box>
  );
}
