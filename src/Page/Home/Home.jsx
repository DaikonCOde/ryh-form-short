// hooks
import { useState, useEffect } from 'react';
// data
import data from '../../db/data.json';
// components
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import OptionsSelect from '../../Components/OptionsSelect/OptionsSelect';
import SearchClinics from '../../Components/SearchClinics/SearchClinics';
import Loader from '../../Components/Loader/Loader';

import ContactForm from '../../Components/ContactForm/ContactForm';
import Thanks from '../../Components/Thanks/Thanks';

import ArrowBack from '../../assets/arrow-prev.svg';
import './Home.style.scss';




function Home() {

  const [stateQuestions, setStateQuestions] = useState({
    index_question: 0,
    response: [],
  })
  const [ isSearching, setIsSearching ] = useState(false)
  const [ goBack, setGoBack ] = useState(false)
  const [ changeRender, setChangeRender ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showContactForm, setShowContactForm ] = useState(false);

  useEffect(() => {
    if( isSearching ) {
      setTimeout(() => {
        setIsSearching(false)
        setIsLoading(true)
      }, 3000)
    }

    if( isLoading ) {
      setTimeout(() => {
        setIsLoading(false)
        setShowContactForm(true)
      }, 3000)
    }
  }, [isSearching, isLoading])

  const handleSelectedOption = (id) => {
    const stateClone = Object.assign({}, stateQuestions);
    if( goBack && changeRender ) {
      setChangeRender(false);
      setGoBack(false);
    } 

    if( stateQuestions.index_question === (data.questions.length - 1) ) {
      setIsSearching(true)
    }

    if( stateQuestions.response[stateQuestions.index_question] === undefined || stateQuestions.response.length === 1 ) {
      stateClone.index_question = stateClone.index_question + 1,
      stateClone.response = [...stateClone.response, id] 

    return setStateQuestions(stateClone);
    }

    if( stateQuestions.response.length > 1) {
      const firstOptions = stateQuestions.response.slice(0, stateQuestions.index_question);
      const lastOptions = stateQuestions.response.slice(stateQuestions.index_question + 1);

      stateClone.index_question = stateClone.index_question + 1,
      stateClone.response = firstOptions.concat([id].concat(lastOptions)) 

      return setStateQuestions(stateClone);
    }

  } 

  useEffect(() => {
    
    if( goBack && !changeRender ) {
      console.log( 'go back: ' + goBack);
      console.log( 'tender: ' + changeRender);

      setTimeout(() => {
        setStateQuestions(prev => ({
          ...prev,
          index_question: prev.index_question - 1,
        }))
        console.log(changeRender);
        setChangeRender(true)
  
      }, 500)
    }
  },[changeRender, goBack] )

  const handlePreviousQuestion = () => {
    setGoBack(true);
    setChangeRender(false)
    
  }

  return (
    <div className='home-page'>
        <div className="content-form">
            {
              stateQuestions.index_question <= (data.questions.length - 1) && (
                <div className="header-form">
                  <ProgressBar totalQuestions= { data.questions.length } index={stateQuestions.index_question} />
                </div>
              )
            }
          <div className="body-form" style={{  background: showContactForm ? '#fff' : '' }}>
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
              stateQuestions.index_question <= (data.questions.length - 1)  && (
                <OptionsSelect 
                    questions={data.questions[stateQuestions.index_question]} 
                    handleSelectedOption={handleSelectedOption}
                    response={stateQuestions.response[stateQuestions.index_question]}
                    index={stateQuestions.index_question}
                    goBack={goBack}
                    changeRender={changeRender}
                  />
              )
            }
            {
              (!showContactForm && (stateQuestions.index_question > (data.questions.length - 1) )) && (
                <div className='content-search'>
                    {
                      isSearching && (
                        <SearchClinics />
                      )
                    }
                    {
                      isLoading && (
                        <Loader />
                      )
                    }
                  </div> 

              )
            }

            {
              showContactForm && (
                <ContactForm />
              )
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