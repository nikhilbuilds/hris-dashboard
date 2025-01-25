import React from "react";
import { Select, MenuItem } from "@mui/material";
import { Department } from "@/types/employee";

interface FilterSelectProps {
  department: string;
  departmentList: Department[];
  onChange: (event: any) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  department,
  departmentList,
  onChange,
}) => {
  return (
    <Select
      value={department}
      onChange={onChange}
      displayEmpty
      sx={{
        marginBottom: "16px",
        width: "200px",
        bgcolor: "common.white",
        color: "common.black",
      }}
    >
      <MenuItem value="">All Departments</MenuItem>
      {departmentList?.length &&
        departmentList?.map((department) => (
          <MenuItem key={department.id} value={department.name}>
            {department.name}
          </MenuItem>
        ))}
    </Select>
  );
};

export default FilterSelect;
