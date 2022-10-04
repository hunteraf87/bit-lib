const { BitScope } = require("./dist");

const permissions = new BitScope(['read', 'write', 'delete']);
// const permissions = new BitScope();

permissions.add('test');
permissions.add(['test2']);

permissions.delete('test2');

console.log(permissions.masks) // Map(4) { 'read' => 1, 'write' => 2, 'delete' => 4, 'test' => 8 }

const roleGuest = permissions.mix('read')
const roleAdmin = permissions.mix(roleGuest, 'write', 'delete')

console.log(roleGuest.can('read', 'test'))
console.log(roleAdmin.canAll('read', 'write'))


