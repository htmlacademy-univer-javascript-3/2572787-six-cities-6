import { Navigate } from 'react-router-dom';
import AuthorizationStatus from '../../const/authorization-status';

type ProtectedRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: string;
  children: JSX.Element;
}

function ProtectedRoute({ restrictedFor, redirectTo, children }: ProtectedRouteProps): JSX.Element {
  const authorizationStatus = AuthorizationStatus.NoAuth;

  return (
    authorizationStatus === restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
}

export default ProtectedRoute;
