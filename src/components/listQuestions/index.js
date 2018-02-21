import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Row, Col, Glyphicon } from 'react-bootstrap';
import { toast } from 'react-toastify';
import EmptyInfo from '../emptyinfo';
import ModalQuestion from '../modalquestion';
import './styles.css';

export default class ListQuestions extends Component {
  
  static propTypes = {
    id: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    updateQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
  }
  
  state = {
    question: null,
  }
  
  showEditModal = () => {
    this.modal.handleShow();
  }
  
  updateQuestion = (question) => {
    // quiz id 
    const { id } = this.props;
    // The index the question in the matrix of questions
    const { index } = this.state;
    // action redux for update question
    this.props.updateQuestion(id, question, index);
    toast.info('Updated Question!');
  }
  
  deleteQuestion = (index) => {
    // quiz id 
    const { id } = this.props;
    this.props.deleteQuestion(id, index);
    toast.error('Deleted Question!');
  }

  render() {
    const { questions } = this.props;
    
    if (questions.length <= 0)
    return (
      <EmptyInfo
        icon="edit"
        text="You have not created any questions!"
        subText="Create your first question" 
      />);
    return (
      <div className="row container-answers">
          <ListGroup>
            {questions.map((question, index) => (
              <ListGroupItem 
                key={index} 
                bsClass="list-group-item list-questions"
                onClick={(e) => {
                  e.preventDefault(); 
                  this.setState({ question, index });
                  // check if clicked on btn-delete and delete the question
                  if (e.target.dataset.action === 'delete') this.deleteQuestion(index); 
                  // open modal with question data
                  else this.showEditModal();   
                }}>
              <Row className="row-question-item">
                <Col sm={11} xs={11}>
                  <span className="text-answer">
                    <b>Q{index+1}:</b> {question.title}
                  </span>
                </Col>
                <Col sm={1} xs={1}>
                  <a className="btn-delete"> 
                    <Glyphicon glyph="remove" data-action='delete' />
                  </a>
                </Col>
              </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
          <ModalQuestion
            ref={ref => this.modal = ref }
            question={this.state.question}
            onFinish={this.updateQuestion}
            update
          />
      </div>
    );
  }
}
