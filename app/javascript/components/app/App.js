import React from 'react';
import MyThemeProvider from "./styles/MyThemeProvider";
import GlobalStyles from "./styles/GlobalStyles";
import RoutesConfig from "./core/RoutesConfig";
import PageLayout from "./layout/PageLayout";
import {ConnectedRouter} from 'connected-react-router'
import history from "./core/routesHistory";
import {Provider} from "react-redux";
import store from './store'
import ModalRoot from "./modais/ModalRoot";
import {Route, Switch} from "react-router";
import LoginPage from "./pages/login/LoginPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnProtectedRoute from "./core/UnProtectedRoute";
import ActionPlanPage from './pages/action_plan/ActionPlanPage'

function App() {
    
    return (
        <Provider store={store}>
            <MyThemeProvider>
                <ModalRoot/>
                <GlobalStyles/>
                <ToastContainer />
                <ConnectedRouter history={history}>
                    <Switch>
                        <PageLayout>
                            <RoutesConfig/>
                        </PageLayout>
                    </Switch>
                </ConnectedRouter>
            </MyThemeProvider>
        </Provider>
    );
}

export default App;
