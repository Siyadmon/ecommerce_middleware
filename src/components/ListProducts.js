import React, { useEffect, useState } from 'react';
import { getDataAction, deleteDataAction } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { uniqueArray } from '../utils';
import { useNavigate } from 'react-router-dom';
import { Context2 } from './App';
import { useContext } from 'react';

const ListProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [regProduct, setRegProduct] = useContext(Context2);
  useEffect(() => {
    dispatch(getDataAction('posts'));
  }, []);

  let { data } = useSelector((data) => data.productsReducer);
  const [isChecked, setIsChecked] = useState([]);

  const size = data?.map((e) => e.size);
  // const size = data?.size
  const filtered = data?.filter((d) => isChecked.find((e) => d.size === e));
  // console.log(uniqueArray(size));

  const mapping = filtered.length > 0 ? filtered : data;

  const onDelete = (id) => {
    console.log(id);
    dispatch(deleteDataAction(`posts/${id}`));
  };

  const onEdit = (id) => {
    navigate(`/handle-products/${id}`);
  };
  return (
    <div className="container mt-2 main2">
      <div
        className="ml-auto"
        onClick={() => {
          setRegProduct(true);
          navigate('/handle-products');
        }}
      >
        <NavLink className="btn btn-primary mt-3 mb-4">Add Product</NavLink>
      </div>

      <div className="main row">
        <div className="filter mt-5">
          <h5>Filter</h5>
          <div className="form-check">
            {uniqueArray(size)?.map((d, index) => (
              <form key={index}>
                <div>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={d}
                    onChange={(e) => {
                      if (isChecked.includes(e.target.value)) {
                        setIsChecked(
                          isChecked.filter((d) => d !== e.target.value)
                        );
                      } else {
                        setIsChecked([...isChecked, e.target.value]);
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {d}
                  </label>
                </div>
              </form>
            ))}
          </div>
        </div>
        {mapping?.map((data) => (
          <div className="card" key={data.id}>
            <img src={data.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
              <p className="card-text">{data.description}</p>
              <p className="card-text">Size : {data.size}</p>
              <div className="row">
                <button className="btn btn-primary m-1">View</button>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => onEdit(data.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => onDelete(data.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
