import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routes } from './AppRoutesContent';
import { RootState } from '../../store/redux/store';

const AppRoutes: React.FC = () => {
  const { loggedIn } = useSelector(
    (state: RootState) => ({
      loggedIn: state.user.loggedIn,
    }),
    shallowEqual,
  );

  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.isPublicOnly && loggedIn) return null;
        if (route.isPrivate && !loggedIn) return null;

        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
};

export { AppRoutes };
