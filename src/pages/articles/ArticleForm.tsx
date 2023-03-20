import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FileUploader } from "react-drag-drop-files";
import { IArticleProps } from "@/shared/types/Types";
import { useState } from "react";
import { MenuItem } from "@mui/material";

const fileTypes = ["PDF"];

export default function ArticleForm() {
  const [article, setArticle] = useState<IArticleProps>();
  const [file, setFile] = useState(null);

  const handleChange = (file: any) => {
    setFile(file);
  };

  const areas = [
    { value: "INVALID", label: "Selecione o status aqui" },
    { value: "Sistemas de Informação", label: "Sistemas de Informação" },
    { value: "Engenharia da Computação", label: "Engenharia da Computação" },
    {
      value: "Análise e Desenvolvimento de Sistemas",
      label: "Análise e Desenvolvimento de Sistemas",
    },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Informações sobre o artigo
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Título"
            type={"text"}
            fullWidth
            autoComplete="title"
            variant="filled"
            size="small"
            placeholder={"Insira o título do artigo aqui"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="content"
            name="content"
            label="Conteúdo"
            type={"text"}
            fullWidth
            autoComplete="content"
            variant="filled"
            size="small"
            placeholder={"Insira as tags do artigo aqui"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="knlogedArea"
            name="knologedArea"
            label="Área de conhecimento"
            fullWidth
            variant="filled"
            size="small"
            select
            InputLabelProps={{ shrink: true }}
          >
            {areas.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12}>
          <h3>Arraste o arquivo pdf para esta área</h3>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </Grid>
      </Grid>
    </>
  );
}
