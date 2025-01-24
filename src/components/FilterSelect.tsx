import React from "react";
import { Select, MenuItem } from "@mui/material";

interface FilterSelectProps {
  department: string;
  onChange: (event: any) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  department,
  onChange,
}) => {
  return (
    <Select
      value={department}
      onChange={onChange}
      displayEmpty
      sx={{ marginBottom: "16px", width: "200px" }}
    >
      <MenuItem value="">All Departments</MenuItem>
      <MenuItem value="Engineering">Engineering</MenuItem>
      <MenuItem value="HR">HR</MenuItem>
      <MenuItem value="Sales">Sales</MenuItem>
      <MenuItem value="Marketing">Marketing</MenuItem>
    </Select>
  );
};

export default FilterSelect;
