import React from 'react'
import { Button, CloseButton, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CustomInput from '../custom-input/CustomInput';
import { Controller, useForm } from 'react-hook-form';

const ResetPasswordConfirmModal = ({isOpen, toggle}) => {
        const {control, handleSubmit, setValue, watch} = useForm()
    
  return (
    <>
    <Modal isOpen={isOpen} toggle={toggle} centered >
        <ModalHeader close={CloseButton} >
           Please enter the code
        </ModalHeader>
        <ModalBody>
              <form>
                <Controller
            name='code'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="number" 
              name='code' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
        <div className='d-flex align-center' > 
            <Button className='bg-white border-danger text-danger'>Resend</Button>
            <Button className='bg-success border-confirm'>Confirm</Button>
        </div>
              </form>
        </ModalBody>
    </Modal>



    </>
  )
}

export default ResetPasswordConfirmModal