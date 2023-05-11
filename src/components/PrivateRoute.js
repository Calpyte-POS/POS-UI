import { useKeycloak } from '@react-keycloak/web';

export default function PrivateRoute({ children }) {
    const { keycloak, initialized } = useKeycloak();

    if (initialized) {
        if (!keycloak.authenticated) {
            return keycloak.login();
        } else {
            return <>{children}</>;
        }
    }
}
