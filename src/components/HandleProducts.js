import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Context2 } from './App';
import FileBase64 from 'react-file-base64';
import { postProductsAction, getDataByIdAction, postEditData } from '../action';
import { useParams } from 'react-router-dom';

const HandleProducts = () => {
  const dispatch = useDispatch();
  const [regProduct, setRegProduct] = useContext(Context2);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const editId = useParams()?.id || null;

  let initialValues = {
    name: '',
    description: '',
    price: 0,
    size: '',
    image: '',
  };

  const [initialState, setInitialState] = useState(initialValues);

  const { editData } = useSelector((state) => state.productsReducer);

  useEffect(() => {
    if (editId) {
      dispatch(getDataByIdAction(`posts/${editId}`));
    }
  }, [editId]);

  useEffect(() => {
    if (editData) {
      setRegProduct(true);
      setInitialState(editData);
    }
  }, [editData]);

  console.log(editData);

  const handleClose = () => {
    setRegProduct(false);
    const timer = setTimeout(() => {
      navigate(-1);
    }, 300);
    return () => clearTimeout(timer);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      initialState.name === '' ||
      initialState.description === '' ||
      initialState.price === 0 ||
      initialState.size === '' ||
      initialState.image === ''
    ) {
      setErr(true);
      alert('please fill all the fields !');
    } else {
      if (editData) {
        dispatch(
          postEditData(
            `posts/${editId}`,
            {
              name: initialState.name,
              description: initialState.description,
              price: initialState.price,
              size: initialState.size,
              image: initialState.image,
            },
            navigate
          )
        );
      } else {
        dispatch(
          postProductsAction(
            'posts',
            {
              name: initialState.name,
              description: initialState.description,
              price: initialState.price,
              size: initialState.size,
              image: initialState.image,
            },
            navigate
          )
        );
      }
    }
  };

  return (
    <div>
      <Modal
        show={regProduct}
        onHide={handleClose}
        // className="modal-dialog-centered"
      >
        <div className="modal-login ">
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Name"
                  autoFocus
                  value={initialState.name}
                  onChange={(e) =>
                    setInitialState({ ...initialState, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  onChange={(e) =>
                    setInitialState({
                      ...initialState,
                      description: e.target.value,
                    })
                  }
                  value={initialState.description}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  onChange={(e) =>
                    setInitialState({ ...initialState, price: e.target.value })
                  }
                  value={initialState.price}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Size</Form.Label>
                <div>
                  <Form.Control
                    as="select"
                    name="cars"
                    form="carform"
                    onChange={(e) =>
                      setInitialState({ ...initialState, size: e.target.value })
                    }
                    value={initialState.size}
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="X">X</option>
                    <option value="L">L</option>
                  </Form.Control>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Image</Form.Label>
                <div>
                  <FileBase64
                    multiple={false}
                    onDone={(files) =>
                      setInitialState({ ...initialState, image: files.base64 })
                    }
                    value={initialState.image}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => onFormSubmit(e)}>
              Submit
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default HandleProducts;
