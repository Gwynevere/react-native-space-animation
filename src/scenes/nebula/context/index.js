import React from 'react';

const AnimationContext = React.createContext({});

export const AnimationProvider = AnimationContext.Provider;
export const AnimationConsumer = AnimationContext.Consumer;

export default AnimationContext;
