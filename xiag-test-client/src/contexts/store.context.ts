import {createContext} from "react";
import {Store} from "../stores";

export const StoreContext = createContext<Store>({} as Store);
