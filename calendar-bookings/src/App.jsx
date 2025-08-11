import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import Header from "./components/Header";
import { AppProvider } from "./context/AppContext";
import "./App.css";

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Header />
				<main className="main-content">
					<AppRoutes />
				</main>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
