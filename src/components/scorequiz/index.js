import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import './styles.css';

const ScoreQuiz = ({ hits, wrongs }) => (
<div className="container">
        <h2 className="text-center">
          Quiz 1
        </h2>
        <label className="text-center"> </label>
        <Row>
          <Col xs={12} smOffset={2} sm={8} mdOffset={2} md={8}>
            <div className="card">
              <div className="top-body" >
                <label className="label-text">Results</label>
              </div>
              <div className="container-card container-results">
                <div>
                  <p className="text-center"><b>Hits</b></p>
                  <p className="card-label hits">
                    <b>{hits}</b>
                  </p>
                </div>
                <div>
                  <p className="text-center"><b>Wrongs</b></p>
                  <p className="card-label wrong">
                    <b>{wrongs}</b>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="center row-button">
          <Col>
            <Link to="/dashboard" >
							<Button 
                className="button"
                bsSize="large"
                bsStyle="primary" 
                block                
              >
								Back to created Quizzes
							</Button>
						</Link>
          </Col>
        </Row>
        <hr />
        <h5 className="text-center">Thanks You :)</h5>
      </div>
);

ScoreQuiz.propTypes = {
  hits: PropType.number,
  wrongs: PropType.number,
};



export default ScoreQuiz;
