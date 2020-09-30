/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import Swal from 'sweetalert2';

type ISweet = {
  title: string;
  text?: string;
  icon: 'warning' | 'error' | 'success' | 'info';
  confirmButtonText: string;
  allowOutsideClick: boolean;
  timer?: any;
  handleSweet?: any;
  position?: any;
  showConfirmButton?: boolean;
  toast?: boolean;
};

const SweetAlertComponent: React.FC<ISweet> = ({
  title,
  text,
  icon,
  confirmButtonText,
  allowOutsideClick,
  handleSweet,
  position,
  timer,
  showConfirmButton,
  toast
}): any => {
  if (handleSweet) {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      position,
      allowOutsideClick,
      timer,
      showConfirmButton,
      toast
    }).then(({ isConfirmed }) => {
      handleSweet(isConfirmed);
    });
  } else {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      position,
      allowOutsideClick,
      showConfirmButton
    });
  }
};

export default SweetAlertComponent;
