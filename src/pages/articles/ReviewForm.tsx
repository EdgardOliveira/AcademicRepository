import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Fragment } from "react";

const authors = ["Edgard Oliveira", "Marcos Silva", "Thiago Lins"];
const advisors = ["Zaida Tavares"];
const articles = [
  { name: "Ano Publicação", detail: "2023" },
  { name: "Título", detail: "Repositório Acadêmico" },
  { name: "Conteúdo", detail: "Publicação de TCC" },
  { name: "Área de Conhecimento", detail: "Sistemas de Informação" },
];

export default function Review() {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Revise as informações sobre o artigo
      </Typography>
      <List disablePadding>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Autor(es)
        </Typography>
        {authors.map((author, index) => (
          <ListItem key={index} sx={{ py: 0, px: 0 }}>
            <ListItemText primary={author} />
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}></ListItem>
      </List>
      <List disablePadding>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Orientador(a)
        </Typography>
        {advisors.map((advisor, index) => (
          <ListItem key={index} sx={{ py: 0, px: 0 }}>
            <ListItemText primary={advisor} />
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}></ListItem>
      </List>
      <List disablePadding>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Artigo
        </Typography>
        {articles.map((article, index) => (
          <ListItem key={index} sx={{ py: 0, px: 0 }}>
            <ListItemText primary={article.name} secondary={article.detail} />
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}
