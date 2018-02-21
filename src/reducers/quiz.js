const INITIAL_STATE = {
  quiz: JSON.parse(localStorage.getItem('quiz')),
};

const reducer = (state = INITIAL_STATE , action) => {
  switch (action.type) {
    case 'RELOAD_QUIZ':
    return {
      ...state,
      ...action.data,
    };
    case 'ADD_NEW_QUIZ':
      return {
        ...state,
        ...action.data,
      };
    case 'UPDATE_QUIZ':
      return {
        ...state,
        ...action.data,
      };
    case 'UPDATE_QUESTION':
      return {
        ...state,
        ...action.data,
      }; 
    case 'DELETE_QUESTION':
      return {
        ...state,
        ...action.data,
      }; 
    case 'DELETE_QUIZ':
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

// ACTIONS 

export function onReloadQuiz() {
  
  const quiz = JSON.parse(localStorage.getItem('quiz'));

  return {
    type: 'RELOAD_QUIZ', 
    data: {
      quiz,
    }
  };
}

export function onSaveNewQuiz(name){
  const storage = JSON.parse(localStorage.getItem('quiz'));
  
  const createAt = new Date();

  let quiz = {
    id: createAt.getTime(), // generate id 
    name: name,
    questions: [],
    createAt,
  };

  // check storage empty 
  if (storage === null) {
    const newStorage = [quiz];
    localStorage.setItem('quiz', JSON.stringify(newStorage));  
    return {
      type: 'ADD_NEW_QUIZ', 
      data: {
        quiz: newStorage,
      }
    };
  }
  
  // add new quiz
  storage.push(quiz);
  // update
  localStorage.setItem('quiz', JSON.stringify(storage));  
  
  return {
    type: 'ADD_NEW_QUIZ', 
    data: {
      quiz: storage,
    }
  };
} 

export function onUpdateQuiz(item){
  const storage = JSON.parse(localStorage.getItem('quiz'));

  //find index for quiz update
  const index = storage.findIndex(it => it.id === item.id);
  
  const newStorage = [
    ...storage.slice(0, index),
    item,
    ...storage.slice(index + 1)
  ];
  
  localStorage.setItem('quiz', JSON.stringify(newStorage));  
  
  return {
    type: 'UPDATE_QUIZ', 
    data: {
      quiz: newStorage,
    }
  };
} 

/**
 * onUpdateQuestion
 * @param {*} id  Quiz ID
 * @param {*} question question for update
 * @param {*} index the index the question in the matrix of questions 
 */
export function onUpdateQuestion(id, question, index) {
  const storage = JSON.parse(localStorage.getItem('quiz'));

  //find index for quiz update
  let quiz = storage.filter(it => it.id === id)[0];
  //find index for quiz update
  const indexQuiz = storage.findIndex(it => it.id === id);
  
  // update question 
  quiz.questions[index] = question;
  
  // update quiz  
  const newStorage = [
    ...storage.slice(0, indexQuiz),
    quiz,
    ...storage.slice(indexQuiz + 1)
  ];
  
  localStorage.setItem('quiz', JSON.stringify(newStorage));  
  
  return {
    type: 'UPDATE_QUESTION', 
    data: {
      quiz: newStorage,
    }
  };
} 

/**
 * onDeleteQuestion
 * @param {*} id  Quiz ID
 * @param {*} index the index the question in the matrix of questions 
 */
export function onDeleteQuestion(id, index) {
  const storage = JSON.parse(localStorage.getItem('quiz'));

  //find quiz
  let quiz = storage.filter(it => it.id === id)[0];
  
  //find index for quiz update
  const indexQuiz = storage.findIndex(it => it.id === id);
  
  let { questions } = quiz;
  
  // delete question
  questions.splice(index, 1);
  
  // update quiz  
  const newStorage = [
    ...storage.slice(0, indexQuiz),
    quiz,
    ...storage.slice(indexQuiz + 1)
  ];
  
  // save
  localStorage.setItem('quiz', JSON.stringify(newStorage));  
  
  return {
    type: 'DELETE_QUESTION', 
    data: {
      quiz: newStorage,
    }
  };
} 
/**
 * 
 * @param {*} item quiz object 
 */
export function onDeleteQuiz(item){
  
  const storage = JSON.parse(localStorage.getItem('quiz'));
  
  let newStorage = storage.filter((it) => it.id !== item.id);
  
  if (newStorage.length > 0) localStorage.setItem('quiz', JSON.stringify(newStorage));
  else {
    localStorage.removeItem('quiz');
    newStorage = null;
  }
  
  return {
    type: 'DELETE_QUIZ', 
    data: {
      quiz: newStorage,
    }
  };
}


export default reducer;