# Credit Card Validator
 ## Replit Link for the project

 - [Click here to run and view code on replit](https://replit.com/@uchesolomon61/CardValidatorTask6#index.js)



- This JavaScript code provides a `validateCard` function to validate credit card numbers. It checks for valid length, numeric characters, and uses the Luhn algorithm to validate most card types.

## validateCard Function
The validateCard function takes a credit card number as input and performs the following steps:

- Removes spaces and dashes from the card number.
- Checks if the card number is numeric and has a valid length (16, 13, or 19 digits).
- Determines the card type based on the first digit or specific patterns.
- For Verve cards, skips the Luhn algorithm validation.
- Validates using the Luhn algorithm for other card types.
- Returns an object with information about the card's validity, type, and a reason if invalid.

## validateLuhn Function
The validateLuhn function implements the Luhn algorithm to check the validity of a credit card number.

### i could have made the code interactive but i figured, in my example usage u can change to it any card number of your choice and it will validate for you