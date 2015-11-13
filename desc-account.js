var fs = require('fs');
var jsforce = require('jsforce');
var file = fs.createWriteStream('AccountDescription.txt');

var conn = new jsforce.Connection({
  loginUrl : 'https://namespace.my.salesforce.com'
});

var username = 'name@email.com';
var password = 'password+securitytoken';

conn.login(username, password, function(err, userInfo) {
  if (err) { return console.error(err); }
  
	// Can get the access token and instance URL information.
  // Save them to establish connection next time.
  var accToken = conn.accessToken;
	var instUrl = conn.instanceUrl;
	// console.log(conn.accessToken);
  // console.log(conn.instanceUrl);
  
	// logged in user property
  var usrInfoId = userInfo.id;
	var usrInfoOrgId = userInfo.organizationId;
	// console.log('User ID: ' + userInfo.id);
  // console.log('Org ID: ' + userInfo.organizationId);
  
	conn.sobject('Account').describe(function(err, meta) {
		if (err) { return console.error(err); }
		
		console.log('Describing Account object...');
		
		file.write('Connection Information: ' + accToken + ' | ' + instUrl + ' | ' + usrInfoId + ' | ' + usrInfoOrgId + '\r\n');
		
		file.write('Object Label: ' + meta.label);
		file.write('Number of Fields: ' + meta.fields.length);
		
		for (i = 0; i < meta.fields.length; i++) {
			file.write('API Name: ' + meta.fields[i].name + ' | Field Label: ' + meta.fields[i].label + ' | Data type: ' + meta.fields[i].type + '\r\n');
		}
		
		console.log('Successfully described Account to AccountDescription.txt.');
	});
	
	conn.cache.clear();
	
});