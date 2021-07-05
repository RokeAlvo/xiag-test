import { useContext } from 'react';
import { Store } from '../stores';
import {StoreContext} from "../contexts/store.context";

export const useStores = (): Store => useContext(StoreContext);
