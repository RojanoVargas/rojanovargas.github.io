import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import Header from "./components/Header";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className="main-content">
				<AppRoutes />
			</main>
		</BrowserRouter>
	);
}

export default App;
