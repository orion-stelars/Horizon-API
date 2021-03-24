export default {
  Design: {
    Alignment: 'left'
  },
  Docker: {},
  Validator: {
    ErrorMessages: {
      // Existance
      HasValue: {
        message: 'This field is required'
      },
      SameAs: {
        message: 'This field must be identical with |*args*|'
      },
      IsString: {
        message: 'This field must be a string'
      },
      IsEmail: {
        message: 'This Email is invalid'
      },
      IsNumeric: {
        message: 'This field must be a numeric'
      },
      IsNumericString: {
        message: 'This field must be a numeric'
      },
      IsDateString: {
        message: 'This field must be a date'
      },
      IsArray: {
        message: 'This field must be an array'
      },
      IsObject: {
        message: 'This field must be an Object'
      },
      IsEvenNumber: {
        message: 'This number must be an even number'
      },
      IsOddNumber: {
        message: 'This number must be an odd number'
      },
      NumberGreaterThan: {
        message: 'This number must be greater than |*args*|'
      },
      NumberLessThan: {
        message: 'This number must be less than |*args*|'
      },
      NumberBetween: {
        message:
          'This number must be less than |*args.max*| and greater than |*args.min*|'
      },
      MaxDate: {
        message: 'This date must be less than |*args*|'
      },
      MinDate: {
        message: 'This date must be greater than |*args*|'
      },
      DateBetween: {
        message: 'This date must be in a valid range'
      },
      MatchsRegex: {
        message: 'This field must follow the correct formula'
      },
      MongooseId: {
        message: 'This field should be a mongoose id'
      },
      MinLength: {
        message: 'This field must be greater than |*args*| characters'
      },
      MaxLength: {
        message: 'This field must be less than |*args*| characters'
      },
      LengthBetween: {
        message:
          'This value must be less than |*args.max*| charachters and greater than |*args.min*| charachters'
      },
      MinArrayLength: {
        message: 'This field must be less than |*args*| selections'
      },
      MaxArrayLength: {
        message: 'This field must be less than |*args*| selections'
      },
      Remote: {
        message: 'This field can not be accepted'
      },
      PreConditions: {
        message: 'This field can not be accepted'
      },
      ResolvedPromise: {
        message: 'This field can not be accepted'
      }
    }
  }
}
