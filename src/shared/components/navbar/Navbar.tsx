import { Environment } from "../../environment";
import { CardMedia, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useSidebarContext } from "../../contexts/SidebarContext";

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
    marginLeft: Environment.SIDEBAR_WIDTH,
    width: `calc(100% - ${Environment.SIDEBAR_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Navbar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();

  return (
    <AppBar position="fixed" open={isSidebarOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{
            marginRight: 5,
            ...(isSidebarOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="logotipo.png"
          alt="logotipo fametro"
        />
      </Toolbar>
    </AppBar>
  );
};
