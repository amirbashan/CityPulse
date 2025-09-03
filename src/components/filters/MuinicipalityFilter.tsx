import React from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useGetMunicipalityDataQuery } from "../../store/slices/eliabsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  municipalityNamesSelector,
  selectedMunicipalitySelector,
} from "../../store/selectors/baseSelectors";
import { setSelectedMunicipality } from "../../store/slices/baseSlice";

export default function MuinicipalityFilter() {
  const dispatch = useDispatch();
  const { isLoading } = useGetMunicipalityDataQuery();
  const selectedMunicipality = useSelector(selectedMunicipalitySelector);
  const municipalities = useSelector(municipalityNamesSelector);

  const onSetSelectedMunicipality = (event: any, value: any) => {
    dispatch(setSelectedMunicipality(value || ""));
  };

  return (
    <Autocomplete
      options={municipalities}
      value={selectedMunicipality || null}
      onChange={onSetSelectedMunicipality}
      disabled={isLoading}
      loading={isLoading}
      clearOnEscape
      includeInputInList
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="Filter by Municipality"
          placeholder="Search municipalities..."
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      sx={{ minWidth: 250 }}
    />
  );
}
