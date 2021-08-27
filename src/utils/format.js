export function formatDuration(t) {

    if (String(t).indexOf(":") !== -1)
        return t

    if (t < 60)
        return t < 10 ? '0' + t : "00:" + t

    let s = parseInt(t % 60) // 秒
    let m = parseInt(t / 60) // 分

    let res = ''
    if (m >= 60) {
        let h = parseInt(m / 60)
        m = parseInt(m % 60)
        res += h + ":"
    }

    res += (m < 10 ? "0" + m : m) + ":"
    res += (s < 10 ? "0" + s : s)
    return res
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

export function trimHttp(val) {
    return val ? val.replace(/^http:/, '') : ''
}