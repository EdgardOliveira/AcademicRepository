import { Box, Button, Skeleton } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { blue, green, grey } from "@mui/material/colors";

const LoadingSkeleton = () => (
  <Box
    sx={{
      height: "max-content",
    }}
  >
    {[...Array(10)].map((_, index) => (
      <Skeleton key={index} variant="rectangular" sx={{ my: 4, mx: 1 }} />
    ))}
  </Box>
);

interface ITableProps {
  rows: any;
  columns: any;
  isLoading: boolean;
  addButton: () => void;
}

const TableData = ({ rows, columns, isLoading, addButton }: ITableProps) => {
  function CustomGridToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <Button startIcon={<AddIcon />} onClick={addButton}>
          Cadastrar
        </Button>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[10, 25, 50, 100]}
      autoHeight
      components={{
        Toolbar: CustomGridToolbar,
        LoadingOverlay: LoadingSkeleton,
      }}
      loading={isLoading}
      sx={{ minHeight: 350 }}
    />
  );
};

export default TableData;
