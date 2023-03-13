import { BaseLayout } from "@/shared/components/baseLayout/BaseLayout";
import KnowledgeArea from "@/shared/components/knowledgeArea/KnowledgeArea";
import TableData from "@/shared/components/tableData/TableData";
import { Visibility } from "@mui/icons-material";
import { Grid, IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

interface IArticleProps {
  id: number;
  year: number;
  title: string;
  author: string;
  advisor: string;
  knowledgeArea: string;
}

const Articles: NextPage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [articles, setArticles] = useState<IArticleProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const endpointURL: string = "files";
  const router = useRouter();

  const rows: GridRowsProp = [
    {
      id: 1,
      year: "2023",
      title: "Repositório Acadêmico",
      author: "Edgard Oliveira, Thiago Lins, Marcos Silva",
    },
    {
      id: 2,
      year: "2021",
      title: "Dispenser IoT - Gerenciamento de Alcool em Gel",
      author: "Edgard Oliveira, Thiago Lins",
    },
    {
      id: 3,
      year: "2021",
      title: "MedAlert - Gerenciamento de medicamentos",
      author: "Edgard Oliveira, Thiago Lins, João Guilherme",
    },
    {
      id: 6,
      year: "2019",
      title: "iRecycler - Gerenciamento de resíduos",
      author: "Edgard Oliveira, Thiago Lins, Marcos Silva",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID`s", flex: 0.5, width: 10, align: "right" },
    { field: "year", headerName: "ANOS", flex: 1, width: 20, align: "center" },
    {
      field: "title",
      headerName: "TÍTULOS",
      flex: 1,
      width: 150,
      align: "left",
    },
    {
      field: "author",
      headerName: "AUTORES",
      flex: 1,
      width: 30,
      align: "left",
    },
    {
      field: "actions",
      headerName: "AÇÕES",
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
      title="Repositório Acadêmico"
      subtitle="Trabalhos de conclusão de curso"
    >
      <Grid container spacing={2}>
        <Grid item xs={10} md={6} sm={4}>
          <TableData
            rows={rows}
            columns={columns}
            isLoading={isLoading}
            addButton={handleAdd}
          />
        </Grid>
        <Grid item xs={2} md={1} sm={1}></Grid>
        <KnowledgeArea />
      </Grid>
    </BaseLayout>
  );
};

export default Articles;
