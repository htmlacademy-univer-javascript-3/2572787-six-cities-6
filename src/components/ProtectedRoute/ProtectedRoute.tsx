import { Navigate } from 'react-router-dom';
import AuthorizationStatus from '../../const/authorization-status';
import useAppSelector from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/selectors/auth-selectors';

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
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus !== restrictedFor ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default ProtectedRoute;
