import './OptionsSelect.style.scss'

function OptionsSelect({questions, handleSelectedOption, response, index}) {

  const getImageUrl = (name) => {
    return new URL(`../../assets/${name}`, import.meta.url).href
  }

  if(questions === undefined) {
    return (<div>loading...</div>)
  }

  return (
    <div className='content-options-select'>

      {
        questions.options.map((option) => (
          <div className={`option ${index === 0 ? 'square' : 'inline'}  ${!response ? '': response === option.id ? 'select' : ''}`} key={option.id} onClick={() => handleSelectedOption(option.id)}>
            {
              option.src_img && (
                <img src={ getImageUrl(option.src_img) } alt="" />
              )
            }
            {
              option.label && (
                <span className='option-label' >{option.label}</span>
              )
            }
          </div>
        ))
      }
    </div>
  )
}

export default OptionsSelect