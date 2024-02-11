function validateCreditCard(cardNumber) {
  // Remove spaces and dashes from the card number to simplify the input for consistent pattern matching and validation using regular expressions
  const normalizedCardNumber = cardNumber.replace(/[ -]/g, '');

  // Check if the card number is numeric and has a valid length
  if (!/^\d+$/.test(normalizedCardNumber) || normalizedCardNumber.length < 13 || normalizedCardNumber.length > 19) {
      console.log(`Invalid Card Number: ${cardNumber}`);
      return 'Invalid Card Number';
  }

  // Check if the card number passes the Luhn algorithm
  if (!luhnCheck(normalizedCardNumber)) {
      console.log(`Invalid Card Number (Luhn Check Failed): ${cardNumber}`);
      return 'Invalid Card Number (Luhn Check Failed)';
  }

  // Define regular expressions for different card types
  const visaCard = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const masterCard = /^5[1-5][0-9]{14}$/;
  const americanExpress = /^3[47][0-9]{13}$/;
  const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
  const maestro = /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/;
  const verve = /^506(0|1|2|3|4|5)\d{10,13}$/; // Corrected regex for Verve

  // Check if the card number matches any of the patterns and return the card type
  if (visaCard.test(normalizedCardNumber)) {
      console.log(`Visa Card Type: ${cardNumber}`);
      return 'Visa Card';
  } else if (masterCard.test(normalizedCardNumber)) {
      console.log(`MasterCard Type: ${cardNumber}`);
      return 'MasterCard';
  } else if (americanExpress.test(normalizedCardNumber)) {
      console.log(`American Express Card Type: ${cardNumber}`);
      return 'American Express';
  } else if (discover.test(normalizedCardNumber)) {
      console.log(`Discover Card Type: ${cardNumber}`);
      return 'Discover';
  } else if (maestro.test(normalizedCardNumber)) {
      console.log(`Maestro Card Type: ${cardNumber}`);
      return 'Maestro';
  } else if (verve.test(normalizedCardNumber)) {
      console.log(`Verve Card Type: ${cardNumber}`);
      return 'Verve';
  } else {
      console.log(`Unknown Card Type: ${cardNumber}`);
      return 'Unknown Card Type';
  }
}

// Function to perform Luhn algorithm check
function luhnCheck(cardNumber) {
  let sum = 0;
  let double = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (double) {
          digit *= 2;
          if (digit > 9) {
              digit -= 9;
          }
      }

      sum += digit;
      double = !double;
  }

  return sum % 10 === 0;
}

// Example usage
const visaCardNumber = '4111-1111-1111-1111';
const visaCardType = validateCreditCard(visaCardNumber);

const validMasterCardNumber = '5555-5555-5555-4444';
const validMasterCardType = validateCreditCard(validMasterCardNumber);

const validVerveCardNumber = '5060-1111-1111-1111';
const validVerveCardType = validateCreditCard(validVerveCardNumber);

const amexCardNumber = '3711-111122-11111';
const amexCardType = validateCreditCard(amexCardNumber);

const discoverCardNumber = '6011-1111-1111-1111';
const discoverCardType = validateCreditCard(discoverCardNumber);

const maestroCardNumber = '5020-1111-1111-1111';
const maestroCardType = validateCreditCard(maestroCardNumber);

const unknownCardNumber = '1234-5678-9012-3456';
const unknownCardType = validateCreditCard(unknownCardNumber);
