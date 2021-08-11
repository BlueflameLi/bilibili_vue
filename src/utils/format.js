export function formatSeconds(value) {

    if (!Number(value)) return value

    let secondTime = parseInt(value % 60); // 秒
    let minuteTime = parseInt(value / 60); // 分
    let hourTime = 0
    if (minuteTime >= 60) {
        hourTime = parseInt(minuteTime / 60);
        minuteTime = parseInt(minuteTime % 60);
    }
    var result = "" + (parseInt(secondTime) < 10 ? "0" + parseInt(secondTime) : parseInt(secondTime));
    result = "" + (parseInt(minuteTime) < 10 ? "0" + parseInt(minuteTime) : parseInt(minuteTime)) + ":" + result;
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + ":" + result;
    }
    return result;
}

export function formatCount(value) {
    if (value >= 10000) {
        let res = (Math.round(value / 1000) / 10)
        let s = res.toString()
        if (s.indexOf('.') < 0)
            s += '.0'
        return s + '万'
    } else
        return value
}