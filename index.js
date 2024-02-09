function validateCard(cardNumber) {
    // Remove spaces and dashes from the card number
    const cleanedCardNumber = cardNumber.replace(/[ -]/g, '');
  
    // Check if the card number is numeric and has a valid length
    if (!/^\d+$/.test(cleanedCardNumber) || ![16, 13, 19].includes(cleanedCardNumber.length)) {
      return { valid: false, reason: 'Invalid length or contains non-numeric characters', type: 'Invalid' };
    }
  
    function validateLuhn(cardNumber) {
      let sum = 0;
      let doubleUp = false;
  
      // Loop through the card number digits from right to left
      for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);
  
        if (doubleUp) {
          digit *= 2;
  
          if (digit > 9) {
            digit -= 9;
          }
        }
  
        sum += digit;
        doubleUp = !doubleUp;
      }
  
      return (sum % 10 === 0);
    }
  
    // Check the card type based on the first digit
    let cardType;
    if (cleanedCardNumber.charAt(0) === '4') {
      cardType = 'Visa';
    } else if (cleanedCardNumber.charAt(0) === '5') {
      cardType = 'Mastercard';
    } else if (cleanedCardNumber.slice(0, 6) === '506102' || cleanedCardNumber.slice(0, 6) === '506103' || cleanedCardNumber.slice(0, 4) === '6506') {
      cardType = 'Verve';
    } else {
      return { valid: false, reason: 'Unknown Card Type', type: 'Unknown Card Type' };
    }
  
    // No need to validate using the Luhn algorithm for Verve cards
    if (cardType !== 'Verve') {
      // Validate using the Luhn algorithm
      const luhnValid = validateLuhn(cleanedCardNumber);
      if (!luhnValid) {
        return { valid: false, reason: 'Invalid Luhn algorithm', type: `${cardType} - Invalid Luhn` };
      }
    }
  
    return { valid: true, type: cardType };
  }
  
  // Example usage:
  const mastercardNumber = '5 0123-4567 8901 2345';
  const visaNumber = '4 5678-9012 3456 789';
  const verveNumber = '5061034567890123456';
  
  const mastercardValidationResult = validateCard(mastercardNumber);
  const visaValidationResult = validateCard(visaNumber);
  const verveValidationResult = validateCard(verveNumber);
  
  console.log(`Mastercard Number: ${mastercardNumber}`);
  console.log(`Mastercard Type: ${mastercardValidationResult.type}`);
  console.log(`Mastercard Valid: ${mastercardValidationResult.valid ? 'Yes' : 'No'}${mastercardValidationResult.valid ? '' : ` (${mastercardValidationResult.reason})`}`);
  console.log('\n');
  
  console.log(`Visa Number: ${visaNumber}`);
  console.log(`Visa Type: ${visaValidationResult.type}`);
  console.log(`Visa Valid: ${visaValidationResult.valid ? 'Yes' : 'No'}${visaValidationResult.valid ? '' : ` (${visaValidationResult.reason})`}`);
  console.log('\n');
  
  console.log(`Verve Number: ${verveNumber}`);
  console.log(`Verve Type: ${verveValidationResult.type}`);
  console.log(`Verve Valid: ${verveValidationResult.valid ? 'Yes' : 'No'}${verveValidationResult.valid ? '' : ` (${verveValidationResult.reason})`}`);
  
  