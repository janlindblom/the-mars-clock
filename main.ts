// JD = JDN + (hour - 12) / 24 + minute / 1440 + second / 86400
function findJD (jdn: number, h: number, m: number, s: number) {
    part1 = (h - 12) / 24
    part2 = m / 1440
    part3 = s / 86400
    return jdn + part1 + part2 + part3
}
function makeWhaleyNumber (dat: number) {
    whaleyimg = clearimg
    if (dat < 0) {
        dat = 0
    }
    a = whaleyfont[Math.idiv(dat, 10) % 10]
    b = whaleyfont[dat % 10]
    for (let i = 0; i <= 4; i++) {
        whaleyimg.setPixel(0, i, 1 == a[i * 2])
whaleyimg.setPixel(1, i, 1 == a[i * 2 + 1])
whaleyimg.setPixel(3, i, 1 == b[i * 2])
whaleyimg.setPixel(4, i, 1 == b[i * 2 + 1])
    }
    return whaleyimg
}
// Finding the Julian Date using instructions from https://en.wikipedia.org/wiki/Julian_day:
// JDN = (1461 × (Y + 4800 + (M − 14)/12))/4 +(367 × (M − 2 − 12 × ((M − 14)/12)))/12 − (3 × ((Y + 4900 + (M - 14)/12)/100))/4 + D − 32075
function findJDN (y: number, m: number, d: number) {
    part1 = 1461 * Math.idiv(y + 4800 + Math.idiv(m - 14, 12), 4)
    part2 = 367 * Math.idiv(m - 2 - 12 * Math.idiv(m - 14, 12), 12)
    part3 = 3 * Math.idiv(Math.idiv(y + 4900 + Math.idiv(m - 14, 12), 100), 4)
    return part1 + part2 - part3 + d - 32075
}
function h_to_hms (h: number) {
    x = h * 3600
    hh = Math.floor(x / 3600)
    hs = "" + hh
    if (hh < 10) {
        hs = "0" + hh
    }
    y = x % 3600
    mm = Math.floor(y / 60)
    ms = "" + mm
    if (mm < 10) {
        ms = "0" + mm
    }
    ss = Math.round(y % 60)
    sss = "" + ss
    if (ss < 10) {
        sss = "0" + ss
    }
    return "" + hs + ":" + ms + ":" + sss
}
let jd = 0
let jdn = 0
let second = 0
let sss = ""
let ss = 0
let ms = ""
let mm = 0
let y = 0
let hs = ""
let hh = 0
let x = 0
let b: number[] = []
let a: number[] = []
let dat = 0
let part3 = 0
let part2 = 0
let part1 = 0
let clearimg: Image = null
let whaleyimg: Image = null
let whaleyfont: number[][] = []
let setup_complete = false
whaleyfont = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 1, 0, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1], [1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 1]]
whaleyimg = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
clearimg = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
serial.redirectToUSB()
let leap_year = true
let year = 2020
let month = 6
let day = 8
let hour = 15
let minute = 58
let feb_days = 28
if (leap_year) {
    feb_days = 29
}
let mdays = [0, 31, feb_days, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
scrollbit.clear()
// Earth time display loop
basic.forever(function () {
    // Pause for a regular Earth second
    basic.pause(1000)
    second += 1
    if (second > 59) {
        second = 0
        minute += 1
    }
    if (minute > 59) {
        minute = 0
        hour += 1
    }
    if (hour > 23) {
        hour = 0
        day += 1
    }
    if (day > mdays[month]) {
        day = 1
        month += 1
    }
    if (month > 12) {
        month = 1
        year += 1
    }
    jdn = findJDN(year, month, day)
    jd = findJD(jdn, hour, minute, second)
    serial.writeValue("earth", 0)
    serial.writeString("" + hour + ":" + minute + ":" + second)
    scrollbit.clear()
    scrollbit.setImage(
    makeWhaleyNumber(hour),
    0,
    1,
    0
    )
    scrollbit.setImage(
    makeWhaleyNumber(minute),
    6,
    1,
    0
    )
    scrollbit.setImage(
    makeWhaleyNumber(second),
    12,
    1,
    0
    )
    scrollbit.show()
})
// Mars time display loop
basic.forever(function () {
    // Mars seconds are 2.7% longer than Earth seconds so we pause accordingly
    basic.pause(1027)
})
