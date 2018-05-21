var LockedDeposit = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.balance = new BigNumber(o.balance);
    this.expirationDate = new BigNumber(o.expirationDate);
  } else {
    this.balance = new BigNumber(0);
    this.expirationDate = new BigNumber(0);
  }
};

LockedDeposit.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var CryptoLockContract = function () {
  LocalContractStorage.defineMapProperty(this, "bankVault", {
    parse: function (text) {
      return new LockedDeposit(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });
};

// save value to contract, only after the expiration date, users can takeout
CryptoLockContract.prototype = {
  init: function () {
    
  },

  save: function (expiration_date) {
    var from = Blockchain.transaction.from; // User address 
    var value = Blockchain.transaction.value; // Value to send
    var exp_date = new BigNumber(expiration_date); // Expiration date

    // If user had an original deposit amount, get it, and add to this deposit amount
    var orig_deposit = this.bankVault.get(from);
    if (orig_deposit) {
      value = value.plus(orig_deposit.balance);
    }

    // Create the deposit object
    var deposit = new LockedDeposit();
    deposit.balance = value;
    deposit.expirationDate = exp_date;

    // Post their deposit object to the chain
    this.bankVault.put(from, deposit);
  },

  takeout: function (value) {
    var from = Blockchain.transaction.from;
    var amount = new BigNumber(value);

    var deposit = this.bankVault.get(from);
    if (!deposit) {
      throw new Error("No deposit before.");
    }

    if (deposit.expirationDate < Date.now()) {
        throw new Error("Can not takeout before expirationDate.");
    }

    if (amount.gt(deposit.balance)) {
      throw new Error("Insufficient balance.");
    }

    // Attempt transfer
    var result = Blockchain.transfer(from, amount);
    if (!result) {
      throw new Error("transfer failed.");
    }

    // Trigger an event on the blockchain
    Event.Trigger("BankVault", {
      Transfer: {
        from: Blockchain.transaction.to,
        to: from,
        value: amount.toString()
      }
    });

    // Update deposit balance
    deposit.balance = deposit.balance.sub(amount);
    this.bankVault.put(from, deposit);
  },

  // Get balance of user who asks
  balanceOf: function () {
    var from = Blockchain.transaction.from;
    return this.bankVault.get(from);
  },
  
};
module.exports = CryptoLockContract;
