import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, HelpBlock } from 'react-bootstrap';
import './styles.css';


export default class ModalQuestion extends Component {

  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    question: PropTypes.object, 
    update: PropTypes.bool,
  }

  static defaultProps = {
    question: null,
    update: false,
  }

  state = {
    show: false,
    title: '',
    // create empty array with length 4
    answers: Array(4).fill({title: '', correct: false }),
  }
  
  componentWillReceiveProps (nextProps) {
    const { question } = nextProps;
    
    if(question !== null) this.setQuestion(question);
  }

  setQuestion = question => {
    this.setState({ title: question.title, answers: question.answers });
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleChangeAnswer = (e, index) => {
    const { answers } = this.state;
    
    const item = {
      ...this.state.answers[index],
      title: e.target.value,      
    };
    
    const newAnswers = [
      ...answers.slice(0, index),
      item,
      ...answers.slice(index + 1)
    ];
    
    this.setState({ answers: newAnswers });

  }
  handleSetCorretAnswer = (e, index) => {
    let { answers } = this.state;
    
    if (answers[index].correct === true) return;

    // set all false
    answers = answers.map(it => {
      it.correct = false;
      return it;
    });
    const item = {
      ...this.state.answers[index],
      correct: true,
    };
    const newAnswers = [
      ...answers.slice(0, index),
      item,
      ...answers.slice(index + 1)
    ];
    this.setState({ answers: newAnswers });
  }
  // show modal
  handleShow = () => this.setState({ show: true });
  // hide modal
  handleHide = () => this.setState({ show: false });

  handleOnFinish = () => {
    const { title , answers } = this.state;
    // validation
    if (title.length < 3) {
      this.setState({ 
        error: true,
        msg: 'Question title is invalid. Enter name longer than 3 characters'
      });
      return;
    }
    // check if the correct answer has been checked
    const isSelectCorret = answers.filter(it => it.correct === true);
    
    // verify that the user has entered all the response
    const isEmptyAnswer = answers.filter(it => it.title.length <= 0);
    
    if (isEmptyAnswer.length > 0){
      this.setState({ 
        error: true,
        msg: 'Fill in all the answers.'
      });
      return;
    } else if (isSelectCorret.length <= 0) {
      this.setState({ 
        error: true,
        msg: 'Select a correct answer'
      });
      return;
    }
    const question = {
      // create question id radom 
      id: new Date().getTime(),
      title,
      answers,
    };
    
    // save or update the question
    this.props.onFinish(question);

    // clear state
    this.setState({
      error: false,
      show: false,
      title: '',
      answers: Array(4).fill({title: '', correct: false }),
    });
  }

  render() {
      
    return (
      <Modal
        aria-labelledby="contained-modal-title-lg"
        show={this.state.show}
        onHide={this.handleHide}
      >
        <Modal.Header closeButton bsClass="modal-header header-background">
          <Modal.Title id="contained-modal-title-lg title-background">Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Question</ControlLabel>
              <FormControl
                type="text"
                value={this.state.title}
                placeholder="Enter text"
                onChange={this.handleChange}
              />
            <hr />
            </FormGroup>
            <p className="body-title">Select the correct answer</p>
            {this.state.answers.map((item, index) => 
            <FormGroup key={index}>
              <InputGroup>
                <InputGroup.Addon>
                  <input
                    type="radio" 
                    name="radioGroup"
                    className="radio"
                    checked={this.state.answers[index].correct}
                    onChange={(e) => { this.handleSetCorretAnswer(e, index); }}
                    aria-label="..."
                  />
                </InputGroup.Addon>
                <FormControl 
                  type="text"
                  value={this.state.answers[index].title}
                  placeholder="Enter the answer"
                  onChange={(e) => { this.handleChangeAnswer(e, index); }}
                />
              </InputGroup>
            </FormGroup>
          )}
          </form>
          {this.state.error &&
          
          <HelpBlock className="error-msg">
            {this.state.msg}
          </HelpBlock>}

        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleHide}>Close</Button>
          <Button 
            bsStyle={this.props.update ? 'primary' : 'success'}
            onClick={this.handleOnFinish}>{this.props.update ? 'Update' : 'Save'}</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}
