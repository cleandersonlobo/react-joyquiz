import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import './styles.css';

const EmptyInfo = ({ icon, text, subText }) => (
  <div className="row text-center">
    <p className="icon color-secondary">
      <Glyphicon glyph={icon} />
    </p>
    <h4>{text}</h4>
    <h5>{subText}</h5>
  </div>
);


EmptyInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired
};
export default EmptyInfo;
  
