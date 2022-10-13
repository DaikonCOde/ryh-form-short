import { useState } from 'react'

import InputText from '../InputText/InputText'
import './ContactForm.style.scss'

function ContactForm() {

  const [ stateForm, setStateForm ] = useState({
    gender: 'Mr',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    acceptTerms: false
  })
  const [ validateError, setValidateError ] = useState({
    name: {
      error: false,
      message: ''
    },
    lastName: {
      error: false,
      message: ''
    },
    email: {
      error: false,
      message: ''
    },
    phone: {
      error: false,
      message: ''
    },
    address: {
      error: false,
      message: ''
    },
    terms: {
      error: false,
      message: ''
    }
  })

  const validarCampos = () => {
    let errors = Object.assign({}, validateError)

    let messageRequired = 'Este campo es requerido';
    let messageEmail = 'Coloca un correo electrónico valido';
    let messagePhone = 'Coloca un número telefónico valido';
    let messageTerms = 'Debes aceptar los terminos y condiciones';
    
    if( stateForm.name.length === 0 ) {
      errors.name.error = true
      errors.name.message = messageRequired
    } else {
      errors.name.error = false
      errors.name.message = ''
    }
    if ( stateForm.lastName.length === 0 ) {
      errors.lastName.error = true
      errors.lastName.message = messageRequired
    } else {
      errors.lastName.error = false
      errors.lastName.message = ''
    }
    if ( stateForm.email.length === 0 ) {
      errors.email.error = true
      errors.email.message = messageRequired
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stateForm.email)) {
      errors.email.error = true
      errors.email.message = messageEmail
    } else {
      errors.email.error = false
      errors.email.message = ''
    }
    if ( stateForm.phone.length === 0 ) {
      errors.phone.error = true
      errors.phone.message = messageRequired
    } else if ( !/(\d{0,9})\b/.test(stateForm.phone) ) {
      errors.phone.error = true
      errors.phone.message = messagePhone
    } else {
      errors.phone.error = false
      errors.phone.message = ''
    }
    if ( stateForm.address.length === 0 ) {
      errors.address.error = true
      errors.address.message = messageRequired
    } else {
      errors.address.error = false
      errors.address.message = ''
    }
    if( !stateForm.acceptTerms ) {
      errors.terms.error = true
      errors.terms.message = messageTerms
    } else {
      errors.terms.error = false
      errors.terms.message = ''
    }

    setValidateError(errors)
  }

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setStateForm(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validarCampos();
  }

  return (
    <div className='content-contact-form'>
      <h3 className='title-form'>¿Quién debe recibir las ofertas?</h3>
      <form onSubmit={handleSubmit}>
        <div className='select-gender'>
          <label htmlFor="gender-mr">
            <input 
              type="radio" 
              name="gender" 
              id="gender-mr" 
              checked={stateForm.gender === 'Mr' ? true : false}
              onChange={(e) => setStateForm( prev => ({...prev, gender: e.target.value}) )  }
              value='Mr' 
            />
            Mr.
            </label>
          <label htmlFor="gender-ms">
            <input 
              type="radio" 
              name="gender" 
              id="gender-ms" 
              checked={stateForm.gender === 'Ms' ? true : false}
              onChange={(e) => setStateForm( prev => ({...prev, gender: e.target.value}) )  }
              value='Ms' 
            />
            Ms.
          </label>
        </div>

        <div className='input-names' >
          <div className='content-input'>
            <InputText 
              name='name'
              value={stateForm.name}
              handleChange={handleChange}
              validate={validateError}
              placeholder='Nombres'
            />
          </div>
          <div className='content-input'>
            <InputText 
              name='lastName'
              value={stateForm.lastName}
              handleChange={handleChange}
              validate={validateError}
              placeholder='Apellidos'
            />
          </div>
        </div>
        <div className='content-input'>
          <InputText 
            name='email'
            value={stateForm.email}
            handleChange={handleChange}
            validate={validateError}
            placeholder='Correo electrónico'
          />
        </div>
        <div className='content-input'>
          <InputText 
            name='address'
            value={stateForm.address}
            handleChange={handleChange}
            validate={validateError}
            placeholder='¿Dónde vives?'
          />
        </div>
        <div className='content-input'>
          <InputText 
            name='phone'
            value={stateForm.phone}
            handleChange={handleChange}
            validate={validateError}
            placeholder='Número telefónico'
          />
        </div>

        <div className='accept-terms'>
          <input type="checkbox" name="terms" id="terms" onChange={() => setStateForm(prev => ({...prev, acceptTerms: !prev.acceptTerms }))}/>
          <label htmlFor="terms">
            Acepto los términos y condiciones
          </label>
          {
            validateError.terms.error && (
              <span className='error-message'>{validateError.terms.message} </span>
            )
          }
        </div>

        <button className='button-submit' type='submit'>Recibir ofertas</button>

      </form>
    </div>
  )
}

export default ContactForm