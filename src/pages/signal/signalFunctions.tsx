/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect, useRef, useCallback } from 'react';

export const bottomSignalRef = useCallback((node) => {
  if (node) {
    node.scrollIntoView();
  }
}, []);
