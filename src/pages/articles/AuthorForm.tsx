import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function AuthorForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Informações sobre os autores
      </Typography>
      <Grid container spacing={3}>
        <Grid item xl={12} lg={10} md={8} xs={4}>
          <TextField
            required
            id="author"
            name="author"
            label="Autor(es)"
            type={"text"}
            fullWidth
            autoComplete="author"
            variant="filled"
            size="small"
            placeholder={"Insira o(s) autor(es) aqui"}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
}
