import React from "react";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExtraFilter } from "../../utils/interfaces";
import { setExtraFilters } from "../../store/slices/baseSlice";
import { extraFiltersSelector } from "../../store/selectors/baseSelectors";

export default function ExtraFilters() {
  const dispatch = useDispatch();
  const extraFilters = useSelector(extraFiltersSelector);
  const handleChange = (field: ExtraFilter) => (value: any) => {
    dispatch(setExtraFilters({ [field]: value }));
  };

  const filtersArr = [
    { label: "Route No.", field: ExtraFilter.Route },
    { label: "Operator", field: ExtraFilter.Operator },
    { label: "Min Speed", field: ExtraFilter.MinSpeed },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <h5>Additional Filters:</h5>

      {filtersArr.map(({ label, field }) => (
        <TextField
          key={field}
          label={label}
          variant="outlined"
          value={extraFilters[field]}
          onChange={(e) => handleChange(field)(e.target.value)}
        />
      ))}
    </Box>
  );
}
