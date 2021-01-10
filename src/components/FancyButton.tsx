import { Button } from '@ui-kitten/components';
import React from 'react';

const FancyButton = ({ children, ...rest }: any) => {
  return (
    <Button {...rest} style={[{ borderRadius: 15 }, rest.style]}>
      {children}
    </Button>
  );
};

export default FancyButton;
