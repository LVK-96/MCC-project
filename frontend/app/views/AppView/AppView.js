import React from 'react';
import AuthenticationView from '../AuthenticationView';

/*A component that hosts everything application specific in the application
 (i.e. no framework-related setup code, but essentially everything else).*/
function AppView() {
  return (
    <AuthenticationView/>
  );
}

export default AppView;
