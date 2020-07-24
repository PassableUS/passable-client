import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// KEEP AS CLASS COMPONENT AS CREATEANIMATEDCOMPONENT DOES NOT SUPPORT FUNCTIONAL COMPONENTS

interface IGradientHelperProps {
  style: object;
  color1: string;
  color2: string;
}

export default class GradientHelper extends Component<IGradientHelperProps> {
  render() {
    const { style, color1, color2 } = this.props;
    return (
      <LinearGradient colors={[color1, color2]} style={style}>
        {this.props.children}
      </LinearGradient>
    );
  }
}
