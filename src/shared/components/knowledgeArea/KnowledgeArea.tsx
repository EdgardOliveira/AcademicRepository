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

export default function KnowledgeArea() {
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
          {areas.map((area, index) => (
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
