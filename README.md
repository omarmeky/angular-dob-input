# angular-dob-input

Directive for validating and auto-formatting text inputs for date of births. Once the `dob-input` directive is added to a text input, the input will automatically behave like a date of birth input (auto format to MM / DD / YYYY). It will also update the input's validity (ng-valid vs ng-invalid) based on a valid date of birth.

I developed this plugin by copying the formatter and validator for credit card expiration from [angular-payments](https://github.com/laurihy/angular-payments) and changing it to format and validate DOB.

#Installation

`bower install --save angular-dob-input`

#Usage

`<input id="dob" name="dob" type="text" data-ng-model="dob" data-ng-required data-dob-input>`
