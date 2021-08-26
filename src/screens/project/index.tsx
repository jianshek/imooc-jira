

import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
    return (<div>
        <h1>ProjectScreen</h1>
        {/* to={"/kanban"}和to={"kanban"}的区别,有斜杠是跟路由加上kanban,没有斜杠是当路由拼接kanban  */}
        <Link to={"kanban"}>看板</Link>
        <Link to={"epic"}>任务组</Link>
        <Routes>
            {/*projects/:projectId/kanban*/}
            <Route path={"/kanban"} element={<KanbanScreen />} />
            {/*projects/:projectId/epic*/}
            <Route path={"/epic"} element={<EpicScreen />} />
            <Navigate to={window.location.pathname + "/kanban"} />
        </Routes>
    </div>)
};