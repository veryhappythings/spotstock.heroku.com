//function twitter_lineup_callback(twitters) {
//  var statusHTML = [];
//  for (var i=0; i<twitters.length; i++){
//    var username = twitters[i].user.screen_name;
//    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
//      return '<a href="'+url+'">'+url+'</a>';
//    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
//      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
//    });
//    statusHTML.push('<li><span>'+status+'</span> <a style="font-size:85%" href="http://twitter.com/'+username+'/statuses/'+twitters[i].id+'">'+relative_time(twitters[i].created_at)+'</a></li>');
//  }
//  document.getElementById('lineup').innerHTML = statusHTML.join('');
//}

function twitter_lineup_callback(twitters) {
  var output = [];
  output.push('<ul>');
  twitters.results.each(function(item, index) {
    //console.log(item);
    //console.log(item.from_user);
    //console.log(item.text);
    if (contains_stage(item.text)) {
      output.push('<li class="stage">');
      output.push('<span class="user"><a href="http://www.twitter.com/'+item.from_user+'">'+item.from_user+'</a></span>');
      output.push('<span class="text">'+markup_links(remove_tags(item.text)).trim()+'</span>');
      output.push('</li>');
    }
  });
  output.push('</ul>');
  document.getElementById('lineup').innerHTML = output.join('');
}

// http://open.spotify.com/user/puresock/playlist/4aTOuB6SnnTydrg8UqPHwU
// spotify:user:puresock:playlist:4aTOuB6SnnTydrg8UqPHwU
// indexOf || -1
// string.test('spotify(?:\.com|\:user)
function contains_stage(tweet) {
  if (tweet.test('http://open\.spotify\.com/user/.*/playlist/')) {
    return true;
  }
  return false;
}

//function contains_stage(tweet) {
//  return true;
//}

function markup_links(text) {
  return text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'">'+'Click here to listen'+'</a>';
    })
}

function remove_tags(text) {
  return text.replace(/#spotstock/i, '').replace(/@\S+/, '');
}

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
}

