import React, { useState, useEffect } from 'react';
import MembersContext from '../contexts/MembersContext';
import memberService from '../services/memberService';

function MembersProvider({ children, projectId }) {
    const [members, setMembers] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetched = await memberService.fetchMembers();
        setMembers(fetched);
      } catch (e) {
        console.log('Error getting members');
        setMembers([]);
      }
    };
    getTasks();
    // We want to run the effect every time the context's
    // projectId changes.
    }, [projectId]);

  const contextValue = {
    members,
  };

  return (
    <MembersContext.Provider value={contextValue}>
      {children}
    </MembersContext.Provider>
  );
}

export default MembersProvider;
