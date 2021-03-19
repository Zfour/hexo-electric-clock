console.log(returnCitySN["cip"])
fetch('http://wttr.in/'+returnCitySN["cip"]+'?format="%l+\\+%c+\\+%t+\\+%h"').then(res=>res.text()).then(
    data => {
        var res_text = data.replace(/"/g,'').replace(/\+/g,'').replace(/,/g,'\\').replace(/ /g,'').replace(/°C/g,'');
        res_list = res_text.split('\\');
        var clock_box = document.getElementById('hexo_electric_clock');
        clock_box_html = `  
  <div class="clock-row">
<span id="card-clock-clockdate" class="card-clock-clockdate">2021-03-19 FRI</span>
<span class="card-clock-weather">${res_list[2]} ${res_list[3]} *C</span>
<span class="card-clock-humidity"><svg t="1616162457851" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2187" width="10" height="10"><path d="M334.915327 733.720777c-5.27719 0-10.313903-3.091408-12.539594-8.262174-1.705851-3.970428-2.332115-6.901177-3.385097-11.779278-0.49221-2.291183-1.1328-5.27719-2.104941-9.380648-1.719154-7.322779 2.824325-14.678304 10.153244-16.410762 7.275707-1.65264 14.671141 2.825348 16.416901 10.154267 1.01205 4.337795 1.692548 7.482415 2.212388 9.907651 0.905626 4.210905 1.146103 5.250584 1.785669 6.715959 2.971681 6.928806-0.226151 14.950504-7.141654 17.935488C338.552158 733.347271 336.727603 733.720777 334.915327 733.720777z" p-id="2188"></path><path d="M491.102552 860.978113c-0.613984 0-1.225921-0.025583-1.852184-0.106424-60.150962-8.207939-113.319905-42.37511-145.886625-93.704149-4.037966-6.370081-2.145873-14.791891 4.224208-18.84316 6.342452-4.02364 14.777565-2.158153 18.828834 4.238534 28.237111 44.534286 74.356498 74.142627 126.512369 81.257675 7.476275 1.013073 12.698207 7.889691 11.686157 15.35164C503.682056 856.022241 497.817488 860.978113 491.102552 860.978113z" p-id="2189"></path><path d="M512.30341 957.589474c-161.557536 0-293.000194-131.442658-293.000194-293.007357 0-104.245226 151.577231-443.271686 190.30016-520.492418 25.851784-51.54291 61.84351-79.925331 101.367689-79.925331 22.799262 0 66.293869 10.367115 101.527324 79.805604 40.827871 80.486102 192.805214 415.235143 192.805214 520.612145C805.303604 826.145793 673.860946 957.589474 512.30341 957.589474zM510.971066 118.744451c-17.283642 0-36.938284 18.614963-52.569286 49.810453-47.425126 94.544283-184.517457 411.94419-184.517457 496.027214 0 131.475404 106.949824 238.426251 238.419088 238.426251 131.470287 0 238.419088-106.950847 238.419088-238.426251 0-82.790588-132.655276-388.984269-186.889481-495.919766C547.736411 136.933719 528.467555 118.744451 510.971066 118.744451z" p-id="2190"></path></svg> ${res_list[4]}</span>
</div>
  <div class="clock-row"><span id="card-clock-time" class="card-clock-time">22:42:38</span></div>
  
  <div class="clock-row">
  <span class="card-clock-ip">${returnCitySN["cip"]}</span>
<span class="card-clock-location">${res_list[0]}</span>
  <span id="card-clock-dackorlight" class="card-clock-dackorlight">AM</span>
</div>
`;
        var card_clock_loading_dom = document.getElementById('card-clock-loading');
        card_clock_loading_dom.innerHTML='';
        clock_box.innerHTML= clock_box_html;
        function updateTime() {
            var cd = new Date();
            var card_clock_time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
            var card_clock_date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' ;
            var card_clock_dackorlight = cd.getHours();
            var card_clock_dackorlight_str;
            if(card_clock_dackorlight >12) {
                card_clock_dackorlight -= 12;
                card_clock_dackorlight_str = " PM";
            }else{
                card_clock_dackorlight_str = " AM";
            }
            var card_clock_time_dom = document.getElementById('card-clock-time');
            var card_clock_date_dom = document.getElementById('card-clock-clockdate');
            var card_clock_dackorlight_dom = document.getElementById('card-clock-dackorlight');
            card_clock_time_dom.innerHTML= card_clock_time;
            card_clock_date_dom.innerHTML= card_clock_date;
            card_clock_dackorlight_dom.innerHTML= card_clock_dackorlight_str
        }

        function zeroPadding(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
        var timerID = setInterval(updateTime, 1000);
        updateTime();

        console.log(res_list)

    }
)