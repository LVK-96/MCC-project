import React, { useState, useEffect } from 'react';
import MembersContext from '../contexts/MembersContext';
import memberService from '../services/memberService';
import fetchCorrectRes from '../util/fetchCorrectRes';

function MembersProvider({ children, projectId }) {
    const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        let fetched = await memberService.getMembers(projectId);
        let correctUrls = fetched.map(f => fetchCorrectRes(f.photoURL));
        correctUrls = await Promise.all(correctUrls);
        for (let i = 0; i < correctUrls.length; ++i) {
          fetched[i].photoURL = correctUrls[i];
        }
        setMembers(fetched);
      } catch (e) {
        console.log('Error getting members');
        setMembers([]);
      }
    };

    getMembers();
    // We want to run the effect every time the context's
    // projectId changes.
    }, [projectId]);

  const addMember = async (newMember) => {
    try {
      let added = await memberService.addMember(newMember, projectId);
      added.photoURL = await fetchCorrectRes(added.photoURL);
      setMembers(members.concat(added));
    } catch (e) {
      throw e;
    }
  }

  const contextValue = {
    members,
    addMember,
  };

  return (
    <MembersContext.Provider value={contextValue}>
      {children}
    </MembersContext.Provider>
  );
}

export default MembersProvider;
