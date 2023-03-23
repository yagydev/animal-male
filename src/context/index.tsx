import { IAddress } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of your App state
interface AppState {
  currentLocation?: IAddress;
}

// Define the shape of your context value
interface AppStateContextValue {
  state: AppState;
  updateCurrentLocation: (currentLocation: IAddress) => void;
}

// Create your context
const AppStateContext = createContext<AppStateContextValue>({
  state: { currentLocation: undefined },
  updateCurrentLocation: () => {},
});

// Create a provider for your context
export const AppStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>({});

  const updateCurrentLocation = (currentLocation: IAddress) => {
    setState((prevState) => ({
      ...prevState,
      currentLocation,
    }));
  };

  return (
    <AppStateContext.Provider value={{ state, updateCurrentLocation }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Export a custom hook to access your context
export const useAppStateContext = (): AppStateContextValue =>
  useContext(AppStateContext);
