export function getJSONData(datapath)
{
    let pdata = new Promise(function(resolve, reject){

        loadData(datapath, parseJSONCallback);

        function loadData(path, callback)
        {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = callback;
            xmlhttp.open("GET", path, true);
            xmlhttp.send();
        }

        function parseJSONCallback() {
            if (this.readyState == 4 && this.status == 200) {

                console.log("data loaded...");
                // console.log(this.responseText);
                var fileresult = JSON.parse(this.responseText);
                resolve(fileresult);
            }
        }
    });
    return pdata;
}