import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeStatus,
  fetchStatuses,
  fetchUsers,
  getUserStatus
} from '../pages/signIn/signInAction';
import { RootState } from '../store/rootReducer';

const DropDownComponent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    userStatusListState,
    userStatusListIsLoading,
    userListState,
    userStatusState
  } = useSelector((state: RootState) => state.SignInSlice);
  const newArray = userStatusListState.map((item: any) => ({
    value: item.user_status_type_id,
    label: item.name
  }));
  const [def, setDefault] = useState<any>(newArray[0]);
  const handleChange = (e: any) => {
    console.log(e.value);
    dispatch(changeStatus(e.value));
    setDefault(e);
  };
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchStatuses());
  }, []);
  useEffect(() => {
    if (localStorage.getItem('userId') !== null && localStorage.getItem('userId') !== undefined) {
      dispatch(getUserStatus());
    }
  }, [localStorage.getItem('userId')]);
  useEffect(() => {
    console.log(userStatusState);
  }, [def, userStatusState]);
  return (
    <Dropdown
      options={newArray}
      value={def || newArray[Number(userStatusState?.user_status_type_id) - 1]}
      onChange={(e) => handleChange(e)}
      placeholder="Select an option"
    />
  );
};

export default DropDownComponent;
