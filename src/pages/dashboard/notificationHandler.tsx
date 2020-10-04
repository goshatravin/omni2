/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/relax.css';

export const Notification = (text: string) =>
  new Noty({
    theme: 'relax',
    type: 'alert',
    text
  }).show();
