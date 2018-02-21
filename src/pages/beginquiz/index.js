import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { onReloadQuiz } from '../../reducers/quiz';

import Quiz from '../../components/quiz';
import ScoreQuiz from '../../components/scorequiz';
import NavBar from '../../components/navbar';
import './styles.css';


// class css for show answer

class BeginQuiz extends Component {

  static propTypes = {
    match: PropType.shape({
      params: PropType.shape({
        id: PropType.string.isRequired,
      }),
    }),
    reloadQuiz: PropType.func.isRequired,
  }

  state = {
    finishQuiz: false,
    dataQuiz: null,
  }

  finishQuiz = (state) => {
    this.setState({ finishQuiz: true, dataQuiz: state });
    this.props.reloadQuiz();
  }
  
  render() {
    
    return (
      <div>
        <NavBar />
        {this.state.finishQuiz
          ? <ScoreQuiz {...this.state.dataQuiz} />
          : <Quiz 
              {...this.props} 
              onFinishQuiz={this.finishQuiz}
            />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.quiz });
const mapDispatchToProps = dispatch => ({
  reloadQuiz: () => dispatch(onReloadQuiz()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BeginQuiz));