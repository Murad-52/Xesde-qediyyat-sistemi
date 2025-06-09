import React, { useState } from 'react'
import { Button, CloseButton, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CustomInput from '../custom-input/CustomInput';
import { Controller, useForm } from 'react-hook-form';
import ResetPasswordConfirmModal from './ResetPasswordConfirmModal';

const ResetPasswordModal = ({isOpen, toggle}) => {
    const {control, handleSubmit, setValue, watch} = useForm()
    const [modalOpen, setModalOpen] = useState(false)
    const toggleModalCode = ()=> setModalOpen((prev)=> !prev)
    const onSubmit = async (data) => {
console.log('gonderilen:', data.email);


    // try {
    //   const response = await fetch('https://reqres.in/api/users', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email: data.email })
    //   });      
    //  const result = await response.json();      
    //  if (response.ok) {
    //     toggleModalCode(); 
    //   } else {
    //     alert(result.message || "Kod göndərilmədi.");
    //   }
    // } catch (error) {
    //   alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    //   console.error(error);
    // }
    }        


    
  return (
    <>
    <Modal isOpen={isOpen} toggle={toggle} centered >
        <form  action="" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader close={toggle} >
           Please enter your email adress to receive a verification code.
        </ModalHeader>
        <ModalBody>
          <>
                <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="email" 
              placeholder='Email address' 
              name='email' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
          </>
        </ModalBody>
        <ModalFooter className='d-flex align-center justify-content-center'> 
            <Button type='submit' className='bg-success border-confirm'>Confirm</Button>
        </ModalFooter>

        </form>
        
    </Modal>
      <ResetPasswordConfirmModal
            isOpen={modalOpen}
            toggle={toggleModalCode}
            />


    </>
  )
}

export default ResetPasswordModal