import React, { useState } from 'react';
import { Button, Form, Modal, Row, Spinner } from 'react-bootstrap';
import mockApi from '../api/mockApi';
import '../styles/modal.css';

interface Props {
  toggleModal: () => void;
  isShow: boolean;
}

const ModalAddNew = (props: Props) => {
  const [state, setState] = useState({
    nameField: '',
    emailField: '',
    postionField: '',
    isLoading: false,
    isValid: false,
    errors: {
      nameErr: '',
      emailErr: '',
      positionErr: '',
    },
  });

  const handleAddNew = async (): Promise<void> => {
    try {
      setState((state) => ({ ...state, isLoading: true }));
      const payload = {
        name: state.nameField,
        email: state.emailField,
        position: state.postionField,
      };
      const res: any = await mockApi.addData(payload);
      if (res.id) {
        alert('Add success');
        props.toggleModal();
        setState((state) => ({
          ...state,
          nameField: '',
          emailField: '',
          postionField: '',
        }));
      } else {
        alert('Add failed');
      }
      setState((state) => ({ ...state, isLoading: false }));
    } catch {
      setState((state) => ({ ...state, isLoading: false }));
    }
  };

  const handleChangeInput =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setState((state) => ({ ...state, [field]: value }));
    };

  // const handleValidation = (): boolean => {
  //   let isValid = true;
  //   if (!state.nameField.trim().length) {
  //     isValid = false;
  //     setState((state) => ({
  //       ...state,
  //       errors: { ...state.errors, nameErr: 'Can not be empty' },
  //     }));
  //   }
  //   if (!state.postionField.trim().length) {
  //     isValid = false;
  //     setState((state) => ({
  //       ...state,
  //       errors: { ...state.errors, positionErr: 'Can not be empty' },
  //     }));
  //   }
  //   if (!state.emailField.trim().length) {
  //     isValid = false;
  //     setState((state) => ({
  //       ...state,
  //       errors: { ...state.errors, emailErr: 'Can not be empty' },
  //     }));
  //   } else {
  //     let lastAtPos = state.emailField.lastIndexOf('@');
  //     let lastDotPos = state.emailField.lastIndexOf('.');
  //     if (
  //       !(
  //         lastAtPos < lastDotPos &&
  //         lastAtPos > 0 &&
  //         state.emailField.indexOf('@@') == -1 &&
  //         lastDotPos > 2 &&
  //         state.emailField.length - lastDotPos > 2
  //       )
  //     ) {
  //       isValid = false;
  //       setState((state) => ({
  //         ...state,
  //         errors: { ...state.errors, emailErr: 'Email is not valid' },
  //       }));
  //     }
  //   }
  //   return isValid;
  // };

  return (
    <Modal show={props.isShow} onHide={props.toggleModal}>
      <Modal.Header closeButton>Add new employees</Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddNew();
          }}
        >
          <Row>
            <label>Name</label>
            <input
              onChange={handleChangeInput('nameField')}
              placeholder="Enter name"
              value={state.nameField}
              required
            />
            <label className="mt-2">Email</label>
            <input
              type={'email'}
              onChange={handleChangeInput('emailField')}
              placeholder="Enter email"
              value={state.emailField}
              required
            />
            <label className="mt-2">Position</label>
            <input
              onChange={handleChangeInput('postionField')}
              placeholder="Enter position"
              value={state.postionField}
              required
            />
          </Row>
          <Row className="mt-2">
            <Button
              className="col-2"
              disabled={state.isLoading ? true : false}
              type="submit"
            >
              Add
              {state.isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : null}
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddNew;
