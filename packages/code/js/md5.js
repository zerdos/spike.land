export function md5(inputString) {
  const hc = "0123456789abcdef";
  function rh(n) {
    let j;
    let s = "";
    for (j = 0; j <= 3; j++) {
      s += hc.charAt((n >> (j * 8 + 4)) & 0x0F) +
        hc.charAt((n >> (j * 8)) & 0x0F);
    }

    return s;
  }

  function ad(x, y) {
    const l = (x & 0xFF_FF) + (y & 0xFF_FF);
    const m = (x >> 16) + (y >> 16) + (l >> 16);
    return (m << 16) | (l & 0xFF_FF);
  }

  function rl(n, c) {
    return (n << c) | (n >>> (32 - c));
  }

  function cm(q, a, b, x, s, t) {
    return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
  }

  function ff(a, b, c, d, x, s, t) {
    return cm((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
    return cm((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
    return cm(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
    return cm(c ^ (b | (~d)), a, b, x, s, t);
  }

  function sb(x) {
    let i;
    const nblk = ((x.length + 8) >> 6) + 1;
    const blks = Array.from({ length: nblk * 16 });
    for (i = 0; i < nblk * 16; i++) {
      blks[i] = 0;
    }

    for (i = 0; i < x.length; i++) {
      blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
    }

    blks[i >> 2] |= 0x80 << ((i % 4) * 8);
    blks[nblk * 16 - 2] = x.length * 8;
    return blks;
  }

  let i;
  const x = sb(inputString);
  let a = 1_732_584_193;
  let b = -271_733_879;
  let c = -1_732_584_194;
  let d = 271_733_878;
  let olda;
  let oldb;
  let oldc;
  let oldd;
  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680_876_936);
    d = ff(d, a, b, c, x[i + 1], 12, -389_564_586);
    c = ff(c, d, a, b, x[i + 2], 17, 606_105_819);
    b = ff(b, c, d, a, x[i + 3], 22, -1_044_525_330);
    a = ff(a, b, c, d, x[i + 4], 7, -176_418_897);
    d = ff(d, a, b, c, x[i + 5], 12, 1_200_080_426);
    c = ff(c, d, a, b, x[i + 6], 17, -1_473_231_341);
    b = ff(b, c, d, a, x[i + 7], 22, -45_705_983);
    a = ff(a, b, c, d, x[i + 8], 7, 1_770_035_416);
    d = ff(d, a, b, c, x[i + 9], 12, -1_958_414_417);
    c = ff(c, d, a, b, x[i + 10], 17, -42_063);
    b = ff(b, c, d, a, x[i + 11], 22, -1_990_404_162);
    a = ff(a, b, c, d, x[i + 12], 7, 1_804_603_682);
    d = ff(d, a, b, c, x[i + 13], 12, -40_341_101);
    c = ff(c, d, a, b, x[i + 14], 17, -1_502_002_290);
    b = ff(b, c, d, a, x[i + 15], 22, 1_236_535_329);
    a = gg(a, b, c, d, x[i + 1], 5, -165_796_510);
    d = gg(d, a, b, c, x[i + 6], 9, -1_069_501_632);
    c = gg(c, d, a, b, x[i + 11], 14, 643_717_713);
    b = gg(b, c, d, a, x[i + 0], 20, -373_897_302);
    a = gg(a, b, c, d, x[i + 5], 5, -701_558_691);
    d = gg(d, a, b, c, x[i + 10], 9, 38_016_083);
    c = gg(c, d, a, b, x[i + 15], 14, -660_478_335);
    b = gg(b, c, d, a, x[i + 4], 20, -405_537_848);
    a = gg(a, b, c, d, x[i + 9], 5, 568_446_438);
    d = gg(d, a, b, c, x[i + 14], 9, -1_019_803_690);
    c = gg(c, d, a, b, x[i + 3], 14, -187_363_961);
    b = gg(b, c, d, a, x[i + 8], 20, 1_163_531_501);
    a = gg(a, b, c, d, x[i + 13], 5, -1_444_681_467);
    d = gg(d, a, b, c, x[i + 2], 9, -51_403_784);
    c = gg(c, d, a, b, x[i + 7], 14, 1_735_328_473);
    b = gg(b, c, d, a, x[i + 12], 20, -1_926_607_734);
    a = hh(a, b, c, d, x[i + 5], 4, -378_558);
    d = hh(d, a, b, c, x[i + 8], 11, -2_022_574_463);
    c = hh(c, d, a, b, x[i + 11], 16, 1_839_030_562);
    b = hh(b, c, d, a, x[i + 14], 23, -35_309_556);
    a = hh(a, b, c, d, x[i + 1], 4, -1_530_992_060);
    d = hh(d, a, b, c, x[i + 4], 11, 1_272_893_353);
    c = hh(c, d, a, b, x[i + 7], 16, -155_497_632);
    b = hh(b, c, d, a, x[i + 10], 23, -1_094_730_640);
    a = hh(a, b, c, d, x[i + 13], 4, 681_279_174);
    d = hh(d, a, b, c, x[i + 0], 11, -358_537_222);
    c = hh(c, d, a, b, x[i + 3], 16, -722_521_979);
    b = hh(b, c, d, a, x[i + 6], 23, 76_029_189);
    a = hh(a, b, c, d, x[i + 9], 4, -640_364_487);
    d = hh(d, a, b, c, x[i + 12], 11, -421_815_835);
    c = hh(c, d, a, b, x[i + 15], 16, 530_742_520);
    b = hh(b, c, d, a, x[i + 2], 23, -995_338_651);
    a = ii(a, b, c, d, x[i + 0], 6, -198_630_844);
    d = ii(d, a, b, c, x[i + 7], 10, 1_126_891_415);
    c = ii(c, d, a, b, x[i + 14], 15, -1_416_354_905);
    b = ii(b, c, d, a, x[i + 5], 21, -57_434_055);
    a = ii(a, b, c, d, x[i + 12], 6, 1_700_485_571);
    d = ii(d, a, b, c, x[i + 3], 10, -1_894_986_606);
    c = ii(c, d, a, b, x[i + 10], 15, -1_051_523);
    b = ii(b, c, d, a, x[i + 1], 21, -2_054_922_799);
    a = ii(a, b, c, d, x[i + 8], 6, 1_873_313_359);
    d = ii(d, a, b, c, x[i + 15], 10, -30_611_744);
    c = ii(c, d, a, b, x[i + 6], 15, -1_560_198_380);
    b = ii(b, c, d, a, x[i + 13], 21, 1_309_151_649);
    a = ii(a, b, c, d, x[i + 4], 6, -145_523_070);
    d = ii(d, a, b, c, x[i + 11], 10, -1_120_210_379);
    c = ii(c, d, a, b, x[i + 2], 15, 718_787_259);
    b = ii(b, c, d, a, x[i + 9], 21, -343_485_551);
    a = ad(a, olda);
    b = ad(b, oldb);
    c = ad(c, oldc);
    d = ad(d, oldd);
  }

  return rh(a) + rh(b) + rh(c) + rh(d);
}
