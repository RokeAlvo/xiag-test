import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Index from "./pages/index";
import Poll from "./pages/poll/poll";
import {Store} from "./stores";
import {StoreContext} from "./contexts/store.context";

function App() {
    return (
        <Router>
            <React.StrictMode>
                <StoreContext.Provider value={new Store()}>
                    <div className="app">
                        <Switch>
                            <Route path="/poll/:id" component={Poll}/>
                            <Route path="/" component={Index}/>
                        </Switch>
                    </div>
                </StoreContext.Provider>
            </React.StrictMode>
        </Router>
    );
}

export default App;
