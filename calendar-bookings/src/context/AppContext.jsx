import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const contextMessage = "Hello from context!";

	return (
		<AppContext.Provider value={contextMessage}>{children}</AppContext.Provider>
	);
};
