import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { onUpdateQuiz, onUpdateQuestion, onDeleteQuestion } from '../../reducers/quiz';
import { toast } from 'react-toastify';

import AutosizeInput from 'react-input-autosize';
import { Row, Col, Glyphicon, Button } from 'react-bootstrap';
import NavBar from '../../components/navbar';
import ListQuestions from '../../components/listQuestions';
import ModalQuestion from '../../components/modalquestion';
import './styles.css';

class EditQuiz extends Component {
  static propTypes = {
    match: PropType.shape({
      params: PropType.shape({
        id: PropType.string.isRequired,
      }),
    }),
    quiz: PropType.array,
    history: PropType.object,
    updateQuiz: PropType.func,
    updateQuestion: PropType.func,
    deleteQuestion: PropType.func,
  }
  
  componentWillMount() {
    const { id } = this.props.match.params;
    const { quiz } = this.props;
    this.loadQuiz(id, quiz);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    const { quiz } = nextProps;
    this.loadQuiz(id, quiz);
  }

  handleFinish = () => {

    const item = this.state;
    // save changes to the quiz
    this.props.updateQuiz(item);
    
    toast.success('Updated Quiz!');
    this.handleOnBack();
  }

  loadQuiz = (id, quiz) => {
    // filter object quiz in the array
    const item = quiz.filter(it => it.id === parseInt(id, 10))[0];
    
    this.setState({ ...item });
  }

  handleOnBack = () => {
    // back page
    this.props.history.goBack();
  }

  handleOnChange = (e) => {
    // onChange event to update the name of the quiz
    this.setState({ name: e.target.value });
  }

  handleAddQuestion = () => {
    this.modal.handleShow();
  }

  addQuestion = (question) => {
    let item = this.state;
    
    // update questions
    item = {
      ...item,
      questions: [
        ...item.questions,
        question,
      ],
    };
    
    this.props.updateQuiz(item);
    toast.success('Added Question!');
  }
  

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Row className="row-quiz">

            <Col lg={1} sm={1} md={1} xs={2}>
              <Button bsSize="large" onClick={this.handleOnBack}>
                <Glyphicon glyph="arrow-left" />
              </Button>
            </Col>

            <Col lg={9} sm={9} md={9} xs={7}>
              {/* component adjustable to text size */}
              <AutosizeInput
                name="form-field-name"
                placeholder="e.g. Joz Quiz"
                value={this.state.name}
                onChange={this.handleOnChange}
                inputStyle={{
                  fontSize: 26,
                  fontWeight: 500,
                  border: 0,
                  borderBottomWidth: 1,
                  marginBottom: -1,
                  borderStyle: 'dashed',
                  outline: 'none',
                }}
              />
            </Col>
            
            <Col lg={2} sm={2} md={2} xs={3}>
              <Button bsSize="large" bsStyle="success" onClick={this.handleFinish}>
                <Glyphicon glyph="ok"/> Finish
              </Button>
            </Col>

          </Row>
          <hr className="divider"/>

          <ModalQuestion
            ref={ref => this.modal = ref }
            onFinish={this.addQuestion}
          />

          <ListQuestions 
            {...this.state} 
            updateQuestion={this.props.updateQuestion} 
            deleteQuestion={this.props.deleteQuestion}
          />

          <hr />

          <Button
            bsStyle="primary"
            bsSize="large" 
            block
            onClick={this.handleAddQuestion}
          >
            + Add Question
          </Button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.quiz });

const mapDispatchToProps = dispatch => ({
  updateQuiz: item => dispatch(onUpdateQuiz(item)),
  updateQuestion: (id, qestion, index) => dispatch(onUpdateQuestion(id, qestion, index)),
  deleteQuestion: (id, index) => dispatch(onDeleteQuestion(id, index)),
}); 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditQuiz));
