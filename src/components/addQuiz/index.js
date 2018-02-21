import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSaveNewQuiz } from '../../reducers/quiz';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';


class AddQuiz extends Component {
  static propTypes = {
    saveNewQuiz: PropTypes.func.isRequired,
    history: PropTypes.object,
  }
  state = {
    value: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { value } = this.state;
    // validation length the name quiz
    if (value.length < 4) return; 
  
    const quizzes = this.props.saveNewQuiz(value);
    this.notify('Quiz created successfully!');

    // clean input
    this.setState({ value: '' });
    // redirect to edit page 
    
    this.navigateToEditPage(quizzes);
  }

  navigateToEditPage = (quizzes) => {
    
    const { quiz } = quizzes.data;
    const item = quiz[quiz.length - 1];
    
    this.props.history.push(`/edit/${item.id}`);
  } 
  
  hundleOnChange = (e) => {
    this.setState({ value: e.target.value });
  }
  
  notify = msg => toast.success(msg);

  getValidationState = () => {
    const { length } = this.state.value;
		if (length > 3) return 'success';
		else if (length > 0) return 'warning';
		return null;
	}
  render() {
    return (
        <div className="container">
          <Form horizontal onSubmit={this.handleSubmit}>
            <Col lg={10} lgOffset={1} md={10} mdOffset={1}>
              <FormGroup 
                controlId="formAddQuiz"
                validationState={this.getValidationState()}
              >
                <Col sm={3} md={3} lg={2}>
                  <ControlLabel>New Quiz name</ControlLabel>
                </Col>
                <Col sm={7} md={7} lg={8}>
                  <FormControl
                    type="text"
                    placeholder="Name of the new Quiz (E.g Joy Quiz)"
                    value={this.state.value}
                    onChange={this.hundleOnChange}
                  />
                  <FormControl.Feedback />
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <Button type="submit" bsStyle="success" block>Create Quiz</Button>
                </Col>
              </FormGroup>
            </Col>
          </Form>
        </div>
    );
  }
}
const mapStateToProps = state => ({ ...state.quiz });

const mapDispatchToProps = dispatch => ({
  saveNewQuiz: name => dispatch(onSaveNewQuiz(name)),
}); 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddQuiz));