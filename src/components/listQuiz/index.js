import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import EmptyInfo from '../emptyinfo';
import Card from '../card';
import './styles.css';

export default class ListQuiz extends Component {
  
  static propTypes = {
    quiz: PropTypes.array,
  }

  static defaultProps = {
    quiz: null,
  }

  render() {
    
    const { quiz } = this.props;
    
    if (quiz === null)
    return (
      <EmptyInfo
        icon="pencil"
        text="You have not created any quizzes!"
        subText="Create your first quiz" 
      />);
      
    return (
      <div className="container">
        <Row>
          {quiz.map((item, index) => (
            <Col sm={6} md={4} lg={4} xs={12} key={item.id}>
              <Card item={item} index={index} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
