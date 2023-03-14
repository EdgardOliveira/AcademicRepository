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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const endpointURL: string = "files";
  const router = useRouter();

  const rows: GridRowsProp = [
    {
      id: 1,
      year: "2023",
      title: "Repositório Acadêmico",
      author: "Edgard Oliveira, Thiago Lins, Marcos Silva",
      advisor: "Zaida Tavares",
    },
    {
      id: 2,
      year: "2021",
      title: "Dispenser IoT - Gerenciamento de Alcool em Gel",
      author: "Edgard Oliveira, Thiago Lins",
      advisor: "Josué Froner",
    },
    {
      id: 3,
      year: "2021",
      title: "MedAlert - Gerenciamento de medicamentos",
      author: "Edgard Oliveira, Thiago Lins, João Guilherme",
      advisor: "Jean Lobo",
    },
    {
      id: 4,
      year: "2019",
      title: "iRecycler - Gerenciamento de resíduos",
      author: "Edgard Oliveira, Thiago Lins, Marcos Silva",
      advisor: "Aline Moreira",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID`s", flex: 0.1, width: 1, align: "center" },
    {
      field: "year",
      headerName: "ANOS",
      flex: 0.3,
      width: 10,
      align: "center",
    },
    {
      field: "title",
      headerName: "TÍTULOS",
      flex: 1.7,
      width: 150,
      align: "left",
    },
    {
      field: "author",
      headerName: "AUTORES",
      flex: 1.5,
      width: 150,
      align: "left",
    },
    {
      field: "advisor",
      headerName: "ORIENTADORES",
      flex: 0.8,
      width: 80,
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
      title="Repositório Acadêmico"
      subtitle="Trabalhos de conclusão de curso"
    >
      <Grid container spacing={2}>
        <Grid item xl={10} lg={10} md={10} xs={4}>
          <TableData
            rows={rows}
            columns={columns}
            isLoading={isLoading}
            addButton={handleAdd}
          />
        </Grid>
        <Grid item xl={2} lg={2} md={2} xs={2}>
          <KnowledgeArea />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Articles;
