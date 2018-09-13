const update = require('../alexJest/updateAddressState')

test('Variable should = what was input', () => {
    expect(update('street', '230 S 580 E')).toBe('230 S 580 E');
    expect(update('city', 'Phoenix')).toBe('Phoenix')
    expect(update('state', 'AZ')).toBe('AZ')
});