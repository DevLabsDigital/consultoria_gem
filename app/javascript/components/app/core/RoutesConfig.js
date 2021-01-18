import React from 'react';
import {Redirect, Route, Switch} from "react-router";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ActionPlanDetailPage from "../pages/action_plan_detail/ActionPlanDetailPage";
import ActionPlanPage from "../pages/action_plan/ActionPlanPage";
import LoginPage from "../pages/login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";


const RoutesConfig = () => {
    return (
           <>
                <Route path={DashboardPage.routeName} component={DashboardPage} />
                <Route path={ActionPlanPage.routeName + '/:id'} component={ActionPlanDetailPage} />
                <Route path={ActionPlanPage.routeName} exact component={ActionPlanPage} />
            </>
    );
};

export default RoutesConfig;