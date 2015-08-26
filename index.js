var dotenv 		= require('dotenv');
dotenv.load();

var util 		= require('util');
var fs 			= require('fs');
var date 		= Date.now();

var lineReader 	= require('line-reader');
var validator 	= require('mailgun-validate-email')(process.env.KEY);

var countLines 	= function(done){
	var i;
	var count = 0;
	fs.createReadStream('input.txt')
	.on('data', function(chunk) {
		for (i=0; i < chunk.length; ++i)
		  if (chunk[i] == 10) count++;
		})
	.on('end', function() {
		done(count);
	});
};

var append 		= function(flag, val){
	fs.appendFile(flag ? util.format('results/%s/valid.csv', date) : util.format('results/%s/invalid.csv', date), val+'\n', function (err) {
		if(err) return console.log('Append', val, err);
	});
};

var checkMails 	= function(){
	lineReader.eachLine('input.txt', function(mail) {		
		validator(mail, function (err, result){
			if(err) console.log(err, mail);

			if(result) append(result.is_valid, mail);
		});
	})
	.then(function(){
		console.log('Finished validating! Writing results to file..');
	});
};

countLines(function(count){
	console.log(util.format('Checking %d emails..', count));
	
	fs.mkdirSync(util.format('results/%s', date));

	checkMails();
});