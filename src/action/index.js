import {
  postDataToJson,
  getDataFromJson,
  editDataInJson,
  deleteDataFromJson,
} from '../Service';

import { decryptFunction, encryptFunction } from '../utils/security';

export const getDataAction = (url) => async (dispatch) => {
  const { data } = await getDataFromJson(url);
  dispatch({
    type: 'GET_DATA',
    payload: data,
  });
};

export const getLoginDataAction = (url, obj, navigate) => async (dispatch) => {
  const { data } = await getDataFromJson(url);

  const findData = data.find(
    (d) => d.email === obj.email && decryptFunction(d.password) === obj.pass
  );

  if (findData) {
    alert('Login Success');
    let store = true;
    sessionStorage.setItem('user', store);
    const timer = setTimeout(() => {
      navigate('/list-products');
    }, 300);
    return () => clearTimeout(timer);
  } else {
    alert('Invalid email or password!');
  }
};

export const PostUserAction = (url, obj, navigate) => async (dispatch) => {
  var encrypted = encryptFunction(obj.confirmPass);
  const { data } = await getDataFromJson(url);

  const checkUserExist = data.find((d) => d.email === obj.email);
  if (checkUserExist) {
    alert('User Already Exist..! Please register with another email id !');
  } else {
    const query = await postDataToJson(url, {
      email: obj.email,
      password: encrypted,
    });
    dispatch(getDataAction());
    alert('Registered Successfully');
    navigate('/login');
  }
};

export const postProductsAction = (url, data, navigate) => async (dispatch) => {
  const query = await postDataToJson(url, data);
  dispatch(getDataAction());
  alert('Registered Successfully');
  navigate('/');
};

export const deleteDataAction = (url) => async (dispatch) => {
  const query = await deleteDataFromJson(url);
  dispatch(getDataAction());
};

export const getDataByIdAction = (url) => async (dispatch) => {
  const { data } = await getDataFromJson(url);
  dispatch({
    type: 'GET_DATA_BY_ID',
    payload: data,
  });
};

export const postEditData = (url, data, navigate) => async (dispatch) => {
  const query = await editDataInJson(url, data);
  navigate('/list-products');
  dispatch(getDataAction());
};
