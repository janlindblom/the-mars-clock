function sin (x_deg: number) {
    return Math.sin(deg2rad(x_deg))
}
function calculate_jd_tt (julian: number) {
    return julian + (tai_offset + 32.184) / 86400
}
function calculate_eot_h (eot: number) {
    return eot * 24 / 360
}
function calculate_j2000 (jd_tt: number) {
    return jd_tt - 2451545
}
function calculate_l_s (alpha_fms: number, nu_m: number) {
    return (alpha_fms + nu_m) % 360
}
function calculate_nu_m (j2000: number, m: number, pbs: number) {
    return (10.691 + 3e-7 * j2000) * sin(m) + 0.623 * sin(2 * m) + 0.05 * sin(3 * m) + 0.005 * sin(4 * m) + 0.0005 * sin(5 * m) + pbs
}
// JD = JDN + (hour - 12) / 24 + minute / 1440 + second / 86400
function findJD (jdn: number, h: number, m: number, s: number) {
    part1 = (h - 12) / 24
    part2 = m / 1440
    part3 = s / 86400
    return jdn + part1 + part2 + part3
}
// This bit comes from the WhaleySansFont extension:
// https://github.com/makecode-extensions/WhaleySansFont/blob/master/WhaleySansFont.ts
function makeWhaleyNumber (dat: number) {
    whaleyimg = clearimg
    if (dat < 0) {
        dat = 0
    }
    let a = whaleyfont[Math.idiv(dat, 10) % 10]
    let b = whaleyfont[dat % 10]
    for (let i = 0; i <= 4; i++) {
        whaleyimg.setPixel(0, i, 1 == a[i * 2])
        whaleyimg.setPixel(1, i, 1 == a[i * 2 + 1])
        whaleyimg.setPixel(3, i, 1 == b[i * 2])
        whaleyimg.setPixel(4, i, 1 == b[i * 2 + 1])
    }
    return whaleyimg
}
function cos (x_deg: number) {
    return Math.cos(deg2rad(x_deg))
}
function calculate_e (j2000: number) {
    return 0.0934 + 2.477e-9 * j2000
}
function calculate_alpha_fms (j2000: number) {
    return (270.3863 + 0.5240384 * j2000) % 360
}
function calculate_msd (j2000: number) {
    return (j2000 - 4.5) / 1.027491252 + 44796 - 0.00096
}
function calculate_nu (nu_m: number, m: number) {
    return nu_m + m
}
function calculate_m (j2000: number) {
    return (19.387 + 0.52402075 * j2000) % 360
}
function calculate_mtc (msd: number) {
    return 24 * msd % 24
}
function calculate_pbs (j2000: number) {
    return 0.0071 * cos(0.985626 * j2000 / 2.2353 + 49.409) + 0.0057 * cos(0.985626 * j2000 / 2.7543 + 168.173) + 0.0039 * cos(0.985626 * j2000 / 1.1177 + 191.837) + 0.0037 * cos(0.985626 * j2000 / 15.7866 + 21.736) + 0.0021 * cos(0.985626 * j2000 / 2.1354 + 15.704) + 0.002 * cos(0.985626 * j2000 / 2.4694 + 95.528) + 0.0018 * cos(0.985626 * j2000 / 32.8493 + 49.095)
}
function deg2rad (x_deg: number) {
    return Math.PI / 180 * x_deg
}
function calculate_eot (l_s: number, nu_m: number) {
    return 2.861 * sin(2 * l_s) - 0.071 * sin(4 * l_s) + 0.002 * sin(6 * l_s) - nu_m
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
let dat = 0
let part3 = 0
let part2 = 0
let part1 = 0
let clearimg = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
let whaleyfont = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 1, 0, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1], [1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 1]]
let tai_offset = 0
let setup_complete = false
let whaleyimg = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
tai_offset = 37

serial.redirectToUSB()
let leap_year = true
let year = 2020
let month = 6
let day = 8
let hour = 16
let minute = 36
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
    scrollbit.clear()
    scrollbit.setImage(
    makeWhaleyNumber(hour),
    0,
    1,
    128
    )
    scrollbit.setImage(
    makeWhaleyNumber(minute),
    6,
    1,
    128
    )
    scrollbit.setImage(
    makeWhaleyNumber(second),
    12,
    1,
    128
    )
    scrollbit.show()
})
// Mars time display loop
basic.forever(function () {
    // Mars seconds are 2.7% longer than Earth seconds so we pause accordingly
    basic.pause(1027)
})
