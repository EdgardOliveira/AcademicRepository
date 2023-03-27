import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import useGetInFetch from "@/shared/hooks/useGetInFetch";

interface IKnowlodgeAreasProps {
  id: number;
  name: string;
  total: number;
}

export default function KnowledgeAreas() {
  // const {
  //   data: areas,
  //   loading,
  //   error,
  // } = useGetInFetch<IKnowlodgeAreasProps[]>("/areas");

  const loading = false;
  const error = false;
  const areas = [
    { id: 1, name: "Sistemas de Informação", total: 100 },
    { id: 2, name: "Engenharia da Computação", total: 51 },
    {
      id: 3,
      name: "Análise e Desenvolvimento de Sistemas",
      total: 11,
    },
  ];

  return (
    <Paper>
      <nav aria-label="título">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Áreas de conhecimento" align="center" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="lista de áreas">
        <List>
          {loading && <h1>carregando...</h1>}
          {error && <h1>ocorreu um erro!</h1>}
          {areas?.map((area, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={area.name} />
                <Badge
                  color="secondary"
                  badgeContent={area.total}
                  max={area.total - 1}
                >
                  <ArticleIcon />
                </Badge>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Paper>
  );
}
