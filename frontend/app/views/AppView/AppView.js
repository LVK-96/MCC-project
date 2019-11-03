import React from 'react';
import AuthenticationView from '../AuthenticationView';
import AuthenticationProvider from '../../providers/AuthenticationProvider';

/*A component that hosts everything application specific in the application
 (i.e. no framework-related setup code, but essentially everything else).*/
function AppView() {
  return (
    <AuthenticationProvider>
      <AuthenticationView/>
    </AuthenticationProvider>
  );
}

export default AppView;
