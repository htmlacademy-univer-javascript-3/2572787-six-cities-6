import { Navigate } from 'react-router-dom';
import AuthorizationStatus from '../../const/authorization-status';
import useAppSelector from '../../hooks/use-app-selector';

type ProtectedRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: string;
  children: JSX.Element;
};

function ProtectedRoute({
  restrictedFor,
  redirectTo,
  children,
}: ProtectedRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  return authorizationStatus !== restrictedFor ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default ProtectedRoute;
