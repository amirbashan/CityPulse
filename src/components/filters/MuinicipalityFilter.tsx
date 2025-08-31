import React from "react";
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

  const onSetSelectedMunicipality = (e: any) => {
    dispatch(setSelectedMunicipality(e.target.value));
  };

  return (
    <div className="municipality-filter">
      <label htmlFor="municipality-select">Filter by Municipality:</label>
      <select
        id="municipality-select"
        value={selectedMunicipality}
        onChange={onSetSelectedMunicipality}
        disabled={isLoading}
      >
        <option value="">All Municipalities</option>
        {municipalities.map((municipality) => (
          <option key={municipality} value={municipality}>
            {municipality}
          </option>
        ))}
      </select>
    </div>
  );
}
