import React, { useState } from 'react';
import PaymentComponent from './PaymentComponent';

const MyComponent = ({ data }) => {
  // State to track the index of the currently active payment option
  const [activePaymentIndex, setActivePaymentIndex] = useState(null);

  const handleBuyClick = (index) => {
    // Set the active payment option to the current item
    setActivePaymentIndex(index);
  };

  const handleCloseClick = () => {
    // Reset the active payment option when closing the payment component
    setActivePaymentIndex(null);
  };

  return (
    <div className="row">
      {data.map((dataItem, index) => (
        <div className="col-md-4" key={index}>
          <div className="card" style={{ width: '14rem' }}>
            <img className="card-img-top" src={dataItem.recipe.image} alt="Card cap" />
            <div className="card-body">
              <center>
                <h5 className="card-title">{dataItem.recipe.label}</h5>
                <p className="card-text">Total Amount Of Calories: {Math.round(dataItem.recipe.calories)}</p>
                {activePaymentIndex === index ? (
                  <>
                    <PaymentComponent />
                    <button className="btn btn-secondary" onClick={handleCloseClick}>Close</button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleBuyClick(index)}>Buy</button>
                )}
              </center>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
