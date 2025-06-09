import React from 'react'
import './CTASection.css'
import { Col, Container, Row } from 'reactstrap'
import CustomInput from '../../../components/custom-input/CustomInput'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '../../../components/button/CustomButton'
import consultation from '../../../assets/images/homepage/ctaSection/c42932d0aaf0265300c324a2e1aa478b17bbd1e1.jpg'

const CTASection = () => {
    const {control, handleSubmit, reset, setValue, watch} = useForm()
    const onSubmit = () => {
      reset()
    }
     
    
  return (
    <>
    <Container className='cta-container'>
        <Row>
            <Col className='text-center' xs={12}>
                <h2 className="cta-title">Contact us</h2>
                <p className='cta-description'>Connect with us for appointments, inquiries, and support.</p>
            </Col>
        </Row>
        <Row className='g-5 align-items-center'>
            <Col md={6}>
           <form action="" onSubmit={handleSubmit(onSubmit)}  className='d-flex flex-column gap-3 width-5'>
            <p className='form-title'>Do you want a consultation?</p>
             <Controller
            name='name'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput
              type="text" 
              placeholder='Your name' 
              name='name' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
             <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="email" 
              placeholder='Your email address' 
              name='email' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
             <Controller
            name='phoneNumber'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="tel" 
              placeholder='Your phone number' 
              name='phoneNumber' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
            <div className='d-flex flex-row justify-content-start gap-3'>
            <CustomButton type='submit' className='sendButton' onClick={handleSubmit}>
                Send
            </CustomButton>
          

            </div>

           </form>
           
            </Col> 
            <Col md={6}>
            <div className='consultation-img '></div>
            </Col>

        </Row>
    </Container>

    </>
  )
}

export default CTASection