import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Row, Col, Glyphicon, Button, ProgressBar } from 'react-bootstrap';
import './styles.css';


const PROGRESS_TOTAL = 100;
// class css for show answer

class Quiz extends Component {

  static propTypes = {
    match: PropType.shape({
      params: PropType.shape({
        id: PropType.string.isRequired,
      }),
    }),
    quiz: PropType.array,
    history: PropType.object,
    onFinishQuiz: PropType.func.isRequired,
  }

  state = {
    wrongs: 0,
    hits: 0,
    progressHits: 0,
    progressWrongs: 0,
    indexQuestion: 0,
    selected: 0,
    answered: [],
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const { quiz } = this.props;
    this.loadQuiz(id, quiz);
  }

  loadQuiz = (id, quiz) => {
    // filter object quiz in the array
    let item = quiz.filter(it => it.id === parseInt(id, 10))[0];
    
    // number of questions
    const sizeQuestions = item.questions.length;
    // size progress by question
    // use this number in the progress bar
    const sizeProgress = PROGRESS_TOTAL / sizeQuestions;
    
    this.setState({ ...item, sizeQuestions, sizeProgress });
  }

  selectAnswer = (question, answer, index) => {

    if ((answer.selected !== undefined && answer.selected) || (question.finish)) return;
    
    let { questions, indexQuestion, sizeProgress } = this.state;
    
    // update answer 
    const answers = question.answers.map((it, itIndex) => { 
      if (index === itIndex) it.selected = true;
      else it.selected = false;
      return it;
    });

    const newQuestion = {
      ...question,
      answers,
    };

    questions[indexQuestion] = newQuestion;
    

    this.setState({ questions, selected: sizeProgress });

  }

  checkStyleAnswer = (answer) => {

    const { answered, indexQuestion } = this.state;
    // check if question has already been answered
    if ((answered[indexQuestion]) && (answered[indexQuestion].showAnswer)) {

      if (answer.correct) return 'is-correct';
      else if (answer.selected) return 'is-incorrect';
      
      // default color is gray
      return '';

    } else if (answer.selected) return 'is-selected';
  }

  onNextQuestion = (e) => {
    e.preventDefault();
    
    let { questions , indexQuestion, answered, wrongs, hits, sizeProgress, progressHits, progressWrongs} = this.state;
    
    let question = questions[indexQuestion];
    
    if ((question.finish)) {      
      // actin finish e show result
      indexQuestion += 1;
      if (indexQuestion < questions.length) {
        this.setState({ indexQuestion });
        return;
      }
      
      return;
    }

    // check what the answer is correct
    
    let isCorrect = false;
    let isSelected = false;

    question.answers.forEach(answer => {
      
      if(answer.selected) isSelected = true;

      if(answer.selected && answer.correct) isCorrect = true;
    });
    
    // if user not selected one answer show the msg 
    if (!isSelected) {
      toast.warn('Select one answer');
      return;
    }
    

    if (isCorrect) hits += 1;
    else wrongs += 1;

    // update state 
    answered.push({
      indexQuestion,
      showAnswer: true,
      isCorrect,
      sizeProgress,
      bsStyle: (isCorrect) ? 'success' : 'danger',
    });
    const newQuestion = {
      ...question,
      finish: true,
    };

    questions[indexQuestion] = newQuestion;
    
    this.setState({ questions, progressHits, progressWrongs, wrongs, hits, selected: 0 });
    
  }
  onPrevQuestion = () => {
    const { indexQuestion } = this.state;
    this.setState({ indexQuestion: indexQuestion -1 });
  }

  handleOnBack = () => {
    // back page
    this.props.history.goBack();
  }

  onFinishQuiz = () => {
    this.props.onFinishQuiz(this.state);
  }
  
  render() {
    const { questions , indexQuestion, answered, sizeQuestions } = this.state;
    
    const question = questions[indexQuestion];
    
    return (
      <div className="container">
          <div className="btn-exit">
            <Button
              bsStyle="danger"
              onClick={this.handleOnBack}
            >
                  <Glyphicon glyph="remove" />
            </Button>
          </div>
          <Row className="row-progress">
            <Col sm={12}>
            <h5>Progress</h5>
            <ProgressBar>
              {answered.map((item, index) => (
                <ProgressBar bsStyle={item.bsStyle} now={item.sizeProgress} key={index+1} />
              ))} 
              <ProgressBar bsStyle="info" now={this.state.selected} key={indexQuestion} />
            </ProgressBar>
            </Col>
          </Row>
          
          <h1 className="title-question">{question.title}</h1>

          <div className="options-card">
            <div className="options-container inline-block ">
              {question.answers.map((answer, index) => (
                <a
                  key={index}
                  className={`inline-block option-row ${answered[indexQuestion] && answered[indexQuestion].showAnswer ? 'show-answer' : ''} ${this.checkStyleAnswer(answer, index)}`}
                  onClick={() => {
                    this.selectAnswer(question, answer, index);
                  }}
                >
                  <div className='option-label'>
                        {index+1}
                  </div>
                  <div className={`${question.correct ? 'is-correct' : ''} option-content `}>
                      <div className="question-item">
                        {answer.title}
                      </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <hr /> 
          <div className="button-group">
            <div className="info-quiz">
              <h3>Q{indexQuestion+1} of {questions.length}</h3>
            </div>
            <div>
              <Button 
                bsClass="btn-custom btn"
                onClick={this.onPrevQuestion}
                disabled={this.state.indexQuestion <= 0}
              >
                  Prev
              </Button>

              {(answered.length === sizeQuestions) && (indexQuestion === sizeQuestions -1)
                ? (<Button 
                    bsClass="btn-custom btn btn-success"
                    onClick={this.onFinishQuiz}
                  >
                      Finish
                  </Button>)
                
                : (<Button 
                    bsClass="btn-custom btn btn-primary"
                    onClick={this.onNextQuestion}
                  >
                      {((answered[indexQuestion]) &&
                      (answered[indexQuestion].showAnswer)) 
                      ? 'Next'
                      : 'Check Anwser' 
                      }
                  </Button>)
              }
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.quiz });


export default withRouter(connect(mapStateToProps)(Quiz));