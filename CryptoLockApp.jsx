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

  onDeposit() {
    nebPay.call(contract_address, this.state.amount, "save", "[928374938274234]", {
                callback: NebPay.config.testnetUrl,
                listener: this.onGetDeposit
    });
  };

  onGetDeposit(resp) {
    // Do something? Idk
  }

  onWithdraw() {
    nebPay.call(contract_address, 0, "takeout", JSON.stringify([this.state.amount * 1000000000000000000]), {
                callback: NebPay.config.testnetUrl,
                listener: this.onWithdrawSuccess
    });
  }

  onWithdrawSuccess(resp) {
    // Do something
  }

  checkBalance() {
    nebPay.simulateCall(contract_address, 0, "balanceOf", null, {
      callback: NebPay.config.testnetUrl,
      listener: this.onCheckBalance
    })  
  }

  onCheckBalance(resp) {
    var amount = Number(JSON.parse(resp.result).balance) / 1000000000000000000
    var expirationDate = JSON.parse(resp.result).expiryHeight
    alert("Amount in storage: " + JSON.stringify(amount));
    alert("Expiration date: " + JSON.stringify(expirationDate));
  }



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
                <button type="button" className="button" onClick={this.onDeposit}>Deposit</button>
                <button type="button" className="button" onClick={this.checkBalance}>Check Balance</button>
                <button type="button" className="success button" onClick={this.onWithdraw}>Withdraw</button>
              </div>
	        	</form>
        	</div>
      	);
   }
}
export default CryptoLockApp;