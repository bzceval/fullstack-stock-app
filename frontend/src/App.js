import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/app/store";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey["900"],
      },
      secondary: {
        main: blueGrey["900"],
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
