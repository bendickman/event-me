import { createContext } from "react";
import CounterStore from "./counterStore";
import { UiStore } from "./uiStore";
import { AppEventStore } from "./appEventStore";

interface Store {
    counterStore: CounterStore,
    uiStore: UiStore,
    appEventStore: AppEventStore,
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    appEventStore: new AppEventStore(),
}

export const StoreContext = createContext(store);