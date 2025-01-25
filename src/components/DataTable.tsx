import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

interface Column {
  label: string;
  key: string;
}

interface PaginationProps {
  totalCount: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
}

interface DataTableProps<T> {
  columns: Column[];
  rows: T[];
  noDataMessage?: string;
  pagination?: PaginationProps;
  fixedHeight?: boolean;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  rows,
  noDataMessage = "No data available.",
  pagination,
  fixedHeight = true,
}: DataTableProps<T>) => {
  const rowsPerPage = pagination?.rowsPerPage || 10;
  const emptyRows = rowsPerPage - rows.length;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "grey.200",
            }}
          >
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                {noDataMessage}
              </TableCell>
            </TableRow>
          )}

          {fixedHeight &&
            emptyRows > 0 &&
            Array.from({ length: emptyRows }).map((_, index) => (
              <TableRow key={`empty-${index}`} style={{ height: 53 }}>
                {columns.map((column) => (
                  <TableCell key={`empty-cell-${index}-${column.key}`} />
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={pagination.totalCount}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={pagination.onPageChange}
          labelRowsPerPage=""
        />
      )}
    </TableContainer>
  );
};

export default DataTable;
