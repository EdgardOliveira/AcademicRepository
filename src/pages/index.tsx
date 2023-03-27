import { BaseLayout } from "@/shared/components/baseLayout/BaseLayout";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

interface IArticleProps {
  id: number;
  year: number;
  title: string;
  author: string;
  advisor: string;
  knowledgeArea: string;
}

export default function Home() {
  const theme = useTheme();

  return (
    <BaseLayout
      title="Repositório Acadêmico"
      subtitle="Trabalhos de conclusão de curso"
    >
      <Grid container spacing={2}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 110 }}
            image="logotipo.png"
            title="logotipo da fametro"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bem-vindo ao Repositório Acadêmico da FAMETRO.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              O Repositório Acadêmico (RA) do Faculdade Metropolitana de Manaus
              (FAMETRO) tem como missão: armazenar, preservar, divulgar e
              oferecer acesso à produção científica e institucional da FAMETRO.
              Possui como objetivos: contribuir para o aumento da visibilidade
              da produção científica da FAMETRO; preservar a memória intelectual
              da Universidade; reunir em um único local virtual e de forma
              permanente a produção científica e institucional. Disponibilizar o
              livre acesso aos conteúdos digitais. Ampliar e facilitar o acesso
              à produção científica de uma forma geral. O Repositório Acadêmico
              da FAMETRO é uma iniciativa de acesso aberto e gratuito.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </BaseLayout>
  );
}
