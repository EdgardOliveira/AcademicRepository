import { IArticleProps, IResultsProps } from "@/shared/types/Types";
import { useRouter } from "next/router";
import { useSnackbar, VariantType } from "notistack";
import { useEffect, useState } from "react";
import { InferType, number, object, string } from "yup";
import { BaseLayout } from "@/shared/components/baseLayout/BaseLayout";
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  getDataById,
  postData,
  updateData,
} from "@/shared/libs/rest/RESTClient";
import { NextPage } from "next";
import AuthorForm from "./AuthorForm";
import AdvisorForm from "./AdvisorForm";
import ArticleForm from "./ArticleForm";
import ReviewForm from "./ReviewForm";

const validationSchema = object({
  id: number(),
  author: string()
    .min(2, "O Campo precisa ter no mínimo 2 caracteres")
    .required("Campo obrigatório"),
  title: string()
    .min(2, "O Campo precisa ter no mínimo 2 caracteres")
    .required("Campo obrigatório"),
  content: string().min(2, "O Campo precisa ter no mínimo 2 caracteres"),
  knowledgeArea: string().min(2, "O Campo precisa ter no mínimo 2 caracteres"),
  publication: string().min(2, "O Campo precisa ter no mínimo 2 caracteres"),
  article: string().min(2, "O Campo precisa ter no mínimo 2 caracteres"),
}).required();

type TFormData = InferType<typeof validationSchema>;

const fileTypes = ["PDF"];

const steps = ["Autor", "Orientador", "Artigo", "Revisão"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AuthorForm />;
    case 1:
      return <AdvisorForm />;
    case 2:
      return <ArticleForm />;
    case 3:
      return <ReviewForm />;
    default:
      throw new Error("Etapa desconhecida");
  }
}

const ArticleDetails: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [article, setArticle] = useState<IArticleProps>();
  const [file, setFile] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { id } = router.query;
  const isAddMode: boolean = Number(id) === 0 ? true : false;
  const endpointURL: string = "articles";

  const advisors = [
    { value: "INVALID", label: "Selecione o status aqui" },
    { value: "Manfrine Santos", label: "Manfrine Santos" },
    { value: "Jean Lobo", label: "Jean Lobo" },
    { value: "Ronei Nunes", label: "Ronei Nunes" },
  ];

  const areas = [
    { value: "INVALID", label: "Selecione o status aqui" },
    { value: "Sistemas de Informação", label: "Sistemas de Informação" },
    { value: "Engenharia da Computação", label: "Engenharia da Computação" },
    {
      value: "Análise e Desenvolvimento de Sistemas",
      label: "Análise e Desenvolvimento de Sistemas",
    },
  ];

  const statuses = [
    { value: "INVALID", label: "Selecione o status aqui" },
    { value: "APPROVED", label: "APROVADO" },
    { value: "PENDING", label: "PENDENTE" },
    { value: "FAILED", label: "REPROVADO" },
  ];

  const handleResponse = (variant: VariantType, message: String) => {
    enqueueSnackbar(message, { variant });
  };

  const handleChange = (file: any) => {
    setFile(file);
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (!isAddMode && isLoading && !!id) {
      const fetchData = async () => {
        const response = await getDataById(`/api/${endpointURL}/${id}`);
        const json = await response.json();
        const { success, message, error }: IResultsProps = json;
        const data: IArticleProps = json.data;

        switch (success) {
          case true:
            setArticle(data);
            setIsLoading(false);
            handleResponse("success", message);
            break;
          case false:
            handleResponse("error", String(error));
            break;
          default:
            break;
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (isPosting) {
      const postingData = async () => {
        const response = await postData(`/api/${endpointURL}`, article);
        const json = await response.json();
        const { success, message, error }: IResultsProps = json;
        const data: IArticleProps = json.data;

        switch (success) {
          case true:
            setIsPosting(false);
            setIsLoading(false);
            handleResponse("success", message);
            router.push(`/${endpointURL}`);
            break;
          case false:
            handleResponse("error", String(error));
            break;
          default:
            break;
        }
      };
      postingData();
    }
  }, [article]);

  useEffect(() => {
    if (isUpdating) {
      const updatingData = async () => {
        const response = await updateData(`/api/${endpointURL}/${id}`, article);
        const json = await response.json();
        const { success, message, error }: IResultsProps = json;
        const data: IArticleProps = json.data;

        switch (success) {
          case true:
            setIsUpdating(false);
            setIsLoading(false);
            handleResponse("success", message);
            router.push(`/${endpointURL}`);
            break;
          case false:
            handleResponse("error", String(error));
            break;
          default:
            break;
        }
      };
      updatingData();
    }
  }, [article]);

  return (
    <BaseLayout
      title="Artigos"
      subtitle={
        isAddMode
          ? "Formulário de cadastro de artigos"
          : "Formulário de modificação de dados de artigos"
      }
    >
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Artigo
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Artigo enviado. <strong>🤞</strong> <br />
                Status: AGUARDANDO APROVAÇÃO
              </Typography>
              <Typography variant="subtitle1">
                <strong>📃</strong> O artigo foi submetido a publicação. <br />
                <strong>👨‍🏫</strong> Seu orientador foi avisado. <br />
                <strong>⏳</strong> Agora é questão de tempo.
                <br />
                <strong>👨‍🎓👩‍🎓</strong> Assim que ele revisar os dados e aprovar o
                arquivo será publicado.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBackStep} sx={{ mt: 3, ml: 1 }}>
                    Anterior
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNextStep}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "ENVIAR" : "Próximo"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </BaseLayout>
  );
};

export default ArticleDetails;

/* <form>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "35ch" },
            }}
          >
            {!isAddMode && (
              <Box>
                <TextField
                  label="id"
                  type={"number"}
                  disabled
                  fullWidth
                  variant="filled"
                  size="small"
                  error={!!errors.id}
                  placeholder={"Insira o id aqui"}
                  InputLabelProps={{ shrink: true }}
                  helperText={errors.id ? errors.id.message : ""}
                  {...register("id")}
                />
              </Box>
            )}
            <Box>
              <TextField
                label="Autores"
                type={"text"}
                fullWidth
                variant="filled"
                size="small"
                error={!!errors.author}
                placeholder={"Insira o autor aqui"}
                InputLabelProps={{ shrink: true }}
                helperText={errors.author ? errors.author.message : ""}
                {...register("author")}
              />
            </Box>
            <Box>
              <TextField
                label="Título"
                type={"text"}
                fullWidth
                variant="filled"
                size="small"
                error={!!errors.title}
                placeholder={"Insira o título do documento aqui"}
                InputLabelProps={{ shrink: true }}
                helperText={errors.title ? errors.title.message : ""}
                {...register("title")}
              />
            </Box>
            <Box>
              <TextField
                label="Conteúdo"
                type={"text"}
                fullWidth
                variant="filled"
                size="small"
                error={!!errors.content}
                placeholder={"Insira o título do documento aqui"}
                InputLabelProps={{ shrink: true }}
                helperText={errors.content ? errors.content.message : ""}
                {...register("content")}
              />
            </Box>
            <Box>
              <TextField
                label="Área de Conhecimento"
                fullWidth
                variant="filled"
                size="small"
                select
                error={!!errors.knowledgeArea}
                InputLabelProps={{ shrink: true }}
                helperText={
                  errors.knowledgeArea ? errors.knowledgeArea.message : ""
                }
                {...register("knowledgeArea")}
              >
                {areas.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <TextField
                label="Status"
                fullWidth
                variant="filled"
                size="small"
                select
                error={!!errors.publication}
                InputLabelProps={{ shrink: true }}
                helperText={
                  errors.publication ? errors.publication.message : ""
                }
                {...register("publication")}
              >
                {statuses.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </form> */
/* <div>
            <h3>Arraste o arquivo para esta área</h3>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </div> */
