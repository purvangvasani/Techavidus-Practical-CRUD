import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

/**
 * Custom validation
 */
export class CustomValidator<T extends FormControl> {
    static emailFormatValidator(control: FormControl) {
        const emailRegex = new RegExp('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*');
        return emailRegex.test(control.value) ? null : { 'emailFormat': true };
    }
    /**
     * Password format validator
     * @param  {FormControl} control
     */
    static passwordFormatValidator(control: FormControl) {
        const passwordRegex = new RegExp('((?=.*\d)(?=.*[a-z])(?=.*[@#$%]))');
        return passwordRegex.test(control.value) ? null : { 'passwordFormat': true };
    }

    static ziplength(control: FormControl) {
        if (control.value) {
            const val = control.value.toString();
            return (val.length === 6) ? null : { 'length': true };
        } else {
            return {
                'length': true
            }
        }
    }

    /**
     * Check for equal password
     *
     * @param  {string} passwordKey
     * @param  {string} confirmPasswordKey
     */
    static equalPasswordValidator(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];
            return (password.value === confirmPassword.value) ? null : { 'mismatchedPasswords': true };
        };
    }


    static numberValidator(control: FormControl) {
        const numbers = /^[0-9]+$/;
        return (numbers.test(control.value)) ? null : { 'notNumber': true };
    }


    static min8Length(control: FormControl) {
        let check = (val) => {
            if (val && val.length >= 8) {
                return true
            }
            return false
        }
        return (check(control.value)) ? null : { 'min8LengthError': true };
    }

    static checkUpperCase(control: FormControl) {
        let check = (val) => {
            if (val && upper.test(control.value)) {
                return true
            }
            return false
        }
        const upper = (/[A-Z]/);
        return (check(control.value)) ? null : { 'upperCase': true };
    }

    static checkLowerCase(control: FormControl) {
        let check = (val) => {
            if (val && lower.test(control.value)) {
                return true
            }
            return false
        }
        const lower = (/[a-z]/);
        return (check(control.value)) ? null : { 'lowerCase': true };
    }

    static checkNumber(control: FormControl) {
        let check = (val) => {
            if (val && number.test(control.value)) {
                return true
            }
            return false
        }
        const number = (/[0-9]/);
        return (check(control.value)) ? null : { 'number': true };
    }

    static checkSpecial(control: FormControl) {
        let check = (val) => {
            if (val && special.test(control.value)) {
                return true
            }
            return false
        }
        const special = (/[!@#$%^*+=]/);
        return (check(control.value)) ? null : { 'special': true };
    }

    static passwordValidator(control: FormControl) {
        const password = new RegExp('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*+=]).*$');
        const space = (/^\S*$/);
        // const notallowed = (/[&'"]/);
        const g = (/\b([a-zA-Z0-9]+)+\1\b/);
        // return (password.test(control.value) && space.test(control.value) && (!notallowed.test(control.value)) && !g.test(control.value)) ? null : { 'passwordFormat': true };
        return (password.test(control.value) && space.test(control.value) && !g.test(control.value)) ? null : { 'passwordFormat': true };
    }

    static urlFormatValidator(control: FormControl) {
        const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return (pattern.test(control.value)) ? null : { 'wrongFormat': true };
    }
}
