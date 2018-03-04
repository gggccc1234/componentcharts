/* 柱图组件对象 */

var H5ComponentPolyline = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    var cns = document.createElement('canvas');

    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    component.append(cns);

    var step = 10;
    ctx.beginPath();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#AAA";

    window.ctx = ctx;

    for (var i = 0; i < step + 1; i++) {
        var y = (h / step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }

    step = cfg.data.length + 1;

    var text_w = w / step >> 0;

    for (var i = 0; i < step + 1; i++) {
        var x = (w / step) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);

        if (cfg.data[i]) {
            var text = $('<div class="text">');
            text.text(cfg.data[i][0]);

            text.css('width', text_w / 2).css('left', x / 2 - text_w / 4 + text_w / 2);
            component.append(text);
        }
    }

    ctx.stroke();

    var cns = document.createElement('canvas');

    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    component.append(cns);

    var draw = function (per) {

        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff8878";

        var x = 0;
        var y = 0;

        var row_w = (w / (cfg.data.length + 1));

        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (item[1] * h * per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);

        }

        ctx.moveTo(row_w, y = h - (cfg.data[0][1] * h * per));

        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (item[1] * h * per);
            ctx.lineTo(x, y);
        }

        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,136,120,0)";
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255,136,120,0.2';
        ctx.fill();

        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (item[1] * h * per);
            ctx.fillStyle = item[2] ? item[2] : '#595959';
            ctx.fillText(((item[1] * 100) >> 0) + '%', x - 10, y - 10);
        }

        ctx.stroke();
    }

    component.on('onLoad', function () {
        var s = 0;
        for (i = 0; i < 100; i++) {
            setTimeout(function () {
                s += 0.01;
                draw(s);
            }, i * 10 + 500);
        }
    });

    component.on('onLeave', function () {
        var s = 1;
        for (i = 0; i < 100; i++) {
            setTimeout(function () {
                s -= 0.01;
                draw(s);
            }, i * 10);
        }
    });

    return component;
}