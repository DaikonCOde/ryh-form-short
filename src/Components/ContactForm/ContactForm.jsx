
import './ContactForm.style.scss'

function ContactForm() {
  return (
    <div className='content-contact-form'>
      <h3 className='title-form'>¿Quién debe recibir las ofertas?</h3>
      <form >
        <div className='select-gender'>
          <label htmlFor="gender-mr">
            <input type="radio" name="gender" id="gender" checked />
            Mr
            </label>
          <label htmlFor="gender-ms">
            <input type="radio" name="gender" id="gender" />
            Ms
          </label>
        </div>

        <div className='input-names' >
          <input className='input-text' type="text" placeholder='Nombres' required/>
          <input className='input-text' type="text" placeholder='Apellidos' required/>
        </div>

        <input className='input-text' type="email" placeholder='Correo electrónico' required/>
        <input className='input-text' type="number" placeholder='Número telefónico' required/>

        <div className='accept-terms'>
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">
            Acepto los términos y condiciones
          </label>
        </div>

        <button className='button-submit'>Recibir ofertas</button>

      </form>
    </div>
  )
}

export default ContactForm