//已登录的起始页

import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";

export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <div>
            <button onClick={logout}>登出</button>
            <br/>
            <ProjectListScreen />
        </div>
    );
};