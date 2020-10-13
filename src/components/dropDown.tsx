import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, fetchStatuses, fetchUsers } from '../pages/signIn/signInAction';
import { RootState } from '../store/rootReducer';

const DropDownComponent: React.FC = () => {
  const dispatch = useDispatch();

  const { userStatusListState, userStatusListIsLoading, userListState } = useSelector(
    (state: RootState) => state.SignInSlice
  );
  const newArray = userStatusListState.map((item: any) => ({
    value: item.user_status_type_id,
    label: item.name
  }));

  const defaultOption = newArray[0];
  const [def, setDefault] = useState<any>(newArray[0]);
  const handleChange = (e: any) => {
    dispatch(changeStatus(e.value));
    setDefault(e);
  };
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchStatuses());
  }, []);
  return (
    <Dropdown
      options={newArray}
      value={def || newArray[0]}
      onChange={(e) => handleChange(e)}
      placeholder="Select an option"
    />
  );
};

export default DropDownComponent;
