import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, CardMedia, Grid, Paper, Stack, Tooltip } from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import TableData from "../shared/components/tableData/TableData";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "@/shared/components/tableData/header/Header";
import ArticleIcon from "@mui/icons-material/Article";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface IFilesProps {
  id: number;
  ano: number;
  titulo: string;
  autor: string;
}

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = useState<IFilesProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const endpointURL: string = "files";
  const router = useRouter();

  const rows: GridRowsProp = [
    { id: 1, year: "2023", title: "World", author: "Edgard Oliveira" },
    { id: 2, year: "2023", title: "is awesome", author: "Thiago Lins" },
    { id: 3, year: "2022", title: "is amazing", author: "Marcos Oliveira" },
    { id: 4, year: "2022", title: "teste 123", author: "João Guilherme" },
    { id: 5, year: "2021", title: "is awesome", author: "Cuca Beludo" },
    { id: 6, year: "2019", title: "is amazing", author: "Jacinto Pinto" },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID`s", flex: 0.5 },
    { field: "year", headerName: "ANOS", flex: 1 },
    { field: "title", headerName: "TÍTULOS", flex: 1 },
    { field: "author", headerName: "AUTORES", flex: 1 },
    {
      field: "actions",
      headerName: "AÇÕES",
      width: 180,
      sortable: false,
      headerAlign: "center",
      align: "center",

      renderCell: (params: any) => {
        const { id } = params.row;

        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Excluir">
              <IconButton
                aria-label="excluir"
                onClick={() => handleDelete(String(id))}
                color={"error"}
              >
                <DeleteForever />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton
                aria-label="edit"
                onClick={() => handleEdit(String(id))}
                color={"warning"}
              >
                <Edit />
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

  const handleEdit = async (id: string) => {
    router.push(`/${endpointURL}/${id}`);
  };

  const handleDelete = async (id: string) => {
    // setOpenConfirmationDialog(true);
    // setDeleteId(id);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image="logotipo.png"
              alt="logotipo fametro"
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Header title="Repositório Acadêmico" subtitle="" />

        <Grid container spacing={2}>
          <Grid xs={8}>
            <TableData
              rows={rows}
              columns={columns}
              isLoading={isLoading}
              addButton={handleAdd}
            />
          </Grid>
          <Grid item xs={4} md={2} sm={1}>
            <Paper elevation={3}>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Áreas de conhecimento"
                        align="center"
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Divider />
              <nav aria-label="secondary mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sistemas de Informação" />
                      <Badge color="secondary" badgeContent={1000} max={999}>
                        <ArticleIcon />
                      </Badge>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Engenharia da Computação" />
                      <Badge color="secondary" badgeContent={199} max={100}>
                        <ArticleIcon />
                      </Badge>
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
