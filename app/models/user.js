import DS from 'ember-data';
import EmberValidations from 'ember-validations';
var UserModel = DS.Model.extend(EmberValidations, {
    username: DS.attr('string'),
    password: DS.attr('string')
});

UserModel.reopen({
    passwordIsBlank: function(object){
        return !(
            (object.get('password') === null) ||
            (typeof object.get('password') === 'undefined')
            );
    },
    validations: {
        username: {
            presence: { message: 'Username is required.' },
            format: {
                with: /^[a-zA-Z0-9_-]{3,16}$/, allowBlank: false, message: 'Username must contain only letters, numbers, underscores and hyphens.'
            },
            length: {
                minimum: 3,
                maximum: 16,
                message: 'Username must be between 3 and 16 characters.'
            }
        },
        password: {
            confirmation: {
                if: function (object, validator) {
                    return object.passwordIsBlank(object, validator);
                },
                message: 'Password and Confirm Password do not match.'
            },
            format: {
                with: /^[a-zA-Z0-9_-]{6,18}$/, allowBlank: true, message: 'Password must contain only letters, numbers, underscores and hyphens.'
            },
            length: {
                allowBlank: true,
                minimum: 6,
                maximum: 18,
                message: 'Password must be between 6 and 18 characters.'
            }
        },
        passwordConfirmation: {

        }
    }
});

export default UserModel;
