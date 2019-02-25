var flattenObj = function(obj) {

  var flatObj = {},
      result = [];

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) {
      continue;
    }
    if ((typeof obj[i]) === 'object') {
      flatObj = flattenObj(obj[i]);
      for (var x in flatObj) {
        if (!flatObj.hasOwnProperty(x)) {
          continue;
        }
        result[i + (!!isNaN(x) ? '.' + x : '')] = flatObj[x];
      }
    } else {
      result[i] = obj[i];
    }
  }
  return result;
};

// ES6 only ?
//fetch('http://213.108.129.190/xml/get-temp-data')
//.then(res => res.json())
//.then(res => console.log(flattenObj(res))
//);

var httpCall = function(url, cb) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        cb(myArr);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

httpCall("http://213.108.129.190/xml/get-temp-data", function (arr) {
  console.log(flattenObj(arr));
});
