





# COC.JS Validator
<p align="center">
<img width="200" height="200" src="https://avatars2.githubusercontent.com/u/44804821?s=400&u=c2252c15889114f4fa1128f60b3156e9f1f2131e&v=4">
</p>


## What is COC.JS Validator

Javascript Validator based on COC core engine.

- Built with 29 rules ready.
- Able to work with your own custom validator.
- Easy and powerful Status Delivery 

## Install with npm 

```
npm install coc-validator
```

## Get Started

After installing from npm, all you need to do then is importing validator class and you are ready!
```
import coc from 'coc-validator'
```
## Validator
Coc Validator is a validation class that was made to validate user input with a ready made validators that will cover most of common cases, you can also add a custom rules and custom error delivery messages.

### Rules
```
[
   "HasValue",                  //Arguments: none
   "SameAs",                    //Arguments: none
   "IsString",                  //Arguments: none
   "IsEmail",                   //Arguments: none
   "IsNumeric",                 //Arguments: none
   "IsNumericString",           //Arguments: none
   "IsDateString",              //Arguments: none
   "IsArray",                   //Arguments: none
   "IsObject",                  //Arguments: none
   "IsEvenNumber",              //Arguments: none
   "IsOddNumber",               //Arguments: none
   "NumberGreaterThan",         //Arguments: Number min
   "NumberLessThan",            //Arguments: Number max
   "NumberBetween",             //Arguments: Object { min: Number, Max: Number }
   "MaxDate",                   //Arguments: MomentInstance min
   "MinDate",                   //Arguments: MomentInstance max
   "DateBetween",               //Arguments: Object { MomentInstance min, MomentInstance Max }
   "MatchesRegex",              //Arguments: Regex regex
   "MinLength",                 //Arguments: Number min
   "MaxLength",                 //Arguments: Number max
   "LengthBetween",             //Arguments: Object { min: Number, Max: Number }
   "MinArrayLength",            //Arguments: Number min
   "MaxArrayLength",            //Arguments: Number max
   "Each",                      //Arguments: Rules will be applied on each element in the array
   "Keys",                      //Arguments: Object includes the desired keys to be validated, each of them has set of rules
   "Remote",                    //Arguments: Object args than includes:
                                  //Object options (axios args eg: { url: '/foo', method: 'get'})
                                  //Function callback to be excuted on resolvation, consider res as a parameter
                                  //AxiosInstance agent --optional
                                  // Function catch to be excuted on fail --optional
   "PreConditions",           //Arguments: Array validators
                                  //Each of them should return true , or error messagee or false
]
```

### Rules, Args and Options
```
// Standard
const standardOptions = {
  HasValue: {
    args: true,
    active: true,
    message: 'This field is required',
    icon: 'fa fa-error',
  }
}

// Only the needed attributes
const onlyIfNeeded = {
  HasValue: { icon: 'fa fa-error'},
  MaxLength: {
      args: 3,
      message: 'Whoops!, length cant pass |*args*|'
    }
}

// Quick
const quickOptions = { HasValue: true, MaxLength: 3 }

```
### Examples

```
import Validator from 'coc-validator'

const person = { name: 'Jhon Doe', age: 24, sports: [ 'basket', 'ping-pong' ] }

const rules = {
   HasValue: true,
   IsObject: true,
   Keys: {
     name: { HasValue : true },
     age: { IsNumeric: true, NumberLessThan: 20 }
   }
}

const v = new Validator( person, rules )
const result = await v.Run()
```
The expected result is 
```
{
  attemp:  0
  attemps:  0
  code:  12
  error:  "NumberLessThan"
  icon:  "ivu-icon ivu-icon-ios-alert-outline"
  instance:  "coc-validator"
  message:  "This number must be less than 20"
  path:  (2) ["root",  "age"]
  val:  24
  valid:  false
 }
```

####  The same demo with custom error messages

```
import Validator from 'coc-validator'

const person = { name: 'Jhon Doe', age: 24, sports: [ 'basket', 'ping-pong' ] }

const rules = {
   HasValue: true,
   IsObject: true,
   Keys: {
     name: { HasValue : true },
     age: { 
            IsNumeric: true,
            NumberLessThan: {
              args: 20,
              message: 'Age cant be greater than 20'
            }
       }
   }
}

const v = new Validator( person, rules )
const result = await v.Run()

```

Or you can event set a dynamic error message by passing the message like this
```
{args: 20, message: 'Age cant be greater than |*args*|'}
```
in this way, Coc will replace ``|*args*|`` by the value in your args.

**Another case** is when our args is an object, such as NumberBetween rule, it expects args to be ```{ max: 20, min: 10 }``` for example, in this case dynamic error message will be something like this.

```
{ 
  args: { max: 20, min: 10 },
  message: 'Age cant be greater than |*args.max*| and less than |*args.min*|'
}
```
**Another case** also is validating using user custom validators, which could happen in ``PreConditions`` Validator for example.
The args right there is an array of functions, so what if i want a special message for each of them.
moreover, what if i want each of them to append an error message to some fixed prefix.

The answer is, simply let the validators returns true or error message

#### eg
```
const custom = val => val > 20 : 'can not be less than 20'

const rules = {
  Keys: {
    age: {
      PreConditions: {
        args: [ custom ],
        message: 'age |*args*|'
      }
    }
  }
}

```
so if custom returns the string "can not be less th.." then coc will replace ``|*args*|`` with this and the result will be
`age can not be less than 20`