import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class CryptoLockApp extends React.Component {
  state = {
    date: moment(),
    amount: 0
  };

  handleAmountChange = (input)  => {
    this.setState({amount:input.target.value});
  };

  handleDateChange = (input) => {
    this.setState({date:input});
  };

  render() {
		return (
      		<div>
	      	 <h1>CryptoLock</h1>
	      		<form>
	      	  	<p>{this.state.date.toString()}</p>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleDateChange}
              />

              <div className="grid-container">
               <div className="grid-x grid-margin-x">
                <div className="cell small-4">
                  
                </div>
                <div className="cell small-4 small-centered text-center">
                  <label>
                    <span className="display-inline-block margin-right-10">Amount:</span>
                    <span className="display-inline-block"><input className="text-center" type="text" value={this.state.amount} onChange={this.handleAmountChange} /></span>
                  </label>
                </div>
                <div className="cell small-4">
                  
                </div>
               </div>
              </div>
  
              <div className="button-group align-center">
                <button type="button" className="button">Save</button>
                <button type="button" className="button">Check Balance</button>
                <button type="button" className="success button">Save</button>
              </div>
	        	</form>
        	</div>
      	);
   }
}
export default CryptoLockApp;