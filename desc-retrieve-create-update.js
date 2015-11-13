var jsforce = require('jsforce');

var conn = new jsforce.Connection({
  loginUrl : 'https://namespace.instance.my.salesforce.com/'
});

var username = 'name@email.com';
var password = 'password+securitytoken';

conn.login(username, password, function(err, userInfo) {
  if (err) { return console.error(err); }
  // Can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  
  conn.sobject("Account").describe(function(err, meta) {
		if (err) { return console.error(err); }
		console.log("Object Label: " + meta.label);
		console.log("Number of Fields: " + meta.fields.length);
		var fields = meta.fields;
		for (i = 0; i < meta.fields.length; i++) {
			console.log("API Name: %s | Field Label: %s | Field Type: %s", fields[i].name, fields[i].label, fields[i].type);
		}
		console.log("Processed Account object successfully");
	});
	
	conn.sobject("Contact").describe(function(err, meta) {
		if (err) { return console.error(err); }
		console.log("Object Label: " + meta.label);
		console.log("Number of fields: " + meta.fields.length);
		var fields = meta.fields;
		for (i = 0; i < meta.fields.length; i++) {
			console.log("API Name: %s | Field Label: %s | Field Type: %s", fields[i].name, fields[i].label, fields[i].type);
		}
		console.log("Processed Contact object successfully");
	});
	
	conn.sobject("Opportunity").describe(function(err, meta) {
		if (err) { return console.error(err); }
		console.log("Object Label: " + meta.label);
		console.log("Number of fields: " + meta.fields.length);
		var fields = meta.fields;
		for (i = 0; i < meta.fields.length; i++) {
			console.log("API Name: %s | Field Label: %s | Field Type: %s", fields[i].name, fields[i].label, fields[i].type)
		}
		console.log("Processed Opportunity object successfully");
	});
	
	conn.sobject("Employee__c").describe(function(err, meta) {
		if (err) { return console.error(err); }
		console.log("Object Label: " + meta.label);
		console.log("Number of fields: " + meta.fields.length);
		var fields = meta.fields;
		for (i = 0; i < meta.fields.length; i++) {
			console.log("API Name: %s | Field Label %s | Field Type: %s", fields[i].name, fields[i].label, fields[i].type)
		}
		console.log("Processed Employee object successfully");
	});
	
	/* Describe Global
  conn.describeGlobal(function(err, res) {
		if (err) { return console.error(err); }
		console.log('Number of SObjects: ' + res.sobjects.length);
  });
  */
	
	/*
	conn.sobject("Account").retrieve("001e000000hE1OM", function(err, account) {
		if (err) { return console.error(err); }
		console.log("Record Type: %s, Type: %s", account, account.Type);
		console.log("Id: %s, Name: %s, Phone: %s", account.Id, account.Name, account.Phone);
		console.log("Website: " + account.Website);
		console.log("Address: " + account.BillingStreet + account.BillingCity);
		
		//console.log("Contacts: " + account.Contacts);
		// console.log("Billing Address: " + account.BillingAddress.toString());
	});
	*/
	
  /*
	conn.sobject("Account").create([
		{ Name : 'Zackone Mortgage Company', Phone : '4805550099', Website : 'www.zackonemtg.com' },
		{ Name : 'Zacktwo Mortgage Company', Phone : '4805550088', Website : 'www.zacktwomtg.com' }
	],
	function(err, rets) {
		if (err) { return console.error(err); }
		for (var i=0; i < rets.length; i++) {
			if (rets[i].success) {
				console.log("Created record id : " + rets[i].id);
			}
		}
	});
	
	conn.sobject("Account").update({ 
  Id : '001e000000hWr1MAAS',
  Name : 'Updated Account'
	}, function(err, ret) {
		if (err || !ret.success) { return console.error(err, ret); }
		console.log('Updated Successfully : ' + ret.id);
		
	});
	
	conn.sobject("Account").retrieve(rets[i].id, function(err, accounts) {
		if (err) { return console.error(err); }
		for (var i=0; i < accounts.length; i++) {
			console.log("Name : " + accounts[i].Name);
		}
	});
	*/
	
	/*
	// Single record creation
	conn.sobject("Account").create({ Name : 'My Account #1' }, function(err, ret) {
		if (err || !ret.success) { return console.error(err, ret); }
		console.log("Created record id : " + ret.id);
		// ...
	});
	*/
	conn.cache.clear();
	
});

