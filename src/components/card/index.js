import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { onDeleteQuiz } from '../../reducers/quiz';
import { withRouter } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './styles.css';

class CardQuiz extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onDeleteQuiz: PropTypes.func.isRequired,
    history: PropTypes.object,
  }
  
  onDelete = () => {
    const { item } = this.props;
    
    this.props.onDeleteQuiz(item);

    this.notify('Quiz deleted!');
  }
  onEdit = () => {
    const { item } = this.props;
    this.props.history.push(`/edit/${item.id}`);
  }
  onBeginQuiz = () => { 
    const { item } = this.props;
    // begin quiz
    this.props.history.push(`/begin/${item.id}`);
  }
  notify = msg => toast.error(msg);

  render() {
    const { item, index } = this.props;
    return (
      <div className="card">
        <div className="top-body" >
          <label className="number-text">#{(index+1)}</label>
        </div>
        <div className="container-card">
          <h4><b>{item.name}</b></h4> 
        </div>
        <hr className="divider" />
        <div className="footer">
          <Button bsStyle="danger" onClick={this.onDelete}><Glyphicon glyph="trash"/> Delete </Button>
          <Button onClick={this.onEdit} ><Glyphicon glyph="pencil"/> Edit</Button>
          <Button bsStyle="primary" onClick={this.onBeginQuiz} disabled={item.questions.length <= 0}>Begin Quiz</Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state.quiz });

const mapDispatchToProps = dispatch => ({
  onDeleteQuiz: item => dispatch(onDeleteQuiz(item)),
}); 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardQuiz));