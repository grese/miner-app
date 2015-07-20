import DS from 'ember-data';
import EmberValidations from 'ember-validations';
var PoolModel = DS.Model.extend(EmberValidations, {
    name: DS.attr('string'),
    url: DS.attr('string'),
    username: DS.attr('string'),
    password: DS.attr('string'),
    enabled: DS.attr('boolean'),
    quota: DS.attr('number'),
    priority: DS.attr('number')
});

PoolModel.reopen({
    validations: {
        name: {
            presence: { message: 'Pool name is required.' }
        },
        url: {
            presence: { message: 'Pool URL is required.' }
        }
    }
});

export default PoolModel;
