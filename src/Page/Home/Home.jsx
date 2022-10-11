// hooks
import { useState, useEffect } from 'react';
// data
import data from '../../db/data.json';
// components
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import OptionsSelect from '../../Components/OptionsSelect/OptionsSelect';
import Thanks from '../../Components/Thanks/Thanks';

import ArrowBack from '../../assets/arrow-prev.svg';
import './Home.style.scss';




function Home() {

  const [stateQuestions, setStateQuestions] = useState({
    index_question: 0,
    response: [],
  })

  const handleSelectedOption = (id) => {

    if( stateQuestions.response[stateQuestions.index_question] === undefined || stateQuestions.response.length === 1 ) {
      setStateQuestions(prev => ({
        index_question: prev.index_question + 1,
        response: [...prev.response, id] 
      }))
    
      return
    }

    const firstOptions = stateQuestions.response.slice(0, stateQuestions.index_question);
    const lastOptions = stateQuestions.response.slice(stateQuestions.index_question + 1);
    if( stateQuestions.response.length > 1) {
      setStateQuestions(prev => ({
        index_question: prev.index_question + 1,
        response: firstOptions.concat([id].concat(lastOptions)) 
      }))
    }

  } 

  const handlePreviousQuestion = () => {
    setStateQuestions(prev => ({
      ...prev,
      index_question: prev.index_question - 1,
    }))
  }

  return (
    <div className='home-page'>
        <div className="content-form">
          <div className="header-form">
            <ProgressBar totalQuestions= { data.questions.length } index={stateQuestions.index_question} />
          </div>
          <div className="body-form">
            <div className="content-question-label">
              {
                stateQuestions.index_question <= (data.questions.length - 1) && (
                  <>
                  {
                    !!stateQuestions.index_question && (
                      <span className='back' onClick={handlePreviousQuestion}>
                        <img src={ArrowBack} alt="" />
                      </span>
                    ) 
                  }
                  <h3 className="question-label">
                    {data.questions[stateQuestions.index_question].label}
                  </h3>
                  </>
                )
              }

            </div>  

            {
              stateQuestions.index_question <= (data.questions.length - 1) 
                ? <OptionsSelect 
                    questions={data.questions[stateQuestions.index_question]} 
                    handleSelectedOption={handleSelectedOption}
                    response={stateQuestions.response[stateQuestions.index_question]}
                    index={stateQuestions.index_question}
                  />
                : <Thanks />
            }

          </div>
          <div className="footer-form">
            <span className='paragraph'>Hasta 3 ofertas de clínicas verificadas</span>
          </div>
        </div>
    </div>
  )
}

export default Home