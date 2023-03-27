import { BaseLayout } from "@/shared/components/baseLayout/BaseLayout";
import TableData from "@/shared/components/tableData/TableData";
import useGetInFetch from "@/shared/hooks/useGetInFetch";
import { Visibility } from "@mui/icons-material";
import { Grid, IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

interface IPostsProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts: NextPage = () => {
  const theme = useTheme();
  const { data, loading, error } = useGetInFetch<IPostsProps[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const endpointURL: string = "posts";
  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "Id. Usuários",
      flex: 0.1,
      width: 1,
      align: "center",
    },
    { field: "id", headerName: "ID`s", flex: 0.1, width: 1, align: "center" },
    {
      field: "title",
      headerName: "Títulos",
      flex: 0.3,
      width: 10,
      align: "center",
    },
    {
      field: "body",
      headerName: "Conteúdos",
      flex: 1.7,
      width: 150,
      align: "left",
    },
    {
      field: "actions",
      headerName: "AÇÕES",
      flex: 0.4,
      width: 180,
      sortable: false,
      headerAlign: "center",
      align: "center",

      renderCell: (params: any) => {
        const { id } = params.row;

        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Visualizar">
              <IconButton
                aria-label="Visualizar"
                onClick={() => handleView(String(id))}
                color={"error"}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  const handleAdd = async () => {
    router.push(`/${endpointURL}/0`);
  };

  const handleView = async (id: string) => {
    router.push(`/${endpointURL}/${id}`);
  };

  return (
    <BaseLayout
      title="POSTs do JasonPlaceholder"
      subtitle="Listagem de posts do jsonplaceholder"
    >
      <Grid container spacing={2}>
        <Grid item xl={10} lg={10} md={10} xs={4}>
          <TableData
            rows={data}
            columns={columns}
            isLoading={loading}
            addButton={handleAdd}
          />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Posts;
