import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikConfig, FormikValues, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactNode } from "react";
import { ReactElement, useState } from "react";
import { InferType, number, object, string } from "yup";

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}
interface IFormikStepper {
  children: ReactNode | ReactNode[];
}
export function FormikStepper(
  { ...props }: FormikConfig<FormikValues>,
  { children }: IFormikStepper
) {
  const childrenArray = React.Children.toArray(
    children
  ) as ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Anterior
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? "Enviando..."
                  : isLastStep()
                  ? "Submeter"
                  : "Próximo"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

const ArticleDetails: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { id } = router.query;
  const isAddMode: boolean = Number(id) === 0 ? true : false;
  const endpointURL: string = "articles";

  const validationSchema = object({
    id: number(),
    author: string()
      .min(2, "O Campo precisa ter no mínimo 2 caracteres")
      .required("Campo obrigatório"),
    title: string()
      .min(2, "O Campo precisa ter no mínimo 2 caracteres")
      .required("Campo obrigatório"),
    content: string().min(2, "O Campo precisa ter no mínimo 2 caracteres"),
    knowledgeArea: string().min(
      2,
      "O Campo precisa ter no mínimo 2 caracteres"
    ),
    publication: number().min(1, "O Campo precisa ter no mínimo 1 caracteres"),
    article: string().min(2, "O Campo precisa ter no mínimo 2 caracteres"),
  }).required();

  type TFormData = InferType<typeof validationSchema>;

  const initialValues: TFormData = {
    id: 0,
    title: "",
    author: "",
    content: "",
    article: "",
    knowledgeArea: "",
    publication: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        console.log(JSON.stringify(values));
      }, 500);
    },
  });

  //   formik.setSubmitting(false);

  return (
    <Paper elevation={3}>
      <FormikStepper
        initialValues={initialValues}
        onSubmit={async (values) => {
          setTimeout(() => {
            console.log(JSON.stringify(values));
          }, 500);
        }}
      >
        <FormikStep label="Autores">
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
        </FormikStep>
        <FormikStep label="Orientador">
          <>
            <Typography variant="h6" gutterBottom>
              Informações sobre o orientador
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="advisor"
                  name="advisor"
                  label="Orientador"
                  type={"text"}
                  fullWidth
                  autoComplete="advisor"
                  variant="filled"
                  size="small"
                  placeholder={"Insira o orientador aqui"}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </>
        </FormikStep>
        <FormikStep label="Artigo">
          <>
            <Typography variant="h6" gutterBottom>
              Informações sobre o artigo
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="article"
                  name="article"
                  label="Artigo"
                  type={"text"}
                  fullWidth
                  autoComplete="artigo"
                  variant="filled"
                  size="small"
                  placeholder={"Insira os dados sobre o artigo aqui"}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </>
        </FormikStep>
      </FormikStepper>
    </Paper>
  );
};

export default ArticleDetails;
