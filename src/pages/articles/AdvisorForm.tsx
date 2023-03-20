import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

export default function AdvisorForm() {
  const advisors = [
    { value: "INVALID", label: "Selecione o status aqui" },
    { value: "Manfrine Santos", label: "Manfrine Santos" },
    { value: "Jean Lobo", label: "Jean Lobo" },
    { value: "Ronei Nunes", label: "Ronei Nunes" },
    { value: "Zaida Tavares", label: "Zaida Tavares" },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Informações sobre o orientador
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="advisor"
            name="advisor"
            label="Orientador"
            fullWidth
            variant="filled"
            size="small"
            select
            InputLabelProps={{ shrink: true }}
          >
            {advisors.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
}
