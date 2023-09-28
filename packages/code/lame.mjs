function N2() {
  function e1(d) {
    return new Int32Array(d);
  }
  function G(d) {
    return new Float32Array(d);
  }
  function x1(d) {
    if (d.length == 1) return G(d[0]);
    var B = d[0];
    d = d.slice(1);
    for (var w = [], X = 0; X < B; X++) w.push(x1(d));
    return w;
  }
  function q0(d) {
    if (d.length == 1) return e1(d[0]);
    var B = d[0];
    d = d.slice(1);
    for (var w = [], X = 0; X < B; X++) w.push(q0(d));
    return w;
  }
  function U2(d) {
    if (d.length == 1) return new Int16Array(d[0]);
    var B = d[0];
    d = d.slice(1);
    for (var w = [], X = 0; X < B; X++) w.push(U2(d));
    return w;
  }
  function Y2(d) {
    if (d.length == 1) return Array(d[0]);
    var B = d[0];
    d = d.slice(1);
    for (var w = [], X = 0; X < B; X++) w.push(Y2(d));
    return w;
  }
  function L1(d) {
    this.ordinal = d;
  }
  function C(d) {
    this.ordinal = d;
  }
  function M1(d) {
    this.ordinal = function () {
      return d;
    };
  }
  function tt() {
    this.getLameVersion = function () {
      return "3.98.4";
    },
      this.getLameShortVersion = function () {
        return "3.98.4";
      },
      this.getLameVeryShortVersion = function () {
        return "LAME3.98r";
      },
      this.getPsyVersion = function () {
        return "0.93";
      },
      this.getLameUrl = function () {
        return "http://www.mp3dev.org/";
      },
      this.getLameOsBitness = function () {
        return "32bits";
      };
  }
  function a1() {
    function d(u, n, R, e, S, x) {
      for (; S-- != 0;) {
        R[e] = 1e-10 + u[n + 0] * x[0] - R[e - 1] * x[1] + u[n - 1] * x[2] -
          R[e - 2] * x[3] + u[n - 2] * x[4] -
          R[e - 3] * x[5] + u[n - 3] * x[6] - R[e - 4] * x[7] +
          u[n - 4] * x[8] - R[e - 5] * x[9] + u[n - 5] * x[10] -
          R[e - 6] * x[11] + u[n - 6] * x[12] - R[e - 7] * x[13] +
          u[n - 7] * x[14] - R[e - 8] * x[15] +
          u[n - 8] * x[16] - R[e - 9] * x[17] + u[n - 9] * x[18] -
          R[e - 10] * x[19] + u[n - 10] * x[20],
          ++e,
          ++n;
      }
    }
    function B(u, n, R, e, S, x) {
      for (; S-- != 0;) {
        R[e] = u[n + 0] * x[0] - R[e - 1] * x[1] + u[n - 1] * x[2] -
          R[e - 2] * x[3] + u[n - 2] * x[4],
          ++e,
          ++n;
      }
    }
    function w(u) {
      return u * u;
    }
    var X = a1.RMS_WINDOW_TIME_NUMERATOR,
      L = a1.RMS_WINDOW_TIME_DENOMINATOR,
      P = [[
        .038575994352,
        -3.84664617118067,
        -.02160367184185,
        7.81501653005538,
        -.00123395316851,
        -11.34170355132042,
        -9291677959e-14,
        13.05504219327545,
        -.01655260341619,
        -12.28759895145294,
        .02161526843274,
        9.4829380631979,
        -.02074045215285,
        -5.87257861775999,
        .00594298065125,
        2.75465861874613,
        .00306428023191,
        -.86984376593551,
        .00012025322027,
        .13919314567432,
        .00288463683916,
      ], [
        .0541865640643,
        -3.47845948550071,
        -.02911007808948,
        6.36317777566148,
        -.00848709379851,
        -8.54751527471874,
        -.00851165645469,
        9.4769360780128,
        -.00834990904936,
        -8.81498681370155,
        .02245293253339,
        6.85401540936998,
        -.02596338512915,
        -4.39470996079559,
        .01624864962975,
        2.19611684890774,
        -.00240879051584,
        -.75104302451432,
        .00674613682247,
        .13149317958808,
        -.00187763777362,
      ], [
        .15457299681924,
        -2.37898834973084,
        -.09331049056315,
        2.84868151156327,
        -.06247880153653,
        -2.64577170229825,
        .02163541888798,
        2.23697657451713,
        -.05588393329856,
        -1.67148153367602,
        .04781476674921,
        1.00595954808547,
        .00222312597743,
        -.45953458054983,
        .03174092540049,
        .16378164858596,
        -.01390589421898,
        -.05032077717131,
        .00651420667831,
        .0234789740702,
        -.00881362733839,
      ], [
        .30296907319327,
        -1.61273165137247,
        -.22613988682123,
        1.0797749225997,
        -.08587323730772,
        -.2565625775407,
        .03282930172664,
        -.1627671912044,
        -.00915702933434,
        -.22638893773906,
        -.02364141202522,
        .39120800788284,
        -.00584456039913,
        -.22138138954925,
        .06276101321749,
        .04500235387352,
        -828086748e-14,
        .02005851806501,
        .00205861885564,
        .00302439095741,
        -.02950134983287,
      ], [
        .33642304856132,
        -1.49858979367799,
        -.2557224142557,
        .87350271418188,
        -.11828570177555,
        .12205022308084,
        .11921148675203,
        -.80774944671438,
        -.07834489609479,
        .47854794562326,
        -.0046997791438,
        -.12453458140019,
        -.0058950022444,
        -.04067510197014,
        .05724228140351,
        .08333755284107,
        .00832043980773,
        -.04237348025746,
        -.0163538138454,
        .02977207319925,
        -.0176017656815,
      ], [
        .4491525660845,
        -.62820619233671,
        -.14351757464547,
        .29661783706366,
        -.22784394429749,
        -.372563729424,
        -.01419140100551,
        .00213767857124,
        .04078262797139,
        -.42029820170918,
        -.12398163381748,
        .22199650564824,
        .04097565135648,
        .00613424350682,
        .10478503600251,
        .06747620744683,
        -.01863887810927,
        .05784820375801,
        -.03193428438915,
        .03222754072173,
        .00541907748707,
      ], [
        .56619470757641,
        -1.04800335126349,
        -.75464456939302,
        .29156311971249,
        .1624213774223,
        -.26806001042947,
        .16744243493672,
        .00819999645858,
        -.18901604199609,
        .45054734505008,
        .3093178284183,
        -.33032403314006,
        -.27562961986224,
        .0673936833311,
        .00647310677246,
        -.04784254229033,
        .08647503780351,
        .01639907836189,
        -.0378898455484,
        .01807364323573,
        -.00588215443421,
      ], [
        .58100494960553,
        -.51035327095184,
        -.53174909058578,
        -.31863563325245,
        -.14289799034253,
        -.20256413484477,
        .17520704835522,
        .1472815413433,
        .02377945217615,
        .38952639978999,
        .15558449135573,
        -.23313271880868,
        -.25344790059353,
        -.05246019024463,
        .01628462406333,
        -.02505961724053,
        .06920467763959,
        .02442357316099,
        -.03721611395801,
        .01818801111503,
        -.00749618797172,
      ], [
        .53648789255105,
        -.2504987195602,
        -.42163034350696,
        -.43193942311114,
        -.00275953611929,
        -.03424681017675,
        .04267842219415,
        -.04678328784242,
        -.10214864179676,
        .26408300200955,
        .14590772289388,
        .15113130533216,
        -.02459864859345,
        -.17556493366449,
        -.11202315195388,
        -.18823009262115,
        -.04060034127,
        .05477720428674,
        .0478866554818,
        .0470440968812,
        -.02217936801134,
      ]],
      D = [
        [
          .98621192462708,
          -1.97223372919527,
          -1.97242384925416,
          .97261396931306,
          .98621192462708,
        ],
        [
          .98500175787242,
          -1.96977855582618,
          -1.97000351574484,
          .9702284756635,
          .98500175787242,
        ],
        [
          .97938932735214,
          -1.95835380975398,
          -1.95877865470428,
          .95920349965459,
          .97938932735214,
        ],
        [
          .97531843204928,
          -1.95002759149878,
          -1.95063686409857,
          .95124613669835,
          .97531843204928,
        ],
        [
          .97316523498161,
          -1.94561023566527,
          -1.94633046996323,
          .94705070426118,
          .97316523498161,
        ],
        [
          .96454515552826,
          -1.92783286977036,
          -1.92909031105652,
          .93034775234268,
          .96454515552826,
        ],
        [
          .96009142950541,
          -1.91858953033784,
          -1.92018285901082,
          .92177618768381,
          .96009142950541,
        ],
        [
          .95856916599601,
          -1.9154210807478,
          -1.91713833199203,
          .91885558323625,
          .95856916599601,
        ],
        [
          .94597685600279,
          -1.88903307939452,
          -1.89195371200558,
          .89487434461664,
          .94597685600279,
        ],
      ];
    this.InitGainAnalysis = function (u, n) {
      t: {
        for (var R = 0; R < MAX_ORDER; R++) {
          u.linprebuf[R] =
            u.lstepbuf[R] =
            u.loutbuf[R] =
            u.rinprebuf[R] =
            u.rstepbuf[R] =
            u.routbuf[R] =
              0;
        }
        switch (0 | n) {
          case 48e3:
            u.reqindex = 0;
            break;
          case 44100:
            u.reqindex = 1;
            break;
          case 32e3:
            u.reqindex = 2;
            break;
          case 24e3:
            u.reqindex = 3;
            break;
          case 22050:
            u.reqindex = 4;
            break;
          case 16e3:
            u.reqindex = 5;
            break;
          case 12e3:
            u.reqindex = 6;
            break;
          case 11025:
            u.reqindex = 7;
            break;
          case 8e3:
            u.reqindex = 8;
            break;
          default:
            n = INIT_GAIN_ANALYSIS_ERROR;
            break t;
        }
        u.sampleWindow = 0 | (n * X + L - 1) / L,
          u.lsum = 0,
          u.rsum = 0,
          u.totsamp = 0,
          r0.ill(u.A, 0),
          n = INIT_GAIN_ANALYSIS_OK;
      }
      return n != INIT_GAIN_ANALYSIS_OK
        ? INIT_GAIN_ANALYSIS_ERROR
        : (u.linpre = MAX_ORDER,
          u.rinpre = MAX_ORDER,
          u.lstep = MAX_ORDER,
          u.rstep = MAX_ORDER,
          u.lout = MAX_ORDER,
          u.rout = MAX_ORDER,
          r0.fill(u.B, 0),
          INIT_GAIN_ANALYSIS_OK);
    },
      this.AnalyzeSamples = function (u, n, R, e, S, x, r) {
        if (x == 0) return GAIN_ANALYSIS_OK;
        var l = 0, s = x;
        switch (r) {
          case 1:
            e = n, S = R;
            break;
          case 2:
            break;
          default:
            return GAIN_ANALYSIS_ERROR;
        }
        for (
          x < MAX_ORDER
            ? (i1.arraycopy(n, R, u.linprebuf, MAX_ORDER, x),
              i1.arraycopy(e, S, u.rinprebuf, MAX_ORDER, x))
            : (i1.arraycopy(n, R, u.linprebuf, MAX_ORDER, MAX_ORDER),
              i1.arraycopy(e, S, u.rinprebuf, MAX_ORDER, MAX_ORDER));
          0 < s;
        ) {
          var h = s > u.sampleWindow - u.totsamp
            ? u.sampleWindow - u.totsamp
            : s;
          if (l < MAX_ORDER) {
            r = u.linpre + l;
            var m = u.linprebuf, p = u.rinpre + l, _ = u.rinprebuf;
            h > MAX_ORDER - l && (h = MAX_ORDER - l);
          } else r = R + l, m = n, p = S + l, _ = e;
          d(m, r, u.lstepbuf, u.lstep + u.totsamp, h, P[u.reqindex]),
            d(_, p, u.rstepbuf, u.rstep + u.totsamp, h, P[u.reqindex]),
            B(
              u.lstepbuf,
              u.lstep + u.totsamp,
              u.loutbuf,
              u.lout + u.totsamp,
              h,
              D[u.reqindex],
            ),
            B(
              u.rstepbuf,
              u.rstep + u.totsamp,
              u.routbuf,
              u.rout + u.totsamp,
              h,
              D[u.reqindex],
            ),
            r = u.lout + u.totsamp,
            m = u.loutbuf,
            p = u.rout + u.totsamp,
            _ = u.routbuf;
          for (var i = h % 8; i-- != 0;) {
            u.lsum += w(m[r++]), u.rsum += w(_[p++]);
          }
          for (i = h / 8; i-- != 0;) {
            u.lsum += w(m[r + 0]) + w(m[r + 1]) + w(m[r + 2]) + w(m[r + 3]) +
              w(m[r + 4]) + w(m[r + 5]) + w(m[r + 6]) +
              w(m[r + 7]),
              r += 8,
              u.rsum += w(_[p + 0]) + w(_[p + 1]) + w(_[p + 2]) + w(_[p + 3]) +
                w(_[p + 4]) + w(_[p + 5]) + w(_[p + 6]) +
                w(_[p + 7]),
              p += 8;
          }
          if (
            s -= h,
              l += h,
              u.totsamp += h,
              u.totsamp == u.sampleWindow &&
              (r = 10 * a1.STEPS_per_dB *
                Math.log10((u.lsum + u.rsum) / u.totsamp * .5 + 1e-37),
                r = 0 >= r ? 0 : 0 | r,
                r >= u.A.length && (r = u.A.length - 1),
                u.A[r]++,
                u.lsum = u.rsum = 0,
                i1.arraycopy(u.loutbuf, u.totsamp, u.loutbuf, 0, MAX_ORDER),
                i1.arraycopy(u.routbuf, u.totsamp, u.routbuf, 0, MAX_ORDER),
                i1.arraycopy(u.lstepbuf, u.totsamp, u.lstepbuf, 0, MAX_ORDER),
                i1.arraycopy(u.rstepbuf, u.totsamp, u.rstepbuf, 0, MAX_ORDER),
                u.totsamp = 0),
              u.totsamp > u.sampleWindow
          ) return GAIN_ANALYSIS_ERROR;
        }
        return x < MAX_ORDER
          ? (i1.arraycopy(u.linprebuf, x, u.linprebuf, 0, MAX_ORDER - x),
            i1.arraycopy(u.rinprebuf, x, u.rinprebuf, 0, MAX_ORDER - x),
            i1.arraycopy(n, R, u.linprebuf, MAX_ORDER - x, x),
            i1.arraycopy(e, S, u.rinprebuf, MAX_ORDER - x, x))
          : (i1.arraycopy(n, R + x - MAX_ORDER, u.linprebuf, 0, MAX_ORDER),
            i1.arraycopy(e, S + x - MAX_ORDER, u.rinprebuf, 0, MAX_ORDER)),
          GAIN_ANALYSIS_OK;
      },
      this.GetTitleGain = function (u) {
        var n = u.A, R = u.A.length, e, S = 0;
        for (e = 0; e < R; e++) S += n[e];
        if (S == 0) n = GAIN_NOT_ENOUGH_SAMPLES;
        else {
          for (
            S = 0 | Math.ceil(S * (1 - .95)), e = R;
            0 < e-- && !(0 >= (S -= n[e]));
          );
          n = 64.82 - e / a1.STEPS_per_dB;
        }
        for (R = 0; R < u.A.length; R++) u.B[R] += u.A[R], u.A[R] = 0;
        for (R = 0; R < MAX_ORDER; R++) {
          u.linprebuf[R] =
            u.lstepbuf[R] =
            u.loutbuf[R] =
            u.rinprebuf[R] =
            u.rstepbuf[R] =
            u.routbuf[R] =
              0;
        }
        return u.totsamp = 0, u.lsum = u.rsum = 0, n;
      };
  }
  function st() {
    function d(n, R, e, S, x, r, l, s, h, m, p, _, i, o, c) {
      this.vbr_q = n,
        this.quant_comp = R,
        this.quant_comp_s = e,
        this.expY = S,
        this.st_lrm = x,
        this.st_s = r,
        this.masking_adj = l,
        this.masking_adj_short = s,
        this.ath_lower = h,
        this.ath_curve = m,
        this.ath_sensitivity = p,
        this.interch = _,
        this.safejoint = i,
        this.sfb21mod = o,
        this.msfix = c;
    }
    function B(n, R, e, S, x, r, l, s, h, m, p, _, i, o) {
      this.quant_comp = R,
        this.quant_comp_s = e,
        this.safejoint = S,
        this.nsmsfix = x,
        this.st_lrm = r,
        this.st_s = l,
        this.nsbass = s,
        this.scale = h,
        this.masking_adj = m,
        this.ath_lower = p,
        this.ath_curve = _,
        this.interch = i,
        this.sfscale = o;
    }
    function w(n, R, e) {
      var S = n.VBR == C.vbr_rh ? P : D, x = n.VBR_q_frac, r = S[R];
      S = S[R + 1],
        r.st_lrm += x * (S.st_lrm - r.st_lrm),
        r.st_s += x * (S.st_s - r.st_s),
        r.masking_adj += x * (S.masking_adj - r.masking_adj),
        r.masking_adj_short += x * (S.masking_adj_short - r.masking_adj_short),
        r.ath_lower += x * (S.ath_lower - r.ath_lower),
        r.ath_curve += x * (S.ath_curve - r.ath_curve),
        r.ath_sensitivity += x * (S.ath_sensitivity - r.ath_sensitivity),
        r.interch += x * (S.interch - r.interch),
        r.msfix += x * (S.msfix - r.msfix),
        S = r.vbr_q,
        0 > S && (S = 0),
        9 < S && (S = 9),
        n.VBR_q = S,
        n.VBR_q_frac = 0,
        e != 0
          ? n.quant_comp = r.quant_comp
          : 0 < Math.abs(n.quant_comp - -1) || (n.quant_comp = r.quant_comp),
        e != 0
          ? n.quant_comp_short = r.quant_comp_s
          : 0 < Math.abs(n.quant_comp_short - -1) ||
            (n.quant_comp_short = r.quant_comp_s),
        r.expY != 0 && (n.experimentalY = r.expY != 0),
        e != 0
          ? n.internal_flags.nsPsy.attackthre = r.st_lrm
          : 0 < Math.abs(n.internal_flags.nsPsy.attackthre - -1) ||
            (n.internal_flags.nsPsy.attackthre = r.st_lrm),
        e != 0
          ? n.internal_flags.nsPsy.attackthre_s = r.st_s
          : 0 < Math.abs(n.internal_flags.nsPsy.attackthre_s - -1) ||
            (n.internal_flags.nsPsy.attackthre_s = r.st_s),
        e != 0
          ? n.maskingadjust = r.masking_adj
          : 0 < Math.abs(n.maskingadjust - 0) ||
            (n.maskingadjust = r.masking_adj),
        e != 0
          ? n.maskingadjust_short = r.masking_adj_short
          : 0 < Math.abs(n.maskingadjust_short - 0) ||
            (n.maskingadjust_short = r.masking_adj_short),
        e != 0
          ? n.ATHlower = -r.ath_lower / 10
          : 0 < Math.abs(10 * -n.ATHlower) || (n.ATHlower = -r.ath_lower / 10),
        e != 0
          ? n.ATHcurve = r.ath_curve
          : 0 < Math.abs(n.ATHcurve - -1) || (n.ATHcurve = r.ath_curve),
        e != 0
          ? n.athaa_sensitivity = r.ath_sensitivity
          : 0 < Math.abs(n.athaa_sensitivity - -1) ||
            (n.athaa_sensitivity = r.ath_sensitivity),
        0 < r.interch &&
        (e != 0
          ? n.interChRatio = r.interch
          : 0 < Math.abs(n.interChRatio - -1) || (n.interChRatio = r.interch)),
        0 < r.safejoint && (n.exp_nspsytune |= r.safejoint),
        0 < r.sfb21mod && (n.exp_nspsytune |= r.sfb21mod << 20),
        e != 0
          ? n.msfix = r.msfix
          : 0 < Math.abs(n.msfix - -1) || (n.msfix = r.msfix),
        e == 0 && (n.VBR_q = R, n.VBR_q_frac = x);
    }
    function X(n, R, e) {
      var S = L.nearestBitrateFullIndex(R);
      if (
        n.VBR = C.vbr_abr,
          n.VBR_mean_bitrate_kbps = R,
          n.VBR_mean_bitrate_kbps = Math.min(n.VBR_mean_bitrate_kbps, 320),
          n.VBR_mean_bitrate_kbps = Math.max(n.VBR_mean_bitrate_kbps, 8),
          n.brate = n.VBR_mean_bitrate_kbps,
          320 < n.VBR_mean_bitrate_kbps && (n.disable_reservoir = !0),
          0 < u[S].safejoint && (n.exp_nspsytune |= 2),
          0 < u[S].sfscale && (n.internal_flags.noise_shaping = 2),
          0 < Math.abs(u[S].nsbass)
      ) {
        var x = int(4 * u[S].nsbass);
        0 > x && (x += 64), n.exp_nspsytune |= x << 2;
      }
      return e != 0
        ? n.quant_comp = u[S].quant_comp
        : 0 < Math.abs(n.quant_comp - -1) || (n.quant_comp = u[S].quant_comp),
        e != 0
          ? n.quant_comp_short = u[S].quant_comp_s
          : 0 < Math.abs(n.quant_comp_short - -1) ||
            (n.quant_comp_short = u[S].quant_comp_s),
        e != 0
          ? n.msfix = u[S].nsmsfix
          : 0 < Math.abs(n.msfix - -1) || (n.msfix = u[S].nsmsfix),
        e != 0
          ? n.internal_flags.nsPsy.attackthre = u[S].st_lrm
          : 0 < Math.abs(n.internal_flags.nsPsy.attackthre - -1) ||
            (n.internal_flags.nsPsy.attackthre = u[S].st_lrm),
        e != 0
          ? n.internal_flags.nsPsy.attackthre_s = u[S].st_s
          : 0 < Math.abs(n.internal_flags.nsPsy.attackthre_s - -1) ||
            (n.internal_flags.nsPsy.attackthre_s = u[S].st_s),
        e != 0
          ? n.scale = u[S].scale
          : 0 < Math.abs(n.scale - -1) || (n.scale = u[S].scale),
        e != 0
          ? n.maskingadjust = u[S].masking_adj
          : 0 < Math.abs(n.maskingadjust - 0) ||
            (n.maskingadjust = u[S].masking_adj),
        0 < u[S].masking_adj
          ? e != 0
            ? n.maskingadjust_short = .9 * u[S].masking_adj
            : 0 < Math.abs(n.maskingadjust_short - 0) ||
              (n.maskingadjust_short = .9 * u[S].masking_adj)
          : e != 0
          ? n.maskingadjust_short = 1.1 * u[S].masking_adj
          : 0 < Math.abs(n.maskingadjust_short - 0) ||
            (n.maskingadjust_short = 1.1 * u[S].masking_adj),
        e != 0
          ? n.ATHlower = -u[S].ath_lower / 10
          : 0 < Math.abs(10 * -n.ATHlower) ||
            (n.ATHlower = -u[S].ath_lower / 10),
        e != 0
          ? n.ATHcurve = u[S].ath_curve
          : 0 < Math.abs(n.ATHcurve - -1) || (n.ATHcurve = u[S].ath_curve),
        e != 0
          ? n.interChRatio = u[S].interch
          : 0 < Math.abs(n.interChRatio - -1) ||
            (n.interChRatio = u[S].interch),
        R;
    }
    var L;
    this.setModules = function (n) {
      L = n;
    };
    var P = [
        new d(0, 9, 9, 0, 5.2, 125, -4.2, -6.3, 4.8, 1, 0, 0, 2, 21, .97),
        new d(1, 9, 9, 0, 5.3, 125, -3.6, -5.6, 4.5, 1.5, 0, 0, 2, 21, 1.35),
        new d(2, 9, 9, 0, 5.6, 125, -2.2, -3.5, 2.8, 2, 0, 0, 2, 21, 1.49),
        new d(3, 9, 9, 1, 5.8, 130, -1.8, -2.8, 2.6, 3, -4, 0, 2, 20, 1.64),
        new d(4, 9, 9, 1, 6, 135, -.7, -1.1, 1.1, 3.5, -8, 0, 2, 0, 1.79),
        new d(5, 9, 9, 1, 6.4, 140, .5, .4, -7.5, 4, -12, 2e-4, 0, 0, 1.95),
        new d(6, 9, 9, 1, 6.6, 145, .67, .65, -14.7, 6.5, -19, 4e-4, 0, 0, 2.3),
        new d(7, 9, 9, 1, 6.6, 145, .8, .75, -19.7, 8, -22, 6e-4, 0, 0, 2.7),
        new d(8, 9, 9, 1, 6.6, 145, 1.2, 1.15, -27.5, 10, -23, 7e-4, 0, 0, 0),
        new d(9, 9, 9, 1, 6.6, 145, 1.6, 1.6, -36, 11, -25, 8e-4, 0, 0, 0),
        new d(10, 9, 9, 1, 6.6, 145, 2, 2, -36, 12, -25, 8e-4, 0, 0, 0),
      ],
      D = [
        new d(0, 9, 9, 0, 4.2, 25, -7, -4, 7.5, 1, 0, 0, 2, 26, .97),
        new d(1, 9, 9, 0, 4.2, 25, -5.6, -3.6, 4.5, 1.5, 0, 0, 2, 21, 1.35),
        new d(2, 9, 9, 0, 4.2, 25, -4.4, -1.8, 2, 2, 0, 0, 2, 18, 1.49),
        new d(3, 9, 9, 1, 4.2, 25, -3.4, -1.25, 1.1, 3, -4, 0, 2, 15, 1.64),
        new d(4, 9, 9, 1, 4.2, 25, -2.2, .1, 0, 3.5, -8, 0, 2, 0, 1.79),
        new d(5, 9, 9, 1, 4.2, 25, -1, 1.65, -7.7, 4, -12, 2e-4, 0, 0, 1.95),
        new d(6, 9, 9, 1, 4.2, 25, -0, 2.47, -7.7, 6.5, -19, 4e-4, 0, 0, 2),
        new d(7, 9, 9, 1, 4.2, 25, .5, 2, -14.5, 8, -22, 6e-4, 0, 0, 2),
        new d(8, 9, 9, 1, 4.2, 25, 1, 2.4, -22, 10, -23, 7e-4, 0, 0, 2),
        new d(9, 9, 9, 1, 4.2, 25, 1.5, 2.95, -30, 11, -25, 8e-4, 0, 0, 2),
        new d(10, 9, 9, 1, 4.2, 25, 2, 2.95, -36, 12, -30, 8e-4, 0, 0, 2),
      ],
      u = [
        new B(8, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -30, 11, .0012, 1),
        new B(16, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -25, 11, .001, 1),
        new B(24, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -20, 11, .001, 1),
        new B(32, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -15, 11, .001, 1),
        new B(40, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1),
        new B(48, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1),
        new B(56, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -6, 11, 8e-4, 1),
        new B(64, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -2, 11, 8e-4, 1),
        new B(80, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, 0, 8, 7e-4, 1),
        new B(96, 9, 9, 0, 2.5, 6.6, 145, 0, .95, 0, 1, 5.5, 6e-4, 1),
        new B(112, 9, 9, 0, 2.25, 6.6, 145, 0, .95, 0, 2, 4.5, 5e-4, 1),
        new B(128, 9, 9, 0, 1.95, 6.4, 140, 0, .95, 0, 3, 4, 2e-4, 1),
        new B(160, 9, 9, 1, 1.79, 6, 135, 0, .95, -2, 5, 3.5, 0, 1),
        new B(192, 9, 9, 1, 1.49, 5.6, 125, 0, .97, -4, 7, 3, 0, 0),
        new B(224, 9, 9, 1, 1.25, 5.2, 125, 0, .98, -6, 9, 2, 0, 0),
        new B(256, 9, 9, 1, .97, 5.2, 125, 0, 1, -8, 10, 1, 0, 0),
        new B(320, 9, 9, 1, .9, 5.2, 125, 0, 1, -10, 12, 0, 0, 0),
      ];
    this.apply_preset = function (n, R, e) {
      switch (R) {
        case s1.R3MIX:
          R = s1.V3, n.VBR = C.vbr_mtrh;
          break;
        case s1.MEDIUM:
          R = s1.V4, n.VBR = C.vbr_rh;
          break;
        case s1.MEDIUM_FAST:
          R = s1.V4, n.VBR = C.vbr_mtrh;
          break;
        case s1.STANDARD:
          R = s1.V2, n.VBR = C.vbr_rh;
          break;
        case s1.STANDARD_FAST:
          R = s1.V2, n.VBR = C.vbr_mtrh;
          break;
        case s1.EXTREME:
          R = s1.V0, n.VBR = C.vbr_rh;
          break;
        case s1.EXTREME_FAST:
          R = s1.V0, n.VBR = C.vbr_mtrh;
          break;
        case s1.INSANE:
          return R = 320, n.preset = R, X(n, R, e), n.VBR = C.vbr_off, R;
      }
      switch (n.preset = R, R) {
        case s1.V9:
          return w(n, 9, e), R;
        case s1.V8:
          return w(n, 8, e), R;
        case s1.V7:
          return w(n, 7, e), R;
        case s1.V6:
          return w(n, 6, e), R;
        case s1.V5:
          return w(n, 5, e), R;
        case s1.V4:
          return w(n, 4, e), R;
        case s1.V3:
          return w(n, 3, e), R;
        case s1.V2:
          return w(n, 2, e), R;
        case s1.V1:
          return w(n, 1, e), R;
        case s1.V0:
          return w(n, 0, e), R;
      }
      return 8 <= R && 320 >= R ? X(n, R, e) : (n.preset = 0, R);
    };
  }
  function E2() {
    function d(m) {
      this.bits = 0 | m;
    }
    function B(m, p, _, i, o, c) {
      for (p = .5946 / p, m >>= 1; m-- != 0;) {
        o[c++] = p > _[i++] ? 0 : 1, o[c++] = p > _[i++] ? 0 : 1;
      }
    }
    function w(m, p, _, i, o, c) {
      m >>= 1;
      var t = m % 2;
      for (m >>= 1; m-- != 0;) {
        var a = _[i++] * p,
          f = _[i++] * p,
          E = 0 | a,
          A = _[i++] * p,
          I = 0 | f,
          V = _[i++] * p,
          H = 0 | A;
        a += P.adj43[E],
          E = 0 | V,
          f += P.adj43[I],
          o[c++] = 0 | a,
          A += P.adj43[H],
          o[c++] = 0 | f,
          V += P.adj43[E],
          o[c++] = 0 | A,
          o[c++] = 0 | V;
      }
      t != 0 &&
        (a = _[i++] * p,
          f = _[i++] * p,
          a += P.adj43[0 | a],
          f += P.adj43[0 | f],
          o[c++] = 0 | a,
          o[c++] = 0 | f);
    }
    function X(m, p, _, i) {
      var o, c = p, t = o = 0;
      do {
        var a = m[c++], f = m[c++];
        o < a && (o = a), t < f && (t = f);
      } while (c < _);
      switch (o < t && (o = t), o) {
        case 0:
          return o;
        case 1:
          c = p, p = 0, o = Y.ht[1].hlen;
          do t = 2 * m[c + 0] + m[c + 1], c += 2, p += o[t]; while (c < _);
          return i.bits += p, 1;
        case 2:
        case 3:
          c = p,
            p = u[o - 1],
            o = 0,
            t = Y.ht[p].xlen,
            a = p == 2 ? Y.table23 : Y.table56;
          do f = m[c + 0] * t + m[c + 1], c += 2, o += a[f]; while (c < _);
          return m = o & 65535, o >>= 16, o > m && (o = m, p++), i.bits += o, p;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          c = p, p = u[o - 1], a = t = o = 0, f = Y.ht[p].xlen;
          var E = Y.ht[p].hlen, A = Y.ht[p + 1].hlen, I = Y.ht[p + 2].hlen;
          do {
            var V = m[c + 0] * f + m[c + 1];
            c += 2, o += E[V], t += A[V], a += I[V];
          } while (c < _);
          return m = p,
            o > t && (o = t, m++),
            o > a && (o = a, m = p + 2),
            i.bits += o,
            m;
        default:
          if (o > U1.IXMAX_VAL) return i.bits = U1.LARGE_BITS, -1;
          for (o -= 15, c = 24; 32 > c && !(Y.ht[c].linmax >= o); c++);
          for (t = c - 8; 24 > t && !(Y.ht[t].linmax >= o); t++);
          o = t, a = 65536 * Y.ht[o].xlen + Y.ht[c].xlen, t = 0;
          do f = m[p++],
            E = m[p++],
            f != 0 && (14 < f && (f = 15, t += a), f *= 16),
            E != 0 && (14 < E && (E = 15, t += a), f += E),
            t += Y.largetbl[f]; while (p < _);
          return m = t & 65535,
            t >>= 16,
            t > m && (t = m, o = c),
            i.bits += t,
            o;
      }
    }
    function L(m, p, _, i, o, c, t, a) {
      for (var f = p.big_values, E = 2; E < v.SBMAX_l + 1; E++) {
        var A = m.scalefac_band.l[E];
        if (A >= f) break;
        var I = o[E - 2] + p.count1bits;
        if (_.part2_3_length <= I) break;
        I = new d(I),
          A = X(i, A, f, I),
          I = I.bits,
          _.part2_3_length <= I ||
          (_.assign(p),
            _.part2_3_length = I,
            _.region0_count = c[E - 2],
            _.region1_count = E - 2 - c[E - 2],
            _.table_select[0] = t[E - 2],
            _.table_select[1] = a[E - 2],
            _.table_select[2] = A);
      }
    }
    var P = null;
    this.qupvt = null,
      this.setModules = function (m) {
        P = this.qupvt = m;
      };
    var D = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 3],
        [2, 3],
        [3, 4],
        [3, 4],
        [3, 4],
        [4, 5],
        [4, 5],
        [4, 6],
        [5, 6],
        [5, 6],
        [5, 7],
        [6, 7],
        [6, 7],
      ],
      u = [1, 2, 5, 7, 7, 10, 10, 13, 13, 13, 13, 13, 13, 13, 13];
    this.noquant_count_bits = function (m, p, _) {
      var i = p.l3_enc, o = Math.min(576, p.max_nonzero_coeff + 2 >> 1 << 1);
      for (
        _ != null && (_.sfb_count1 = 0);
        1 < o && !(i[o - 1] | i[o - 2]);
        o -= 2
      );
      p.count1 = o;
      for (
        var c = 0, t = 0;
        3 < o &&
        !(1 < ((i[o - 1] | i[o - 2] | i[o - 3] | i[o - 4]) & 2147483647));
        o -= 4
      ) {
        var a = 2 * (2 * (2 * i[o - 4] + i[o - 3]) + i[o - 2]) + i[o - 1];
        c += Y.t32l[a], t += Y.t33l[a];
      }
      if (
        a = c,
          p.count1table_select = 0,
          c > t && (a = t, p.count1table_select = 1),
          p.count1bits = a,
          p.big_values = o,
          o == 0
      ) return a;
      if (
        p.block_type == v.SHORT_TYPE
          ? (c = 3 * m.scalefac_band.s[3],
            c > p.big_values && (c = p.big_values),
            t = p.big_values)
          : p.block_type == v.NORM_TYPE
          ? (c = p.region0_count = m.bv_scf[o - 2],
            t = p.region1_count = m.bv_scf[o - 1],
            t = m.scalefac_band.l[c + t + 2],
            c = m.scalefac_band.l[c + 1],
            t < o &&
            (a = new d(a), p.table_select[2] = X(i, t, o, a), a = a.bits))
          : (p.region0_count = 7,
            p.region1_count = v.SBMAX_l - 1 - 7 - 1,
            c = m.scalefac_band.l[8],
            t = o,
            c > t && (c = t)),
          c = Math.min(c, o),
          t = Math.min(t, o),
          0 < c &&
          (a = new d(a), p.table_select[0] = X(i, 0, c, a), a = a.bits),
          c < t &&
          (a = new d(a), p.table_select[1] = X(i, c, t, a), a = a.bits),
          m.use_best_huffman == 2 &&
          (p.part2_3_length = a,
            best_huffman_divide(m, p),
            a = p.part2_3_length),
          _ != null && p.block_type == v.NORM_TYPE
      ) {
        for (i = 0; m.scalefac_band.l[i] < p.big_values;) i++;
        _.sfb_count1 = i;
      }
      return a;
    },
      this.count_bits = function (m, p, _, i) {
        var o = _.l3_enc, c = U1.IXMAX_VAL / P.IPOW20(_.global_gain);
        if (_.xrpow_max > c) return U1.LARGE_BITS;
        c = P.IPOW20(_.global_gain);
        var t,
          a = 0,
          f = 0,
          E = 0,
          A = 0,
          I = 0,
          V = o,
          H = 0,
          g = p,
          M = 0,
          T = i != null && _.global_gain == i.global_gain,
          b = _.block_type == v.SHORT_TYPE ? 38 : 21;
        for (t = 0; t <= b; t++) {
          var N = -1;
          if (
            (T || _.block_type == v.NORM_TYPE) &&
            (N = _.global_gain -
              (_.scalefac[t] + (_.preflag != 0 ? P.pretab[t] : 0) <<
                _.scalefac_scale + 1) -
              8 * _.subblock_gain[_.window[t]]), T && i.step[t] == N
          ) {
            f != 0 && (w(f, c, g, M, V, H), f = 0),
              E != 0 && (B(E, c, g, M, V, H), E = 0);
          } else {
            var y = _.width[t];
            if (
              a + _.width[t] > _.max_nonzero_coeff &&
              (t = _.max_nonzero_coeff - a + 1,
                r0.fill(o, _.max_nonzero_coeff, 576, 0),
                y = t,
                0 > y && (y = 0),
                t = b + 1),
                f == 0 && E == 0 && (V = o, H = I, g = p, M = A),
                i != null && 0 < i.sfb_count1 && t >= i.sfb_count1 &&
                  0 < i.step[t] && N >= i.step[t]
                  ? (f != 0 &&
                    (w(f, c, g, M, V, H), f = 0, V = o, H = I, g = p, M = A),
                    E += y)
                  : (E != 0 &&
                    (B(E, c, g, M, V, H), E = 0, V = o, H = I, g = p, M = A),
                    f += y),
                0 >= y
            ) {
              E != 0 && (B(E, c, g, M, V, H), E = 0),
                f != 0 && (w(f, c, g, M, V, H), f = 0);
              break;
            }
          }
          t <= b && (I += _.width[t], A += _.width[t], a += _.width[t]);
        }
        if (
          f != 0 && w(f, c, g, M, V, H),
            E != 0 && B(E, c, g, M, V, H),
            m.substep_shaping & 2
        ) {
          for (
            c = 0,
              b = .634521682242439 / P.IPOW20(_.global_gain + _.scalefac_scale),
              a = 0;
            a < _.sfbmax;
            a++
          ) {
            if (T = _.width[a], m.pseudohalf[a] == 0) {
              c += T;
            } else {for (f = c, c += T; f < c; ++f) {
                o[f] = p[f] >= b ? o[f] : 0;
              }}
          }
        }
        return this.noquant_count_bits(m, _, i);
      },
      this.best_huffman_divide = function (m, p) {
        var _ = new y2(),
          i = p.l3_enc,
          o = e1(23),
          c = e1(23),
          t = e1(23),
          a = e1(23);
        if (p.block_type != v.SHORT_TYPE || m.mode_gr != 1) {
          if (_.assign(p), p.block_type == v.NORM_TYPE) {
            for (var f = p.big_values, E = 0; 22 >= E; E++) {
              o[E] = U1.LARGE_BITS;
            }
            for (E = 0; 16 > E; E++) {
              var A = m.scalefac_band.l[E + 1];
              if (A >= f) break;
              var I = 0, V = new d(I), H = X(i, 0, A, V);
              I = V.bits;
              for (var g = 0; 8 > g; g++) {
                var M = m.scalefac_band.l[E + g + 2];
                if (M >= f) break;
                V = I,
                  V = new d(V),
                  M = X(i, A, M, V),
                  V = V.bits,
                  o[E + g] > V &&
                  (o[E + g] = V, c[E + g] = E, t[E + g] = H, a[E + g] = M);
              }
            }
            L(m, _, p, i, o, c, t, a);
          }
          if (
            f = _.big_values,
              !(f == 0 || 1 < (i[f - 2] | i[f - 1]) ||
                (f = p.count1 + 2, 576 < f))
          ) {
            for (
              _.assign(p), _.count1 = f, A = E = 0;
              f > _.big_values;
              f -= 4
            ) {
              I = 2 * (2 * (2 * i[f - 4] + i[f - 3]) + i[f - 2]) + i[f - 1],
                E += Y.t32l[I],
                A += Y.t33l[I];
            }
            _.big_values = f,
              _.count1table_select = 0,
              E > A && (E = A, _.count1table_select = 1),
              _.count1bits = E,
              _.block_type == v.NORM_TYPE
                ? L(m, _, p, i, o, c, t, a)
                : (_.part2_3_length = E,
                  E = m.scalefac_band.l[8],
                  E > f && (E = f),
                  0 < E &&
                  (m = new d(_.part2_3_length),
                    _.table_select[0] = X(i, 0, E, m),
                    _.part2_3_length = m.bits),
                  f > E &&
                  (m = new d(_.part2_3_length),
                    _.table_select[1] = X(i, E, f, m),
                    _.part2_3_length = m.bits),
                  p.part2_3_length > _.part2_3_length && p.assign(_));
          }
        }
      };
    var n = [1, 1, 1, 1, 8, 2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16],
      R = [1, 2, 4, 8, 1, 2, 4, 8, 2, 4, 8, 2, 4, 8, 4, 8],
      e = [0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
      S = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3];
    E2.slen1_tab = e,
      E2.slen2_tab = S,
      this.best_scalefac_store = function (m, p, _, i) {
        var o = i.tt[p][_], c, t, a = 0;
        for (c = t = 0; c < o.sfbmax; c++) {
          var f = o.width[c];
          for (t += f, f = -f; 0 > f && o.l3_enc[f + t] == 0; f++);
          f == 0 && (o.scalefac[c] = a = -2);
        }
        if (o.scalefac_scale == 0 && o.preflag == 0) {
          for (c = t = 0; c < o.sfbmax; c++) {
            0 < o.scalefac[c] &&
              (t |= o.scalefac[c]);
          }
          if (!(t & 1) && t != 0) {
            for (c = 0; c < o.sfbmax; c++) {
              0 < o.scalefac[c] && (o.scalefac[c] >>= 1);
            }
            o.scalefac_scale = a = 1;
          }
        }
        if (o.preflag == 0 && o.block_type != v.SHORT_TYPE && m.mode_gr == 2) {
          for (
            c = 11;
            c < v.SBPSY_l &&
            !(o.scalefac[c] < P.pretab[c] && o.scalefac[c] != -2);
            c++
          );
          if (c == v.SBPSY_l) {
            for (c = 11; c < v.SBPSY_l; c++) {
              0 < o.scalefac[c] && (o.scalefac[c] -= P.pretab[c]);
            }
            o.preflag = a = 1;
          }
        }
        for (c = 0; 4 > c; c++) i.scfsi[_][c] = 0;
        if (
          m.mode_gr == 2 && p == 1 && i.tt[0][_].block_type != v.SHORT_TYPE &&
          i.tt[1][_].block_type != v.SHORT_TYPE
        ) {
          for (
            p = i.tt[1][_], t = i.tt[0][_], a = 0;
            a < Y.scfsi_band.length - 1;
            a++
          ) {
            for (
              c = Y.scfsi_band[a];
              c < Y.scfsi_band[a + 1] &&
              !(t.scalefac[c] != p.scalefac[c] && 0 <= p.scalefac[c]);
              c++
            );
            if (c == Y.scfsi_band[a + 1]) {
              for (c = Y.scfsi_band[a]; c < Y.scfsi_band[a + 1]; c++) {
                p.scalefac[c] = -1;
              }
              i.scfsi[_][a] = 1;
            }
          }
          for (c = i = _ = 0; 11 > c; c++) {
            p.scalefac[c] != -1 &&
              (i++, _ < p.scalefac[c] && (_ = p.scalefac[c]));
          }
          for (f = t = 0; c < v.SBPSY_l; c++) {
            p.scalefac[c] != -1 &&
              (f++, t < p.scalefac[c] && (t = p.scalefac[c]));
          }
          for (a = 0; 16 > a; a++) {
            _ < n[a] && t < R[a] &&
              (c = e[a] * i + S[a] * f,
                p.part2_length > c &&
                (p.part2_length = c, p.scalefac_compress = a));
          }
          a = 0;
        }
        for (c = 0; c < o.sfbmax; c++) {
          o.scalefac[c] == -2 && (o.scalefac[c] = 0);
        }
        a != 0 &&
          (m.mode_gr == 2
            ? this.scale_bitcount(o)
            : this.scale_bitcount_lsf(m, o));
      };
    var x = [0, 18, 36, 54, 54, 36, 54, 72, 54, 72, 90, 72, 90, 108, 108, 126],
      r = [0, 18, 36, 54, 51, 35, 53, 71, 52, 70, 88, 69, 87, 105, 104, 122],
      l = [0, 10, 20, 30, 33, 21, 31, 41, 32, 42, 52, 43, 53, 63, 64, 74];
    this.scale_bitcount = function (m) {
      var p, _ = 0, i = 0, o = m.scalefac;
      if (m.block_type == v.SHORT_TYPE) {
        var c = x;
        m.mixed_block_flag != 0 && (c = r);
      } else if (c = l, m.preflag == 0) {
        for (p = 11; p < v.SBPSY_l && !(o[p] < P.pretab[p]); p++);
        if (p == v.SBPSY_l) {
          for (m.preflag = 1, p = 11; p < v.SBPSY_l; p++) o[p] -= P.pretab[p];
        }
      }
      for (p = 0; p < m.sfbdivide; p++) _ < o[p] && (_ = o[p]);
      for (; p < m.sfbmax; p++) i < o[p] && (i = o[p]);
      for (m.part2_length = U1.LARGE_BITS, p = 0; 16 > p; p++) {
        _ < n[p] && i < R[p] && m.part2_length > c[p] &&
          (m.part2_length = c[p], m.scalefac_compress = p);
      }
      return m.part2_length == U1.LARGE_BITS;
    };
    var s = [[15, 15, 7, 7], [15, 15, 7, 0], [7, 3, 0, 0], [15, 31, 31, 0], [
      7,
      7,
      7,
      0,
    ], [3, 3, 0, 0]];
    this.scale_bitcount_lsf = function (m, p) {
      var _, i, o, c, t = e1(4), a = p.scalefac;
      for (m = p.preflag != 0 ? 2 : 0, o = 0; 4 > o; o++) t[o] = 0;
      if (p.block_type == v.SHORT_TYPE) {
        var f = 1, E = P.nr_of_sfb_block[m][f];
        for (_ = c = 0; 4 > _; _++) {
          var A = E[_] / 3;
          for (o = 0; o < A; o++, c++) {
            for (i = 0; 3 > i; i++) {
              a[3 * c + i] > t[_] && (t[_] = a[3 * c + i]);
            }
          }
        }
      } else {for (f = 0, E = P.nr_of_sfb_block[m][f], _ = c = 0; 4 > _; _++) {
          for (A = E[_], o = 0; o < A; o++, c++) a[c] > t[_] && (t[_] = a[c]);
        }}
      for (A = !1, _ = 0; 4 > _; _++) t[_] > s[m][_] && (A = !0);
      if (!A) {
        for (
          p.sfb_partition_table = P.nr_of_sfb_block[m][f], _ = 0;
          4 > _;
          _++
        ) p.slen[_] = h[t[_]];
        switch (f = p.slen[0], _ = p.slen[1], t = p.slen[2], i = p.slen[3], m) {
          case 0:
            p.scalefac_compress = (5 * f + _ << 4) + (t << 2) + i;
            break;
          case 1:
            p.scalefac_compress = 400 + (5 * f + _ << 2) + t;
            break;
          case 2:
            p.scalefac_compress = 500 + 3 * f + _;
            break;
          default:
            i1.err.printf(`intensity stereo not implemented yet
`);
        }
      }
      if (!A) {
        for (_ = p.part2_length = 0; 4 > _; _++) {
          p.part2_length += p.slen[_] * p.sfb_partition_table[_];
        }
      }
      return A;
    };
    var h = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
    this.huffman_init = function (m) {
      for (var p = 2; 576 >= p; p += 2) {
        for (var _ = 0, i; m.scalefac_band.l[++_] < p;);
        for (i = D[_][0]; m.scalefac_band.l[i + 1] > p;) i--;
        for (
          0 > i && (i = D[_][0]), m.bv_scf[p - 2] = i, i = D[_][1];
          m.scalefac_band.l[i + m.bv_scf[p - 2] + 2] > p;
        ) i--;
        0 > i && (i = D[_][1]), m.bv_scf[p - 1] = i;
      }
    };
  }
  function et() {
    var d;
    this.setModules = function (B) {
      d = B;
    },
      this.ResvFrameBegin = function (B, w) {
        var X = B.internal_flags, L = X.l3_side, P = d.getframebits(B);
        w.bits = (P - 8 * X.sideinfo_len) / X.mode_gr;
        var D = 2048 * X.mode_gr - 8;
        if (320 < B.brate) {
          var u = 8 *
            int(1e3 * B.brate / (B.out_samplerate / 1152) / 8 + .5);
        } else {u = 11520,
            B.strict_ISO &&
            (u = 8 * int(32e4 / (B.out_samplerate / 1152) / 8 + .5));}
        return X.ResvMax = u - P,
          X.ResvMax > D && (X.ResvMax = D),
          (0 > X.ResvMax || B.disable_reservoir) && (X.ResvMax = 0),
          B = w.bits * X.mode_gr + Math.min(X.ResvSize, X.ResvMax),
          B > u && (B = u),
          L.resvDrain_pre = 0,
          X.pinfo != null &&
          (X.pinfo.mean_bits = w.bits / 2, X.pinfo.resvsize = X.ResvSize),
          B;
      },
      this.ResvMaxBits = function (B, w, X, L) {
        var P = B.internal_flags, D = P.ResvSize, u = P.ResvMax;
        return L != 0 && (D += w),
          P.substep_shaping & 1 && (u *= .9),
          X.bits = w,
          10 * D > 9 * u
            ? (L = D - 9 * u / 10, X.bits += L, P.substep_shaping |= 128)
            : (L = 0,
              P.substep_shaping &= 127,
              B.disable_reservoir || P.substep_shaping & 1 ||
              (X.bits -= .1 * w)),
          B = D < 6 * P.ResvMax / 10 ? D : 6 * P.ResvMax / 10,
          B -= L,
          0 > B && (B = 0),
          B;
      },
      this.ResvAdjust = function (B, w) {
        B.ResvSize -= w.part2_3_length + w.part2_length;
      },
      this.ResvFrameEnd = function (B, w) {
        var X, L = B.l3_side;
        B.ResvSize += w * B.mode_gr,
          w = 0,
          L.resvDrain_post = 0,
          L.resvDrain_pre = 0,
          (X = B.ResvSize % 8) != 0 && (w += X),
          X = B.ResvSize - w - B.ResvMax,
          0 < X && (w += X),
          X = Math.min(8 * L.main_data_begin, w) / 8,
          L.resvDrain_pre += 8 * X,
          w -= 8 * X,
          B.ResvSize -= 8 * X,
          L.main_data_begin -= X,
          L.resvDrain_post += w,
          B.ResvSize -= w;
      };
  }
  function H1() {
    function d(_, i, o) {
      for (; 0 < o;) {
        if (p == 0) {
          if (p = 8, m++, _.header[_.w_ptr].write_timing == h) {
            var c = _;
            i1.arraycopy(c.header[c.w_ptr].buf, 0, s, m, c.sideinfo_len),
              m += c.sideinfo_len,
              h += 8 * c.sideinfo_len,
              c.w_ptr = c.w_ptr + 1 & S1.MAX_HEADER_BUF - 1;
          }
          s[m] = 0;
        }
        c = Math.min(o, p), o -= c, p -= c, s[m] |= i >> o << p, h += c;
      }
    }
    function B(_, i) {
      var o = _.internal_flags, c;
      if (
        8 <= i && (d(o, 76, 8), i -= 8),
          8 <= i && (d(o, 65, 8), i -= 8),
          8 <= i && (d(o, 77, 8), i -= 8),
          8 <= i && (d(o, 69, 8), i -= 8),
          32 <= i
      ) {
        var t = r.getLameShortVersion();
        if (32 <= i) {
          for (c = 0; c < t.length && 8 <= i; ++c) {
            i -= 8, d(o, t.charAt(c), 8);
          }
        }
      }
      for (; 1 <= i; --i) {
        d(o, o.ancillary_flag, 1),
          o.ancillary_flag ^= _.disable_reservoir ? 0 : 1;
      }
    }
    function w(_, i, o) {
      for (var c = _.header[_.h_ptr].ptr; 0 < o;) {
        var t = Math.min(o, 8 - (c & 7));
        o -= t,
          _.header[_.h_ptr].buf[c >> 3] |= i >> o << 8 - (c & 7) - t,
          c += t;
      }
      _.header[_.h_ptr].ptr = c;
    }
    function X(_, i) {
      _ <<= 8;
      for (var o = 0; 8 > o; o++) {
        _ <<= 1, i <<= 1, (i ^ _) & 65536 && (i ^= 32773);
      }
      return i;
    }
    function L(_, i) {
      var o = Y.ht[i.count1table_select + 32],
        c,
        t = 0,
        a = i.big_values,
        f = i.big_values;
      for (c = (i.count1 - i.big_values) / 4; 0 < c; --c) {
        var E = 0, A = 0, I = i.l3_enc[a + 0];
        I != 0 && (A += 8, 0 > i.xr[f + 0] && E++),
          I = i.l3_enc[a + 1],
          I != 0 && (A += 4, E *= 2, 0 > i.xr[f + 1] && E++),
          I = i.l3_enc[a + 2],
          I != 0 && (A += 2, E *= 2, 0 > i.xr[f + 2] && E++),
          I = i.l3_enc[a + 3],
          I != 0 && (A++, E *= 2, 0 > i.xr[f + 3] && E++),
          a += 4,
          f += 4,
          d(_, E + o.table[A], o.hlen[A]),
          t += o.hlen[A];
      }
      return t;
    }
    function P(_, i, o, c, t) {
      var a = Y.ht[i], f = 0;
      if (i == 0) return f;
      for (; o < c; o += 2) {
        var E = 0,
          A = 0,
          I = a.xlen,
          V = a.xlen,
          H = 0,
          g = t.l3_enc[o],
          M = t.l3_enc[o + 1];
        g != 0 && (0 > t.xr[o] && H++, E--),
          15 < i &&
          (14 < g && (H |= g - 15 << 1, A = I, g = 15),
            14 < M && (V = M - 15, H <<= I, H |= V, A += I, M = 15),
            V = 16),
          M != 0 && (H <<= 1, 0 > t.xr[o + 1] && H++, E--),
          g = g * V + M,
          A -= E,
          E += a.hlen[g],
          d(_, a.table[g], E),
          d(_, H, A),
          f += E + A;
      }
      return f;
    }
    function D(_, i) {
      var o = 3 * _.scalefac_band.s[3];
      o > i.big_values && (o = i.big_values);
      var c = P(_, i.table_select[0], 0, o, i);
      return c += P(_, i.table_select[1], o, i.big_values, i);
    }
    function u(_, i) {
      var o = i.big_values, c = i.region0_count + 1, t = _.scalefac_band.l[c];
      c += i.region1_count + 1;
      var a = _.scalefac_band.l[c];
      return t > o && (t = o),
        a > o && (a = o),
        c = P(_, i.table_select[0], 0, t, i),
        c += P(_, i.table_select[1], t, a, i),
        c += P(_, i.table_select[2], a, o, i);
    }
    function n() {
      this.total = 0;
    }
    function R(_, i) {
      var o = _.internal_flags, c = o.w_ptr, t = o.h_ptr - 1;
      t == -1 && (t = S1.MAX_HEADER_BUF - 1);
      var a = o.header[t].write_timing - h;
      if (i.total = a, 0 <= a) {
        var f = 1 + t - c;
        t < c && (f = 1 + t - c + S1.MAX_HEADER_BUF),
          a -= 8 * f * o.sideinfo_len;
      }
      return _ = e.getframebits(_),
        a += _,
        i.total += _,
        i.total = i.total % 8 != 0 ? 1 + i.total / 8 : i.total / 8,
        i.total += m + 1,
        0 > a && i1.err.println(`strange error flushing buffer ... 
`),
        a;
    }
    var e = this, S = null, x = null, r = null, l = null;
    this.setModules = function (_, i, o, c) {
      S = _, x = i, r = o, l = c;
    };
    var s = null, h = 0, m = 0, p = 0;
    this.getframebits = function (_) {
      var i = _.internal_flags;
      return 8 *
        (0 |
          72e3 * (_.version + 1) * (i.bitrate_index != 0
                  ? Y.bitrate_table[_.version][i.bitrate_index]
                  : _.brate) /
                _.out_samplerate + i.padding);
    },
      this.CRC_writeheader = function (_, i) {
        var o = X(i[2] & 255, 65535);
        o = X(i[3] & 255, o);
        for (var c = 6; c < _.sideinfo_len; c++) o = X(i[c] & 255, o);
        i[4] = byte(o >> 8), i[5] = byte(o & 255);
      },
      this.flush_bitstream = function (_) {
        var i = _.internal_flags, o, c = i.l3_side;
        0 > (o = R(_, new n())) ||
          (B(_, o),
            i.ResvSize = 0,
            c.main_data_begin = 0,
            i.findReplayGain &&
            (c = S.GetTitleGain(i.rgdata),
              i.RadioGain = Math.floor(10 * c + .5) | 0),
            i.findPeakSample &&
            (i.noclipGainChange =
              Math.ceil(200 * Math.log10(i.PeakSample / 32767)) | 0,
              0 < i.noclipGainChange && (EQ(_.scale, 1) || EQ(_.scale, 0))
                ? i.noclipScale = Math.floor(32767 / i.PeakSample * 100) / 100
                : i.noclipScale = -1));
      },
      this.add_dummy_byte = function (_, i, o) {
        _ = _.internal_flags;
        for (var c; 0 < o--;) {
          c = i;
          for (var t = 8; 0 < t;) {
            p == 0 && (p = 8, m++, s[m] = 0);
            var a = Math.min(t, p);
            t -= a, p -= a, s[m] |= c >> t << p, h += a;
          }
          for (c = 0; c < S1.MAX_HEADER_BUF; ++c) _.header[c].write_timing += 8;
        }
      },
      this.format_bitstream = function (_) {
        var i = _.internal_flags, o = i.l3_side, c = this.getframebits(_);
        B(_, o.resvDrain_pre);
        var t = _.internal_flags, a, f, E = t.l3_side;
        if (
          t.header[t.h_ptr].ptr = 0,
            r0.fill(t.header[t.h_ptr].buf, 0, t.sideinfo_len, 0),
            16e3 > _.out_samplerate ? w(t, 4094, 12) : w(t, 4095, 12),
            w(t, _.version, 1),
            w(t, 1, 2),
            w(t, _.error_protection ? 0 : 1, 1),
            w(t, t.bitrate_index, 4),
            w(t, t.samplerate_index, 2),
            w(t, t.padding, 1),
            w(t, _.extension, 1),
            w(t, _.mode.ordinal(), 2),
            w(t, t.mode_ext, 2),
            w(t, _.copyright, 1),
            w(t, _.original, 1),
            w(t, _.emphasis, 2),
            _.error_protection && w(t, 0, 16),
            _.version == 1
        ) {
          for (
            w(t, E.main_data_begin, 9),
              t.channels_out == 2
                ? w(t, E.private_bits, 3)
                : w(t, E.private_bits, 5),
              f = 0;
            f < t.channels_out;
            f++
          ) for (a = 0; 4 > a; a++) w(t, E.scfsi[f][a], 1);
          for (a = 0; 2 > a; a++) {
            for (f = 0; f < t.channels_out; f++) {
              var A = E.tt[a][f];
              w(t, A.part2_3_length + A.part2_length, 12),
                w(t, A.big_values / 2, 9),
                w(t, A.global_gain, 8),
                w(t, A.scalefac_compress, 4),
                A.block_type != v.NORM_TYPE
                  ? (w(t, 1, 1),
                    w(t, A.block_type, 2),
                    w(t, A.mixed_block_flag, 1),
                    A.table_select[0] == 14 && (A.table_select[0] = 16),
                    w(t, A.table_select[0], 5),
                    A.table_select[1] == 14 && (A.table_select[1] = 16),
                    w(t, A.table_select[1], 5),
                    w(t, A.subblock_gain[0], 3),
                    w(t, A.subblock_gain[1], 3),
                    w(t, A.subblock_gain[2], 3))
                  : (w(t, 0, 1),
                    A.table_select[0] == 14 && (A.table_select[0] = 16),
                    w(t, A.table_select[0], 5),
                    A.table_select[1] == 14 && (A.table_select[1] = 16),
                    w(t, A.table_select[1], 5),
                    A.table_select[2] == 14 && (A.table_select[2] = 16),
                    w(t, A.table_select[2], 5),
                    w(t, A.region0_count, 4),
                    w(t, A.region1_count, 3)),
                w(t, A.preflag, 1),
                w(t, A.scalefac_scale, 1),
                w(t, A.count1table_select, 1);
            }
          }
        } else {for (
            w(t, E.main_data_begin, 8),
              w(t, E.private_bits, t.channels_out),
              f = a = 0;
            f < t.channels_out;
            f++
          ) {
            A = E.tt[a][f],
              w(t, A.part2_3_length + A.part2_length, 12),
              w(t, A.big_values / 2, 9),
              w(t, A.global_gain, 8),
              w(t, A.scalefac_compress, 9),
              A.block_type != v.NORM_TYPE
                ? (w(t, 1, 1),
                  w(t, A.block_type, 2),
                  w(t, A.mixed_block_flag, 1),
                  A.table_select[0] == 14 && (A.table_select[0] = 16),
                  w(t, A.table_select[0], 5),
                  A.table_select[1] == 14 && (A.table_select[1] = 16),
                  w(t, A.table_select[1], 5),
                  w(t, A.subblock_gain[0], 3),
                  w(t, A.subblock_gain[1], 3),
                  w(t, A.subblock_gain[2], 3))
                : (w(t, 0, 1),
                  A.table_select[0] == 14 && (A.table_select[0] = 16),
                  w(t, A.table_select[0], 5),
                  A.table_select[1] == 14 && (A.table_select[1] = 16),
                  w(t, A.table_select[1], 5),
                  A.table_select[2] == 14 && (A.table_select[2] = 16),
                  w(t, A.table_select[2], 5),
                  w(t, A.region0_count, 4),
                  w(t, A.region1_count, 3)),
              w(t, A.scalefac_scale, 1),
              w(t, A.count1table_select, 1);
          }}
        _.error_protection && CRC_writeheader(t, t.header[t.h_ptr].buf),
          E = t.h_ptr,
          t.h_ptr = E + 1 & S1.MAX_HEADER_BUF - 1,
          t.header[t.h_ptr].write_timing = t.header[E].write_timing + c,
          t.h_ptr == t.w_ptr &&
          i1.err.println(`Error: MAX_HEADER_BUF too small in bitstream.c 
`),
          t = 8 * i.sideinfo_len;
        var I = 0, V = _.internal_flags, H = V.l3_side;
        if (_.version == 1) {
          for (E = 0; 2 > E; E++) {
            for (f = 0; f < V.channels_out; f++) {
              var g = H.tt[E][f],
                M = E2.slen1_tab[g.scalefac_compress],
                T = E2.slen2_tab[g.scalefac_compress];
              for (a = A = 0; a < g.sfbdivide; a++) {g.scalefac[a] != -1 &&
                  (d(V, g.scalefac[a], M), A += M);}
              for (; a < g.sfbmax; a++) {g.scalefac[a] != -1 &&
                  (d(V, g.scalefac[a], T), A += T);}
              A = g.block_type == v.SHORT_TYPE ? A + D(V, g) : A + u(V, g),
                A += L(V, g),
                I += A;
            }
          }
        } else {for (f = E = 0; f < V.channels_out; f++) {
            g = H.tt[E][f];
            var b = 0;
            if (T = a = A = 0, g.block_type == v.SHORT_TYPE) {
              for (; 4 > T; T++) {
                var N = g.sfb_partition_table[T] / 3, y = g.slen[T];
                for (M = 0; M < N; M++, a++) {
                  d(V, Math.max(g.scalefac[3 * a], 0), y),
                    d(V, Math.max(g.scalefac[3 * a + 1], 0), y),
                    d(V, Math.max(g.scalefac[3 * a + 2], 0), y),
                    b += 3 * y;
                }
              }
              A += D(V, g);
            } else {
              for (; 4 > T; T++) {
                for (
                  N = g.sfb_partition_table[T], y = g.slen[T], M = 0;
                  M < N;
                  M++, a++
                ) d(V, Math.max(g.scalefac[a], 0), y), b += y;
              }
              A += u(V, g);
            }
            A += L(V, g), I += b + A;
          }}
        if (
          t += I,
            B(_, o.resvDrain_post),
            t += o.resvDrain_post,
            o.main_data_begin += (c - t) / 8,
            R(_, new n()) != i.ResvSize &&
            i1.err.println(
              "Internal buffer inconsistency. flushbits <> ResvSize",
            ),
            8 * o.main_data_begin != i.ResvSize && (i1.err.printf(
              `bit reservoir error: 
l3_side.main_data_begin: %d 
Resvoir size:             %d 
resv drain (post)         %d 
resv drain (pre)          %d 
header and sideinfo:      %d 
data bits:                %d 
total bits:               %d (remainder: %d) 
bitsperframe:             %d 
`,
              8 * o.main_data_begin,
              i.ResvSize,
              o.resvDrain_post,
              o.resvDrain_pre,
              8 * i.sideinfo_len,
              t - o.resvDrain_post - 8 * i.sideinfo_len,
              t,
              t % 8,
              c,
            ),
              i1.err.println(
                "This is a fatal error.  It has several possible causes:",
              ),
              i1.err.println(
                "90%%  LAME compiled with buggy version of gcc using advanced optimizations",
              ),
              i1.err.println(" 9%%  Your system is overclocked"),
              i1.err.println(" 1%%  bug in LAME encoding library"),
              i.ResvSize = 8 * o.main_data_begin),
            1e9 < h
        ) {
          for (_ = 0; _ < S1.MAX_HEADER_BUF; ++_) i.header[_].write_timing -= h;
          h = 0;
        }
        return 0;
      },
      this.copy_buffer = function (_, i, o, c, t) {
        var a = m + 1;
        if (0 >= a) return 0;
        if (c != 0 && a > c) return -1;
        if (
          i1.arraycopy(s, 0, i, o, a),
            m = -1,
            p = 0,
            t != 0 &&
            (c = e1(1),
              c[0] = _.nMusicCRC,
              l.updateMusicCRC(c, i, o, a),
              _.nMusicCRC = c[0],
              0 < a && (_.VBR_seek_table.nBytesWritten += a),
              _.decode_on_the_fly)
        ) {
          c = x1([2, 1152]), t = a;
          for (var f = -1, E; f != 0;) {
            if (
              f = x.hip_decode1_unclipped(_.hip, i, o, t, c[0], c[1]),
                t = 0,
                f == -1 && (f = 0),
                0 < f
            ) {
              if (_.findPeakSample) {
                for (E = 0; E < f; E++) {
                  c[0][E] > _.PeakSample
                    ? _.PeakSample = c[0][E]
                    : -c[0][E] > _.PeakSample && (_.PeakSample = -c[0][E]);
                }
                if (1 < _.channels_out) {
                  for (E = 0; E < f; E++) {
                    c[1][E] > _.PeakSample
                      ? _.PeakSample = c[1][E]
                      : -c[1][E] > _.PeakSample && (_.PeakSample = -c[1][E]);
                  }
                }
              }
              if (
                _.findReplayGain &&
                S.AnalyzeSamples(
                    _.rgdata,
                    c[0],
                    0,
                    c[1],
                    0,
                    f,
                    _.channels_out,
                  ) == a1.GAIN_ANALYSIS_ERROR
              ) return -6;
            }
          }
        }
        return a;
      },
      this.init_bit_stream_w = function (_) {
        s = new Int8Array(s1.LAME_MAXMP3BUFFER),
          _.h_ptr = _.w_ptr = 0,
          _.header[_.h_ptr].write_timing = 0,
          m = -1,
          h = p = 0;
      };
  }
  function v2() {
    function d(r, l) {
      var s = r[l + 0] & 255;
      return s = s << 8 | r[l + 1] & 255,
        s = s << 8 | r[l + 2] & 255,
        s = s << 8 | r[l + 3] & 255;
    }
    function B(r, l, s) {
      r[l + 0] = s >> 24 & 255,
        r[l + 1] = s >> 16 & 255,
        r[l + 2] = s >> 8 & 255,
        r[l + 3] = s & 255;
    }
    function w(r, l, s) {
      r[l + 0] = s >> 8 & 255, r[l + 1] = s & 255;
    }
    function X(r, l, s) {
      return 255 & (r << l | s & ~(-1 << l));
    }
    function L(r, l) {
      var s = r.internal_flags;
      l[0] = X(l[0], 8, 255),
        l[1] = X(l[1], 3, 7),
        l[1] = X(l[1], 1, 16e3 > r.out_samplerate ? 0 : 1),
        l[1] = X(l[1], 1, r.version),
        l[1] = X(l[1], 2, 1),
        l[1] = X(l[1], 1, r.error_protection ? 0 : 1),
        l[2] = X(l[2], 4, s.bitrate_index),
        l[2] = X(l[2], 2, s.samplerate_index),
        l[2] = X(l[2], 1, 0),
        l[2] = X(l[2], 1, r.extension),
        l[3] = X(l[3], 2, r.mode.ordinal()),
        l[3] = X(l[3], 2, s.mode_ext),
        l[3] = X(l[3], 1, r.copyright),
        l[3] = X(l[3], 1, r.original),
        l[3] = X(l[3], 2, r.emphasis),
        l[0] = 255,
        s = l[1] & 241;
      var h = r.version == 1 ? 128 : 16e3 > r.out_samplerate ? 32 : 64;
      r.VBR == C.vbr_off && (h = r.brate),
        h = r.free_format
          ? 0
          : 255 & 16 * D.BitrateIndex(h, r.version, r.out_samplerate),
        l[1] = r.version == 1 ? 255 & (s | 10) : 255 & (s | 2),
        s = l[2] & 13,
        l[2] = 255 & (h | s);
    }
    function P(r, l) {
      return l = l >> 8 ^ x[(l ^ r) & 255];
    }
    var D, u, n;
    this.setModules = function (r, l, s) {
      D = r, u = l, n = s;
    };
    var R = v2.NUMTOCENTRIES,
      e = v2.MAXFRAMESIZE,
      S = R + 4 + 4 + 4 + 4 + 4 + 9 + 1 + 1 + 8 + 1 + 1 + 3 + 1 + 1 + 2 + 4 +
        2 + 2,
      x = [
        0,
        49345,
        49537,
        320,
        49921,
        960,
        640,
        49729,
        50689,
        1728,
        1920,
        51009,
        1280,
        50625,
        50305,
        1088,
        52225,
        3264,
        3456,
        52545,
        3840,
        53185,
        52865,
        3648,
        2560,
        51905,
        52097,
        2880,
        51457,
        2496,
        2176,
        51265,
        55297,
        6336,
        6528,
        55617,
        6912,
        56257,
        55937,
        6720,
        7680,
        57025,
        57217,
        8e3,
        56577,
        7616,
        7296,
        56385,
        5120,
        54465,
        54657,
        5440,
        55041,
        6080,
        5760,
        54849,
        53761,
        4800,
        4992,
        54081,
        4352,
        53697,
        53377,
        4160,
        61441,
        12480,
        12672,
        61761,
        13056,
        62401,
        62081,
        12864,
        13824,
        63169,
        63361,
        14144,
        62721,
        13760,
        13440,
        62529,
        15360,
        64705,
        64897,
        15680,
        65281,
        16320,
        16e3,
        65089,
        64001,
        15040,
        15232,
        64321,
        14592,
        63937,
        63617,
        14400,
        10240,
        59585,
        59777,
        10560,
        60161,
        11200,
        10880,
        59969,
        60929,
        11968,
        12160,
        61249,
        11520,
        60865,
        60545,
        11328,
        58369,
        9408,
        9600,
        58689,
        9984,
        59329,
        59009,
        9792,
        8704,
        58049,
        58241,
        9024,
        57601,
        8640,
        8320,
        57409,
        40961,
        24768,
        24960,
        41281,
        25344,
        41921,
        41601,
        25152,
        26112,
        42689,
        42881,
        26432,
        42241,
        26048,
        25728,
        42049,
        27648,
        44225,
        44417,
        27968,
        44801,
        28608,
        28288,
        44609,
        43521,
        27328,
        27520,
        43841,
        26880,
        43457,
        43137,
        26688,
        30720,
        47297,
        47489,
        31040,
        47873,
        31680,
        31360,
        47681,
        48641,
        32448,
        32640,
        48961,
        32e3,
        48577,
        48257,
        31808,
        46081,
        29888,
        30080,
        46401,
        30464,
        47041,
        46721,
        30272,
        29184,
        45761,
        45953,
        29504,
        45313,
        29120,
        28800,
        45121,
        20480,
        37057,
        37249,
        20800,
        37633,
        21440,
        21120,
        37441,
        38401,
        22208,
        22400,
        38721,
        21760,
        38337,
        38017,
        21568,
        39937,
        23744,
        23936,
        40257,
        24320,
        40897,
        40577,
        24128,
        23040,
        39617,
        39809,
        23360,
        39169,
        22976,
        22656,
        38977,
        34817,
        18624,
        18816,
        35137,
        19200,
        35777,
        35457,
        19008,
        19968,
        36545,
        36737,
        20288,
        36097,
        19904,
        19584,
        35905,
        17408,
        33985,
        34177,
        17728,
        34561,
        18368,
        18048,
        34369,
        33281,
        17088,
        17280,
        33601,
        16640,
        33217,
        32897,
        16448,
      ];
    this.addVbrFrame = function (r) {
      var l = r.internal_flags, s = l.VBR_seek_table;
      if (
        r = Y.bitrate_table[r.version][l.bitrate_index],
          s.nVbrNumFrames++,
          s.sum += r,
          s.seen++,
          !(s.seen < s.want) &&
          (s.pos < s.size && (s.bag[s.pos] = s.sum, s.pos++, s.seen = 0),
            s.pos == s.size)
      ) {
        for (r = 1; r < s.size; r += 2) s.bag[r / 2] = s.bag[r];
        s.want *= 2, s.pos /= 2;
      }
    },
      this.getVbrTag = function (r) {
        var l = new VBRTagData(), s = 0;
        l.flags = 0;
        var h = r[s + 1] >> 3 & 1,
          m = r[s + 2] >> 2 & 3,
          p = r[s + 3] >> 6 & 3,
          _ = r[s + 2] >> 4 & 15;
        if (
          _ = Y.bitrate_table[h][_],
            l.samprate = r[s + 1] >> 4 == 14
              ? Y.samplerate_table[2][m]
              : Y.samplerate_table[h][m],
            m = s = h != 0
              ? p != 3 ? s + 36 : s + 21
              : p != 3
              ? s + 21
              : s + 13,
            !new String(r, m, 4(), null).equals("Xing") &&
            !new String(r, m, 4(), null).equals("Info")
        ) return null;
        if (
          s += 4,
            l.hId = h,
            m = l.flags = d(r, s),
            s += 4,
            m & 1 && (l.frames = d(r, s), s += 4),
            m & 2 && (l.bytes = d(r, s), s += 4),
            m & 4
        ) {
          if (l.toc != null) for (p = 0; p < R; p++) l.toc[p] = r[s + p];
          s += R;
        }
        return l.vbrScale = -1,
          m & 8 && (l.vbrScale = d(r, s), s += 4),
          l.headersize = 72e3 * (h + 1) * _ / l.samprate,
          s += 21,
          h = r[s + 0] << 4,
          h += r[s + 1] >> 4,
          _ = (r[s + 1] & 15) << 8,
          _ += r[s + 2] & 255,
          (0 > h || 3e3 < h) && (h = -1),
          (0 > _ || 3e3 < _) && (_ = -1),
          l.encDelay = h,
          l.encPadding = _,
          l;
      },
      this.InitVbrTag = function (r) {
        var l = r.internal_flags,
          s = r.version == 1 ? 128 : 16e3 > r.out_samplerate ? 32 : 64;
        r.VBR == C.vbr_off && (s = r.brate),
          s = 72e3 * (r.version + 1) * s / r.out_samplerate;
        var h = l.sideinfo_len + S;
        if (l.VBR_seek_table.TotalFrameSize = s, s < h || s > e) {r
            .bWriteVbrTag = !1;} else {for (
            l.VBR_seek_table.nVbrNumFrames = 0,
              l.VBR_seek_table.nBytesWritten = 0,
              l.VBR_seek_table.sum = 0,
              l.VBR_seek_table.seen = 0,
              l.VBR_seek_table.want = 1,
              l.VBR_seek_table.pos = 0,
              l.VBR_seek_table.bag == null &&
              (l.VBR_seek_table.bag = new int[400](),
                l.VBR_seek_table.size = 400),
              s = new Int8Array(e),
              L(r, s),
              l = l.VBR_seek_table.TotalFrameSize,
              h = 0;
            h < l;
            ++h
          ) u.add_dummy_byte(r, s[h] & 255, 1);}
      },
      this.updateMusicCRC = function (r, l, s, h) {
        for (var m = 0; m < h; ++m) r[0] = P(l[s + m], r[0]);
      },
      this.getLameTagFrame = function (r, l) {
        var s = r.internal_flags;
        if (
          !r.bWriteVbrTag || s.Class_ID != s1.LAME_ID ||
          0 >= s.VBR_seek_table.pos
        ) return 0;
        if (l.length < s.VBR_seek_table.TotalFrameSize) {return s.VBR_seek_table
            .TotalFrameSize;}
        r0.fill(l, 0, s.VBR_seek_table.TotalFrameSize, 0), L(r, l);
        var h = new Int8Array(R);
        if (r.free_format) {
          for (var m = 1; m < R; ++m) h[m] = 255 & 255 * m / 100;
        } else {
          var p = s.VBR_seek_table;
          if (!(0 >= p.pos)) {
            for (m = 1; m < R; ++m) {
              var _ = 0 | Math.floor(m / R * p.pos);
              _ > p.pos - 1 && (_ = p.pos - 1),
                _ = 0 | 256 * p.bag[_] / p.sum,
                255 < _ && (_ = 255),
                h[m] = 255 & _;
            }
          }
        }
        _ = s.sideinfo_len,
          r.error_protection && (_ -= 2),
          l[_++] = 0,
          l[_++] = 0,
          l[_++] = 0,
          l[_++] = 0,
          B(l, _, 15),
          _ += 4,
          B(l, _, s.VBR_seek_table.nVbrNumFrames),
          _ += 4,
          p = s.VBR_seek_table.nBytesWritten + s.VBR_seek_table.TotalFrameSize,
          B(l, _, 0 | p),
          _ += 4,
          i1.arraycopy(h, 0, l, _, h.length),
          _ += h.length,
          r.error_protection && u.CRC_writeheader(s, l);
        var i = 0;
        for (m = 0; m < _; m++) i = P(l[m], i);
        h = _, m = i;
        var o = r.internal_flags;
        _ = 0, i = r.encoder_delay;
        var c = r.encoder_padding,
          t = 100 - 10 * r.VBR_q - r.quality,
          a = n.getLameVeryShortVersion(),
          f = [1, 5, 3, 2, 4, 0, 3],
          E = 0 |
            (255 < r.lowpassfreq / 100 + .5 ? 255 : r.lowpassfreq / 100 + .5),
          A = 0,
          I = 0,
          V = r.internal_flags.noise_shaping,
          H = 0,
          g,
          M = (r.exp_nspsytune & 1) != 0,
          T = (r.exp_nspsytune & 2) != 0,
          b = g = !1,
          N = r.internal_flags.nogap_total,
          y = r.internal_flags.nogap_current,
          O = r.ATHtype;
        switch (r.VBR) {
          case vbr_abr:
            var Q = r.VBR_mean_bitrate_kbps;
            break;
          case vbr_off:
            Q = r.brate;
            break;
          default:
            Q = r.VBR_min_bitrate_kbps;
        }
        switch (
          f = 0 + (r.VBR.ordinal() < f.length ? f[r.VBR.ordinal()] : 0),
            o.findReplayGain &&
            (510 < o.RadioGain && (o.RadioGain = 510),
              -510 > o.RadioGain && (o.RadioGain = -510),
              I = 11264,
              I = 0 <= o.RadioGain ? I | o.RadioGain : I | 512 | -o.RadioGain),
            o.findPeakSample &&
            (A = Math.abs(0 | o.PeakSample / 32767 * Math.pow(2, 23) + .5)),
            N != -1 && (0 < y && (b = !0), y < N - 1 && (g = !0)),
            M = O + ((M ? 1 : 0) << 4) + ((T ? 1 : 0) << 5) +
              ((g ? 1 : 0) << 6) + ((b ? 1 : 0) << 7),
            0 > t && (t = 0),
            r.mode
        ) {
          case MONO:
            T = 0;
            break;
          case STEREO:
            T = 1;
            break;
          case DUAL_CHANNEL:
            T = 2;
            break;
          case JOINT_STEREO:
            T = r.force_ms ? 4 : 3;
            break;
          default:
            T = 7;
        }
        for (
          g = 32e3 >= r.in_samplerate
            ? 0
            : r.in_samplerate == 48e3
            ? 2
            : 48e3 < r.in_samplerate
            ? 3
            : 1,
            (r.short_blocks == L1.short_block_forced ||
              r.short_blocks == L1.short_block_dispensed ||
              r.lowpassfreq == -1 && r.highpassfreq == -1 ||
              r.scale_left < r.scale_right ||
              r.scale_left > r.scale_right ||
              r.disable_reservoir && 320 > r.brate || r.noATH || r.ATHonly ||
              O == 0 ||
              32e3 >= r.in_samplerate) && (H = 1),
            V = V + (T << 2) + (H << 5) + (g << 6),
            o = o.nMusicCRC,
            B(l, h + _, t),
            _ += 4,
            t = 0;
          9 > t;
          t++
        ) l[h + _ + t] = 255 & a.charAt(t);
        for (
          _ += 9,
            l[h + _] = 255 & f,
            _++,
            l[h + _] = 255 & E,
            _++,
            B(l, h + _, A),
            _ += 4,
            w(l, h + _, I),
            _ += 2,
            w(l, h + _, 0),
            _ += 2,
            l[h + _] = 255 & M,
            _++,
            l[h + _] = 255 <= Q ? 255 : 255 & Q,
            _++,
            l[h + _] = 255 & i >> 4,
            l[h + _ + 1] = 255 & (i << 4) + (c >> 8),
            l[h + _ + 2] = 255 & c,
            _ += 3,
            l[h + _] = 255 & V,
            _++,
            l[h + _++] = 0,
            w(l, h + _, r.preset),
            _ += 2,
            B(l, h + _, p),
            _ += 4,
            w(l, h + _, o),
            _ += 2,
            r = 0;
          r < _;
          r++
        ) m = P(l[h + r], m);
        return w(l, h + _, m), s.VBR_seek_table.TotalFrameSize;
      },
      this.putVbrTag = function (r, l) {
        if (
          0 >= r.internal_flags.VBR_seek_table.pos ||
          (l.seek(l.length()), l.length() == 0)
        ) return -1;
        l.seek(0);
        var s = new Int8Array(10);
        return l.readFully(s),
          s = new String(s, "ISO-8859-1").startsWith("ID3")
            ? 0
            : ((s[6] & 127) << 21 | (s[7] & 127) << 14 | (s[8] & 127) << 7 |
              s[9] & 127) + s.length,
          l.seek(s),
          s = new Int8Array(e),
          r = getLameTagFrame(r, s),
          r > s.length ? -1 : (1 > r || l.write(s, 0, r), 0);
      };
  }
  function v1(d, B, w, X) {
    this.xlen = d, this.linmax = B, this.table = w, this.hlen = X;
  }
  function J0(d) {
    this.bits = d;
  }
  function nt() {
    this.setModules = function (d, B) {};
  }
  function x2() {
    this.bits =
      this.over_SSD =
      this.over_count =
      this.max_noise =
      this.tot_noise =
      this.over_noise =
        0;
  }
  function _t() {
    this.scale_right =
      this.scale_left =
      this.scale =
      this.out_samplerate =
      this.in_samplerate =
      this.num_channels =
      this.num_samples =
      this.class_id =
        0,
      this.decode_only = this.bWriteVbrTag = this.analysis = !1,
      this.quality = 0,
      this.mode = M1.STEREO,
      this.write_id3tag_automatic =
        this.decode_on_the_fly =
        this.findReplayGain =
        this.free_format =
        this.force_ms =
          !1,
      this.error_protection =
        this.emphasis =
        this.extension =
        this.original =
        this.copyright =
        this.compression_ratio =
        this.brate =
          0,
      this.disable_reservoir = this.strict_ISO = !1,
      this.quant_comp_short = this.quant_comp = 0,
      this.experimentalY = !1,
      this.preset = this.exp_nspsytune = this.experimentalZ = 0,
      this.VBR = null,
      this.maskingadjust_short =
        this.maskingadjust =
        this.highpasswidth =
        this.lowpasswidth =
        this.highpassfreq =
        this.lowpassfreq =
        this.VBR_hard_min =
        this.VBR_max_bitrate_kbps =
        this.VBR_min_bitrate_kbps =
        this.VBR_mean_bitrate_kbps =
        this.VBR_q =
        this.VBR_q_frac =
          0,
      this.noATH = this.ATHshort = this.ATHonly = !1,
      this.athaa_sensitivity =
        this.athaa_loudapprox =
        this.athaa_type =
        this.ATHlower =
        this.ATHcurve =
        this.ATHtype =
          0,
      this.short_blocks = null,
      this.useTemporal = !1,
      this.msfix = this.interChRatio = 0,
      this.tune = !1,
      this.lame_allocated_gfp =
        this.frameNum =
        this.framesize =
        this.encoder_padding =
        this.encoder_delay =
        this.version =
        this.tune_value_a =
          0,
      this.internal_flags = null;
  }
  function rt() {
    this.linprebuf = G(2 * a1.MAX_ORDER),
      this.linpre = 0,
      this.lstepbuf = G(a1.MAX_SAMPLES_PER_WINDOW + a1.MAX_ORDER),
      this.lstep = 0,
      this.loutbuf = G(a1.MAX_SAMPLES_PER_WINDOW + a1.MAX_ORDER),
      this.lout = 0,
      this.rinprebuf = G(2 * a1.MAX_ORDER),
      this.rinpre = 0,
      this.rstepbuf = G(a1.MAX_SAMPLES_PER_WINDOW + a1.MAX_ORDER),
      this.rstep = 0,
      this.routbuf = G(a1.MAX_SAMPLES_PER_WINDOW + a1.MAX_ORDER),
      this.first =
        this.freqindex =
        this.rsum =
        this.lsum =
        this.totsamp =
        this.sampleWindow =
        this.rout =
          0,
      this.A = e1(0 | a1.STEPS_per_dB * a1.MAX_dB),
      this.B = e1(0 | a1.STEPS_per_dB * a1.MAX_dB);
  }
  function it(d) {
    this.quantize = d,
      this.iteration_loop = function (B, w, X, L) {
        var P = B.internal_flags,
          D = G(R0.SFBMAX),
          u = G(576),
          n = e1(2),
          R = P.l3_side,
          e = new J0(0);
        this.quantize.rv.ResvFrameBegin(B, e), e = e.bits;
        for (var S = 0; S < P.mode_gr; S++) {
          var x = this.quantize.qupvt.on_pe(B, w, n, e, S, S);
          for (
            P.mode_ext == v.MPG_MD_MS_LR &&
            (this.quantize.ms_convert(P.l3_side, S),
              this.quantize.qupvt.reduce_side(n, X[S], e, x)), x = 0;
            x < P.channels_out;
            x++
          ) {
            var r = R.tt[S][x];
            if (r.block_type != v.SHORT_TYPE) {
              var l = 0;
              l = P.PSY.mask_adjust - l;
            } else l = 0, l = P.PSY.mask_adjust_short - l;
            P.masking_lower = Math.pow(10, .1 * l),
              this.quantize.init_outer_loop(P, r),
              this.quantize.init_xrpow(P, r, u) &&
              (this.quantize.qupvt.calc_xmin(B, L[S][x], r, D),
                this.quantize.outer_loop(B, r, D, u, x, n[x])),
              this.quantize.iteration_finish_one(P, S, x);
          }
        }
        this.quantize.rv.ResvFrameEnd(P, e);
      };
  }
  function ot() {
    this.floor =
      this.decay =
      this.adjustLimit =
      this.adjust =
      this.aaSensitivityP =
      this.useAdjust =
        0,
      this.l = G(v.SBMAX_l),
      this.s = G(v.SBMAX_s),
      this.psfb21 = G(v.PSFB21),
      this.psfb12 = G(v.PSFB12),
      this.cb_l = G(v.CBANDS),
      this.cb_s = G(v.CBANDS),
      this.eql_w = G(v.BLKSIZE / 2);
  }
  function b0(d, B, w, X) {
    this.l = e1(1 + v.SBMAX_l),
      this.s = e1(1 + v.SBMAX_s),
      this.psfb21 = e1(1 + v.PSFB21),
      this.psfb12 = e1(1 + v.PSFB12);
    var L = this.l, P = this.s;
    arguments.length == 4 &&
      (this.arrL = arguments[0],
        this.arrS = arguments[1],
        this.arr21 = arguments[2],
        this.arr12 = arguments[3],
        i1.arraycopy(
          this.arrL,
          0,
          L,
          0,
          Math.min(this.arrL.length, this.l.length),
        ),
        i1.arraycopy(
          this.arrS,
          0,
          P,
          0,
          Math.min(this.arrS.length, this.s.length),
        ),
        i1.arraycopy(
          this.arr21,
          0,
          this.psfb21,
          0,
          Math.min(this.arr21.length, this.psfb21.length),
        ),
        i1.arraycopy(
          this.arr12,
          0,
          this.psfb12,
          0,
          Math.min(this.arr12.length, this.psfb12.length),
        ));
  }
  function U1() {
    function d(r, l) {
      return l = L.ATHformula(l, r),
        l = Math.pow(10, (l - 100) / 10 + r.ATHlower);
    }
    function B(r) {
      this.s = r;
    }
    var w = null, X = null, L = null;
    this.setModules = function (r, l, s) {
      w = r, X = l, L = s;
    },
      this.IPOW20 = function (r) {
        return e[r];
      };
    var P = U1.IXMAX_VAL + 2, D = U1.Q_MAX, u = U1.Q_MAX2;
    this.nr_of_sfb_block = [
      [[6, 5, 5, 5], [9, 9, 9, 9], [6, 9, 9, 9]],
      [[6, 5, 7, 3], [9, 9, 12, 6], [6, 9, 12, 6]],
      [[11, 10, 0, 0], [18, 18, 0, 0], [15, 18, 0, 0]],
      [[7, 7, 7, 0], [12, 12, 12, 0], [6, 15, 12, 0]],
      [[6, 6, 6, 3], [12, 9, 9, 6], [6, 12, 9, 6]],
      [[8, 8, 5, 0], [15, 12, 9, 0], [6, 18, 9, 0]],
    ];
    var n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 0];
    this.pretab = n,
      this.sfBandIndex = [
        new b0(
          [
            0,
            6,
            12,
            18,
            24,
            30,
            36,
            44,
            54,
            66,
            80,
            96,
            116,
            140,
            168,
            200,
            238,
            284,
            336,
            396,
            464,
            522,
            576,
          ],
          [0, 4, 8, 12, 18, 24, 32, 42, 56, 74, 100, 132, 174, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
        new b0(
          [
            0,
            6,
            12,
            18,
            24,
            30,
            36,
            44,
            54,
            66,
            80,
            96,
            114,
            136,
            162,
            194,
            232,
            278,
            332,
            394,
            464,
            540,
            576,
          ],
          [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
        new b0(
          [
            0,
            6,
            12,
            18,
            24,
            30,
            36,
            44,
            54,
            66,
            80,
            96,
            116,
            140,
            168,
            200,
            238,
            284,
            336,
            396,
            464,
            522,
            576,
          ],
          [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
        new b0(
          [
            0,
            4,
            8,
            12,
            16,
            20,
            24,
            30,
            36,
            44,
            52,
            62,
            74,
            90,
            110,
            134,
            162,
            196,
            238,
            288,
            342,
            418,
            576,
          ],
          [0, 4, 8, 12, 16, 22, 30, 40, 52, 66, 84, 106, 136, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
        new b0(
          [
            0,
            4,
            8,
            12,
            16,
            20,
            24,
            30,
            36,
            42,
            50,
            60,
            72,
            88,
            106,
            128,
            156,
            190,
            230,
            276,
            330,
            384,
            576,
          ],
          [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
        new b0(
          [
            0,
            4,
            8,
            12,
            16,
            20,
            24,
            30,
            36,
            44,
            54,
            66,
            82,
            102,
            126,
            156,
            194,
            240,
            296,
            364,
            448,
            550,
            576,
          ],
          [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
        new b0(
          [
            0,
            6,
            12,
            18,
            24,
            30,
            36,
            44,
            54,
            66,
            80,
            96,
            116,
            140,
            168,
            200,
            238,
            284,
            336,
            396,
            464,
            522,
            576,
          ],
          [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
        new b0(
          [
            0,
            6,
            12,
            18,
            24,
            30,
            36,
            44,
            54,
            66,
            80,
            96,
            116,
            140,
            168,
            200,
            238,
            284,
            336,
            396,
            464,
            522,
            576,
          ],
          [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
        new b0(
          [
            0,
            12,
            24,
            36,
            48,
            60,
            72,
            88,
            108,
            132,
            160,
            192,
            232,
            280,
            336,
            400,
            476,
            566,
            568,
            570,
            572,
            574,
            576,
          ],
          [0, 8, 16, 24, 36, 52, 72, 96, 124, 160, 162, 164, 166, 192],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ),
      ];
    var R = G(D + u + 1), e = G(D), S = G(P), x = G(P);
    this.adj43 = x,
      this.iteration_init = function (r) {
        var l = r.internal_flags, s = l.l3_side;
        if (l.iteration_init_init == 0) {
          l.iteration_init_init = 1,
            s.main_data_begin = 0,
            s = r.internal_flags.ATH.l;
          for (
            var h = r.internal_flags.ATH.psfb21,
              m = r.internal_flags.ATH.s,
              p = r.internal_flags.ATH.psfb12,
              _ = r.internal_flags,
              i = r.out_samplerate,
              o = 0;
            o < v.SBMAX_l;
            o++
          ) {
            var c = _.scalefac_band.l[o], t = _.scalefac_band.l[o + 1];
            for (s[o] = o2.MAX_VALUE; c < t; c++) {
              var a = c * i / 1152;
              a = d(r, a), s[o] = Math.min(s[o], a);
            }
          }
          for (o = 0; o < v.PSFB21; o++) {
            for (
              c = _.scalefac_band.psfb21[o],
                t = _.scalefac_band.psfb21[o + 1],
                h[o] = o2.MAX_VALUE;
              c < t;
              c++
            ) {
              a = c * i / 1152, a = d(r, a), h[o] = Math.min(h[o], a);
            }
          }
          for (o = 0; o < v.SBMAX_s; o++) {
            for (
              c = _.scalefac_band.s[o],
                t = _.scalefac_band.s[o + 1],
                m[o] = o2.MAX_VALUE;
              c < t;
              c++
            ) {
              a = c * i / 384, a = d(r, a), m[o] = Math.min(m[o], a);
            }
            m[o] *= _.scalefac_band.s[o + 1] - _.scalefac_band.s[o];
          }
          for (o = 0; o < v.PSFB12; o++) {
            for (
              c = _.scalefac_band.psfb12[o],
                t = _.scalefac_band.psfb12[o + 1],
                p[o] = o2.MAX_VALUE;
              c < t;
              c++
            ) {
              a = c * i / 384, a = d(r, a), p[o] = Math.min(p[o], a);
            }
            p[o] *= _.scalefac_band.s[13] - _.scalefac_band.s[12];
          }
          if (r.noATH) {
            for (o = 0; o < v.SBMAX_l; o++) s[o] = 1e-20;
            for (o = 0; o < v.PSFB21; o++) h[o] = 1e-20;
            for (o = 0; o < v.SBMAX_s; o++) m[o] = 1e-20;
            for (o = 0; o < v.PSFB12; o++) p[o] = 1e-20;
          }
          for (
            _.ATH.floor = 10 * Math.log10(d(r, -1)), S[0] = 0, s = 1;
            s < P;
            s++
          ) S[s] = Math.pow(s, 4 / 3);
          for (s = 0; s < P - 1; s++) {
            x[s] = s + 1 -
              Math.pow(.5 * (S[s] + S[s + 1]), .75);
          }
          for (x[s] = .5, s = 0; s < D; s++) {
            e[s] = Math.pow(2, -.1875 * (s - 210));
          }
          for (s = 0; s <= D + u; s++) R[s] = Math.pow(2, .25 * (s - 210 - u));
          for (
            w.huffman_init(l),
              s = r.exp_nspsytune >> 2 & 63,
              32 <= s && (s -= 64),
              h = Math.pow(10, s / 4 / 10),
              s = r.exp_nspsytune >> 8 & 63,
              32 <= s && (s -= 64),
              m = Math.pow(10, s / 4 / 10),
              s = r.exp_nspsytune >> 14 & 63,
              32 <= s && (s -= 64),
              p = Math.pow(10, s / 4 / 10),
              s = r.exp_nspsytune >> 20 & 63,
              32 <= s && (s -= 64),
              r = p * Math.pow(10, s / 4 / 10),
              s = 0;
            s < v.SBMAX_l;
            s++
          ) {
            _ = 6 >= s ? h : 13 >= s ? m : 20 >= s ? p : r,
              l.nsPsy.longfact[s] = _;
          }
          for (s = 0; s < v.SBMAX_s; s++) {
            _ = 5 >= s ? h : 10 >= s ? m : 11 >= s ? p : r,
              l.nsPsy.shortfact[s] = _;
          }
        }
      },
      this.on_pe = function (r, l, s, h, m, p) {
        var _ = r.internal_flags, i = 0, o = e1(2), c;
        i = new J0(i), r = X.ResvMaxBits(r, h, i, p), i = i.bits;
        var t = i + r;
        for (
          t > S1.MAX_BITS_PER_GRANULE && (t = S1.MAX_BITS_PER_GRANULE),
            c = p = 0;
          c < _.channels_out;
          ++c
        ) {
          s[c] = Math.min(S1.MAX_BITS_PER_CHANNEL, i / _.channels_out),
            o[c] = 0 | s[c] * l[m][c] / 700 - s[c],
            o[c] > 3 * h / 4 && (o[c] = 3 * h / 4),
            0 > o[c] && (o[c] = 0),
            o[c] + s[c] > S1.MAX_BITS_PER_CHANNEL &&
            (o[c] = Math.max(0, S1.MAX_BITS_PER_CHANNEL - s[c])),
            p += o[c];
        }
        if (p > r) for (c = 0; c < _.channels_out; ++c) o[c] = r * o[c] / p;
        for (c = 0; c < _.channels_out; ++c) s[c] += o[c], r -= o[c];
        for (c = p = 0; c < _.channels_out; ++c) p += s[c];
        if (p > S1.MAX_BITS_PER_GRANULE) {
          for (c = 0; c < _.channels_out; ++c) {s[c] *= S1.MAX_BITS_PER_GRANULE,
              s[c] /= p;}
        }
        return t;
      },
      this.reduce_side = function (r, l, s, h) {
        l = .33 * (.5 - l) / .5,
          0 > l && (l = 0),
          .5 < l && (l = .5),
          l = 0 | .5 * l * (r[0] + r[1]),
          l > S1.MAX_BITS_PER_CHANNEL - r[0] &&
          (l = S1.MAX_BITS_PER_CHANNEL - r[0]),
          0 > l && (l = 0),
          125 <= r[1] && (125 < r[1] - l
            ? (r[0] < s && (r[0] += l), r[1] -= l)
            : (r[0] += r[1] - 125, r[1] = 125)),
          l = r[0] + r[1],
          l > h && (r[0] = h * r[0] / l, r[1] = h * r[1] / l);
      },
      this.athAdjust = function (r, l, s) {
        l = r1.FAST_LOG10_X(l, 10), r *= r;
        var h = 0;
        return l -= s,
          1e-20 < r && (h = 1 + r1.FAST_LOG10_X(r, 10 / 90.30873362)),
          0 > h && (h = 0),
          Math.pow(10, .1 * (l * h + (s + 90.30873362 - 94.82444863)));
      },
      this.calc_xmin = function (r, l, s, h) {
        var m = 0,
          p = r.internal_flags,
          _,
          i = 0,
          o = 0,
          c = p.ATH,
          t = s.xr,
          a = r.VBR == C.vbr_mtrh ? 1 : 0,
          f = p.masking_lower;
        for (
          (r.VBR == C.vbr_mtrh || r.VBR == C.vbr_mt) && (f = 1), _ = 0;
          _ < s.psy_lmax;
          _++
        ) {
          var E = r.VBR == C.vbr_rh || r.VBR == C.vbr_mtrh
              ? athAdjust(c.adjust, c.l[_], c.floor)
              : c.adjust * c.l[_],
            A = s.width[_],
            I = E / A,
            V = 2220446049250313e-31,
            H = A >> 1,
            g = 0;
          do {
            var M = t[i] * t[i];
            g += M,
              V += M < I ? M : I,
              i++,
              M = t[i] * t[i],
              g += M,
              V += M < I ? M : I,
              i++;
          } while (0 < --H);
          g > E && o++,
            _ == v.SBPSY_l && (I = E * p.nsPsy.longfact[_], V < I && (V = I)),
            a != 0 && (E = V),
            r.ATHonly ||
            (V = l.en.l[_],
              0 < V &&
              (I = g * l.thm.l[_] * f / V,
                a != 0 && (I *= p.nsPsy.longfact[_]),
                E < I && (E = I))),
            a != 0 ? h[m++] = E : h[m++] = E * p.nsPsy.longfact[_];
        }
        if (g = 575, s.block_type != v.SHORT_TYPE) {for (
            E = 576;
            E-- != 0 && H1.EQ(t[E], 0);
          ) g = E;}
        s.max_nonzero_coeff = g;
        for (var T = s.sfb_smin; _ < s.psymax; T++, _ += 3) {
          var b,
            N = r.VBR == C.vbr_rh || r.VBR == C.vbr_mtrh
              ? athAdjust(c.adjust, c.s[T], c.floor)
              : c.adjust * c.s[T];
          for (A = s.width[_], b = 0; 3 > b; b++) {
            g = 0, H = A >> 1, I = N / A, V = 2220446049250313e-31;
            do M = t[i] * t[i],
              g += M,
              V += M < I ? M : I,
              i++,
              M = t[i] * t[i],
              g += M,
              V += M < I ? M : I,
              i++; while (0 < --H);
            g > N && o++,
              T == v.SBPSY_s &&
              (I = N * p.nsPsy.shortfact[T], V < I && (V = I)),
              E = a != 0 ? V : N,
              r.ATHonly || r.ATHshort ||
              (V = l.en.s[T][b],
                0 < V &&
                (I = g * l.thm.s[T][b] * f / V,
                  a != 0 && (I *= p.nsPsy.shortfact[T]),
                  E < I && (E = I))),
              a != 0 ? h[m++] = E : h[m++] = E * p.nsPsy.shortfact[T];
          }
          r.useTemporal &&
            (h[m - 3] > h[m - 3 + 1] &&
              (h[m - 3 + 1] += (h[m - 3] - h[m - 3 + 1]) * p.decay),
              h[m - 3 + 1] > h[m - 3 + 2] &&
              (h[m - 3 + 2] += (h[m - 3 + 1] - h[m - 3 + 2]) * p.decay));
        }
        return o;
      },
      this.calc_noise_core = function (r, l, s, h) {
        var m = 0, p = l.s, _ = r.l3_enc;
        if (p > r.count1) {
          for (; s-- != 0;) {
            var i = r.xr[p];
            p++, m += i * i, i = r.xr[p], p++, m += i * i;
          }
        } else if (p > r.big_values) {
          var o = G(2);
          for (o[0] = 0, o[1] = h; s-- != 0;) {
            i = Math.abs(r.xr[p]) - o[_[p]],
              p++,
              m += i * i,
              i = Math.abs(r.xr[p]) - o[_[p]],
              p++,
              m += i * i;
          }
        } else {for (; s-- != 0;) {
            i = Math.abs(r.xr[p]) - S[_[p]] * h,
              p++,
              m += i * i,
              i = Math.abs(r.xr[p]) - S[_[p]] * h,
              p++,
              m += i * i;
          }}
        return l.s = p, m;
      },
      this.calc_noise = function (r, l, s, h, m) {
        var p = 0,
          _ = 0,
          i,
          o = 0,
          c = 0,
          t = 0,
          a = -20,
          f = 0,
          E = r.scalefac,
          A = 0;
        for (i = h.over_SSD = 0; i < r.psymax; i++) {
          var I = r.global_gain -
            (E[A++] + (r.preflag != 0 ? n[i] : 0) << r.scalefac_scale + 1) -
            8 * r.subblock_gain[r.window[i]];
          if (m != null && m.step[i] == I) {
            var V = m.noise[i];
            f += r.width[i], s[p++] = V / l[_++], V = m.noise_log[i];
          } else {
            V = R[I + U1.Q_MAX2];
            var H = r.width[i] >> 1;
            f + r.width[i] > r.max_nonzero_coeff &&
            (H = r.max_nonzero_coeff - f + 1, H = 0 < H ? H >> 1 : 0),
              f = new B(f),
              V = this.calc_noise_core(r, f, H, V),
              f = f.s,
              m != null && (m.step[i] = I, m.noise[i] = V),
              V = s[p++] = V / l[_++],
              V = r1.FAST_LOG10(Math.max(V, 1e-20)),
              m != null && (m.noise_log[i] = V);
          }
          m != null && (m.global_gain = r.global_gain),
            t += V,
            0 < V &&
            (I = Math.max(0 | 10 * V + .5, 1),
              h.over_SSD += I * I,
              o++,
              c += V),
            a = Math.max(a, V);
        }
        return h.over_count = o,
          h.tot_noise = t,
          h.over_noise = c,
          h.max_noise = a,
          o;
      },
      this.set_pinfo = function (r, l, s, h, m) {
        var p = r.internal_flags,
          _,
          i,
          o = l.scalefac_scale == 0 ? .5 : 1,
          c = l.scalefac,
          t = G(R0.SFBMAX),
          a = G(R0.SFBMAX),
          f = new x2();
        calc_xmin(r, s, l, t), calc_noise(l, t, a, f, null);
        var E = 0, A = l.sfb_lmax;
        for (
          l.block_type != v.SHORT_TYPE && l.mixed_block_flag == 0 && (A = 22),
            _ = 0;
          _ < A;
          _++
        ) {
          var I = p.scalefac_band.l[_], V = p.scalefac_band.l[_ + 1], H = V - I;
          for (i = 0; E < V; E++) i += l.xr[E] * l.xr[E];
          i /= H;
          var g = 1e15;
          p.pinfo.en[h][m][_] = g * i,
            p.pinfo.xfsf[h][m][_] = g * t[_] * a[_] / H,
            i = 0 < s.en.l[_] && !r.ATHonly ? i / s.en.l[_] : 0,
            p.pinfo.thr[h][m][_] = g * Math.max(i * s.thm.l[_], p.ATH.l[_]),
            p.pinfo.LAMEsfb[h][m][_] = 0,
            l.preflag != 0 && 11 <= _ && (p.pinfo.LAMEsfb[h][m][_] = -o * n[_]),
            _ < v.SBPSY_l && (p.pinfo.LAMEsfb[h][m][_] -= o * c[_]);
        }
        if (l.block_type == v.SHORT_TYPE) {
          for (A = _, _ = l.sfb_smin; _ < v.SBMAX_s; _++) {
            I = p.scalefac_band.s[_], V = p.scalefac_band.s[_ + 1], H = V - I;
            for (var M = 0; 3 > M; M++) {
              for (i = 0, g = I; g < V; g++) i += l.xr[E] * l.xr[E], E++;
              i = Math.max(i / H, 1e-20),
                g = 1e15,
                p.pinfo.en_s[h][m][3 * _ + M] = g * i,
                p.pinfo.xfsf_s[h][m][3 * _ + M] = g * t[A] * a[A] / H,
                i = 0 < s.en.s[_][M] ? i / s.en.s[_][M] : 0,
                (r.ATHonly || r.ATHshort) && (i = 0),
                p.pinfo.thr_s[h][m][3 * _ + M] = g *
                  Math.max(i * s.thm.s[_][M], p.ATH.s[_]),
                p.pinfo.LAMEsfb_s[h][m][3 * _ + M] = -2 * l.subblock_gain[M],
                _ < v.SBPSY_s &&
                (p.pinfo.LAMEsfb_s[h][m][3 * _ + M] -= o * c[A]),
                A++;
            }
          }
        }
        p.pinfo.LAMEqss[h][m] = l.global_gain,
          p.pinfo.LAMEmainbits[h][m] = l.part2_3_length + l.part2_length,
          p.pinfo.LAMEsfbits[h][m] = l.part2_length,
          p.pinfo.over[h][m] = f.over_count,
          p.pinfo.max_noise[h][m] = 10 * f.max_noise,
          p.pinfo.over_noise[h][m] = 10 * f.over_noise,
          p.pinfo.tot_noise[h][m] = 10 * f.tot_noise,
          p.pinfo.over_SSD[h][m] = f.over_SSD;
      };
  }
  function lt() {
    this.sfb_count1 = this.global_gain = 0,
      this.step = e1(39),
      this.noise = G(39),
      this.noise_log = G(39);
  }
  function y2() {
    this.xr = G(576),
      this.l3_enc = e1(576),
      this.scalefac = e1(R0.SFBMAX),
      this.mixed_block_flag =
        this.block_type =
        this.scalefac_compress =
        this.global_gain =
        this.count1 =
        this.big_values =
        this.part2_3_length =
        this.xrpow_max =
          0,
      this.table_select = e1(3),
      this.subblock_gain = e1(4),
      this.sfbdivide =
        this.psymax =
        this.sfbmax =
        this.psy_lmax =
        this.sfb_smin =
        this.sfb_lmax =
        this.part2_length =
        this.count1table_select =
        this.scalefac_scale =
        this.preflag =
        this.region1_count =
        this.region0_count =
          0,
      this.width = e1(R0.SFBMAX),
      this.window = e1(R0.SFBMAX),
      this.count1bits = 0,
      this.sfb_partition_table = null,
      this.slen = e1(4),
      this.max_nonzero_coeff = 0;
    var d = this;
    this.assign = function (B) {
      d.xr = new Float32Array(B.xr),
        d.l3_enc = new Int32Array(B.l3_enc),
        d.scalefac = new Int32Array(B.scalefac),
        d.xrpow_max = B.xrpow_max,
        d.part2_3_length = B.part2_3_length,
        d.big_values = B.big_values,
        d.count1 = B.count1,
        d.global_gain = B.global_gain,
        d.scalefac_compress = B.scalefac_compress,
        d.block_type = B.block_type,
        d.mixed_block_flag = B.mixed_block_flag,
        d.table_select = new Int32Array(B.table_select),
        d.subblock_gain = new Int32Array(B.subblock_gain),
        d.region0_count = B.region0_count,
        d.region1_count = B.region1_count,
        d.preflag = B.preflag,
        d.scalefac_scale = B.scalefac_scale,
        d.count1table_select = B.count1table_select,
        d.part2_length = B.part2_length,
        d.sfb_lmax = B.sfb_lmax,
        d.sfb_smin = B.sfb_smin,
        d.psy_lmax = B.psy_lmax,
        d.sfbmax = B.sfbmax,
        d.psymax = B.psymax,
        d.sfbdivide = B.sfbdivide,
        d.width = new Int32Array(B.width),
        d.window = new Int32Array(B.window),
        d.count1bits = B.count1bits,
        d.sfb_partition_table = B.sfb_partition_table.slice(0),
        d.slen = new Int32Array(B.slen),
        d.max_nonzero_coeff = B.max_nonzero_coeff;
    };
  }
  function at() {
    function d(u) {
      this.ordinal = u;
    }
    function B(u) {
      for (var n = 0; n < u.sfbmax; n++) {
        if (u.scalefac[n] + u.subblock_gain[u.window[n]] == 0) return !1;
      }
      return !0;
    }
    var w;
    this.rv = null;
    var X;
    this.qupvt = null;
    var L, P = new nt(), D;
    this.setModules = function (u, n, R, e) {
      w = u, this.rv = X = n, this.qupvt = L = R, D = e, P.setModules(L, D);
    },
      this.ms_convert = function (u, n) {
        for (var R = 0; 576 > R; ++R) {
          var e = u.tt[n][0].xr[R], S = u.tt[n][1].xr[R];
          u.tt[n][0].xr[R] = .5 * (e + S) * r1.SQRT2,
            u.tt[n][1].xr[R] = .5 * (e - S) * r1.SQRT2;
        }
      },
      this.init_xrpow = function (u, n, R) {
        var e = 0 | n.max_nonzero_coeff;
        n.xrpow_max = 0, r0.fill(R, e, 576, 0);
        for (var S, x = S = 0; x <= e; ++x) {
          var r = Math.abs(n.xr[x]);
          S += r,
            R[x] = Math.sqrt(r * Math.sqrt(r)),
            R[x] > n.xrpow_max && (n.xrpow_max = R[x]);
        }
        if (1e-20 < S) {
          for (
            R = 0, u.substep_shaping & 2 && (R = 1), e = 0;
            e < n.psymax;
            e++
          ) u.pseudohalf[e] = R;
          return !0;
        }
        return r0.fill(n.l3_enc, 0, 576, 0), !1;
      },
      this.init_outer_loop = function (u, n) {
        n.part2_3_length = 0,
          n.big_values = 0,
          n.count1 = 0,
          n.global_gain = 210,
          n.scalefac_compress = 0,
          n.table_select[0] = 0,
          n.table_select[1] = 0,
          n.table_select[2] = 0,
          n.subblock_gain[0] = 0,
          n.subblock_gain[1] = 0,
          n.subblock_gain[2] = 0,
          n.subblock_gain[3] = 0,
          n.region0_count = 0,
          n.region1_count = 0,
          n.preflag = 0,
          n.scalefac_scale = 0,
          n.count1table_select = 0,
          n.part2_length = 0,
          n.sfb_lmax = v.SBPSY_l,
          n.sfb_smin = v.SBPSY_s,
          n.psy_lmax = u.sfb21_extra ? v.SBMAX_l : v.SBPSY_l,
          n.psymax = n.psy_lmax,
          n.sfbmax = n.sfb_lmax,
          n.sfbdivide = 11;
        for (var R = 0; R < v.SBMAX_l; R++) {
          n.width[R] = u.scalefac_band.l[R + 1] - u.scalefac_band.l[R],
            n.window[R] = 3;
        }
        if (n.block_type == v.SHORT_TYPE) {
          var e = G(576);
          n.sfb_smin = 0,
            n.sfb_lmax = 0,
            n.mixed_block_flag != 0 &&
            (n.sfb_smin = 3, n.sfb_lmax = 2 * u.mode_gr + 4),
            n.psymax = n.sfb_lmax +
              3 * ((u.sfb21_extra ? v.SBMAX_s : v.SBPSY_s) - n.sfb_smin),
            n.sfbmax = n.sfb_lmax + 3 * (v.SBPSY_s - n.sfb_smin),
            n.sfbdivide = n.sfbmax - 18,
            n.psy_lmax = n.sfb_lmax;
          var S = u.scalefac_band.l[n.sfb_lmax];
          for (
            i1.arraycopy(n.xr, 0, e, 0, 576), R = n.sfb_smin;
            R < v.SBMAX_s;
            R++
          ) {
            for (
              var x = u.scalefac_band.s[R], r = u.scalefac_band.s[R + 1], l = 0;
              3 > l;
              l++
            ) {
              for (var s = x; s < r; s++) n.xr[S++] = e[3 * s + l];
            }
          }
          for (e = n.sfb_lmax, R = n.sfb_smin; R < v.SBMAX_s; R++) {
            n.width[e] =
              n.width[e + 1] =
              n.width[e + 2] =
                u.scalefac_band.s[R + 1] - u.scalefac_band.s[R],
              n.window[e] = 0,
              n.window[e + 1] = 1,
              n.window[e + 2] = 2,
              e += 3;
          }
        }
        if (
          n.count1bits = 0,
            n.sfb_partition_table = L.nr_of_sfb_block[0][0],
            n.slen[0] = 0,
            n.slen[1] = 0,
            n.slen[2] = 0,
            n.slen[3] = 0,
            n.max_nonzero_coeff = 575,
            r0.fill(n.scalefac, 0),
            R = u.ATH,
            e = n.xr,
            n.block_type != v.SHORT_TYPE
        ) {
          for (n = !1, S = v.PSFB21 - 1; 0 <= S && !n; S--) {
            for (
              x = u.scalefac_band.psfb21[S],
                r = u.scalefac_band.psfb21[S + 1],
                l = L.athAdjust(R.adjust, R.psfb21[S], R.floor),
                1e-12 < u.nsPsy.longfact[21] && (l *= u.nsPsy.longfact[21]),
                --r;
              r >= x;
              r--
            ) {
              if (Math.abs(e[r]) < l) e[r] = 0;
              else {
                n = !0;
                break;
              }
            }
          }
        } else {for (l = 0; 3 > l; l++) {
            for (n = !1, S = v.PSFB12 - 1; 0 <= S && !n; S--) {
              for (
                x = 3 * u.scalefac_band.s[12] +
                  (u.scalefac_band.s[13] - u.scalefac_band.s[12]) * l +
                  (u.scalefac_band.psfb12[S] - u.scalefac_band.psfb12[0]),
                  r = x +
                    (u.scalefac_band.psfb12[S + 1] - u.scalefac_band.psfb12[S]),
                  s = L.athAdjust(R.adjust, R.psfb12[S], R.floor),
                  1e-12 < u.nsPsy.shortfact[12] && (s *= u.nsPsy.shortfact[12]),
                  --r;
                r >= x;
                r--
              ) {
                if (Math.abs(e[r]) < s) e[r] = 0;
                else {
                  n = !0;
                  break;
                }
              }
            }
          }}
      },
      d.BINSEARCH_NONE = new d(0),
      d.BINSEARCH_UP = new d(1),
      d.BINSEARCH_DOWN = new d(2),
      this.trancate_smallspectrums = function (u, n, R, e) {
        var S = G(R0.SFBMAX);
        if (
          (u.substep_shaping & 4 || n.block_type != v.SHORT_TYPE) &&
          !(u.substep_shaping & 128)
        ) {
          L.calc_noise(n, R, S, new x2(), null);
          for (var x = 0; 576 > x; x++) {
            var r = 0;
            n.l3_enc[x] != 0 && (r = Math.abs(n.xr[x])), e[x] = r;
          }
          x = 0, r = 8, n.block_type == v.SHORT_TYPE && (r = 6);
          do {
            var l, s, h = n.width[r];
            if (
              x += h, !(1 <= S[r] || (r0.sort(e, x - h, h), H1.EQ(e[x - 1], 0)))
            ) {
              var m = (1 - S[r]) * R[r], p = l = 0;
              do {
                for (
                  s = 1;
                  p + s < h && !H1.NEQ(e[p + x - h], e[p + x + s - h]);
                  s++
                );
                var _ = e[p + x - h] * e[p + x - h] * s;
                if (m < _) {
                  p != 0 && (l = e[p + x - h - 1]);
                  break;
                }
                m -= _, p += s;
              } while (p < h);
              if (!H1.EQ(l, 0)) {do Math.abs(n.xr[x - h]) <= l &&
                  (n.l3_enc[x - h] = 0); while (0 < --h);}
            }
          } while (++r < n.psymax);
          n.part2_3_length = D.noquant_count_bits(u, n, null);
        }
      },
      this.outer_loop = function (u, n, R, e, S, x) {
        var r = u.internal_flags,
          l = new y2(),
          s = G(576),
          h = G(R0.SFBMAX),
          m = new x2(),
          p = new lt(),
          _ = 9999999,
          i = !1,
          o = !1,
          c = 0,
          t,
          a = r.CurrentStep[S],
          f = !1,
          E = r.OldValue[S],
          A = d.BINSEARCH_NONE;
        for (n.global_gain = E, t = x - n.part2_length;;) {
          var I = D.count_bits(r, e, n, null);
          if (a == 1 || I == t) break;
          I > t
            ? (A == d.BINSEARCH_DOWN && (f = !0),
              f && (a /= 2),
              A = d.BINSEARCH_UP,
              I = a)
            : (A == d.BINSEARCH_UP && (f = !0),
              f && (a /= 2),
              A = d.BINSEARCH_DOWN,
              I = -a),
            n.global_gain += I,
            0 > n.global_gain && (n.global_gain = 0, f = !0),
            255 < n.global_gain && (n.global_gain = 255, f = !0);
        }
        for (; I > t && 255 > n.global_gain;) {n.global_gain++,
            I = D.count_bits(r, e, n, null);}
        if (
          r.CurrentStep[S] = 4 <= E - n.global_gain ? 4 : 2,
            r.OldValue[S] = n.global_gain,
            n.part2_3_length = I,
            r.noise_shaping == 0
        ) return 100;
        for (
          L.calc_noise(n, R, h, m, p),
            m.bits = n.part2_3_length,
            l.assign(n),
            S = 0,
            i1.arraycopy(e, 0, s, 0, 576);
          !i;
        ) {
          do {
            if (
              t = new x2(),
                f = 255,
                a = r.substep_shaping & 2 ? 20 : 3,
                r.sfb21_extra &&
                (1 < h[l.sfbmax] ||
                  l.block_type == v.SHORT_TYPE &&
                    (1 < h[l.sfbmax + 1] || 1 < h[l.sfbmax + 2]))
            ) break;
            E = l, I = e, A = u.internal_flags;
            for (
              var V = E,
                H = h,
                g = I,
                M = u.internal_flags,
                T = V.scalefac_scale == 0
                  ? 1.2968395546510096
                  : 1.6817928305074292,
                b = 0,
                N = 0;
              N < V.sfbmax;
              N++
            ) b < H[N] && (b = H[N]);
            switch (N = M.noise_shaping_amp, N == 3 && (N = o ? 2 : 1), N) {
              case 2:
                break;
              case 1:
                b = 1 < b ? Math.pow(b, .5) : .95 * b;
                break;
              default:
                b = 1 < b ? 1 : .95 * b;
            }
            var y = 0;
            for (N = 0; N < V.sfbmax; N++) {
              var O = V.width[N];
              if (y += O, !(H[N] < b)) {
                if (
                  M.substep_shaping & 2 &&
                  (M.pseudohalf[N] = M.pseudohalf[N] == 0 ? 1 : 0,
                    M.pseudohalf[N] == 0 && M.noise_shaping_amp == 2)
                ) break;
                for (V.scalefac[N]++, O = -O; 0 > O; O++) {
                  g[y + O] *= T,
                    g[y + O] > V.xrpow_max && (V.xrpow_max = g[y + O]);
                }
                if (M.noise_shaping_amp == 2) break;
              }
            }
            if (T = B(E)) E = !1;
            else if (
              T = A.mode_gr == 2
                ? D.scale_bitcount(E)
                : D.scale_bitcount_lsf(A, E)
            ) {
              if (1 < A.noise_shaping) {
                if (r0.fill(A.pseudohalf, 0), E.scalefac_scale == 0) {
                  for (T = E, H = V = 0; H < T.sfbmax; H++) {
                    if (
                      M = T.width[H],
                        g = T.scalefac[H],
                        T.preflag != 0 && (g += L.pretab[H]),
                        V += M,
                        g & 1
                    ) {
                      for (g++, M = -M; 0 > M; M++) {
                        I[V + M] *= 1.2968395546510096,
                          I[V + M] > T.xrpow_max && (T.xrpow_max = I[V + M]);
                      }
                    }
                    T.scalefac[H] = g >> 1;
                  }
                  T.preflag = 0, T.scalefac_scale = 1, T = !1;
                } else if (
                  E.block_type == v.SHORT_TYPE && 0 < A.subblock_gain
                ) {
                  t: {
                    for (
                      T = A, V = E, H = I, g = V.scalefac, I = 0;
                      I < V.sfb_lmax;
                      I++
                    ) {
                      if (16 <= g[I]) {
                        I = !0;
                        break t;
                      }
                    }
                    for (M = 0; 3 > M; M++) {
                      for (
                        N = b = 0, I = V.sfb_lmax + M;
                        I < V.sfbdivide;
                        I += 3
                      ) b < g[I] && (b = g[I]);
                      for (; I < V.sfbmax; I += 3) N < g[I] && (N = g[I]);
                      if (!(16 > b && 8 > N)) {
                        if (7 <= V.subblock_gain[M]) {
                          I = !0;
                          break t;
                        }
                        for (
                          V.subblock_gain[M]++,
                            b = T.scalefac_band.l[V.sfb_lmax],
                            I = V.sfb_lmax + M;
                          I < V.sfbmax;
                          I += 3
                        ) {
                          if (
                            N = V.width[I],
                              y = g[I],
                              y -= 4 >> V.scalefac_scale,
                              0 <= y
                          ) g[I] = y, b += 3 * N;
                          else {
                            for (
                              g[I] = 0,
                                y = L.IPOW20(210 + (y << V.scalefac_scale + 1)),
                                b += N * (M + 1),
                                O = -N;
                              0 > O;
                              O++
                            ) {
                              H[b + O] *= y,
                                H[b + O] > V.xrpow_max &&
                                (V.xrpow_max = H[b + O]);
                            }
                            b += N * (3 - M - 1);
                          }
                        }
                        for (
                          y = L.IPOW20(202),
                            b += V.width[I] * (M + 1),
                            O = -V.width[I];
                          0 > O;
                          O++
                        ) {
                          H[b + O] *= y,
                            H[b + O] > V.xrpow_max && (V.xrpow_max = H[b + O]);
                        }
                      }
                    }
                    I = !1;
                  }
                  T = I || B(E);
                }
              }
              T || (T = A.mode_gr == 2
                ? D.scale_bitcount(E)
                : D.scale_bitcount_lsf(A, E)), E = !T;
            } else E = !0;
            if (
              !E ||
              (l.scalefac_scale != 0 && (f = 254),
                E = x - l.part2_length,
                0 >= E)
            ) break;
            for (
              ;
              (l.part2_3_length = D.count_bits(r, e, l, p)) > E &&
              l.global_gain <= f;
            ) l.global_gain++;
            if (l.global_gain > f) break;
            if (m.over_count == 0) {
              for (
                ;
                (l.part2_3_length = D.count_bits(r, e, l, p)) > _ &&
                l.global_gain <= f;
              ) l.global_gain++;
              if (l.global_gain > f) break;
            }
            switch (
              L.calc_noise(l, R, h, t, p),
                t.bits = l.part2_3_length,
                A = n.block_type != v.SHORT_TYPE
                  ? u.quant_comp
                  : u.quant_comp_short,
                f = m,
                E = t,
                T = l,
                I = h,
                A
            ) {
              default:
              case 9:
                0 < f.over_count
                  ? (A = E.over_SSD <= f.over_SSD,
                    E.over_SSD == f.over_SSD && (A = E.bits < f.bits))
                  : A = 0 > E.max_noise &&
                    10 * E.max_noise + E.bits <= 10 * f.max_noise + f.bits;
                break;
              case 0:
                A = E.over_count < f.over_count ||
                  E.over_count == f.over_count && E.over_noise < f.over_noise ||
                  E.over_count == f.over_count &&
                    H1.EQ(E.over_noise, f.over_noise) &&
                    E.tot_noise < f.tot_noise;
                break;
              case 8:
                for (A = E, H = 1e-37, V = 0; V < T.psymax; V++) {
                  g = I[V], g = r1.FAST_LOG10(.368 + .632 * g * g * g), H += g;
                }
                A.max_noise = Math.max(1e-20, H);
              case 1:
                A = E.max_noise < f.max_noise;
                break;
              case 2:
                A = E.tot_noise < f.tot_noise;
                break;
              case 3:
                A = E.tot_noise < f.tot_noise && E.max_noise < f.max_noise;
                break;
              case 4:
                A = 0 >= E.max_noise && .2 < f.max_noise ||
                  0 >= E.max_noise && 0 > f.max_noise &&
                    f.max_noise > E.max_noise - .2 &&
                    E.tot_noise < f.tot_noise ||
                  0 >= E.max_noise && 0 < f.max_noise &&
                    f.max_noise > E.max_noise - .2 &&
                    E.tot_noise < f.tot_noise + f.over_noise ||
                  0 < E.max_noise && -.05 < f.max_noise &&
                    f.max_noise > E.max_noise - .1 &&
                    E.tot_noise + E.over_noise < f.tot_noise + f.over_noise ||
                  0 < E.max_noise && -.1 < f.max_noise &&
                    f.max_noise > E.max_noise - .15 &&
                    E.tot_noise + E.over_noise + E.over_noise <
                      f.tot_noise + f.over_noise + f.over_noise;
                break;
              case 5:
                A = E.over_noise < f.over_noise ||
                  H1.EQ(E.over_noise, f.over_noise) &&
                    E.tot_noise < f.tot_noise;
                break;
              case 6:
                A = E.over_noise < f.over_noise ||
                  H1.EQ(E.over_noise, f.over_noise) &&
                    (E.max_noise < f.max_noise ||
                      H1.EQ(E.max_noise, f.max_noise) &&
                        E.tot_noise <= f.tot_noise);
                break;
              case 7:
                A = E.over_count < f.over_count || E.over_noise < f.over_noise;
            }
            if (
              f.over_count == 0 && (A = A && E.bits < f.bits),
                A = A ? 1 : 0,
                A != 0
            ) {
              _ = n.part2_3_length,
                m = t,
                n.assign(l),
                S = 0,
                i1.arraycopy(e, 0, s, 0, 576);
            } else if (
              r.full_outer_loop == 0 &&
              (++S > a && m.over_count == 0 ||
                r.noise_shaping_amp == 3 && o && 30 < S ||
                r.noise_shaping_amp == 3 && o && 15 < l.global_gain - c)
            ) break;
          } while (255 > l.global_gain + l.scalefac_scale);
          r.noise_shaping_amp == 3
            ? o
              ? i = !0
              : (l.assign(n),
                i1.arraycopy(s, 0, e, 0, 576),
                S = 0,
                c = l.global_gain,
                o = !0)
            : i = !0;
        }
        return u.VBR == C.vbr_rh || u.VBR == C.vbr_mtrh
          ? i1.arraycopy(s, 0, e, 0, 576)
          : r.substep_shaping & 1 && trancate_smallspectrums(r, n, R, e),
          m.over_count;
      },
      this.iteration_finish_one = function (u, n, R) {
        var e = u.l3_side, S = e.tt[n][R];
        D.best_scalefac_store(u, n, R, e),
          u.use_best_huffman == 1 && D.best_huffman_divide(u, S),
          X.ResvAdjust(u, S);
      },
      this.VBR_encode_granule = function (u, n, R, e, S, x, r) {
        var l = u.internal_flags,
          s = new y2(),
          h = G(576),
          m = r,
          p = (r + x) / 2,
          _ = 0,
          i = l.sfb21_extra;
        r0.fill(s.l3_enc, 0);
        do {
          l.sfb21_extra = p > m - 42 ? !1 : i;
          var o = outer_loop(u, n, R, e, S, p);
          0 >= o
            ? (_ = 1,
              r = n.part2_3_length,
              s.assign(n),
              i1.arraycopy(e, 0, h, 0, 576),
              r -= 32,
              o = r - x,
              p = (r + x) / 2)
            : (x = p + 32,
              o = r - x,
              p = (r + x) / 2,
              _ != 0 && (_ = 2, n.assign(s), i1.arraycopy(h, 0, e, 0, 576)));
        } while (12 < o);
        l.sfb21_extra = i,
          _ == 2 && i1.arraycopy(s.l3_enc, 0, n.l3_enc, 0, 576);
      },
      this.get_framebits = function (u, n) {
        var R = u.internal_flags;
        R.bitrate_index = R.VBR_min_bitrate,
          w.getframebits(u),
          R.bitrate_index = 1;
        for (var e = w.getframebits(u), S = 1; S <= R.VBR_max_bitrate; S++) {
          R.bitrate_index = S,
            e = new J0(e),
            n[S] = X.ResvFrameBegin(u, e),
            e = e.bits;
        }
      },
      this.VBR_old_prepare = function (u, n, R, e, S, x, r, l, s) {
        var h = u.internal_flags, m = 1, p = 0;
        h.bitrate_index = h.VBR_max_bitrate;
        var _ = X.ResvFrameBegin(u, new J0(0)) / h.mode_gr;
        get_framebits(u, x);
        for (var i = 0; i < h.mode_gr; i++) {
          var o = L.on_pe(u, n, l[i], _, i, 0);
          for (
            h.mode_ext == v.MPG_MD_MS_LR &&
            (ms_convert(h.l3_side, i), L.reduce_side(l[i], R[i], _, o)), o = 0;
            o < h.channels_out;
            ++o
          ) {
            var c = h.l3_side.tt[i][o];
            if (c.block_type != v.SHORT_TYPE) {
              var t = 1.28 / (1 + Math.exp(3.5 - n[i][o] / 300)) - .05;
              t = h.PSY.mask_adjust - t;
            } else {t = 2.56 / (1 + Math.exp(3.5 - n[i][o] / 300)) - .14,
                t = h.PSY.mask_adjust_short - t;}
            h.masking_lower = Math.pow(10, .1 * t),
              init_outer_loop(h, c),
              s[i][o] = L.calc_xmin(u, e[i][o], c, S[i][o]),
              s[i][o] != 0 && (m = 0),
              r[i][o] = 126,
              p += l[i][o];
          }
        }
        for (i = 0; i < h.mode_gr; i++) {
          for (o = 0; o < h.channels_out; o++) {
            p > x[h.VBR_max_bitrate] &&
            (l[i][o] *= x[h.VBR_max_bitrate], l[i][o] /= p),
              r[i][o] > l[i][o] && (r[i][o] = l[i][o]);
          }
        }
        return m;
      },
      this.bitpressure_strategy = function (u, n, R, e) {
        for (var S = 0; S < u.mode_gr; S++) {
          for (var x = 0; x < u.channels_out; x++) {
            for (
              var r = u.l3_side.tt[S][x], l = n[S][x], s = 0, h = 0;
              h < r.psy_lmax;
              h++
            ) {
              l[s++] *= 1 + .029 * h * h / v.SBMAX_l / v.SBMAX_l;
            }
            if (r.block_type == v.SHORT_TYPE) {
              for (h = r.sfb_smin; h < v.SBMAX_s; h++) {
                l[s++] *= 1 + .029 * h * h / v.SBMAX_s / v.SBMAX_s,
                  l[s++] *= 1 + .029 * h * h / v.SBMAX_s / v.SBMAX_s,
                  l[s++] *= 1 + .029 * h * h / v.SBMAX_s / v.SBMAX_s;
              }
            }
            e[S][x] = 0 | Math.max(R[S][x], .9 * e[S][x]);
          }
        }
      },
      this.VBR_new_prepare = function (u, n, R, e, S, x) {
        var r = u.internal_flags, l = 1, s = 0, h = 0;
        if (u.free_format) {
          r.bitrate_index = 0, s = new J0(s);
          var m = X.ResvFrameBegin(u, s);
          s = s.bits, S[0] = m;
        } else {r.bitrate_index = r.VBR_max_bitrate,
            s = new J0(s),
            X.ResvFrameBegin(u, s),
            s = s.bits,
            get_framebits(u, S),
            m = S[r.VBR_max_bitrate];}
        for (S = 0; S < r.mode_gr; S++) {
          L.on_pe(u, n, x[S], s, S, 0),
            r.mode_ext == v.MPG_MD_MS_LR && ms_convert(r.l3_side, S);
          for (var p = 0; p < r.channels_out; ++p) {
            var _ = r.l3_side.tt[S][p];
            r.masking_lower = Math.pow(10, .1 * r.PSY.mask_adjust),
              init_outer_loop(r, _),
              L.calc_xmin(u, R[S][p], _, e[S][p]) != 0 && (l = 0),
              h += x[S][p];
          }
        }
        for (S = 0; S < r.mode_gr; S++) {for (
            p = 0;
            p < r.channels_out;
            p++
          ) h > m && (x[S][p] *= m, x[S][p] /= h);}
        return l;
      },
      this.calc_target_bits = function (u, n, R, e, S, x) {
        var r = u.internal_flags, l = r.l3_side;
        r.bitrate_index = r.VBR_max_bitrate;
        var s = new J0(0);
        x[0] = X.ResvFrameBegin(u, s),
          r.bitrate_index = 1,
          s = w.getframebits(u) - 8 * r.sideinfo_len,
          S[0] = s / (r.mode_gr * r.channels_out),
          s = u.VBR_mean_bitrate_kbps * u.framesize * 1e3,
          r.substep_shaping & 1 && (s *= 1.09),
          s /= u.out_samplerate,
          s -= 8 * r.sideinfo_len,
          s /= r.mode_gr * r.channels_out;
        var h = .93 + .07 * (11 - u.compression_ratio) / 5.5;
        for (.9 > h && (h = .9), 1 < h && (h = 1), u = 0; u < r.mode_gr; u++) {
          var m = 0;
          for (S = 0; S < r.channels_out; S++) {
            if (e[u][S] = int(h * s), 700 < n[u][S]) {
              var p = int((n[u][S] - 700) / 1.4), _ = l.tt[u][S];
              e[u][S] = int(h * s),
                _.block_type == v.SHORT_TYPE && p < s / 2 && (p = s / 2),
                p > 3 * s / 2 ? p = 3 * s / 2 : 0 > p && (p = 0),
                e[u][S] += p;
            }
            e[u][S] > S1.MAX_BITS_PER_CHANNEL &&
            (e[u][S] = S1.MAX_BITS_PER_CHANNEL), m += e[u][S];
          }
          if (m > S1.MAX_BITS_PER_GRANULE) {
            for (
              S = 0;
              S < r.channels_out;
              ++S
            ) e[u][S] *= S1.MAX_BITS_PER_GRANULE, e[u][S] /= m;
          }
        }
        if (r.mode_ext == v.MPG_MD_MS_LR) {
          for (u = 0; u < r.mode_gr; u++) {L.reduce_side(
              e[u],
              R[u],
              s * r.channels_out,
              S1.MAX_BITS_PER_GRANULE,
            );}
        }
        for (u = n = 0; u < r.mode_gr; u++) {
          for (
            S = 0;
            S < r.channels_out;
            S++
          ) {e[u][S] > S1.MAX_BITS_PER_CHANNEL &&
              (e[u][S] = S1.MAX_BITS_PER_CHANNEL),
              n += e[u][S];}
        }
        if (n > x[0]) {
          for (u = 0; u < r.mode_gr; u++) {
            for (
              S = 0;
              S < r.channels_out;
              S++
            ) e[u][S] *= x[0], e[u][S] /= n;
          }
        }
      };
  }
  function ft() {
    function d(n, R, e) {
      for (var S = 10, x = R + 238 - 14 - 286, r = -15; 0 > r; r++) {
        var l = B[S + -10], s = n[x + -224] * l, h = n[R + 224] * l;
        l = B[S + -9],
          s += n[x + -160] * l,
          h += n[R + 160] * l,
          l = B[S + -8],
          s += n[x + -96] * l,
          h += n[R + 96] * l,
          l = B[S + -7],
          s += n[x + -32] * l,
          h += n[R + 32] * l,
          l = B[S + -6],
          s += n[x + 32] * l,
          h += n[R + -32] * l,
          l = B[S + -5],
          s += n[x + 96] * l,
          h += n[R + -96] * l,
          l = B[S + -4],
          s += n[x + 160] * l,
          h += n[R + -160] * l,
          l = B[S + -3],
          s += n[x + 224] * l,
          h += n[R + -224] * l,
          l = B[S + -2],
          s += n[R + -256] * l,
          h -= n[x + 256] * l,
          l = B[S + -1],
          s += n[R + -192] * l,
          h -= n[x + 192] * l,
          l = B[S + 0],
          s += n[R + -128] * l,
          h -= n[x + 128] * l,
          l = B[S + 1],
          s += n[R + -64] * l,
          h -= n[x + 64] * l,
          l = B[S + 2],
          s += n[R + 0] * l,
          h -= n[x + 0] * l,
          l = B[S + 3],
          s += n[R + 64] * l,
          h -= n[x + -64] * l,
          l = B[S + 4],
          s += n[R + 128] * l,
          h -= n[x + -128] * l,
          l = B[S + 5],
          s += n[R + 192] * l,
          h -= n[x + -192] * l,
          s *= B[S + 6],
          l = h - s,
          e[30 + 2 * r] = h + s,
          e[31 + 2 * r] = B[S + 7] * l,
          S += 18,
          R--,
          x++;
      }
      h = n[R + -16] * B[S + -10],
        s = n[R + -32] * B[S + -2],
        h += (n[R + -48] - n[R + 16]) * B[S + -9],
        s += n[R + -96] * B[S + -1],
        h += (n[R + -80] + n[R + 48]) * B[S + -8],
        s += n[R + -160] * B[S + 0],
        h += (n[R + -112] - n[R + 80]) * B[S + -7],
        s += n[R + -224] * B[S + 1],
        h += (n[R + -144] + n[R + 112]) * B[S + -6],
        s -= n[R + 32] * B[S + 2],
        h += (n[R + -176] - n[R + 144]) * B[S + -5],
        s -= n[R + 96] * B[S + 3],
        h += (n[R + -208] + n[R + 176]) * B[S + -4],
        s -= n[R + 160] * B[S + 4],
        h += (n[R + -240] - n[R + 208]) * B[S + -3],
        s -= n[R + 224],
        n = s - h,
        R = s + h,
        h = e[14],
        s = e[15] - h,
        e[31] = R + h,
        e[30] = n + s,
        e[15] = n - s,
        e[14] = R - h,
        s = e[28] - e[0],
        e[0] += e[28],
        e[28] = s * B[S + -36 + 7],
        s = e[29] - e[1],
        e[1] += e[29],
        e[29] = s * B[S + -36 + 7],
        s = e[26] - e[2],
        e[2] += e[26],
        e[26] = s * B[S + -72 + 7],
        s = e[27] - e[3],
        e[3] += e[27],
        e[27] = s * B[S + -72 + 7],
        s = e[24] - e[4],
        e[4] += e[24],
        e[24] = s * B[S + -108 + 7],
        s = e[25] - e[5],
        e[5] += e[25],
        e[25] = s * B[S + -108 + 7],
        s = e[22] - e[6],
        e[6] += e[22],
        e[22] = s * r1.SQRT2,
        s = e[23] - e[7],
        e[7] += e[23],
        e[23] = s * r1.SQRT2 - e[7],
        e[7] -= e[6],
        e[22] -= e[7],
        e[23] -= e[22],
        s = e[6],
        e[6] = e[31] - s,
        e[31] += s,
        s = e[7],
        e[7] = e[30] - s,
        e[30] += s,
        s = e[22],
        e[22] = e[15] - s,
        e[15] += s,
        s = e[23],
        e[23] = e[14] - s,
        e[14] += s,
        s = e[20] - e[8],
        e[8] += e[20],
        e[20] = s * B[S + -180 + 7],
        s = e[21] - e[9],
        e[9] += e[21],
        e[21] = s * B[S + -180 + 7],
        s = e[18] - e[10],
        e[10] += e[18],
        e[18] = s * B[S + -216 + 7],
        s = e[19] - e[11],
        e[11] += e[19],
        e[19] = s * B[S + -216 + 7],
        s = e[16] - e[12],
        e[12] += e[16],
        e[16] = s * B[S + -252 + 7],
        s = e[17] - e[13],
        e[13] += e[17],
        e[17] = s * B[S + -252 + 7],
        s = -e[20] + e[24],
        e[20] += e[24],
        e[24] = s * B[S + -216 + 7],
        s = -e[21] + e[25],
        e[21] += e[25],
        e[25] = s * B[S + -216 + 7],
        s = e[4] - e[8],
        e[4] += e[8],
        e[8] = s * B[S + -216 + 7],
        s = e[5] - e[9],
        e[5] += e[9],
        e[9] = s * B[S + -216 + 7],
        s = e[0] - e[12],
        e[0] += e[12],
        e[12] = s * B[S + -72 + 7],
        s = e[1] - e[13],
        e[1] += e[13],
        e[13] = s * B[S + -72 + 7],
        s = e[16] - e[28],
        e[16] += e[28],
        e[28] = s * B[S + -72 + 7],
        s = -e[17] + e[29],
        e[17] += e[29],
        e[29] = s * B[S + -72 + 7],
        s = r1.SQRT2 * (e[2] - e[10]),
        e[2] += e[10],
        e[10] = s,
        s = r1.SQRT2 * (e[3] - e[11]),
        e[3] += e[11],
        e[11] = s,
        s = r1.SQRT2 * (-e[18] + e[26]),
        e[18] += e[26],
        e[26] = s - e[18],
        s = r1.SQRT2 * (-e[19] + e[27]),
        e[19] += e[27],
        e[27] = s - e[19],
        s = e[2],
        e[19] -= e[3],
        e[3] -= s,
        e[2] = e[31] - s,
        e[31] += s,
        s = e[3],
        e[11] -= e[19],
        e[18] -= s,
        e[3] = e[30] - s,
        e[30] += s,
        s = e[18],
        e[27] -= e[11],
        e[19] -= s,
        e[18] = e[15] - s,
        e[15] += s,
        s = e[19],
        e[10] -= s,
        e[19] = e[14] - s,
        e[14] += s,
        s = e[10],
        e[11] -= s,
        e[10] = e[23] - s,
        e[23] += s,
        s = e[11],
        e[26] -= s,
        e[11] = e[22] - s,
        e[22] += s,
        s = e[26],
        e[27] -= s,
        e[26] = e[7] - s,
        e[7] += s,
        s = e[27],
        e[27] = e[6] - s,
        e[6] += s,
        s = r1.SQRT2 * (e[0] - e[4]),
        e[0] += e[4],
        e[4] = s,
        s = r1.SQRT2 * (e[1] - e[5]),
        e[1] += e[5],
        e[5] = s,
        s = r1.SQRT2 * (e[16] - e[20]),
        e[16] += e[20],
        e[20] = s,
        s = r1.SQRT2 * (e[17] - e[21]),
        e[17] += e[21],
        e[21] = s,
        s = -r1.SQRT2 * (e[8] - e[12]),
        e[8] += e[12],
        e[12] = s - e[8],
        s = -r1.SQRT2 * (e[9] - e[13]),
        e[9] += e[13],
        e[13] = s - e[9],
        s = -r1.SQRT2 * (e[25] - e[29]),
        e[25] += e[29],
        e[29] = s - e[25],
        s = -r1.SQRT2 * (e[24] + e[28]),
        e[24] -= e[28],
        e[28] = s - e[24],
        s = e[24] - e[16],
        e[24] = s,
        s = e[20] - s,
        e[20] = s,
        s = e[28] - s,
        e[28] = s,
        s = e[25] - e[17],
        e[25] = s,
        s = e[21] - s,
        e[21] = s,
        s = e[29] - s,
        e[29] = s,
        s = e[17] - e[1],
        e[17] = s,
        s = e[9] - s,
        e[9] = s,
        s = e[25] - s,
        e[25] = s,
        s = e[5] - s,
        e[5] = s,
        s = e[21] - s,
        e[21] = s,
        s = e[13] - s,
        e[13] = s,
        s = e[29] - s,
        e[29] = s,
        s = e[1] - e[0],
        e[1] = s,
        s = e[16] - s,
        e[16] = s,
        s = e[17] - s,
        e[17] = s,
        s = e[8] - s,
        e[8] = s,
        s = e[9] - s,
        e[9] = s,
        s = e[24] - s,
        e[24] = s,
        s = e[25] - s,
        e[25] = s,
        s = e[4] - s,
        e[4] = s,
        s = e[5] - s,
        e[5] = s,
        s = e[20] - s,
        e[20] = s,
        s = e[21] - s,
        e[21] = s,
        s = e[12] - s,
        e[12] = s,
        s = e[13] - s,
        e[13] = s,
        s = e[28] - s,
        e[28] = s,
        s = e[29] - s,
        e[29] = s,
        s = e[0],
        e[0] += e[31],
        e[31] -= s,
        s = e[1],
        e[1] += e[30],
        e[30] -= s,
        s = e[16],
        e[16] += e[15],
        e[15] -= s,
        s = e[17],
        e[17] += e[14],
        e[14] -= s,
        s = e[8],
        e[8] += e[23],
        e[23] -= s,
        s = e[9],
        e[9] += e[22],
        e[22] -= s,
        s = e[24],
        e[24] += e[7],
        e[7] -= s,
        s = e[25],
        e[25] += e[6],
        e[6] -= s,
        s = e[4],
        e[4] += e[27],
        e[27] -= s,
        s = e[5],
        e[5] += e[26],
        e[26] -= s,
        s = e[20],
        e[20] += e[11],
        e[11] -= s,
        s = e[21],
        e[21] += e[10],
        e[10] -= s,
        s = e[12],
        e[12] += e[19],
        e[19] -= s,
        s = e[13],
        e[13] += e[18],
        e[18] -= s,
        s = e[28],
        e[28] += e[3],
        e[3] -= s,
        s = e[29],
        e[29] += e[2],
        e[2] -= s;
    }
    var B = [
        -.1482523854003001,
        32.308141959636465,
        296.40344946382766,
        883.1344870032432,
        11113.947376231741,
        1057.2713659324597,
        305.7402417275812,
        30.825928907280012,
        3.8533188138216365,
        59.42900443849514,
        709.5899960123345,
        5281.91112291017,
        -5829.66483675846,
        -817.6293103748613,
        -76.91656988279972,
        -4.594269939176596,
        .9063471690191471,
        .1960342806591213,
        -.15466694054279598,
        34.324387823855965,
        301.8067566458425,
        817.599602898885,
        11573.795901679885,
        1181.2520595540152,
        321.59731579894424,
        31.232021761053772,
        3.7107095756221318,
        53.650946155329365,
        684.167428119626,
        5224.56624370173,
        -6366.391851890084,
        -908.9766368219582,
        -89.83068876699639,
        -5.411397422890401,
        .8206787908286602,
        .3901806440322567,
        -.16070888947830023,
        36.147034243915876,
        304.11815768187864,
        732.7429163887613,
        11989.60988270091,
        1300.012278487897,
        335.28490093152146,
        31.48816102859945,
        3.373875931311736,
        47.232241542899175,
        652.7371796173471,
        5132.414255594984,
        -6909.087078780055,
        -1001.9990371107289,
        -103.62185754286375,
        -6.104916304710272,
        .7416505462720353,
        .5805693545089249,
        -.16636367662261495,
        37.751650073343995,
        303.01103387567713,
        627.9747488785183,
        12358.763425278165,
        1412.2779918482834,
        346.7496836825721,
        31.598286663170416,
        3.1598635433980946,
        40.57878626349686,
        616.1671130880391,
        5007.833007176154,
        -7454.040671756168,
        -1095.7960341867115,
        -118.24411666465777,
        -6.818469345853504,
        .6681786379192989,
        .7653668647301797,
        -.1716176790982088,
        39.11551877123304,
        298.3413246578966,
        503.5259106886539,
        12679.589408408976,
        1516.5821921214542,
        355.9850766329023,
        31.395241710249053,
        2.9164211881972335,
        33.79716964664243,
        574.8943997801362,
        4853.234992253242,
        -7997.57021486075,
        -1189.7624067269965,
        -133.6444792601766,
        -7.7202770609839915,
        .5993769336819237,
        .9427934736519954,
        -.17645823955292173,
        40.21879108166477,
        289.9982036694474,
        359.3226160751053,
        12950.259102786438,
        1612.1013903507662,
        362.85067106591504,
        31.045922092242872,
        2.822222032597987,
        26.988862316190684,
        529.8996541764288,
        4671.371946949588,
        -8535.899136645805,
        -1282.5898586244496,
        -149.58553632943463,
        -8.643494270763135,
        .5345111359507916,
        1.111140466039205,
        -.36174739330527045,
        41.04429910497807,
        277.5463268268618,
        195.6386023135583,
        13169.43812144731,
        1697.6433561479398,
        367.40983966190305,
        30.557037410382826,
        2.531473372857427,
        20.070154905927314,
        481.50208566532336,
        4464.970341588308,
        -9065.36882077239,
        -1373.62841526722,
        -166.1660487028118,
        -9.58289321133207,
        .4729647758913199,
        1.268786568327291,
        -.36970682634889585,
        41.393213350082036,
        261.2935935556502,
        12.935476055240873,
        13336.131683328815,
        1772.508612059496,
        369.76534388639965,
        29.751323653701338,
        2.4023193045459172,
        13.304795348228817,
        430.5615775526625,
        4237.0568611071185,
        -9581.931701634761,
        -1461.6913552409758,
        -183.12733958476446,
        -10.718010163869403,
        .41421356237309503,
        1.414213562373095,
        -.37677560326535325,
        41.619486213528496,
        241.05423794991074,
        -187.94665032361226,
        13450.063605744153,
        1836.153896465782,
        369.4908799925761,
        29.001847876923147,
        2.0714759319987186,
        6.779591200894186,
        377.7767837205709,
        3990.386575512536,
        -10081.709459700915,
        -1545.947424837898,
        -200.3762958015653,
        -11.864482073055006,
        .3578057213145241,
        1.546020906725474,
        -.3829366947518991,
        41.1516456456653,
        216.47684307105183,
        -406.1569483347166,
        13511.136535077321,
        1887.8076599260432,
        367.3025214564151,
        28.136213436723654,
        1.913880671464418,
        .3829366947518991,
        323.85365704338597,
        3728.1472257487526,
        -10561.233882199509,
        -1625.2025997821418,
        -217.62525175416,
        -13.015432208941645,
        .3033466836073424,
        1.66293922460509,
        -.5822628872992417,
        40.35639251440489,
        188.20071124269245,
        -640.2706748618148,
        13519.21490106562,
        1927.6022433578062,
        362.8197642637487,
        26.968821921868447,
        1.7463817695935329,
        -5.62650678237171,
        269.3016715297017,
        3453.386536448852,
        -11016.145278780888,
        -1698.6569643425091,
        -234.7658734267683,
        -14.16351421663124,
        .2504869601913055,
        1.76384252869671,
        -.5887180101749253,
        39.23429103868072,
        155.76096234403798,
        -889.2492977967378,
        13475.470561874661,
        1955.0535223723712,
        356.4450994756727,
        25.894952980042156,
        1.5695032905781554,
        -11.181939564328772,
        214.80884394039484,
        3169.1640829158237,
        -11443.321309975563,
        -1765.1588461316153,
        -251.68908574481912,
        -15.49755935939164,
        .198912367379658,
        1.847759065022573,
        -.7912582233652842,
        37.39369355329111,
        119.699486012458,
        -1151.0956593239027,
        13380.446257078214,
        1970.3952110853447,
        348.01959814116185,
        24.731487364283044,
        1.3850130831637748,
        -16.421408865300393,
        161.05030052864092,
        2878.3322807850063,
        -11838.991423510031,
        -1823.985884688674,
        -268.2854986386903,
        -16.81724543849939,
        .1483359875383474,
        1.913880671464418,
        -.7960642926861912,
        35.2322109610459,
        80.01928065061526,
        -1424.0212633405113,
        13235.794061869668,
        1973.804052543835,
        337.9908651258184,
        23.289159354463873,
        1.3934255946442087,
        -21.099669467133474,
        108.48348407242611,
        2583.700758091299,
        -12199.726194855148,
        -1874.2780658979746,
        -284.2467154529415,
        -18.11369784385905,
        .09849140335716425,
        1.961570560806461,
        -.998795456205172,
        32.56307803611191,
        36.958364584370486,
        -1706.075448829146,
        13043.287458812016,
        1965.3831106103316,
        326.43182772364605,
        22.175018750622293,
        1.198638339011324,
        -25.371248002043963,
        57.53505923036915,
        2288.41886619975,
        -12522.674544337233,
        -1914.8400385312243,
        -299.26241273417224,
        -19.37805630698734,
        .04912684976946725,
        1.990369453344394,
        .0178904535 * r1.SQRT2 / 2384e-9,
        .008938074 * r1.SQRT2 / 2384e-9,
        .0015673635 * r1.SQRT2 / 2384e-9,
        .001228571 * r1.SQRT2 / 2384e-9,
        .0004856585 * r1.SQRT2 / 2384e-9,
        109434e-9 * r1.SQRT2 / 2384e-9,
        50783e-9 * r1.SQRT2 / 2384e-9,
        6914e-9 * r1.SQRT2 / 2384e-9,
        12804.797818791945,
        1945.5515939597317,
        313.4244966442953,
        20.801593959731544,
        1995.1556208053692,
        9.000838926174497,
        -29.20218120805369,
      ],
      w = [[
        2382191739347913e-28,
        6423305872147834e-28,
        9400849094049688e-28,
        1122435026096556e-27,
        1183840321267481e-27,
        1122435026096556e-27,
        940084909404969e-27,
        6423305872147839e-28,
        2382191739347918e-28,
        5456116108943412e-27,
        4878985199565852e-27,
        4240448995017367e-27,
        3559909094758252e-27,
        2858043359288075e-27,
        2156177623817898e-27,
        1475637723558783e-27,
        8371015190102974e-28,
        2599706096327376e-28,
        -5456116108943412e-27,
        -4878985199565852e-27,
        -4240448995017367e-27,
        -3559909094758252e-27,
        -2858043359288076e-27,
        -2156177623817898e-27,
        -1475637723558783e-27,
        -8371015190102975e-28,
        -2599706096327376e-28,
        -2382191739347923e-28,
        -6423305872147843e-28,
        -9400849094049696e-28,
        -1122435026096556e-27,
        -1183840321267481e-27,
        -1122435026096556e-27,
        -9400849094049694e-28,
        -642330587214784e-27,
        -2382191739347918e-28,
      ], [
        2382191739347913e-28,
        6423305872147834e-28,
        9400849094049688e-28,
        1122435026096556e-27,
        1183840321267481e-27,
        1122435026096556e-27,
        9400849094049688e-28,
        6423305872147841e-28,
        2382191739347918e-28,
        5456116108943413e-27,
        4878985199565852e-27,
        4240448995017367e-27,
        3559909094758253e-27,
        2858043359288075e-27,
        2156177623817898e-27,
        1475637723558782e-27,
        8371015190102975e-28,
        2599706096327376e-28,
        -5461314069809755e-27,
        -4921085770524055e-27,
        -4343405037091838e-27,
        -3732668368707687e-27,
        -3093523840190885e-27,
        -2430835727329465e-27,
        -1734679010007751e-27,
        -974825365660928e-27,
        -2797435120168326e-28,
        0,
        0,
        0,
        0,
        0,
        0,
        -2283748241799531e-28,
        -4037858874020686e-28,
        -2146547464825323e-28,
      ], [
        .1316524975873958,
        .414213562373095,
        .7673269879789602,
        1.091308501069271,
        1.303225372841206,
        1.56968557711749,
        1.920982126971166,
        2.414213562373094,
        3.171594802363212,
        4.510708503662055,
        7.595754112725146,
        22.90376554843115,
        .984807753012208,
        .6427876096865394,
        .3420201433256688,
        .9396926207859084,
        -.1736481776669303,
        -.7660444431189779,
        .8660254037844387,
        .5,
        -.5144957554275265,
        -.4717319685649723,
        -.3133774542039019,
        -.1819131996109812,
        -.09457419252642064,
        -.04096558288530405,
        -.01419856857247115,
        -.003699974673760037,
        .8574929257125442,
        .8817419973177052,
        .9496286491027329,
        .9833145924917901,
        .9955178160675857,
        .9991605581781475,
        .999899195244447,
        .9999931550702802,
      ], [
        0,
        0,
        0,
        0,
        0,
        0,
        2283748241799531e-28,
        4037858874020686e-28,
        2146547464825323e-28,
        5461314069809755e-27,
        4921085770524055e-27,
        4343405037091838e-27,
        3732668368707687e-27,
        3093523840190885e-27,
        2430835727329466e-27,
        1734679010007751e-27,
        974825365660928e-27,
        2797435120168326e-28,
        -5456116108943413e-27,
        -4878985199565852e-27,
        -4240448995017367e-27,
        -3559909094758253e-27,
        -2858043359288075e-27,
        -2156177623817898e-27,
        -1475637723558782e-27,
        -8371015190102975e-28,
        -2599706096327376e-28,
        -2382191739347913e-28,
        -6423305872147834e-28,
        -9400849094049688e-28,
        -1122435026096556e-27,
        -1183840321267481e-27,
        -1122435026096556e-27,
        -9400849094049688e-28,
        -6423305872147841e-28,
        -2382191739347918e-28,
      ]],
      X = w[v.SHORT_TYPE],
      L = w[v.SHORT_TYPE],
      P = w[v.SHORT_TYPE],
      D = w[v.SHORT_TYPE],
      u = [
        0,
        1,
        16,
        17,
        8,
        9,
        24,
        25,
        4,
        5,
        20,
        21,
        12,
        13,
        28,
        29,
        2,
        3,
        18,
        19,
        10,
        11,
        26,
        27,
        6,
        7,
        22,
        23,
        14,
        15,
        30,
        31,
      ];
    this.mdct_sub48 = function (n, R, e) {
      for (var S = 286, x = 0; x < n.channels_out; x++) {
        for (var r = 0; r < n.mode_gr; r++) {
          for (
            var l,
              s = n.l3_side.tt[r][x],
              h = s.xr,
              m = 0,
              p = n.sb_sample[x][1 - r],
              _ = 0,
              i = 0;
            9 > i;
            i++
          ) {
            for (
              d(R, S, p[_]), d(R, S + 32, p[_ + 1]), _ += 2, S += 64, l = 1;
              32 > l;
              l += 2
            ) p[_ - 1][l] *= -1;
          }
          for (l = 0; 32 > l; l++, m += 18) {
            p = s.block_type, _ = n.sb_sample[x][r];
            var o = n.sb_sample[x][1 - r];
            if (
              s.mixed_block_flag != 0 && 2 > l && (p = 0),
                1e-12 > n.amp_filter[l]
            ) r0.fill(h, m + 0, m + 18, 0);
            else {
              if (1 > n.amp_filter[l]) {
                for (i = 0; 18 > i; i++) o[i][u[l]] *= n.amp_filter[l];
              }
              if (p == v.SHORT_TYPE) {
                for (i = -3; 0 > i; i++) {
                  var c = w[v.SHORT_TYPE][i + 3];
                  h[m + 3 * i + 9] = _[9 + i][u[l]] * c - _[8 - i][u[l]],
                    h[m + 3 * i + 18] = _[14 - i][u[l]] * c + _[15 + i][u[l]],
                    h[m + 3 * i + 10] = _[15 + i][u[l]] * c - _[14 - i][u[l]],
                    h[m + 3 * i + 19] = o[2 - i][u[l]] * c + o[3 + i][u[l]],
                    h[m + 3 * i + 11] = o[3 + i][u[l]] * c - o[2 - i][u[l]],
                    h[m + 3 * i + 20] = o[8 - i][u[l]] * c + o[9 + i][u[l]];
                }
                for (i = h, _ = m, c = 0; 3 > c; c++) {
                  var t = i[_ + 6] * w[v.SHORT_TYPE][0] - i[_ + 15];
                  o = i[_ + 0] * w[v.SHORT_TYPE][2] - i[_ + 9];
                  var a = t + o, f = t - o;
                  t = i[_ + 15] * w[v.SHORT_TYPE][0] + i[_ + 6],
                    o = i[_ + 9] * w[v.SHORT_TYPE][2] + i[_ + 0];
                  var E = t + o, A = -t + o;
                  o = 2069978111953089e-26 *
                    (i[_ + 3] * w[v.SHORT_TYPE][1] - i[_ + 12]),
                    t = 2069978111953089e-26 *
                      (i[_ + 12] * w[v.SHORT_TYPE][1] + i[_ + 3]),
                    i[_ + 0] = 190752519173728e-25 * a + o,
                    i[_ + 15] = 190752519173728e-25 * -E + t,
                    f *= 16519652744032674e-27,
                    E = 9537625958686404e-27 * E + t,
                    i[_ + 3] = f - E,
                    i[_ + 6] = f + E,
                    a = 9537625958686404e-27 * a - o,
                    A *= 16519652744032674e-27,
                    i[_ + 9] = a + A,
                    i[_ + 12] = a - A,
                    _++;
                }
              } else {
                for (c = G(18), i = -9; 0 > i; i++) {
                  a = w[p][i + 27] * o[i + 9][u[l]] +
                    w[p][i + 36] * o[8 - i][u[l]],
                    f = w[p][i + 9] * _[i + 9][u[l]] -
                      w[p][i + 18] * _[8 - i][u[l]],
                    c[i + 9] = a - f * X[3 + i + 9],
                    c[i + 18] = a * X[3 + i + 9] + f;
                }
                i = h, _ = m, a = c;
                var I = a[17] - a[9], V = a[15] - a[11], H = a[14] - a[12];
                A = a[0] + a[8],
                  E = a[1] + a[7],
                  t = a[2] + a[6],
                  f = a[3] + a[5],
                  i[_ + 17] = A + t - f - (E - a[4]),
                  c = (A + t - f) * L[19] + (E - a[4]),
                  o = (I - V - H) * L[18],
                  i[_ + 5] = o + c,
                  i[_ + 6] = o - c;
                var g = (a[16] - a[10]) * L[18];
                E = E * L[19] + a[4],
                  o = I * L[12] + g + V * L[13] + H * L[14],
                  c = -A * L[16] + E - t * L[17] + f * L[15],
                  i[_ + 1] = o + c,
                  i[_ + 2] = o - c,
                  o = I * L[13] - g - V * L[14] + H * L[12],
                  c = -A * L[17] + E - t * L[15] + f * L[16],
                  i[_ + 9] = o + c,
                  i[_ + 10] = o - c,
                  o = I * L[14] - g + V * L[12] - H * L[13],
                  c = A * L[15] - E + t * L[16] - f * L[17],
                  i[_ + 13] = o + c,
                  i[_ + 14] = o - c,
                  I = a[8] - a[0],
                  V = a[6] - a[2],
                  H = a[5] - a[3],
                  A = a[17] + a[9],
                  E = a[16] + a[10],
                  t = a[15] + a[11],
                  f = a[14] + a[12],
                  i[_ + 0] = A + t + f + (E + a[13]),
                  o = (A + t + f) * L[19] - (E + a[13]),
                  c = (I - V + H) * L[18],
                  i[_ + 11] = o + c,
                  i[_ + 12] = o - c,
                  g = (a[7] - a[1]) * L[18],
                  E = a[13] - E * L[19],
                  o = A * L[15] - E + t * L[16] + f * L[17],
                  c = I * L[14] + g + V * L[12] + H * L[13],
                  i[_ + 3] = o + c,
                  i[_ + 4] = o - c,
                  o = -A * L[17] + E - t * L[15] - f * L[16],
                  c = I * L[13] + g - V * L[14] - H * L[12],
                  i[_ + 7] = o + c,
                  i[_ + 8] = o - c,
                  o = -A * L[16] + E - t * L[17] - f * L[15],
                  c = I * L[12] - g + V * L[13] - H * L[14],
                  i[_ + 15] = o + c,
                  i[_ + 16] = o - c;
              }
            }
            if (p != v.SHORT_TYPE && l != 0) {
              for (i = 7; 0 <= i; --i) {
                p = h[m + i] * P[20 + i] + h[m + -1 - i] * D[28 + i],
                  _ = h[m + i] * D[28 + i] - h[m + -1 - i] * P[20 + i],
                  h[m + -1 - i] = p,
                  h[m + i] = _;
              }
            }
          }
        }
        if (R = e, S = 286, n.mode_gr == 1) {
          for (r = 0; 18 > r; r++) {
            i1.arraycopy(n.sb_sample[x][1][r], 0, n.sb_sample[x][0][r], 0, 32);
          }
        }
      }
    };
  }
  function G0() {
    this.thm = new V2(), this.en = new V2();
  }
  function v() {
    var d = v.FFTOFFSET,
      B = v.MPG_MD_MS_LR,
      w = null,
      X = this.psy = null,
      L = null,
      P = null;
    this.setModules = function (u, n, R, e) {
      w = u, X = this.psy = n, L = e, P = R;
    };
    var D = new ft();
    this.lame_encode_mp3_frame = function (u, n, R, e, S, x) {
      var r = Y2([2, 2]);
      r[0][0] = new G0(),
        r[0][1] = new G0(),
        r[1][0] = new G0(),
        r[1][1] = new G0();
      var l = Y2([2, 2]);
      l[0][0] = new G0(),
        l[0][1] = new G0(),
        l[1][0] = new G0(),
        l[1][1] = new G0();
      var s = [null, null],
        h = u.internal_flags,
        m = x1([2, 4]),
        p = [.5, .5],
        _ = [[0, 0], [0, 0]],
        i = [[0, 0], [0, 0]];
      if (s[0] = n, s[1] = R, h.lame_encode_frame_init == 0) {
        n = u.internal_flags;
        var o, c;
        if (n.lame_encode_frame_init == 0) {
          R = G(2014);
          var t = G(2014);
          for (
            n.lame_encode_frame_init = 1, c = o = 0;
            o < 286 + 576 * (1 + n.mode_gr);
            ++o
          ) {
            o < 576 * n.mode_gr
              ? (R[o] = 0, n.channels_out == 2 && (t[o] = 0))
              : (R[o] = s[0][c], n.channels_out == 2 && (t[o] = s[1][c]), ++c);
          }
          for (c = 0; c < n.mode_gr; c++) {
            for (o = 0; o < n.channels_out; o++) {
              n.l3_side.tt[c][o].block_type = v.SHORT_TYPE;
            }
          }
          D.mdct_sub48(n, R, t);
        }
      }
      if (
        h.padding = 0,
          0 > (h.slot_lag -= h.frac_SpF) &&
          (h.slot_lag += u.out_samplerate, h.padding = 1),
          h.psymodel != 0
      ) {
        for (t = [null, null], o = 0, c = e1(2), R = 0; R < h.mode_gr; R++) {
          for (n = 0; n < h.channels_out; n++) {
            t[n] = s[n], o = 576 + 576 * R - v.FFTOFFSET;
          }
          if (
            n = u.VBR == C.vbr_mtrh || u.VBR == C.vbr_mt
              ? X.L3psycho_anal_vbr(u, t, o, R, r, l, _[R], i[R], m[R], c)
              : X.L3psycho_anal_ns(u, t, o, R, r, l, _[R], i[R], m[R], c),
              n != 0
          ) return -4;
          for (
            u.mode == M1.JOINT_STEREO &&
            (p[R] = m[R][2] + m[R][3], 0 < p[R] && (p[R] = m[R][3] / p[R])),
              n = 0;
            n < h.channels_out;
            n++
          ) {
            var a = h.l3_side.tt[R][n];
            a.block_type = c[n], a.mixed_block_flag = 0;
          }
        }
      } else {for (R = 0; R < h.mode_gr; R++) {
          for (n = 0; n < h.channels_out; n++) {
            h.l3_side.tt[R][n].block_type = v.NORM_TYPE,
              h.l3_side.tt[R][n].mixed_block_flag = 0,
              i[R][n] = _[R][n] = 700;
          }
        }}
      if (
        h.ATH.useAdjust == 0
          ? h.ATH.adjust = 1
          : (n = h.loudness_sq[0][0],
            m = h.loudness_sq[1][0],
            h.channels_out == 2
              ? (n += h.loudness_sq[0][1], m += h.loudness_sq[1][1])
              : (n += n, m += m),
            h.mode_gr == 2 && (n = Math.max(n, m)),
            n = .5 * n * h.ATH.aaSensitivityP,
            .03125 < n
              ? (1 <= h.ATH.adjust
                ? h.ATH.adjust = 1
                : h.ATH.adjust < h.ATH.adjustLimit &&
                  (h.ATH.adjust = h.ATH.adjustLimit),
                h.ATH.adjustLimit = 1)
              : (m = 31.98 * n + 625e-6,
                h.ATH.adjust >= m
                  ? (h.ATH.adjust *= .075 * m + .925,
                    h.ATH.adjust < m && (h.ATH.adjust = m))
                  : h.ATH.adjustLimit >= m
                  ? h.ATH.adjust = m
                  : h.ATH.adjust < h.ATH.adjustLimit &&
                    (h.ATH.adjust = h.ATH.adjustLimit),
                h.ATH.adjustLimit = m)),
          D.mdct_sub48(h, s[0], s[1]),
          h.mode_ext = v.MPG_MD_LR_LR,
          u.force_ms
      ) h.mode_ext = v.MPG_MD_MS_LR;
      else if (u.mode == M1.JOINT_STEREO) {
        for (R = t = m = 0; R < h.mode_gr; R++) {
          for (n = 0; n < h.channels_out; n++) {
            m += i[R][n], t += _[R][n];
          }
        }
        m <= 1 * t &&
          (m = h.l3_side.tt[0],
            n = h.l3_side.tt[h.mode_gr - 1],
            m[0].block_type == m[1].block_type &&
            n[0].block_type == n[1].block_type &&
            (h.mode_ext = v.MPG_MD_MS_LR));
      }
      if (h.mode_ext == B && (r = l, _ = i), u.analysis && h.pinfo != null) {
        for (R = 0; R < h.mode_gr; R++) {
          for (n = 0; n < h.channels_out; n++) {
            h.pinfo.ms_ratio[R] = h.ms_ratio[R],
              h.pinfo.ms_ener_ratio[R] = p[R],
              h.pinfo.blocktype[R][n] = h.l3_side.tt[R][n].block_type,
              h.pinfo.pe[R][n] = _[R][n],
              i1.arraycopy(h.l3_side.tt[R][n].xr, 0, h.pinfo.xr[R][n], 0, 576),
              h.mode_ext == B &&
              (h.pinfo.ers[R][n] = h.pinfo.ers[R][n + 2],
                i1.arraycopy(
                  h.pinfo.energy[R][n + 2],
                  0,
                  h.pinfo.energy[R][n],
                  0,
                  h.pinfo.energy[R][n].length,
                ));
          }
        }
      }
      if (u.VBR == C.vbr_off || u.VBR == C.vbr_abr) {
        for (l = 0; 18 > l; l++) h.nsPsy.pefirbuf[l] = h.nsPsy.pefirbuf[l + 1];
        for (R = i = 0; R < h.mode_gr; R++) {
          for (n = 0; n < h.channels_out; n++) {
            i += _[R][n];
          }
        }
        for (
          h.nsPsy.pefirbuf[18] = i, i = h.nsPsy.pefirbuf[9], l = 0;
          9 > l;
          l++
        ) {
          i += (h.nsPsy.pefirbuf[l] + h.nsPsy.pefirbuf[18 - l]) * v.fircoef[l];
        }
        for (
          i = 3350 * h.mode_gr * h.channels_out / i, R = 0;
          R < h.mode_gr;
          R++
        ) {
          for (n = 0; n < h.channels_out; n++) {
            _[R][n] *= i;
          }
        }
      }
      if (
        h.iteration_loop.iteration_loop(u, _, p, r),
          w.format_bitstream(u),
          e = w.copy_buffer(h, e, S, x, 1),
          u.bWriteVbrTag && L.addVbrFrame(u),
          u.analysis && h.pinfo != null
      ) {
        for (n = 0; n < h.channels_out; n++) {
          for (S = 0; S < d; S++) {
            h.pinfo.pcmdata[n][S] = h.pinfo.pcmdata[n][S + u.framesize];
          }
          for (S = d; 1600 > S; S++) h.pinfo.pcmdata[n][S] = s[n][S - d];
        }
        P.set_frame_pinfo(u, r);
      }
      for (
        h.bitrate_stereoMode_Hist[h.bitrate_index][4]++,
          h.bitrate_stereoMode_Hist[15][4]++,
          h.channels_out == 2 &&
          (h.bitrate_stereoMode_Hist[h.bitrate_index][h.mode_ext]++,
            h.bitrate_stereoMode_Hist[15][h.mode_ext]++),
          u = 0;
        u < h.mode_gr;
        ++u
      ) {
        for (s = 0; s < h.channels_out; ++s) {
          S = h.l3_side.tt[u][s].block_type | 0,
            h.l3_side.tt[u][s].mixed_block_flag != 0 && (S = 4),
            h.bitrate_blockType_Hist[h.bitrate_index][S]++,
            h.bitrate_blockType_Hist[h.bitrate_index][5]++,
            h.bitrate_blockType_Hist[15][S]++,
            h.bitrate_blockType_Hist[15][5]++;
        }
      }
      return e;
    };
  }
  function ht() {
    this.size =
      this.pos =
      this.want =
      this.seen =
      this.sum =
        0,
      this.bag = null,
      this.TotalFrameSize = this.nBytesWritten = this.nVbrNumFrames = 0;
  }
  function ut() {
    this.tt = [[null, null], [null, null]],
      this.resvDrain_post =
        this.resvDrain_pre =
        this.private_bits =
        this.main_data_begin =
          0,
      this.scfsi = [e1(4), e1(4)];
    for (var d = 0; 2 > d; d++) {
      for (var B = 0; 2 > B; B++) this.tt[d][B] = new y2();
    }
  }
  function ct() {
    this.last_en_subshort = x1([4, 9]),
      this.lastAttacks = e1(4),
      this.pefirbuf = G(19),
      this.longfact = G(v.SBMAX_l),
      this.shortfact = G(v.SBMAX_s),
      this.attackthre_s = this.attackthre = 0;
  }
  function V2() {
    this.l = G(v.SBMAX_l), this.s = x1([v.SBMAX_s, 3]);
    var d = this;
    this.assign = function (B) {
      i1.arraycopy(B.l, 0, d.l, 0, v.SBMAX_l);
      for (var w = 0; w < v.SBMAX_s; w++) {
        for (var X = 0; 3 > X; X++) d.s[w][X] = B.s[w][X];
      }
    };
  }
  function S1() {
    function d() {
      this.ptr = this.write_timing = 0, this.buf = new Int8Array(40);
    }
    this.fill_buffer_resample_init =
      this.iteration_init_init =
      this.lame_encode_frame_init =
      this.Class_ID =
        0,
      this.mfbuf = x1([2, S1.MFSIZE]),
      this.full_outer_loop =
        this.use_best_huffman =
        this.subblock_gain =
        this.noise_shaping_stop =
        this.psymodel =
        this.substep_shaping =
        this.noise_shaping_amp =
        this.noise_shaping =
        this.highpass2 =
        this.highpass1 =
        this.lowpass2 =
        this.lowpass1 =
        this.mode_ext =
        this.samplerate_index =
        this.bitrate_index =
        this.VBR_max_bitrate =
        this.VBR_min_bitrate =
        this.mf_size =
        this.mf_samples_to_encode =
        this.resample_ratio =
        this.channels_out =
        this.channels_in =
        this.mode_gr =
          0,
      this.l3_side = new ut(),
      this.ms_ratio = G(2),
      this.slot_lag = this.frac_SpF = this.padding = 0,
      this.tag_spec = null,
      this.nMusicCRC = 0,
      this.OldValue = e1(2),
      this.CurrentStep = e1(2),
      this.masking_lower = 0,
      this.bv_scf = e1(576),
      this.pseudohalf = e1(R0.SFBMAX),
      this.sfb21_extra = !1,
      this.inbuf_old = Array(2),
      this.blackfilt = Array(2 * S1.BPC + 1),
      this.itime = new Float64Array(2),
      this.sideinfo_len = 0,
      this.sb_sample = x1([2, 2, 18, v.SBLIMIT]),
      this.amp_filter = G(32),
      this.header = Array(S1.MAX_HEADER_BUF),
      this.ResvMax =
        this.ResvSize =
        this.ancillary_flag =
        this.w_ptr =
        this.h_ptr =
          0,
      this.scalefac_band = new b0(),
      this.minval_l = G(v.CBANDS),
      this.minval_s = G(v.CBANDS),
      this.nb_1 = x1([4, v.CBANDS]),
      this.nb_2 = x1([4, v.CBANDS]),
      this.nb_s1 = x1([4, v.CBANDS]),
      this.nb_s2 = x1([4, v.CBANDS]),
      this.s3_ll = this.s3_ss = null,
      this.decay = 0,
      this.thm = Array(4),
      this.en = Array(4),
      this.tot_ener = G(4),
      this.loudness_sq = x1([2, 2]),
      this.loudness_sq_save = G(2),
      this.mld_l = G(v.SBMAX_l),
      this.mld_s = G(v.SBMAX_s),
      this.bm_l = e1(v.SBMAX_l),
      this.bo_l = e1(v.SBMAX_l),
      this.bm_s = e1(v.SBMAX_s),
      this.bo_s = e1(v.SBMAX_s),
      this.npart_s = this.npart_l = 0,
      this.s3ind = q0([v.CBANDS, 2]),
      this.s3ind_s = q0([v.CBANDS, 2]),
      this.numlines_s = e1(v.CBANDS),
      this.numlines_l = e1(v.CBANDS),
      this.rnumlines_l = G(v.CBANDS),
      this.mld_cb_l = G(v.CBANDS),
      this.mld_cb_s = G(v.CBANDS),
      this.numlines_l_num1 = this.numlines_s_num1 = 0,
      this.pe = G(4),
      this.ms_ener_ratio_old = this.ms_ratio_l_old = this.ms_ratio_s_old = 0,
      this.blocktype_old = e1(2),
      this.nsPsy = new ct(),
      this.VBR_seek_table = new ht(),
      this.PSY = this.ATH = null,
      this.nogap_current = this.nogap_total = 0,
      this.findPeakSample = this.findReplayGain = this.decode_on_the_fly = !0,
      this.AudiophileGain = this.RadioGain = this.PeakSample = 0,
      this.rgdata = null,
      this.noclipScale = this.noclipGainChange = 0,
      this.bitrate_stereoMode_Hist = q0([16, 5]),
      this.bitrate_blockType_Hist = q0([16, 6]),
      this.hip = this.pinfo = null,
      this.in_buffer_nsamples = 0,
      this.iteration_loop = this.in_buffer_1 = this.in_buffer_0 = null;
    for (var B = 0; B < this.en.length; B++) this.en[B] = new V2();
    for (B = 0; B < this.thm.length; B++) this.thm[B] = new V2();
    for (B = 0; B < this.header.length; B++) this.header[B] = new d();
  }
  function pt() {
    function d(P, D, u) {
      var n = 0;
      u <<= 1;
      var R = D + u, e = 4;
      do {
        var S, x = e >> 1, r = e, l = e << 1, s = l + r;
        e = l << 1;
        var h = D, m = h + x;
        do {
          var p = P[h + 0] - P[h + r],
            _ = P[h + 0] + P[h + r],
            i = P[h + l] - P[h + s],
            o = P[h + l] + P[h + s];
          P[h + l] = _ - o,
            P[h + 0] = _ + o,
            P[h + s] = p - i,
            P[h + r] = p + i,
            p = P[m + 0] - P[m + r],
            _ = P[m + 0] + P[m + r],
            i = r1.SQRT2 * P[m + s],
            o = r1.SQRT2 * P[m + l],
            P[m + l] = _ - o,
            P[m + 0] = _ + o,
            P[m + s] = p - i,
            P[m + r] = p + i,
            m += e,
            h += e;
        } while (h < R);
        var c = X[n + 0], t = X[n + 1];
        for (S = 1; S < x; S++) {
          var a = 1 - 2 * t * t, f = 2 * t * c;
          h = D + S, m = D + r - S;
          do {
            var E = f * P[h + r] - a * P[m + r];
            o = a * P[h + r] + f * P[m + r], p = P[h + 0] - o, _ = P[h + 0] + o;
            var A = P[m + 0] - E, I = P[m + 0] + E;
            E = f * P[h + s] - a * P[m + s],
              o = a * P[h + s] + f * P[m + s],
              i = P[h + l] - o,
              o = P[h + l] + o;
            var V = P[m + l] - E, H = P[m + l] + E;
            E = t * o - c * V,
              o = c * o + t * V,
              P[h + l] = _ - o,
              P[h + 0] = _ + o,
              P[m + s] = A - E,
              P[m + r] = A + E,
              E = c * H - t * i,
              o = t * H + c * i,
              P[m + l] = I - o,
              P[m + 0] = I + o,
              P[h + s] = p - E,
              P[h + r] = p + E,
              m += e,
              h += e;
          } while (h < R);
          a = c,
            c = a * X[n + 0] - t * X[n + 1],
            t = a * X[n + 1] + t * X[n + 0];
        }
        n += 2;
      } while (e < u);
    }
    var B = G(v.BLKSIZE),
      w = G(v.BLKSIZE_s / 2),
      X = [
        .9238795325112867,
        .3826834323650898,
        .9951847266721969,
        .0980171403295606,
        .9996988186962042,
        .02454122852291229,
        .9999811752826011,
        .006135884649154475,
      ],
      L = [
        0,
        128,
        64,
        192,
        32,
        160,
        96,
        224,
        16,
        144,
        80,
        208,
        48,
        176,
        112,
        240,
        8,
        136,
        72,
        200,
        40,
        168,
        104,
        232,
        24,
        152,
        88,
        216,
        56,
        184,
        120,
        248,
        4,
        132,
        68,
        196,
        36,
        164,
        100,
        228,
        20,
        148,
        84,
        212,
        52,
        180,
        116,
        244,
        12,
        140,
        76,
        204,
        44,
        172,
        108,
        236,
        28,
        156,
        92,
        220,
        60,
        188,
        124,
        252,
        2,
        130,
        66,
        194,
        34,
        162,
        98,
        226,
        18,
        146,
        82,
        210,
        50,
        178,
        114,
        242,
        10,
        138,
        74,
        202,
        42,
        170,
        106,
        234,
        26,
        154,
        90,
        218,
        58,
        186,
        122,
        250,
        6,
        134,
        70,
        198,
        38,
        166,
        102,
        230,
        22,
        150,
        86,
        214,
        54,
        182,
        118,
        246,
        14,
        142,
        78,
        206,
        46,
        174,
        110,
        238,
        30,
        158,
        94,
        222,
        62,
        190,
        126,
        254,
      ];
    this.fft_short = function (P, D, u, n, R) {
      for (P = 0; 3 > P; P++) {
        var e = v.BLKSIZE_s / 2,
          S = 65535 & 192 * (P + 1),
          x = v.BLKSIZE_s / 8 - 1;
        do {
          var r = L[x << 2] & 255,
            l = w[r] * n[u][R + r + S],
            s = w[127 - r] * n[u][R + r + S + 128],
            h = l - s;
          l += s;
          var m = w[r + 64] * n[u][R + r + S + 64];
          s = w[63 - r] * n[u][R + r + S + 192];
          var p = m - s;
          m += s,
            e -= 4,
            D[P][e + 0] = l + m,
            D[P][e + 2] = l - m,
            D[P][e + 1] = h + p,
            D[P][e + 3] = h - p,
            l = w[r + 1] * n[u][R + r + S + 1],
            s = w[126 - r] * n[u][R + r + S + 129],
            h = l - s,
            l += s,
            m = w[r + 65] * n[u][R + r + S + 65],
            s = w[62 - r] * n[u][R + r + S + 193],
            p = m - s,
            m += s,
            D[P][e + v.BLKSIZE_s / 2 + 0] = l + m,
            D[P][e + v.BLKSIZE_s / 2 + 2] = l - m,
            D[P][e + v.BLKSIZE_s / 2 + 1] = h + p,
            D[P][e + v.BLKSIZE_s / 2 + 3] = h - p;
        } while (0 <= --x);
        d(D[P], e, v.BLKSIZE_s / 2);
      }
    },
      this.fft_long = function (P, D, u, n, R) {
        P = v.BLKSIZE / 8 - 1;
        var e = v.BLKSIZE / 2;
        do {
          var S = L[P] & 255,
            x = B[S] * n[u][R + S],
            r = B[S + 512] * n[u][R + S + 512],
            l = x - r;
          x += r;
          var s = B[S + 256] * n[u][R + S + 256];
          r = B[S + 768] * n[u][R + S + 768];
          var h = s - r;
          s += r,
            e -= 4,
            D[e + 0] = x + s,
            D[e + 2] = x - s,
            D[e + 1] = l + h,
            D[e + 3] = l - h,
            x = B[S + 1] * n[u][R + S + 1],
            r = B[S + 513] * n[u][R + S + 513],
            l = x - r,
            x += r,
            s = B[S + 257] * n[u][R + S + 257],
            r = B[S + 769] * n[u][R + S + 769],
            h = s - r,
            s += r,
            D[e + v.BLKSIZE / 2 + 0] = x + s,
            D[e + v.BLKSIZE / 2 + 2] = x - s,
            D[e + v.BLKSIZE / 2 + 1] = l + h,
            D[e + v.BLKSIZE / 2 + 3] = l - h;
        } while (0 <= --P);
        d(D, e, v.BLKSIZE / 2);
      },
      this.init_fft = function (P) {
        for (P = 0; P < v.BLKSIZE; P++) {
          B[P] = .42 - .5 * Math.cos(2 * Math.PI * (P + .5) / v.BLKSIZE) +
            .08 * Math.cos(4 * Math.PI * (P + .5) / v.BLKSIZE);
        }
        for (P = 0; P < v.BLKSIZE_s / 2; P++) {w[P] = .5 *
            (1 - Math.cos(2 * Math.PI * (P + .5) / v.BLKSIZE_s));}
      };
  }
  function D2() {
    function d(g, M) {
      for (var T = 0, b = 0; b < v.BLKSIZE / 2; ++b) T += g[b] * M.ATH.eql_w[b];
      return T *= p;
    }
    function B(g, M, T, b, N, y) {
      if (M > g) {
        if (M < g * i) var O = M / g;
        else return g + M;
      } else {
        if (g >= M * i) return g + M;
        O = g / M;
      }
      return g += M,
        6 >= b + 3
          ? O >= _ ? g : (b = 0 | r1.FAST_LOG10_X(O, 16), g * a[b])
          : (b = 0 | r1.FAST_LOG10_X(O, 16),
            M = y != 0
              ? N.ATH.cb_s[T] * N.ATH.adjust
              : N.ATH.cb_l[T] * N.ATH.adjust,
            g < o * M
              ? g > M
                ? (T = 1,
                  13 >= b && (T = f[b]),
                  M = r1.FAST_LOG10_X(g / M, 10 / 15),
                  g * ((t[b] - T) * M + T))
                : 13 < b
                ? g
                : g * f[b]
              : g * t[b]);
    }
    function w(g, M, T) {
      if (0 > g && (g = 0), 0 > M && (M = 0), 0 >= g) return M;
      if (0 >= M) return g;
      var b = M > g ? M / g : g / M;
      return -2 <= T && 2 >= T
        ? b >= _ ? g + M : (T = 0 | r1.FAST_LOG10_X(b, 16), (g + M) * E[T])
        : b < i
        ? g + M
        : (g < M && (g = M), g);
    }
    function X(g, M, T, b, N) {
      var y, O, Q = 0, W = 0;
      for (y = O = 0; y < v.SBMAX_s; ++O, ++y) {
        var K = g.bo_s[y], k = g.npart_s;
        for (K = K < k ? K : k; O < K;) Q += M[O], W += T[O], O++;
        if (g.en[b].s[y][N] = Q, g.thm[b].s[y][N] = W, O >= k) {
          ++y;
          break;
        }
        W = g.PSY.bo_s_weight[y],
          k = 1 - W,
          Q = W * M[O],
          W *= T[O],
          g.en[b].s[y][N] += Q,
          g.thm[b].s[y][N] += W,
          Q = k * M[O],
          W = k * T[O];
      }
      for (; y < v.SBMAX_s; ++y) g.en[b].s[y][N] = 0, g.thm[b].s[y][N] = 0;
    }
    function L(g, M, T, b) {
      var N, y, O = 0, Q = 0;
      for (N = y = 0; N < v.SBMAX_l; ++y, ++N) {
        var W = g.bo_l[N], K = g.npart_l;
        for (W = W < K ? W : K; y < W;) O += M[y], Q += T[y], y++;
        if (g.en[b].l[N] = O, g.thm[b].l[N] = Q, y >= K) {
          ++N;
          break;
        }
        Q = g.PSY.bo_l_weight[N],
          K = 1 - Q,
          O = Q * M[y],
          Q *= T[y],
          g.en[b].l[N] += O,
          g.thm[b].l[N] += Q,
          O = K * M[y],
          Q = K * T[y];
      }
      for (; N < v.SBMAX_l; ++N) g.en[b].l[N] = 0, g.thm[b].l[N] = 0;
    }
    function P(g, M, T) {
      return 1 <= T ? g : 0 >= T ? M : 0 < M ? Math.pow(g / M, T) * M : 0;
    }
    function D(g, M) {
      for (var T = 309.07, b = 0; b < v.SBMAX_s - 1; b++) {
        for (var N = 0; 3 > N; N++) {
          var y = g.thm.s[b][N];
          if (0 < y) {
            y *= M;
            var O = g.en.s[b][N];
            O > y &&
              (T = O > 1e10 * y
                ? T + 23.02585092994046 * A[b]
                : T + A[b] * r1.FAST_LOG10(O / y));
          }
        }
      }
      return T;
    }
    function u(g, M) {
      for (var T = 281.0575, b = 0; b < v.SBMAX_l - 1; b++) {
        var N = g.thm.l[b];
        if (0 < N) {
          N *= M;
          var y = g.en.l[b];
          y > N &&
            (T = y > 1e10 * N
              ? T + 23.02585092994046 * I[b]
              : T + I[b] * r1.FAST_LOG10(y / N));
        }
      }
      return T;
    }
    function n(g, M, T, b, N) {
      var y, O;
      for (y = O = 0; y < g.npart_l; ++y) {
        var Q = 0, W = 0, K;
        for (K = 0; K < g.numlines_l[y]; ++K, ++O) {
          var k = M[O];
          Q += k, W < k && (W = k);
        }
        T[y] = Q, b[y] = W, N[y] = Q * g.rnumlines_l[y];
      }
    }
    function R(g, M, T, b) {
      var N = c.length - 1, y = 0, O = T[y] + T[y + 1];
      if (0 < O) {
        var Q = M[y];
        Q < M[y + 1] && (Q = M[y + 1]),
          O = 20 * (2 * Q - O) /
            (O * (g.numlines_l[y] + g.numlines_l[y + 1] - 1)),
          O |= 0,
          O > N && (O = N),
          b[y] = O;
      } else b[y] = 0;
      for (y = 1; y < g.npart_l - 1; y++) {
        O = T[y - 1] + T[y] + T[y + 1],
          0 < O
            ? (Q = M[y - 1],
              Q < M[y] && (Q = M[y]),
              Q < M[y + 1] && (Q = M[y + 1]),
              O = 20 * (3 * Q - O) /
                (O *
                  (g.numlines_l[y - 1] + g.numlines_l[y] + g.numlines_l[y + 1] -
                    1)),
              O |= 0,
              O > N && (O = N),
              b[y] = O)
            : b[y] = 0;
      }
      O = T[y - 1] + T[y],
        0 < O
          ? (Q = M[y - 1],
            Q < M[y] && (Q = M[y]),
            O = 20 * (2 * Q - O) /
              (O * (g.numlines_l[y - 1] + g.numlines_l[y] - 1)),
            O |= 0,
            O > N && (O = N),
            b[y] = O)
          : b[y] = 0;
    }
    function e(g, M, T, b, N, y, O) {
      var Q = 2 * y;
      N = 0 < y ? Math.pow(10, N) : 1;
      for (var W, K, k = 0; k < O; ++k) {
        var n1 = g[2][k],
          l1 = g[3][k],
          U = M[0][k],
          Z = M[1][k],
          m1 = M[2][k],
          t1 = M[3][k];
        U <= 1.58 * Z && Z <= 1.58 * U
          ? (W = T[k] * n1,
            K = Math.max(m1, Math.min(t1, T[k] * l1)),
            W = Math.max(t1, Math.min(m1, W)))
          : (K = m1, W = t1),
          0 < y &&
          (t1 = b[k] * N,
            U = Math.min(Math.max(U, t1), Math.max(Z, t1)),
            m1 = Math.max(K, t1),
            t1 = Math.max(W, t1),
            Z = m1 + t1,
            0 < Z && U * Q < Z && (U = U * Q / Z, m1 *= U, t1 *= U),
            K = Math.min(m1, K),
            W = Math.min(t1, W)),
          K > n1 && (K = n1),
          W > l1 && (W = l1),
          M[2][k] = K,
          M[3][k] = W;
      }
    }
    function S(g, M) {
      return g = 0 <= g ? 27 * -g : g * M,
        -72 >= g ? 0 : Math.exp(.2302585093 * g);
    }
    function x(g) {
      return 0 > g && (g = 0),
        g *= .001,
        13 * Math.atan(.76 * g) + 3.5 * Math.atan(g * g / 56.25);
    }
    function r(g, M, T, b, N, y, O, Q, W, K, k, n1) {
      var l1 = G(v.CBANDS + 1),
        U = Q / (15 < n1 ? 1152 : 384),
        Z = e1(v.HBLKSIZE),
        m1;
      Q /= W;
      var t1 = 0, y1 = 0;
      for (m1 = 0; m1 < v.CBANDS; m1++) {
        var j, c1 = x(Q * t1);
        for (l1[m1] = Q * t1, j = t1; .34 > x(Q * j) - c1 && j <= W / 2; j++);
        for (g[m1] = j - t1, y1 = m1 + 1; t1 < j;) Z[t1++] = m1;
        if (t1 > W / 2) {
          t1 = W / 2, ++m1;
          break;
        }
      }
      for (l1[m1] = Q * t1, t1 = 0; t1 < n1; t1++) {
        m1 = K[t1],
          c1 = K[t1 + 1],
          m1 = 0 | Math.floor(.5 + k * (m1 - .5)),
          0 > m1 && (m1 = 0),
          j = 0 | Math.floor(.5 + k * (c1 - .5)),
          j > W / 2 && (j = W / 2),
          T[t1] = (Z[m1] + Z[j]) / 2,
          M[t1] = Z[j],
          O[t1] = (U * c1 - l1[M[t1]]) / (l1[M[t1] + 1] - l1[M[t1]]),
          0 > O[t1] ? O[t1] = 0 : 1 < O[t1] && (O[t1] = 1),
          c1 = x(Q * K[t1] * k),
          c1 = Math.min(c1, 15.5) / 15.5,
          y[t1] = Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * c1)) - 2.5);
      }
      for (M = t1 = 0; M < y1; M++) {
        T = g[M],
          c1 = x(Q * t1),
          y = x(Q * (t1 + T - 1)),
          b[M] = .5 * (c1 + y),
          c1 = x(Q * (t1 - .5)),
          y = x(Q * (t1 + T - .5)),
          N[M] = y - c1,
          t1 += T;
      }
      return y1;
    }
    function l(g, M, T, b, N, y) {
      var O = x1([v.CBANDS, v.CBANDS]), Q = 0;
      if (y) {
        for (var W = 0; W < M; W++) {
          for (y = 0; y < M; y++) {
            var K = T[W] - T[y];
            if (K = 0 <= K ? 3 * K : 1.5 * K, .5 <= K && 2.5 >= K) {
              var k = K - .5;
              k = 8 * (k * k - 2 * k);
            } else k = 0;
            K += .474,
              K = 15.811389 + 7.5 * K - 17.5 * Math.sqrt(1 + K * K),
              -60 >= K
                ? k = 0
                : (K = Math.exp(.2302585093 * (k + K)), k = K / .6609193),
              K = k * b[y],
              O[W][y] = K * N[W];
          }
        }
      } else {for (y = 0; y < M; y++) {
          k = 15 + Math.min(21 / T[y], 12);
          var n1, l1;
          for (W = k, n1 = 0; 1e-20 < S(n1, W); --n1);
          var U = n1;
          for (l1 = 0; 1e-12 < Math.abs(l1 - U);) {
            n1 = (l1 + U) / 2, 0 < S(n1, W) ? l1 = n1 : U = n1;
          }
          for (K = U, n1 = 0; 1e-20 < S(n1, W); n1 += 1);
          for (U = 0, l1 = n1; 1e-12 < Math.abs(l1 - U);) {
            n1 = (l1 + U) / 2, 0 < S(n1, W) ? U = n1 : l1 = n1;
          }
          U = l1;
          var Z = 0;
          for (l1 = 0; 1e3 >= l1; ++l1) {
            n1 = K + l1 * (U - K) / 1e3, n1 = S(n1, W), Z += n1;
          }
          for (n1 = 1001 / (Z * (U - K)), W = 0; W < M; W++) {
            K = n1 * S(T[W] - T[y], k) * b[y], O[W][y] = K * N[W];
          }
        }}
      for (W = 0; W < M; W++) {
        for (y = 0; y < M && !(0 < O[W][y]); y++);
        for (g[W][0] = y, y = M - 1; 0 < y && !(0 < O[W][y]); y--);
        g[W][1] = y, Q += g[W][1] - g[W][0] + 1;
      }
      for (T = G(Q), W = b = 0; W < M; W++) {
        for (y = g[W][0]; y <= g[W][1]; y++) {
          T[b++] = O[W][y];
        }
      }
      return T;
    }
    function s(g) {
      return g = x(g),
        g = Math.min(g, 15.5) / 15.5,
        Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * g)) - 2.5);
    }
    function h(g, M) {
      return -.3 > g && (g = 3410),
        g = Math.max(.1, g / 1e3),
        3.64 * Math.pow(g, -.8) - 6.8 * Math.exp(-.6 * Math.pow(g - 3.4, 2)) +
        6 * Math.exp(-.15 * Math.pow(g - 8.7, 2)) +
        .001 * (.6 + .04 * M) * Math.pow(g, 4);
    }
    var m = new pt(),
      p = 1 / 217621504 / (v.BLKSIZE / 2),
      _,
      i,
      o,
      c = [1, .79433, .63096, .63096, .63096, .63096, .63096, .25119, .11749],
      t = [
        3.3246 * 3.3246,
        3.23837 * 3.23837,
        9.9500500969,
        9.0247369744,
        8.1854926609,
        7.0440875649,
        2.46209 * 2.46209,
        2.284 * 2.284,
        4.4892710641,
        1.96552 * 1.96552,
        1.82335 * 1.82335,
        1.69146 * 1.69146,
        2.4621061921,
        2.1508568964,
        1.37074 * 1.37074,
        1.31036 * 1.31036,
        1.5691069696,
        1.4555939904,
        1.16203 * 1.16203,
        1.2715945225,
        1.09428 * 1.09428,
        1.0659 * 1.0659,
        1.0779838276,
        1.0382591025,
        1,
      ],
      a = [
        1.7782755904,
        1.35879 * 1.35879,
        1.38454 * 1.38454,
        1.39497 * 1.39497,
        1.40548 * 1.40548,
        1.3537 * 1.3537,
        1.6999465924,
        1.22321 * 1.22321,
        1.3169398564,
        1,
      ],
      f = [
        5.5396212496,
        2.29259 * 2.29259,
        4.9868695969,
        2.12675 * 2.12675,
        2.02545 * 2.02545,
        1.87894 * 1.87894,
        1.74303 * 1.74303,
        1.61695 * 1.61695,
        2.2499700001,
        1.39148 * 1.39148,
        1.29083 * 1.29083,
        1.19746 * 1.19746,
        1.2339655056,
        1.0779838276,
      ],
      E = [
        1.7782755904,
        1.35879 * 1.35879,
        1.38454 * 1.38454,
        1.39497 * 1.39497,
        1.40548 * 1.40548,
        1.3537 * 1.3537,
        1.6999465924,
        1.22321 * 1.22321,
        1.3169398564,
        1,
      ],
      A = [11.8, 13.6, 17.2, 32, 46.5, 51.3, 57.5, 67.1, 71.5, 84.6, 97.6, 130],
      I = [
        6.8,
        5.8,
        5.8,
        6.4,
        6.5,
        9.9,
        12.1,
        14.4,
        15,
        18.9,
        21.6,
        26.9,
        34.2,
        40.2,
        46.8,
        56.5,
        60.7,
        73.9,
        85.7,
        93.4,
        126.1,
      ],
      V = [
        -1730326e-23,
        -.01703172,
        -1349528e-23,
        .0418072,
        -673278e-22,
        -.0876324,
        -30835e-21,
        .1863476,
        -1104424e-22,
        -.627638,
      ];
    this.L3psycho_anal_ns = function (g, M, T, b, N, y, O, Q, W, K) {
      var k = g.internal_flags,
        n1 = x1([2, v.BLKSIZE]),
        l1 = x1([2, 3, v.BLKSIZE_s]),
        U = G(v.CBANDS + 1),
        Z = G(v.CBANDS + 1),
        m1 = G(v.CBANDS + 2),
        t1 = e1(2),
        y1 = e1(2),
        j,
        c1,
        F,
        p1,
        Q1,
        E1,
        J,
        K1 = x1([2, 576]),
        j1 = e1(v.CBANDS + 2),
        q = e1(v.CBANDS + 2);
      r0.fill(q, 0);
      var B1 = k.channels_out;
      g.mode == M1.JOINT_STEREO && (B1 = 4);
      var z = g.VBR == C.vbr_off
        ? k.ResvMax == 0 ? 0 : k.ResvSize / k.ResvMax * .5
        : g.VBR == C.vbr_rh || g.VBR == C.vbr_mtrh || g.VBR == C.vbr_mt
        ? .6
        : 1;
      for (j = 0; j < k.channels_out; j++) {
        var t0 = M[j], i0 = T + 576 - 350 - 21 + 192;
        for (F = 0; 576 > F; F++) {
          var k1, O1 = t0[i0 + F + 10];
          for (p1 = k1 = 0; 9 > p1; p1 += 2) {
            O1 += V[p1] * (t0[i0 + F + p1] + t0[i0 + F + 21 - p1]),
              k1 += V[p1 + 1] *
                (t0[i0 + F + p1 + 1] + t0[i0 + F + 21 - p1 - 1]);
          }
          K1[j][F] = O1 + k1;
        }
        N[b][j].en.assign(k.en[j]),
          N[b][j].thm.assign(k.thm[j]),
          2 < B1 &&
          (y[b][j].en.assign(k.en[j + 2]), y[b][j].thm.assign(k.thm[j + 2]));
      }
      for (j = 0; j < B1; j++) {
        var A1 = G(12),
          Z1 = [0, 0, 0, 0],
          X0 = G(12),
          L0 = 1,
          P2 = G(v.CBANDS),
          l2 = G(v.CBANDS),
          T1 = [0, 0, 0, 0],
          g2 = G(v.HBLKSIZE),
          I2 = x1([3, v.HBLKSIZE_s]);
        for (F = 0; 3 > F; F++) {
          A1[F] = k.nsPsy.last_en_subshort[j][F + 6],
            X0[F] = A1[F] / k.nsPsy.last_en_subshort[j][F + 4],
            Z1[0] += A1[F];
        }
        if (j == 2) {
          for (F = 0; 576 > F; F++) {
            var o0 = K1[0][F], S2 = K1[1][F];
            K1[0][F] = o0 + S2, K1[1][F] = o0 - S2;
          }
        }
        var a2 = K1[j & 1], H0 = 0;
        for (F = 0; 9 > F; F++) {
          for (var R2 = H0 + 64, X1 = 1; H0 < R2; H0++) {
            X1 < Math.abs(a2[H0]) && (X1 = Math.abs(a2[H0]));
          }
          k.nsPsy.last_en_subshort[j][F] = A1[F + 3] = X1,
            Z1[1 + F / 3] += X1,
            X1 = X1 > A1[F + 3 - 2]
              ? X1 / A1[F + 3 - 2]
              : A1[F + 3 - 2] > 10 * X1
              ? A1[F + 3 - 2] / (10 * X1)
              : 0,
            X0[F + 3] = X1;
        }
        if (g.analysis) {
          var M2 = X0[0];
          for (F = 1; 12 > F; F++) M2 < X0[F] && (M2 = X0[F]);
          k.pinfo.ers[b][j] = k.pinfo.ers_save[j], k.pinfo.ers_save[j] = M2;
        }
        var f2 = j == 3 ? k.nsPsy.attackthre_s : k.nsPsy.attackthre;
        for (F = 0; 12 > F; F++) {
          T1[F / 3] == 0 && X0[F] > f2 && (T1[F / 3] = F % 3 + 1);
        }
        for (F = 1; 4 > F; F++) {
          1.7 > (Z1[F - 1] > Z1[F] ? Z1[F - 1] / Z1[F] : Z1[F] / Z1[F - 1]) &&
            (T1[F] = 0, F == 1 && (T1[0] = 0));
        }
        T1[0] != 0 && k.nsPsy.lastAttacks[j] != 0 && (T1[0] = 0),
          (k.nsPsy.lastAttacks[j] == 3 || T1[0] + T1[1] + T1[2] + T1[3] != 0) &&
          (L0 = 0,
            T1[1] != 0 && T1[0] != 0 && (T1[1] = 0),
            T1[2] != 0 && T1[1] != 0 && (T1[2] = 0),
            T1[3] != 0 && T1[2] != 0 && (T1[3] = 0)),
          2 > j ? y1[j] = L0 : L0 == 0 && (y1[0] = y1[1] = 0),
          W[j] = k.tot_ener[j];
        var $ = g,
          N1 = g2,
          t2 = I2,
          G1 = n1,
          M0 = j & 1,
          s0 = l1,
          z1 = j & 1,
          u0 = b,
          V1 = j,
          d1 = M,
          A2 = T,
          e0 = $.internal_flags;
        if (2 > V1) {
          m.fft_long(e0, G1[M0], V1, d1, A2),
            m.fft_short(e0, s0[z1], V1, d1, A2);
        } else if (V1 == 2) {
          for (var f1 = v.BLKSIZE - 1; 0 <= f1; --f1) {
            var W0 = G1[M0 + 0][f1], Z0 = G1[M0 + 1][f1];
            G1[M0 + 0][f1] = (W0 + Z0) * r1.SQRT2 * .5,
              G1[M0 + 1][f1] = (W0 - Z0) * r1.SQRT2 * .5;
          }
          for (var P1 = 2; 0 <= P1; --P1) {
            for (f1 = v.BLKSIZE_s - 1; 0 <= f1; --f1) {
              W0 = s0[z1 + 0][P1][f1],
                Z0 = s0[z1 + 1][P1][f1],
                s0[z1 + 0][P1][f1] = (W0 + Z0) * r1.SQRT2 * .5,
                s0[z1 + 1][P1][f1] = (W0 - Z0) * r1.SQRT2 * .5;
            }
          }
        }
        for (
          N1[0] = G1[M0 + 0][0], N1[0] *= N1[0], f1 = v.BLKSIZE / 2 - 1;
          0 <= f1;
          --f1
        ) {
          var s2 = G1[M0 + 0][v.BLKSIZE / 2 - f1],
            x0 = G1[M0 + 0][v.BLKSIZE / 2 + f1];
          N1[v.BLKSIZE / 2 - f1] = .5 * (s2 * s2 + x0 * x0);
        }
        for (P1 = 2; 0 <= P1; --P1) {
          for (
            t2[P1][0] = s0[z1 + 0][P1][0],
              t2[P1][0] *= t2[P1][0],
              f1 = v.BLKSIZE_s / 2 - 1;
            0 <= f1;
            --f1
          ) {
            s2 = s0[z1 + 0][P1][v.BLKSIZE_s / 2 - f1],
              x0 = s0[z1 + 0][P1][v.BLKSIZE_s / 2 + f1],
              t2[P1][v.BLKSIZE_s / 2 - f1] = .5 * (s2 * s2 + x0 * x0);
          }
        }
        var R1 = 0;
        for (f1 = 11; f1 < v.HBLKSIZE; f1++) R1 += N1[f1];
        if (e0.tot_ener[V1] = R1, $.analysis) {
          for (f1 = 0; f1 < v.HBLKSIZE; f1++) {
            e0.pinfo.energy[u0][V1][f1] = e0.pinfo.energy_save[V1][f1],
              e0.pinfo.energy_save[V1][f1] = N1[f1];
          }
          e0.pinfo.pe[u0][V1] = e0.pe[V1];
        }
        for (
          $.athaa_loudapprox == 2 && 2 > V1 &&
          (e0.loudness_sq[u0][V1] = e0.loudness_sq_save[V1],
            e0.loudness_sq_save[V1] = d(N1, e0)),
            n(k, g2, U, P2, l2),
            R(k, P2, l2, j1),
            J = 0;
          3 > J;
          J++
        ) {
          var o1 = void 0,
            N0 = void 0,
            Y0 = I2,
            n0 = Z,
            l0 = m1,
            y0 = j,
            O2 = J,
            Y1 = g.internal_flags;
          for (o1 = N0 = 0; o1 < Y1.npart_s; ++o1) {
            for (
              var e2 = 0, X2 = 0, c0 = Y1.numlines_s[o1], L2 = 0;
              L2 < c0;
              ++L2, ++N0
            ) {
              var D0 = Y0[O2][N0];
              e2 += D0, X2 < D0 && (X2 = D0);
            }
            n0[o1] = e2;
          }
          for (N0 = o1 = 0; o1 < Y1.npart_s; o1++) {
            var F0 = Y1.s3ind_s[o1][0], a0 = Y1.s3_ss[N0++] * n0[F0];
            for (++F0; F0 <= Y1.s3ind_s[o1][1];) {
              a0 += Y1.s3_ss[N0] * n0[F0], ++N0, ++F0;
            }
            var V0 = 2 * Y1.nb_s1[y0][o1];
            l0[o1] = Math.min(a0, V0),
              Y1.blocktype_old[y0 & 1] == v.SHORT_TYPE &&
              (V0 = 16 * Y1.nb_s2[y0][o1], l0[o1] = Math.min(V0, l0[o1])),
              Y1.nb_s2[y0][o1] = Y1.nb_s1[y0][o1],
              Y1.nb_s1[y0][o1] = a0;
          }
          for (; o1 <= v.CBANDS; ++o1) n0[o1] = 0, l0[o1] = 0;
          for (X(k, Z, m1, j, J), E1 = 0; E1 < v.SBMAX_s; E1++) {
            var $1 = k.thm[j].s[E1][J];
            if ($1 *= .8, 2 <= T1[J] || T1[J + 1] == 1) {
              var k0 = J != 0 ? J - 1 : 2;
              X1 = P(k.thm[j].s[E1][k0], $1, .6 * z), $1 = Math.min($1, X1);
            }
            T1[J] == 1
              ? (k0 = J != 0 ? J - 1 : 2,
                X1 = P(k.thm[j].s[E1][k0], $1, .3 * z),
                $1 = Math.min($1, X1))
              : (J != 0 && T1[J - 1] == 3 ||
                J == 0 && k.nsPsy.lastAttacks[j] == 3) &&
                (k0 = J != 2 ? J + 1 : 0,
                  X1 = P(k.thm[j].s[E1][k0], $1, .3 * z),
                  $1 = Math.min($1, X1));
            var h2 = A1[3 * J + 3] + A1[3 * J + 4] + A1[3 * J + 5];
            6 * A1[3 * J + 5] < h2 &&
            ($1 *= .5, 6 * A1[3 * J + 4] < h2 && ($1 *= .5)),
              k.thm[j].s[E1][J] = $1;
          }
        }
        for (
          k.nsPsy.lastAttacks[j] = T1[2], c1 = Q1 = 0;
          c1 < k.npart_l;
          c1++
        ) {
          for (
            var p0 = k.s3ind[c1][0],
              z0 = U[p0] * c[j1[p0]],
              A0 = k.s3_ll[Q1++] * z0;
            ++p0 <= k.s3ind[c1][1];
          ) {
            z0 = U[p0] * c[j1[p0]],
              A0 = B(A0, k.s3_ll[Q1++] * z0, p0, p0 - c1, k, 0);
          }
          A0 *= .158489319246111,
            m1[c1] = k.blocktype_old[j & 1] == v.SHORT_TYPE ? A0 : P(
              Math.min(A0, Math.min(2 * k.nb_1[j][c1], 16 * k.nb_2[j][c1])),
              A0,
              z,
            ),
            k.nb_2[j][c1] = k.nb_1[j][c1],
            k.nb_1[j][c1] = A0;
        }
        for (; c1 <= v.CBANDS; ++c1) U[c1] = 0, m1[c1] = 0;
        L(k, U, m1, j);
      }
      if (
        (g.mode == M1.STEREO || g.mode == M1.JOINT_STEREO) && 0 < g.interChRatio
      ) {
        var P0 = g.interChRatio, h1 = g.internal_flags;
        if (1 < h1.channels_out) {
          for (var W1 = 0; W1 < v.SBMAX_l; W1++) {
            var n2 = h1.thm[0].l[W1], K0 = h1.thm[1].l[W1];
            h1.thm[0].l[W1] += K0 * P0, h1.thm[1].l[W1] += n2 * P0;
          }
          for (W1 = 0; W1 < v.SBMAX_s; W1++) {
            for (var I0 = 0; 3 > I0; I0++) {
              n2 = h1.thm[0].s[W1][I0],
                K0 = h1.thm[1].s[W1][I0],
                h1.thm[0].s[W1][I0] += K0 * P0,
                h1.thm[1].s[W1][I0] += n2 * P0;
            }
          }
        }
      }
      if (g.mode == M1.JOINT_STEREO) {
        for (var q1, u1 = 0; u1 < v.SBMAX_l; u1++) {
          if (
            !(k.thm[0].l[u1] > 1.58 * k.thm[1].l[u1] ||
              k.thm[1].l[u1] > 1.58 * k.thm[0].l[u1])
          ) {
            var J1 = k.mld_l[u1] * k.en[3].l[u1],
              m0 = Math.max(k.thm[2].l[u1], Math.min(k.thm[3].l[u1], J1));
            J1 = k.mld_l[u1] * k.en[2].l[u1];
            var B2 = Math.max(k.thm[3].l[u1], Math.min(k.thm[2].l[u1], J1));
            k.thm[2].l[u1] = m0, k.thm[3].l[u1] = B2;
          }
        }
        for (u1 = 0; u1 < v.SBMAX_s; u1++) {
          for (var w1 = 0; 3 > w1; w1++) {
            k.thm[0].s[u1][w1] > 1.58 * k.thm[1].s[u1][w1] ||
              k.thm[1].s[u1][w1] > 1.58 * k.thm[0].s[u1][w1] ||
              (J1 = k.mld_s[u1] * k.en[3].s[u1][w1],
                m0 = Math.max(
                  k.thm[2].s[u1][w1],
                  Math.min(k.thm[3].s[u1][w1], J1),
                ),
                J1 = k.mld_s[u1] * k.en[2].s[u1][w1],
                B2 = Math.max(
                  k.thm[3].s[u1][w1],
                  Math.min(k.thm[2].s[u1][w1], J1),
                ),
                k.thm[2].s[u1][w1] = m0,
                k.thm[3].s[u1][w1] = B2);
          }
        }
        if (q1 = g.msfix, 0 < Math.abs(q1)) {
          var C0 = q1, T2 = C0, u2 = Math.pow(10, g.ATHlower * k.ATH.adjust);
          C0 *= 2, T2 *= 2;
          for (var b1 = 0; b1 < v.SBMAX_l; b1++) {
            var _1 = k.ATH.cb_l[k.bm_l[b1]] * u2,
              _0 = Math.min(
                Math.max(k.thm[0].l[b1], _1),
                Math.max(k.thm[1].l[b1], _1),
              ),
              f0 = Math.max(k.thm[2].l[b1], _1),
              B0 = Math.max(k.thm[3].l[b1], _1);
            if (_0 * C0 < f0 + B0) {
              var E0 = _0 * T2 / (f0 + B0);
              f0 *= E0, B0 *= E0;
            }
            k.thm[2].l[b1] = Math.min(f0, k.thm[2].l[b1]),
              k.thm[3].l[b1] = Math.min(B0, k.thm[3].l[b1]);
          }
          for (u2 *= v.BLKSIZE_s / v.BLKSIZE, b1 = 0; b1 < v.SBMAX_s; b1++) {
            for (var D1 = 0; 3 > D1; D1++) {
              _1 = k.ATH.cb_s[k.bm_s[b1]] * u2,
                _0 = Math.min(
                  Math.max(k.thm[0].s[b1][D1], _1),
                  Math.max(k.thm[1].s[b1][D1], _1),
                ),
                f0 = Math.max(k.thm[2].s[b1][D1], _1),
                B0 = Math.max(k.thm[3].s[b1][D1], _1),
                _0 * C0 < f0 + B0 &&
                (E0 = _0 * C0 / (f0 + B0), f0 *= E0, B0 *= E0),
                k.thm[2].s[b1][D1] = Math.min(k.thm[2].s[b1][D1], f0),
                k.thm[3].s[b1][D1] = Math.min(k.thm[3].s[b1][D1], B0);
            }
          }
        }
      }
      var v0 = g.internal_flags;
      g.short_blocks != L1.short_block_coupled || y1[0] != 0 && y1[1] != 0 ||
        (y1[0] = y1[1] = 0);
      for (var F1 = 0; F1 < v0.channels_out; F1++) {
        t1[F1] = v.NORM_TYPE,
          g.short_blocks == L1.short_block_dispensed && (y1[F1] = 1),
          g.short_blocks == L1.short_block_forced && (y1[F1] = 0),
          y1[F1] != 0
            ? v0.blocktype_old[F1] == v.SHORT_TYPE && (t1[F1] = v.STOP_TYPE)
            : (t1[F1] = v.SHORT_TYPE,
              v0.blocktype_old[F1] == v.NORM_TYPE &&
              (v0.blocktype_old[F1] = v.START_TYPE),
              v0.blocktype_old[F1] == v.STOP_TYPE &&
              (v0.blocktype_old[F1] = v.SHORT_TYPE)),
          K[F1] = v0.blocktype_old[F1],
          v0.blocktype_old[F1] = t1[F1];
      }
      for (j = 0; j < B1; j++) {
        var I1 = 0;
        if (1 < j) {
          var U0 = Q;
          I1 = -2;
          var _2 = v.NORM_TYPE;
          (K[0] == v.SHORT_TYPE || K[1] == v.SHORT_TYPE) && (_2 = v.SHORT_TYPE);
          var j0 = y[b][j - 2];
        } else U0 = O, I1 = 0, _2 = K[j], j0 = N[b][j];
        U0[I1 + j] = _2 == v.SHORT_TYPE
          ? D(j0, k.masking_lower)
          : u(j0, k.masking_lower),
          g.analysis && (k.pinfo.pe[b][j] = U0[I1 + j]);
      }
      return 0;
    };
    var H = [
      -1730326e-23,
      -.01703172,
      -1349528e-23,
      .0418072,
      -673278e-22,
      -.0876324,
      -30835e-21,
      .1863476,
      -1104424e-22,
      -.627638,
    ];
    this.L3psycho_anal_vbr = function (g, M, T, b, N, y, O, Q, W, K) {
      for (
        var k = g.internal_flags,
          n1,
          l1,
          U = G(v.HBLKSIZE),
          Z = x1([3, v.HBLKSIZE_s]),
          m1 = x1([2, v.BLKSIZE]),
          t1 = x1([2, 3, v.BLKSIZE_s]),
          y1 = x1([4, v.CBANDS]),
          j = x1([4, v.CBANDS]),
          c1 = x1([4, 3]),
          F = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
          p1 = e1(2),
          Q1 = g.mode == M1.JOINT_STEREO ? 4 : k.channels_out,
          E1 = x1([2, 576]),
          J = g.internal_flags,
          K1 = J.channels_out,
          j1 = g.mode == M1.JOINT_STEREO ? 4 : K1,
          q = 0;
        q < K1;
        q++
      ) {
        firbuf = M[q];
        for (var B1 = T + 576 - 350 - 21 + 192, z = 0; 576 > z; z++) {
          for (var t0, i0 = firbuf[B1 + z + 10], k1 = t0 = 0; 9 > k1; k1 += 2) {
            i0 += H[k1] * (firbuf[B1 + z + k1] + firbuf[B1 + z + 21 - k1]),
              t0 += H[k1 + 1] *
                (firbuf[B1 + z + k1 + 1] + firbuf[B1 + z + 21 - k1 - 1]);
          }
          E1[q][z] = i0 + t0;
        }
        N[b][q].en.assign(J.en[q]),
          N[b][q].thm.assign(J.thm[q]),
          2 < j1 &&
          (y[b][q].en.assign(J.en[q + 2]), y[b][q].thm.assign(J.thm[q + 2]));
      }
      for (q = 0; q < j1; q++) {
        var O1 = G(12),
          A1 = G(12),
          Z1 = [0, 0, 0, 0],
          X0 = E1[q & 1],
          L0 = 0,
          P2 = q == 3 ? J.nsPsy.attackthre_s : J.nsPsy.attackthre,
          l2 = 1;
        if (q == 2) {
          for (z = 0, k1 = 576; 0 < k1; ++z, --k1) {
            var T1 = E1[0][z], g2 = E1[1][z];
            E1[0][z] = T1 + g2, E1[1][z] = T1 - g2;
          }
        }
        for (z = 0; 3 > z; z++) {
          A1[z] = J.nsPsy.last_en_subshort[q][z + 6],
            O1[z] = A1[z] / J.nsPsy.last_en_subshort[q][z + 4],
            Z1[0] += A1[z];
        }
        for (z = 0; 9 > z; z++) {
          for (var I2 = L0 + 64, o0 = 1; L0 < I2; L0++) {
            o0 < Math.abs(X0[L0]) && (o0 = Math.abs(X0[L0]));
          }
          J.nsPsy.last_en_subshort[q][z] = A1[z + 3] = o0,
            Z1[1 + z / 3] += o0,
            o0 = o0 > A1[z + 3 - 2]
              ? o0 / A1[z + 3 - 2]
              : A1[z + 3 - 2] > 10 * o0
              ? A1[z + 3 - 2] / (10 * o0)
              : 0,
            O1[z + 3] = o0;
        }
        for (z = 0; 3 > z; ++z) {
          var S2 = A1[3 * z + 3] + A1[3 * z + 4] + A1[3 * z + 5], a2 = 1;
          6 * A1[3 * z + 5] < S2 &&
          (a2 *= .5, 6 * A1[3 * z + 4] < S2 && (a2 *= .5)), c1[q][z] = a2;
        }
        if (g.analysis) {
          var H0 = O1[0];
          for (z = 1; 12 > z; z++) H0 < O1[z] && (H0 = O1[z]);
          J.pinfo.ers[b][q] = J.pinfo.ers_save[q], J.pinfo.ers_save[q] = H0;
        }
        for (z = 0; 12 > z; z++) {
          F[q][z / 3] == 0 && O1[z] > P2 && (F[q][z / 3] = z % 3 + 1);
        }
        for (z = 1; 4 > z; z++) {
          var R2 = Z1[z - 1], X1 = Z1[z];
          4e4 > Math.max(R2, X1) && R2 < 1.7 * X1 && X1 < 1.7 * R2 &&
            (z == 1 && F[q][0] <= F[q][z] && (F[q][0] = 0), F[q][z] = 0);
        }
        F[q][0] <= J.nsPsy.lastAttacks[q] && (F[q][0] = 0),
          (J.nsPsy.lastAttacks[q] == 3 ||
            F[q][0] + F[q][1] + F[q][2] + F[q][3] != 0) &&
          (l2 = 0,
            F[q][1] != 0 && F[q][0] != 0 && (F[q][1] = 0),
            F[q][2] != 0 && F[q][1] != 0 && (F[q][2] = 0),
            F[q][3] != 0 && F[q][2] != 0 && (F[q][3] = 0)),
          2 > q ? p1[q] = l2 : l2 == 0 && (p1[0] = p1[1] = 0),
          W[q] = J.tot_ener[q];
      }
      var M2 = g.internal_flags;
      g.short_blocks != L1.short_block_coupled || p1[0] != 0 && p1[1] != 0 ||
        (p1[0] = p1[1] = 0);
      for (var f2 = 0; f2 < M2.channels_out; f2++) {
        g.short_blocks == L1.short_block_dispensed && (p1[f2] = 1),
          g.short_blocks == L1.short_block_forced && (p1[f2] = 0);
      }
      for (var $ = 0; $ < Q1; $++) {
        var N1 = $ & 1;
        n1 = m1;
        var t2 = g,
          G1 = $,
          M0 = b,
          s0 = U,
          z1 = n1,
          u0 = N1,
          V1 = t2.internal_flags;
        if (2 > G1) m.fft_long(V1, z1[u0], G1, M, T);
        else if (G1 == 2) {
          for (var d1 = v.BLKSIZE - 1; 0 <= d1; --d1) {
            var A2 = z1[u0 + 0][d1], e0 = z1[u0 + 1][d1];
            z1[u0 + 0][d1] = (A2 + e0) * r1.SQRT2 * .5,
              z1[u0 + 1][d1] = (A2 - e0) * r1.SQRT2 * .5;
          }
        }
        for (
          s0[0] = z1[u0 + 0][0], s0[0] *= s0[0], d1 = v.BLKSIZE / 2 - 1;
          0 <= d1;
          --d1
        ) {
          var f1 = z1[u0 + 0][v.BLKSIZE / 2 - d1],
            W0 = z1[u0 + 0][v.BLKSIZE / 2 + d1];
          s0[v.BLKSIZE / 2 - d1] = .5 * (f1 * f1 + W0 * W0);
        }
        var Z0 = 0;
        for (d1 = 11; d1 < v.HBLKSIZE; d1++) Z0 += s0[d1];
        if (V1.tot_ener[G1] = Z0, t2.analysis) {
          for (d1 = 0; d1 < v.HBLKSIZE; d1++) {
            V1.pinfo.energy[M0][G1][d1] = V1.pinfo.energy_save[G1][d1],
              V1.pinfo.energy_save[G1][d1] = s0[d1];
          }
          V1.pinfo.pe[M0][G1] = V1.pe[G1];
        }
        var P1 = $, s2 = U, x0 = g.internal_flags;
        if (
          g.athaa_loudapprox == 2 && 2 > P1 &&
          (x0.loudness_sq[b][P1] = x0.loudness_sq_save[P1],
            x0.loudness_sq_save[P1] = d(s2, x0)), p1[N1] != 0
        ) {
          var R1 = void 0,
            o1 = k,
            N0 = U,
            Y0 = y1[$],
            n0 = j[$],
            l0 = $,
            y0 = G(v.CBANDS),
            O2 = G(v.CBANDS),
            Y1 = e1(v.CBANDS + 2);
          n(o1, N0, Y0, y0, O2), R(o1, y0, O2, Y1);
          var e2 = 0;
          for (R1 = 0; R1 < o1.npart_l; R1++) {
            var X2, c0 = o1.s3ind[R1][0], L2 = o1.s3ind[R1][1], D0 = 0, F0 = 0;
            D0 = Y1[c0], F0 += 1;
            var a0 = o1.s3_ll[e2] * Y0[c0] * c[Y1[c0]];
            for (++e2, ++c0; c0 <= L2;) {
              D0 += Y1[c0], F0 += 1;
              var V0 = o1.s3_ll[e2] * Y0[c0] * c[Y1[c0]];
              a0 = X2 = w(a0, V0, c0 - R1), ++e2, ++c0;
            }
            D0 = (1 + 2 * D0) / (2 * F0);
            var $1 = .5 * c[D0];
            if (a0 *= $1, o1.blocktype_old[l0 & 1] == v.SHORT_TYPE) {
              var k0 = 2 * o1.nb_1[l0][R1];
              n0[R1] = 0 < k0 ? Math.min(a0, k0) : Math.min(a0, .3 * Y0[R1]);
            } else {
              var h2 = 16 * o1.nb_2[l0][R1], p0 = 2 * o1.nb_1[l0][R1];
              0 >= h2 && (h2 = a0),
                0 >= p0 && (p0 = a0),
                k0 = o1.blocktype_old[l0 & 1] == v.NORM_TYPE
                  ? Math.min(p0, h2)
                  : p0,
                n0[R1] = Math.min(a0, k0);
            }
            o1.nb_2[l0][R1] = o1.nb_1[l0][R1],
              o1.nb_1[l0][R1] = a0,
              V0 = y0[R1],
              V0 *= o1.minval_l[R1],
              V0 *= $1,
              n0[R1] > V0 && (n0[R1] = V0),
              1 < o1.masking_lower && (n0[R1] *= o1.masking_lower),
              n0[R1] > Y0[R1] && (n0[R1] = Y0[R1]),
              1 > o1.masking_lower && (n0[R1] *= o1.masking_lower);
          }
          for (; R1 < v.CBANDS; ++R1) Y0[R1] = 0, n0[R1] = 0;
        } else {for (var z0 = k, A0 = $, P0 = 0; P0 < z0.npart_l; P0++) {
            z0.nb_2[A0][P0] = z0.nb_1[A0][P0], z0.nb_1[A0][P0] = 0;
          }}
      }
      for (
        p1[0] + p1[1] == 2 && g.mode == M1.JOINT_STEREO &&
        e(
          y1,
          j,
          k.mld_cb_l,
          k.ATH.cb_l,
          g.ATHlower * k.ATH.adjust,
          g.msfix,
          k.npart_l,
        ), $ = 0;
        $ < Q1;
        $++
      ) N1 = $ & 1, p1[N1] != 0 && L(k, y1[$], j[$], $);
      for (var h1 = 0; 3 > h1; h1++) {
        for ($ = 0; $ < Q1; ++$) {
          if (N1 = $ & 1, p1[N1] != 0) {
            var W1 = k, n2 = $;
            if (h1 == 0) {
              for (var K0 = 0; K0 < W1.npart_s; K0++) {
                W1.nb_s2[n2][K0] = W1.nb_s1[n2][K0], W1.nb_s1[n2][K0] = 0;
              }
            }
          } else {
            l1 = t1;
            var I0 = $,
              q1 = h1,
              u1 = Z,
              J1 = l1,
              m0 = N1,
              B2 = g.internal_flags;
            if (
              q1 == 0 && 2 > I0 && m.fft_short(B2, J1[m0], I0, M, T), I0 == 2
            ) {
              for (var w1 = v.BLKSIZE_s - 1; 0 <= w1; --w1) {
                var C0 = J1[m0 + 0][q1][w1], T2 = J1[m0 + 1][q1][w1];
                J1[m0 + 0][q1][w1] = (C0 + T2) * r1.SQRT2 * .5,
                  J1[m0 + 1][q1][w1] = (C0 - T2) * r1.SQRT2 * .5;
              }
            }
            for (
              u1[q1][0] = J1[m0 + 0][q1][0],
                u1[q1][0] *= u1[q1][0],
                w1 = v.BLKSIZE_s / 2 - 1;
              0 <= w1;
              --w1
            ) {
              var u2 = J1[m0 + 0][q1][v.BLKSIZE_s / 2 - w1],
                b1 = J1[m0 + 0][q1][v.BLKSIZE_s / 2 + w1];
              u1[q1][v.BLKSIZE_s / 2 - w1] = .5 * (u2 * u2 + b1 * b1);
            }
            var _1 = void 0,
              _0 = void 0,
              f0 = void 0,
              B0 = Z,
              E0 = y1[$],
              D1 = j[$],
              v0 = $,
              F1 = h1,
              I1 = g.internal_flags,
              U0 = new float[v.CBANDS](),
              _2 = G(v.CBANDS),
              j0 = new int[v.CBANDS]();
            for (_1 = _0 = 0; _1 < I1.npart_s; ++_1) {
              var F2 = 0, K2 = 0, Q2 = I1.numlines_s[_1];
              for (f0 = 0; f0 < Q2; ++f0, ++_0) {
                var j2 = B0[F1][_0];
                F2 += j2, K2 < j2 && (K2 = j2);
              }
              E0[_1] = F2, U0[_1] = K2, _2[_1] = F2 / Q2;
            }
            for (; _1 < v.CBANDS; ++_1) U0[_1] = 0, _2[_1] = 0;
            var Q0 = I1,
              T0 = U0,
              r2 = _2,
              c2 = j0,
              p2 = c.length - 1,
              g1 = 0,
              C1 = r2[g1] + r2[g1 + 1];
            if (0 < C1) {
              var h0 = T0[g1];
              h0 < T0[g1 + 1] && (h0 = T0[g1 + 1]),
                C1 = 20 * (2 * h0 - C1) /
                  (C1 * (Q0.numlines_s[g1] + Q0.numlines_s[g1 + 1] - 1));
              var w0 = 0 | C1;
              w0 > p2 && (w0 = p2), c2[g1] = w0;
            } else c2[g1] = 0;
            for (g1 = 1; g1 < Q0.npart_s - 1; g1++) {
              C1 = r2[g1 - 1] + r2[g1] + r2[g1 + 1],
                0 < C1
                  ? (h0 = T0[g1 - 1],
                    h0 < T0[g1] && (h0 = T0[g1]),
                    h0 < T0[g1 + 1] && (h0 = T0[g1 + 1]),
                    C1 = 20 * (3 * h0 - C1) /
                      (C1 *
                        (Q0.numlines_s[g1 - 1] + Q0.numlines_s[g1] +
                          Q0.numlines_s[g1 + 1] - 1)),
                    w0 = 0 | C1,
                    w0 > p2 && (w0 = p2),
                    c2[g1] = w0)
                  : c2[g1] = 0;
            }
            for (
              C1 = r2[g1 - 1] + r2[g1],
                0 < C1
                  ? (h0 = T0[g1 - 1],
                    h0 < T0[g1] && (h0 = T0[g1]),
                    C1 = 20 * (2 * h0 - C1) /
                      (C1 * (Q0.numlines_s[g1 - 1] + Q0.numlines_s[g1] - 1)),
                    w0 = 0 | C1,
                    w0 > p2 && (w0 = p2),
                    c2[g1] = w0)
                  : c2[g1] = 0,
                _0 = _1 = 0;
              _1 < I1.npart_s;
              _1++
            ) {
              var O0 = I1.s3ind_s[_1][0],
                St = I1.s3ind_s[_1][1],
                H2 = j0[O0],
                $2 = 1,
                w2 = I1.s3_ss[_0] * E0[O0] * c[j0[O0]];
              for (++_0, ++O0; O0 <= St;) {
                H2 += j0[O0], $2 += 1;
                var m2 = I1.s3_ss[_0] * E0[O0] * c[j0[O0]];
                w2 = w(w2, m2, O0 - _1), ++_0, ++O0;
              }
              H2 = (1 + 2 * H2) / (2 * $2);
              var q2 = .5 * c[H2];
              w2 *= q2,
                D1[_1] = w2,
                I1.nb_s2[v0][_1] = I1.nb_s1[v0][_1],
                I1.nb_s1[v0][_1] = w2,
                m2 = U0[_1],
                m2 *= I1.minval_s[_1],
                m2 *= q2,
                D1[_1] > m2 && (D1[_1] = m2),
                1 < I1.masking_lower && (D1[_1] *= I1.masking_lower),
                D1[_1] > E0[_1] && (D1[_1] = E0[_1]),
                1 > I1.masking_lower && (D1[_1] *= I1.masking_lower);
            }
            for (; _1 < v.CBANDS; ++_1) E0[_1] = 0, D1[_1] = 0;
          }
        }
        for (
          p1[0] + p1[1] == 0 && g.mode == M1.JOINT_STEREO &&
          e(
            y1,
            j,
            k.mld_cb_s,
            k.ATH.cb_s,
            g.ATHlower * k.ATH.adjust,
            g.msfix,
            k.npart_s,
          ), $ = 0;
          $ < Q1;
          ++$
        ) N1 = $ & 1, p1[N1] == 0 && X(k, y1[$], j[$], $, h1);
      }
      for ($ = 0; $ < Q1; $++) {
        if (N1 = $ & 1, p1[N1] == 0) {
          for (var i2 = 0; i2 < v.SBMAX_s; i2++) {
            var J2 = G(3);
            for (h1 = 0; 3 > h1; h1++) {
              var g0 = k.thm[$].s[i2][h1];
              if (g0 *= .8, 2 <= F[$][h1] || F[$][h1 + 1] == 1) {
                var d2 = h1 != 0 ? h1 - 1 : 2,
                  b2 = P(k.thm[$].s[i2][d2], g0, .36);
                g0 = Math.min(g0, b2);
              } else {F[$][h1] == 1
                  ? (d2 = h1 != 0 ? h1 - 1 : 2,
                    b2 = P(k.thm[$].s[i2][d2], g0, .18),
                    g0 = Math.min(g0, b2))
                  : (h1 != 0 && F[$][h1 - 1] == 3 ||
                    h1 == 0 && k.nsPsy.lastAttacks[$] == 3) &&
                    (d2 = h1 != 2 ? h1 + 1 : 0,
                      b2 = P(k.thm[$].s[i2][d2], g0, .18),
                      g0 = Math.min(g0, b2));}
              g0 *= c1[$][h1], J2[h1] = g0;
            }
            for (h1 = 0; 3 > h1; h1++) k.thm[$].s[i2][h1] = J2[h1];
          }
        }
      }
      for ($ = 0; $ < Q1; $++) k.nsPsy.lastAttacks[$] = F[$][2];
      for (var $0 = g.internal_flags, d0 = 0; d0 < $0.channels_out; d0++) {
        var G2 = v.NORM_TYPE;
        p1[d0] != 0
          ? $0.blocktype_old[d0] == v.SHORT_TYPE && (G2 = v.STOP_TYPE)
          : (G2 = v.SHORT_TYPE,
            $0.blocktype_old[d0] == v.NORM_TYPE &&
            ($0.blocktype_old[d0] = v.START_TYPE),
            $0.blocktype_old[d0] == v.STOP_TYPE &&
            ($0.blocktype_old[d0] = v.SHORT_TYPE)),
          K[d0] = $0.blocktype_old[d0],
          $0.blocktype_old[d0] = G2;
      }
      for ($ = 0; $ < Q1; $++) {
        if (1 < $) {
          var W2 = Q, Z2 = -2, z2 = v.NORM_TYPE;
          (K[0] == v.SHORT_TYPE || K[1] == v.SHORT_TYPE) && (z2 = v.SHORT_TYPE);
          var C2 = y[b][$ - 2];
        } else W2 = O, Z2 = 0, z2 = K[$], C2 = N[b][$];
        W2[Z2 + $] = z2 == v.SHORT_TYPE
          ? D(C2, k.masking_lower)
          : u(C2, k.masking_lower),
          g.analysis && (k.pinfo.pe[b][$] = W2[Z2 + $]);
      }
      return 0;
    },
      this.psymodel_init = function (g) {
        var M = g.internal_flags,
          T,
          b = !0,
          N = 13,
          y = 0,
          O = 0,
          Q = -8.25,
          W = -4.5,
          K = G(v.CBANDS),
          k = G(v.CBANDS),
          n1 = G(v.CBANDS),
          l1 = g.out_samplerate;
        switch (g.experimentalZ) {
          default:
          case 0:
            b = !0;
            break;
          case 1:
            b = !(g.VBR == C.vbr_mtrh || g.VBR == C.vbr_mt);
            break;
          case 2:
            b = !1;
            break;
          case 3:
            N = 8, y = -1.75, O = -.0125, Q = -8.25, W = -2.25;
        }
        for (
          M.ms_ener_ratio_old = .25,
            M.blocktype_old[0] = M.blocktype_old[1] = v.NORM_TYPE,
            T = 0;
          4 > T;
          ++T
        ) {
          for (var U = 0; U < v.CBANDS; ++U) {
            M.nb_1[T][U] = 1e20,
              M.nb_2[T][U] = 1e20,
              M.nb_s1[T][U] = M.nb_s2[T][U] = 1;
          }
          for (var Z = 0; Z < v.SBMAX_l; Z++) {M.en[T].l[Z] = 1e20,
              M.thm[T].l[Z] = 1e20;}
          for (U = 0; 3 > U; ++U) {
            for (Z = 0; Z < v.SBMAX_s; Z++) {
              M.en[T].s[Z][U] = 1e20, M.thm[T].s[Z][U] = 1e20;
            }
            M.nsPsy.lastAttacks[T] = 0;
          }
          for (U = 0; 9 > U; U++) M.nsPsy.last_en_subshort[T][U] = 10;
        }
        for (
          M.loudness_sq_save[0] = M.loudness_sq_save[1] = 0,
            M.npart_l = r(
              M.numlines_l,
              M.bo_l,
              M.bm_l,
              K,
              k,
              M.mld_l,
              M.PSY.bo_l_weight,
              l1,
              v.BLKSIZE,
              M.scalefac_band.l,
              v.BLKSIZE / 1152,
              v.SBMAX_l,
            ),
            T = 0;
          T < M.npart_l;
          T++
        ) {
          Z = y,
            K[T] >= N &&
            (Z = O * (K[T] - N) / (24 - N) + y * (24 - K[T]) / (24 - N)),
            n1[T] = Math.pow(10, Z / 10),
            M.rnumlines_l[T] = 0 < M.numlines_l[T] ? 1 / M.numlines_l[T] : 0;
        }
        for (
          M.s3_ll = l(M.s3ind, M.npart_l, K, k, n1, b), T = U = 0;
          T < M.npart_l;
          T++
        ) {
          for (O = o2.MAX_VALUE, Z = 0; Z < M.numlines_l[T]; Z++, U++) {
            y = l1 * U / (1e3 * v.BLKSIZE),
              y = this.ATHformula(1e3 * y, g) - 20,
              y = Math.pow(10, .1 * y),
              y *= M.numlines_l[T],
              O > y && (O = y);
          }
          M.ATH.cb_l[T] = O,
            O = -20 + 20 * K[T] / 10,
            6 < O && (O = 100),
            -15 > O && (O = -15),
            O -= 8,
            M.minval_l[T] = Math.pow(10, O / 10) * M.numlines_l[T];
        }
        for (
          M.npart_s = r(
            M.numlines_s,
            M.bo_s,
            M.bm_s,
            K,
            k,
            M.mld_s,
            M.PSY.bo_s_weight,
            l1,
            v.BLKSIZE_s,
            M.scalefac_band.s,
            v.BLKSIZE_s / 384,
            v.SBMAX_s,
          ), T = U = 0;
          T < M.npart_s;
          T++
        ) {
          for (
            Z = Q,
              K[T] >= N &&
              (Z = W * (K[T] - N) / (24 - N) + Q * (24 - K[T]) / (24 - N)),
              n1[T] = Math.pow(10, Z / 10),
              O = o2.MAX_VALUE,
              Z = 0;
            Z < M.numlines_s[T];
            Z++, U++
          ) {
            y = l1 * U / (1e3 * v.BLKSIZE_s),
              y = this.ATHformula(1e3 * y, g) - 20,
              y = Math.pow(10, .1 * y),
              y *= M.numlines_s[T],
              O > y && (O = y);
          }
          M.ATH.cb_s[T] = O,
            O = -7 + 7 * K[T] / 12,
            12 < K[T] && (O *= 1 + 3.1 * Math.log(1 + O)),
            12 > K[T] && (O *= 1 + 2.3 * Math.log(1 - O)),
            -15 > O && (O = -15),
            O -= 8,
            M.minval_s[T] = Math.pow(10, O / 10) * M.numlines_s[T];
        }
        for (
          M.s3_ss = l(M.s3ind_s, M.npart_s, K, k, n1, b),
            _ = Math.pow(10, .5625),
            i = Math.pow(10, 1.5),
            o = Math.pow(10, 1.5),
            m.init_fft(M),
            M.decay = Math.exp(-2.302585092994046 / (.01 * l1 / 192)),
            T = 3.5,
            g.exp_nspsytune & 2 && (T = 1),
            0 < Math.abs(g.msfix) && (T = g.msfix),
            g.msfix = T,
            b = 0;
          b < M.npart_l;
          b++
        ) M.s3ind[b][1] > M.npart_l - 1 && (M.s3ind[b][1] = M.npart_l - 1);
        if (
          M.ATH.decay = Math.pow(10, 576 * M.mode_gr / l1 * -1.2),
            M.ATH.adjust = .01,
            M.ATH.adjustLimit = 1,
            g.ATHtype != -1
        ) {
          for (
            U = g.out_samplerate / v.BLKSIZE, T = y = b = 0;
            T < v.BLKSIZE / 2;
            ++T
          ) {
            y += U,
              M.ATH.eql_w[T] = 1 / Math.pow(10, this.ATHformula(y, g) / 10),
              b += M.ATH.eql_w[T];
          }
          for (b = 1 / b, T = v.BLKSIZE / 2; 0 <= --T;) M.ATH.eql_w[T] *= b;
        }
        for (b = U = 0; b < M.npart_s; ++b) {
          for (T = 0; T < M.numlines_s[b]; ++T) {
            ++U;
          }
        }
        for (b = U = 0; b < M.npart_l; ++b) {
          for (T = 0; T < M.numlines_l[b]; ++T) {
            ++U;
          }
        }
        for (T = U = 0; T < M.npart_l; T++) {
          y = l1 * (U + M.numlines_l[T] / 2) / (1 * v.BLKSIZE),
            M.mld_cb_l[T] = s(y),
            U += M.numlines_l[T];
        }
        for (; T < v.CBANDS; ++T) M.mld_cb_l[T] = 1;
        for (T = U = 0; T < M.npart_s; T++) {
          y = l1 * (U + M.numlines_s[T] / 2) / (1 * v.BLKSIZE_s),
            M.mld_cb_s[T] = s(y),
            U += M.numlines_s[T];
        }
        for (; T < v.CBANDS; ++T) M.mld_cb_s[T] = 1;
        return 0;
      },
      this.ATHformula = function (g, M) {
        switch (M.ATHtype) {
          case 0:
            g = h(g, 9);
            break;
          case 1:
            g = h(g, -1);
            break;
          case 2:
            g = h(g, 0);
            break;
          case 3:
            g = h(g, 1) + 6;
            break;
          case 4:
            g = h(g, M.ATHcurve);
            break;
          default:
            g = h(g, 0);
        }
        return g;
      };
  }
  function s1() {
    function d() {
      this.mask_adjust_short = this.mask_adjust = 0,
        this.bo_l_weight = G(v.SBMAX_l),
        this.bo_s_weight = G(v.SBMAX_s);
    }
    function B() {
      this.lowerlimit = 0;
    }
    function w(t, a) {
      this.lowpass = a;
    }
    function X(t) {
      return 1 < t ? 0 : 0 >= t ? 1 : Math.cos(Math.PI / 2 * t);
    }
    function L(t, a) {
      switch (t) {
        case 44100:
          return a.version = 1, 0;
        case 48e3:
          return a.version = 1;
        case 32e3:
          return a.version = 1, 2;
        case 22050:
          return a.version = 0;
        case 24e3:
          return a.version = 0, 1;
        case 16e3:
          return a.version = 0, 2;
        case 11025:
          return a.version = 0;
        case 12e3:
          return a.version = 0, 1;
        case 8e3:
          return a.version = 0, 2;
        default:
          return a.version = 0, -1;
      }
    }
    function P(t, a, f) {
      16e3 > f && (a = 2), f = Y.bitrate_table[a][1];
      for (var E = 2; 14 >= E; E++) {
        0 < Y.bitrate_table[a][E] &&
          Math.abs(Y.bitrate_table[a][E] - t) < Math.abs(f - t) &&
          (f = Y.bitrate_table[a][E]);
      }
      return f;
    }
    function D(t, a, f) {
      for (16e3 > f && (a = 2), f = 0; 14 >= f; f++) {
        if (0 < Y.bitrate_table[a][f] && Y.bitrate_table[a][f] == t) return f;
      }
      return -1;
    }
    function u(t, a) {
      var f = [
        new w(8, 2e3),
        new w(16, 3700),
        new w(24, 3900),
        new w(32, 5500),
        new w(40, 7e3),
        new w(48, 7500),
        new w(56, 1e4),
        new w(64, 11e3),
        new w(80, 13500),
        new w(96, 15100),
        new w(112, 15600),
        new w(128, 17e3),
        new w(160, 17500),
        new w(192, 18600),
        new w(224, 19400),
        new w(256, 19700),
        new w(320, 20500),
      ];
      a = r.nearestBitrateFullIndex(a), t.lowerlimit = f[a].lowpass;
    }
    function n(t) {
      var a = v.BLKSIZE + t.framesize - v.FFTOFFSET;
      return a = Math.max(a, 512 + t.framesize - 32);
    }
    function R(t, a, f, E, A, I, V) {
      var H = t.internal_flags, g = 0, M = [null, null], T = [null, null];
      if (H.Class_ID != 4294479419) return -3;
      if (E == 0) return 0;
      var b = s.copy_buffer(H, A, I, V, 0);
      if (0 > b) return b;
      if (
        I += b,
          g += b,
          T[0] = a,
          T[1] = f,
          H1.NEQ(t.scale, 0) && H1.NEQ(t.scale, 1)
      ) {
        for (b = 0; b < E; ++b) {
          T[0][b] *= t.scale, H.channels_out == 2 && (T[1][b] *= t.scale);
        }
      }
      if (H1.NEQ(t.scale_left, 0) && H1.NEQ(t.scale_left, 1)) {
        for (b = 0; b < E; ++b) {
          T[0][b] *= t.scale_left;
        }
      }
      if (H1.NEQ(t.scale_right, 0) && H1.NEQ(t.scale_right, 1)) {
        for (b = 0; b < E; ++b) {
          T[1][b] *= t.scale_right;
        }
      }
      if (t.num_channels == 2 && H.channels_out == 1) {
        for (b = 0; b < E; ++b) T[0][b] = .5 * (T[0][b] + T[1][b]), T[1][b] = 0;
      }
      for (a = n(t), M[0] = H.mfbuf[0], M[1] = H.mfbuf[1], f = 0; 0 < E;) {
        var N = [null, null];
        N[0] = T[0], N[1] = T[1], b = new e();
        var y = t, O = M, Q = f, W = E, K = b, k = y.internal_flags;
        if (.9999 > k.resample_ratio || 1.0001 < k.resample_ratio) {
          for (var n1 = 0; n1 < k.channels_out; n1++) {
            var l1 = new S(),
              U = K,
              Z,
              m1 = O[n1],
              t1 = k.mf_size,
              y1 = y.framesize,
              j = N[n1],
              c1 = Q,
              F = W,
              p1 = l1,
              Q1 = n1,
              E1 = y.internal_flags,
              J = 0,
              K1 = y.out_samplerate / x(y.out_samplerate, y.in_samplerate);
            K1 > S1.BPC && (K1 = S1.BPC);
            var j1 = 1e-4 >
                  Math.abs(
                    E1.resample_ratio - Math.floor(.5 + E1.resample_ratio),
                  )
                ? 1
                : 0,
              q = 1 / E1.resample_ratio;
            1 < q && (q = 1);
            var B1 = 31;
            if (
              B1 % 2 == 0 && --B1,
                B1 += j1,
                j1 = B1 + 1,
                E1.fill_buffer_resample_init == 0
            ) {
              for (
                E1.inbuf_old[0] = G(j1), E1.inbuf_old[1] = G(j1), Z = 0;
                Z <= 2 * K1;
                ++Z
              ) E1.blackfilt[Z] = G(j1);
              for (E1.itime[0] = 0, J = E1.itime[1] = 0; J <= 2 * K1; J++) {
                var z = 0, t0 = (J - K1) / (2 * K1);
                for (Z = 0; Z <= B1; Z++) {
                  var i0 = E1.blackfilt[J],
                    k1 = Z,
                    O1 = Z - t0,
                    A1 = Math.PI * q;
                  O1 /= B1, 0 > O1 && (O1 = 0), 1 < O1 && (O1 = 1);
                  var Z1 = O1 - .5;
                  O1 = .42 - .5 * Math.cos(2 * O1 * Math.PI) +
                    .08 * Math.cos(4 * O1 * Math.PI),
                    z += i0[k1] = 1e-9 > Math.abs(Z1)
                      ? A1 / Math.PI
                      : O1 * Math.sin(B1 * A1 * Z1) / (Math.PI * B1 * Z1);
                }
                for (Z = 0; Z <= B1; Z++) E1.blackfilt[J][Z] /= z;
              }
              E1.fill_buffer_resample_init = 1;
            }
            for (
              z = E1.inbuf_old[Q1], q = 0;
              q < y1 &&
              (Z = q * E1.resample_ratio,
                J = 0 | Math.floor(Z - E1.itime[Q1]),
                !(B1 + J - B1 / 2 >= F));
              q++
            ) {
              for (
                t0 = Z - E1.itime[Q1] - (J + B1 % 2 * .5),
                  t0 = 0 | Math.floor(2 * t0 * K1 + K1 + .5),
                  Z = i0 = 0;
                Z <= B1;
                ++Z
              ) {
                k1 = 0 | Z + J - B1 / 2,
                  i0 += (0 > k1 ? z[j1 + k1] : j[c1 + k1]) *
                    E1.blackfilt[t0][Z];
              }
              m1[t1 + q] = i0;
            }
            if (
              p1.num_used = Math.min(F, B1 + J - B1 / 2),
                E1.itime[Q1] += p1.num_used - q * E1.resample_ratio,
                p1.num_used >= j1
            ) for (Z = 0; Z < j1; Z++) z[Z] = j[c1 + p1.num_used + Z - j1];
            else {
              for (m1 = j1 - p1.num_used, Z = 0; Z < m1; ++Z) {
                z[Z] = z[Z + p1.num_used];
              }
              for (J = 0; Z < j1; ++Z, ++J) z[Z] = j[c1 + J];
            }
            U.n_out = q, K.n_in = l1.num_used;
          }
        } else {for (
            K.n_out = Math.min(y.framesize, W), K.n_in = K.n_out, y = 0;
            y < K.n_out;
            ++y
          ) {
            O[0][k.mf_size + y] = N[0][Q + y],
              k.channels_out == 2 && (O[1][k.mf_size + y] = N[1][Q + y]);
          }}
        if (
          O = b.n_in,
            b = b.n_out,
            H.findReplayGain && !H.decode_on_the_fly &&
            l.AnalyzeSamples(
                H.rgdata,
                M[0],
                H.mf_size,
                M[1],
                H.mf_size,
                b,
                H.channels_out,
              ) == a1.GAIN_ANALYSIS_ERROR
        ) return -6;
        if (
          E -= O,
            f += O,
            H.mf_size += b,
            1 > H.mf_samples_to_encode &&
            (H.mf_samples_to_encode = v.ENCDELAY + v.POSTDELAY),
            H.mf_samples_to_encode += b,
            H.mf_size >= a
        ) {
          if (
            O = V - g,
              V == 0 && (O = 0),
              b = t,
              O = r.enc.lame_encode_mp3_frame(b, M[0], M[1], A, I, O),
              b.frameNum++,
              b = O,
              0 > b
          ) return b;
          for (
            I += b,
              g += b,
              H.mf_size -= t.framesize,
              H.mf_samples_to_encode -= t.framesize,
              O = 0;
            O < H.channels_out;
            O++
          ) for (b = 0; b < H.mf_size; b++) M[O][b] = M[O][b + t.framesize];
        }
      }
      return g;
    }
    function e() {
      this.n_out = this.n_in = 0;
    }
    function S() {
      this.num_used = 0;
    }
    function x(t, a) {
      return a != 0 ? x(a, t % a) : t;
    }
    var r = this;
    s1.V9 = 410,
      s1.V8 = 420,
      s1.V7 = 430,
      s1.V6 = 440,
      s1.V5 = 450,
      s1.V4 = 460,
      s1.V3 = 470,
      s1.V2 = 480,
      s1.V1 = 490,
      s1.V0 = 500,
      s1.R3MIX = 1e3,
      s1.STANDARD = 1001,
      s1.EXTREME = 1002,
      s1.INSANE = 1003,
      s1.STANDARD_FAST = 1004,
      s1.EXTREME_FAST = 1005,
      s1.MEDIUM = 1006,
      s1.MEDIUM_FAST = 1007,
      s1.LAME_MAXMP3BUFFER = 147456;
    var l, s, h, m, p, _ = new D2(), i, o, c;
    this.enc = new v(),
      this.setModules = function (t, a, f, E, A, I, V, H, g) {
        l = t,
          s = a,
          h = f,
          m = E,
          p = A,
          i = I,
          o = H,
          c = g,
          this.enc.setModules(s, _, m, i);
      },
      this.lame_init = function () {
        var t = new _t();
        t.class_id = 4294479419;
        var a = t.internal_flags = new S1();
        return t.mode = M1.NOT_SET,
          t.original = 1,
          t.in_samplerate = 44100,
          t.num_channels = 2,
          t.num_samples = -1,
          t.bWriteVbrTag = !0,
          t.quality = -1,
          t.short_blocks = null,
          a.subblock_gain = -1,
          t.lowpassfreq = 0,
          t.highpassfreq = 0,
          t.lowpasswidth = -1,
          t.highpasswidth = -1,
          t.VBR = C.vbr_off,
          t.VBR_q = 4,
          t.ATHcurve = -1,
          t.VBR_mean_bitrate_kbps = 128,
          t.VBR_min_bitrate_kbps = 0,
          t.VBR_max_bitrate_kbps = 0,
          t.VBR_hard_min = 0,
          a.VBR_min_bitrate = 1,
          a.VBR_max_bitrate = 13,
          t.quant_comp = -1,
          t.quant_comp_short = -1,
          t.msfix = -1,
          a.resample_ratio = 1,
          a.OldValue[0] = 180,
          a.OldValue[1] = 180,
          a.CurrentStep[0] = 4,
          a.CurrentStep[1] = 4,
          a.masking_lower = 1,
          a.nsPsy.attackthre = -1,
          a.nsPsy.attackthre_s = -1,
          t.scale = -1,
          t.athaa_type = -1,
          t.ATHtype = -1,
          t.athaa_loudapprox = -1,
          t.athaa_sensitivity = 0,
          t.useTemporal = null,
          t.interChRatio = -1,
          a.mf_samples_to_encode = v.ENCDELAY + v.POSTDELAY,
          t.encoder_padding = 0,
          a.mf_size = v.ENCDELAY - v.MDCTDELAY,
          t.findReplayGain = !1,
          t.decode_on_the_fly = !1,
          a.decode_on_the_fly = !1,
          a.findReplayGain = !1,
          a.findPeakSample = !1,
          a.RadioGain = 0,
          a.AudiophileGain = 0,
          a.noclipGainChange = 0,
          a.noclipScale = -1,
          t.preset = 0,
          t.write_id3tag_automatic = !0,
          t.lame_allocated_gfp = 1,
          t;
      },
      this.nearestBitrateFullIndex = function (t) {
        for (
          var a = [
              8,
              16,
              24,
              32,
              40,
              48,
              56,
              64,
              80,
              96,
              112,
              128,
              160,
              192,
              224,
              256,
              320,
            ],
            f = a[16],
            E = 16,
            A = a[16],
            I = 16,
            V = 0;
          16 > V;
          V++
        ) {
          if (Math.max(t, a[V + 1]) != t) {
            f = a[V + 1], E = V + 1, A = a[V], I = V;
            break;
          }
        }
        return f - t > t - A ? I : E;
      },
      this.lame_init_params = function (t) {
        var a = t.internal_flags;
        if (
          a.Class_ID = 0,
            a.ATH == null && (a.ATH = new ot()),
            a.PSY == null && (a.PSY = new d()),
            a.rgdata == null && (a.rgdata = new rt()),
            a.channels_in = t.num_channels,
            a.channels_in == 1 && (t.mode = M1.MONO),
            a.channels_out = t.mode == M1.MONO ? 1 : 2,
            a.mode_ext = v.MPG_MD_MS_LR,
            t.mode == M1.MONO && (t.force_ms = !1),
            t.VBR == C.vbr_off && t.VBR_mean_bitrate_kbps != 128 &&
            t.brate == 0 && (t.brate = t.VBR_mean_bitrate_kbps),
            t.VBR != C.vbr_off && t.VBR != C.vbr_mtrh && t.VBR != C.vbr_mt &&
            (t.free_format = !1),
            t.VBR == C.vbr_off && t.brate == 0 &&
            H1.EQ(t.compression_ratio, 0) && (t.compression_ratio = 11.025),
            t.VBR == C.vbr_off && 0 < t.compression_ratio &&
            (t.out_samplerate == 0 &&
              (t.out_samplerate = map2MP3Frequency(int(.97 * t.in_samplerate))),
              t.brate = 0 |
                16 * t.out_samplerate * a.channels_out /
                  (1e3 * t.compression_ratio),
              a.samplerate_index = L(t.out_samplerate, t),
              t.free_format ||
              (t.brate = P(t.brate, t.version, t.out_samplerate))),
            t.out_samplerate != 0 && (16e3 > t.out_samplerate
              ? (t.VBR_mean_bitrate_kbps = Math.max(t.VBR_mean_bitrate_kbps, 8),
                t.VBR_mean_bitrate_kbps = Math.min(t.VBR_mean_bitrate_kbps, 64))
              : 32e3 > t.out_samplerate
              ? (t.VBR_mean_bitrate_kbps = Math.max(t.VBR_mean_bitrate_kbps, 8),
                t.VBR_mean_bitrate_kbps = Math.min(
                  t.VBR_mean_bitrate_kbps,
                  160,
                ))
              : (t.VBR_mean_bitrate_kbps = Math.max(
                t.VBR_mean_bitrate_kbps,
                32,
              ),
                t.VBR_mean_bitrate_kbps = Math.min(
                  t.VBR_mean_bitrate_kbps,
                  320,
                ))),
            t.lowpassfreq == 0
        ) {
          switch (t.VBR) {
            case C.vbr_off:
              var f = new B();
              u(f, t.brate), f = f.lowerlimit;
              break;
            case C.vbr_abr:
              f = new B(), u(f, t.VBR_mean_bitrate_kbps), f = f.lowerlimit;
              break;
            case C.vbr_rh:
              var E = [
                19500,
                19e3,
                18600,
                18e3,
                17500,
                16e3,
                15600,
                14900,
                12500,
                1e4,
                3950,
              ];
              if (0 <= t.VBR_q && 9 >= t.VBR_q) {
                f = E[t.VBR_q], E = E[t.VBR_q + 1];
                var A = t.VBR_q_frac;
                f = linear_int(f, E, A);
              } else f = 19500;
              break;
            default:
              E = [
                19500,
                19e3,
                18500,
                18e3,
                17500,
                16500,
                15500,
                14500,
                12500,
                9500,
                3950,
              ],
                0 <= t.VBR_q && 9 >= t.VBR_q
                  ? (f = E[t.VBR_q],
                    E = E[t.VBR_q + 1],
                    A = t.VBR_q_frac,
                    f = linear_int(f, E, A))
                  : f = 19500;
          }
          t.mode != M1.MONO || t.VBR != C.vbr_off && t.VBR != C.vbr_abr ||
          (f *= 1.5), t.lowpassfreq = f | 0;
        }
        if (
          t.out_samplerate == 0 &&
          (2 * t.lowpassfreq > t.in_samplerate &&
            (t.lowpassfreq = t.in_samplerate / 2),
            f = t.lowpassfreq | 0,
            E = t.in_samplerate,
            A = 44100,
            48e3 <= E
              ? A = 48e3
              : 44100 <= E
              ? A = 44100
              : 32e3 <= E
              ? A = 32e3
              : 24e3 <= E
              ? A = 24e3
              : 22050 <= E
              ? A = 22050
              : 16e3 <= E
              ? A = 16e3
              : 12e3 <= E
              ? A = 12e3
              : 11025 <= E
              ? A = 11025
              : 8e3 <= E && (A = 8e3),
            f == -1
              ? f = A
              : (15960 >= f && (A = 44100),
                15250 >= f && (A = 32e3),
                11220 >= f && (A = 24e3),
                9970 >= f && (A = 22050),
                7230 >= f && (A = 16e3),
                5420 >= f && (A = 12e3),
                4510 >= f && (A = 11025),
                3970 >= f && (A = 8e3),
                f = E < A
                  ? 44100 < E
                    ? 48e3
                    : 32e3 < E
                    ? 44100
                    : 24e3 < E
                    ? 32e3
                    : 22050 < E
                    ? 24e3
                    : 16e3 < E
                    ? 22050
                    : 12e3 < E
                    ? 16e3
                    : 11025 < E
                    ? 12e3
                    : 8e3 < E
                    ? 11025
                    : 8e3
                  : A),
            t.out_samplerate = f),
            t.lowpassfreq = Math.min(20500, t.lowpassfreq),
            t.lowpassfreq = Math.min(t.out_samplerate / 2, t.lowpassfreq),
            t.VBR == C.vbr_off &&
            (t.compression_ratio = 16 * t.out_samplerate * a.channels_out /
              (1e3 * t.brate)),
            t.VBR == C.vbr_abr &&
            (t.compression_ratio = 16 * t.out_samplerate * a.channels_out /
              (1e3 * t.VBR_mean_bitrate_kbps)),
            t.bWriteVbrTag ||
            (t.findReplayGain = !1,
              t.decode_on_the_fly = !1,
              a.findPeakSample = !1),
            a.findReplayGain = t.findReplayGain,
            a.decode_on_the_fly = t.decode_on_the_fly,
            a.decode_on_the_fly && (a.findPeakSample = !0),
            a.findReplayGain &&
            l.InitGainAnalysis(a.rgdata, t.out_samplerate) ==
              a1.INIT_GAIN_ANALYSIS_ERROR
        ) return t.internal_flags = null, -6;
        switch (
          a.decode_on_the_fly && !t.decode_only &&
          (a.hip != null && c.hip_decode_exit(a.hip),
            a.hip = c.hip_decode_init()),
            a.mode_gr = 24e3 >= t.out_samplerate ? 1 : 2,
            t.framesize = 576 * a.mode_gr,
            t.encoder_delay = v.ENCDELAY,
            a.resample_ratio = t.in_samplerate / t.out_samplerate,
            t.VBR
        ) {
          case C.vbr_mt:
          case C.vbr_rh:
          case C.vbr_mtrh:
            t.compression_ratio =
              [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14, 15, 16.5][t.VBR_q];
            break;
          case C.vbr_abr:
            t.compression_ratio = 16 * t.out_samplerate * a.channels_out /
              (1e3 * t.VBR_mean_bitrate_kbps);
            break;
          default:
            t.compression_ratio = 16 * t.out_samplerate * a.channels_out /
              (1e3 * t.brate);
        }
        t.mode == M1.NOT_SET && (t.mode = M1.JOINT_STEREO),
          0 < t.highpassfreq
            ? (a.highpass1 = 2 * t.highpassfreq,
              a.highpass2 = 0 <= t.highpasswidth
                ? 2 * (t.highpassfreq + t.highpasswidth)
                : 2 * t.highpassfreq,
              a.highpass1 /= t.out_samplerate,
              a.highpass2 /= t.out_samplerate)
            : (a.highpass1 = 0, a.highpass2 = 0),
          0 < t.lowpassfreq
            ? (a.lowpass2 = 2 * t.lowpassfreq,
              0 <= t.lowpasswidth
                ? (a.lowpass1 = 2 * (t.lowpassfreq - t.lowpasswidth),
                  0 > a.lowpass1 && (a.lowpass1 = 0))
                : a.lowpass1 = 2 * t.lowpassfreq,
              a.lowpass1 /= t.out_samplerate,
              a.lowpass2 /= t.out_samplerate)
            : (a.lowpass1 = 0, a.lowpass2 = 0),
          f = t.internal_flags;
        var I = 32, V = -1;
        if (0 < f.lowpass1) {
          var H = 999;
          for (E = 0; 31 >= E; E++) {
            A = E / 31,
              A >= f.lowpass2 && (I = Math.min(I, E)),
              f.lowpass1 < A && A < f.lowpass2 && (H = Math.min(H, E));
          }
          f.lowpass1 = H == 999 ? (I - .75) / 31 : (H - .75) / 31,
            f.lowpass2 = I / 31;
        }
        if (
          0 < f.highpass2 && f.highpass2 < .75 / 31 * .9 &&
          (f.highpass1 = 0,
            f.highpass2 = 0,
            i1.err.println(
              `Warning: highpass filter disabled.  highpass frequency too small
`,
            )), 0 < f.highpass2
        ) {
          for (I = -1, E = 0; 31 >= E; E++) {
            A = E / 31,
              A <= f.highpass1 && (V = Math.max(V, E)),
              f.highpass1 < A && A < f.highpass2 && (I = Math.max(I, E));
          }
          f.highpass1 = V / 31,
            f.highpass2 = I == -1 ? (V + .75) / 31 : (I + .75) / 31;
        }
        for (E = 0; 32 > E; E++) {
          A = E / 31,
            V = f.highpass2 > f.highpass1
              ? X((f.highpass2 - A) / (f.highpass2 - f.highpass1 + 1e-20))
              : 1,
            A = f.lowpass2 > f.lowpass1
              ? X((A - f.lowpass1) / (f.lowpass2 - f.lowpass1 + 1e-20))
              : 1,
            f.amp_filter[E] = V * A;
        }
        if (
          a.samplerate_index = L(t.out_samplerate, t), 0 > a.samplerate_index
        ) return t.internal_flags = null, -1;
        if (t.VBR == C.vbr_off) {
          if (t.free_format) a.bitrate_index = 0;
          else if (
            t.brate = P(t.brate, t.version, t.out_samplerate),
              a.bitrate_index = D(t.brate, t.version, t.out_samplerate),
              0 >= a.bitrate_index
          ) return t.internal_flags = null, -1;
        } else a.bitrate_index = 1;
        for (
          t.analysis && (t.bWriteVbrTag = !1),
            a.pinfo != null && (t.bWriteVbrTag = !1),
            s.init_bit_stream_w(a),
            f = a.samplerate_index + 3 * t.version +
              6 * (16e3 > t.out_samplerate ? 1 : 0),
            E = 0;
          E < v.SBMAX_l + 1;
          E++
        ) a.scalefac_band.l[E] = m.sfBandIndex[f].l[E];
        for (E = 0; E < v.PSFB21 + 1; E++) {
          A = (a.scalefac_band.l[22] - a.scalefac_band.l[21]) / v.PSFB21,
            A = a.scalefac_band.l[21] + E * A,
            a.scalefac_band.psfb21[E] = A;
        }
        for (
          a.scalefac_band.psfb21[v.PSFB21] = 576, E = 0;
          E < v.SBMAX_s + 1;
          E++
        ) {
          a.scalefac_band.s[E] = m.sfBandIndex[f].s[E];
        }
        for (E = 0; E < v.PSFB12 + 1; E++) {
          A = (a.scalefac_band.s[13] - a.scalefac_band.s[12]) / v.PSFB12,
            A = a.scalefac_band.s[12] + E * A,
            a.scalefac_band.psfb12[E] = A;
        }
        for (
          a.scalefac_band.psfb12[v.PSFB12] = 192,
            a.sideinfo_len = t.version == 1
              ? a.channels_out == 1 ? 21 : 36
              : a.channels_out == 1
              ? 13
              : 21,
            t.error_protection && (a.sideinfo_len += 2),
            f = t.internal_flags,
            t.frameNum = 0,
            t.write_id3tag_automatic && o.id3tag_write_v2(t),
            f.bitrate_stereoMode_Hist = q0([16, 5]),
            f.bitrate_blockType_Hist = q0([16, 6]),
            f.PeakSample = 0,
            t.bWriteVbrTag && i.InitVbrTag(t),
            a.Class_ID = 4294479419,
            f = 0;
          19 > f;
          f++
        ) a.nsPsy.pefirbuf[f] = 700 * a.mode_gr * a.channels_out;
        switch (t.ATHtype == -1 && (t.ATHtype = 4), t.VBR) {
          case C.vbr_mt:
            t.VBR = C.vbr_mtrh;
          case C.vbr_mtrh:
            t.useTemporal == null && (t.useTemporal = !1),
              h.apply_preset(t, 500 - 10 * t.VBR_q, 0),
              0 > t.quality && (t.quality = LAME_DEFAULT_QUALITY),
              5 > t.quality && (t.quality = 0),
              5 < t.quality && (t.quality = 5),
              a.PSY.mask_adjust = t.maskingadjust,
              a.PSY.mask_adjust_short = t.maskingadjust_short,
              a.sfb21_extra = t.experimentalY ? !1 : 44e3 < t.out_samplerate,
              a.iteration_loop = new VBRNewIterationLoop(p);
            break;
          case C.vbr_rh:
            h.apply_preset(t, 500 - 10 * t.VBR_q, 0),
              a.PSY.mask_adjust = t.maskingadjust,
              a.PSY.mask_adjust_short = t.maskingadjust_short,
              a.sfb21_extra = t.experimentalY ? !1 : 44e3 < t.out_samplerate,
              6 < t.quality && (t.quality = 6),
              0 > t.quality && (t.quality = LAME_DEFAULT_QUALITY),
              a.iteration_loop = new VBROldIterationLoop(p);
            break;
          default:
            a.sfb21_extra = !1,
              0 > t.quality && (t.quality = LAME_DEFAULT_QUALITY),
              f = t.VBR,
              f == C.vbr_off && (t.VBR_mean_bitrate_kbps = t.brate),
              h.apply_preset(t, t.VBR_mean_bitrate_kbps, 0),
              t.VBR = f,
              a.PSY.mask_adjust = t.maskingadjust,
              a.PSY.mask_adjust_short = t.maskingadjust_short,
              a.iteration_loop = f == C.vbr_off
                ? new it(p)
                : new ABRIterationLoop(p);
        }
        if (t.VBR != C.vbr_off) {
          if (
            a.VBR_min_bitrate = 1,
              a.VBR_max_bitrate = 14,
              16e3 > t.out_samplerate && (a.VBR_max_bitrate = 8),
              t.VBR_min_bitrate_kbps != 0 &&
                (t.VBR_min_bitrate_kbps = P(
                  t.VBR_min_bitrate_kbps,
                  t.version,
                  t.out_samplerate,
                ),
                  a.VBR_min_bitrate = D(
                    t.VBR_min_bitrate_kbps,
                    t.version,
                    t.out_samplerate,
                  ),
                  0 > a.VBR_min_bitrate) ||
              t.VBR_max_bitrate_kbps != 0 &&
                (t.VBR_max_bitrate_kbps = P(
                  t.VBR_max_bitrate_kbps,
                  t.version,
                  t.out_samplerate,
                ),
                  a.VBR_max_bitrate = D(
                    t.VBR_max_bitrate_kbps,
                    t.version,
                    t.out_samplerate,
                  ),
                  0 > a.VBR_max_bitrate)
          ) return -1;
          t.VBR_min_bitrate_kbps =
            Y.bitrate_table[t.version][a.VBR_min_bitrate],
            t.VBR_max_bitrate_kbps =
              Y.bitrate_table[t.version][a.VBR_max_bitrate],
            t.VBR_mean_bitrate_kbps = Math.min(
              Y.bitrate_table[t.version][a.VBR_max_bitrate],
              t.VBR_mean_bitrate_kbps,
            ),
            t.VBR_mean_bitrate_kbps = Math.max(
              Y.bitrate_table[t.version][a.VBR_min_bitrate],
              t.VBR_mean_bitrate_kbps,
            );
        }
        switch (
          t.tune &&
          (a.PSY.mask_adjust += t.tune_value_a,
            a.PSY.mask_adjust_short += t.tune_value_a),
            f = t.internal_flags,
            t.quality
        ) {
          default:
          case 9:
            f.psymodel = 0,
              f.noise_shaping = 0,
              f.noise_shaping_amp = 0,
              f.noise_shaping_stop = 0,
              f.use_best_huffman = 0,
              f.full_outer_loop = 0;
            break;
          case 8:
            t.quality = 7;
          case 7:
            f.psymodel = 1,
              f.noise_shaping = 0,
              f.noise_shaping_amp = 0,
              f.noise_shaping_stop = 0,
              f.use_best_huffman = 0,
              f.full_outer_loop = 0;
            break;
          case 6:
            f.psymodel = 1,
              f.noise_shaping == 0 && (f.noise_shaping = 1),
              f.noise_shaping_amp = 0,
              f.noise_shaping_stop = 0,
              f.subblock_gain == -1 && (f.subblock_gain = 1),
              f.use_best_huffman = 0,
              f.full_outer_loop = 0;
            break;
          case 5:
            f.psymodel = 1,
              f.noise_shaping == 0 && (f.noise_shaping = 1),
              f.noise_shaping_amp = 0,
              f.noise_shaping_stop = 0,
              f.subblock_gain == -1 && (f.subblock_gain = 1),
              f.use_best_huffman = 0,
              f.full_outer_loop = 0;
            break;
          case 4:
            f.psymodel = 1,
              f.noise_shaping == 0 && (f.noise_shaping = 1),
              f.noise_shaping_amp = 0,
              f.noise_shaping_stop = 0,
              f.subblock_gain == -1 && (f.subblock_gain = 1),
              f.use_best_huffman = 1,
              f.full_outer_loop = 0;
            break;
          case 3:
            f.psymodel = 1,
              f.noise_shaping == 0 && (f.noise_shaping = 1),
              f.noise_shaping_amp = 1,
              f.noise_shaping_stop = 1,
              f.subblock_gain == -1 && (f.subblock_gain = 1),
              f.use_best_huffman = 1,
              f.full_outer_loop = 0;
            break;
          case 2:
            f.psymodel = 1,
              f.noise_shaping == 0 && (f.noise_shaping = 1),
              f.substep_shaping == 0 && (f.substep_shaping = 2),
              f.noise_shaping_amp = 1,
              f.noise_shaping_stop = 1,
              f.subblock_gain == -1 && (f.subblock_gain = 1),
              f.use_best_huffman = 1,
              f.full_outer_loop = 0;
            break;
          case 1:
            f.psymodel = 1,
              f.noise_shaping == 0 && (f.noise_shaping = 1),
              f.substep_shaping == 0 && (f.substep_shaping = 2),
              f.noise_shaping_amp = 2,
              f.noise_shaping_stop = 1,
              f.subblock_gain == -1 && (f.subblock_gain = 1),
              f.use_best_huffman = 1,
              f.full_outer_loop = 0;
            break;
          case 0:
            f.psymodel = 1,
              f.noise_shaping == 0 && (f.noise_shaping = 1),
              f.substep_shaping == 0 && (f.substep_shaping = 2),
              f.noise_shaping_amp = 2,
              f.noise_shaping_stop = 1,
              f.subblock_gain == -1 && (f.subblock_gain = 1),
              f.use_best_huffman = 1,
              f.full_outer_loop = 0;
        }
        return a.ATH.useAdjust = 0 > t.athaa_type ? 3 : t.athaa_type,
          a.ATH.aaSensitivityP = Math.pow(10, t.athaa_sensitivity / -10),
          t.short_blocks == null && (t.short_blocks = L1.short_block_allowed),
          t.short_blocks != L1.short_block_allowed ||
          t.mode != M1.JOINT_STEREO && t.mode != M1.STEREO ||
          (t.short_blocks = L1.short_block_coupled),
          0 > t.quant_comp && (t.quant_comp = 1),
          0 > t.quant_comp_short && (t.quant_comp_short = 0),
          0 > t.msfix && (t.msfix = 0),
          t.exp_nspsytune |= 1,
          0 > t.internal_flags.nsPsy.attackthre &&
          (t.internal_flags.nsPsy.attackthre = D2.NSATTACKTHRE),
          0 > t.internal_flags.nsPsy.attackthre_s &&
          (t.internal_flags.nsPsy.attackthre_s = D2.NSATTACKTHRE_S),
          0 > t.scale && (t.scale = 1),
          0 > t.ATHtype && (t.ATHtype = 4),
          0 > t.ATHcurve && (t.ATHcurve = 4),
          0 > t.athaa_loudapprox && (t.athaa_loudapprox = 2),
          0 > t.interChRatio && (t.interChRatio = 0),
          t.useTemporal == null && (t.useTemporal = !0),
          a.slot_lag = a.frac_SpF = 0,
          t.VBR == C.vbr_off &&
          (a.slot_lag =
            a.frac_SpF =
              72e3 * (t.version + 1) * t.brate % t.out_samplerate | 0),
          m.iteration_init(t),
          _.psymodel_init(t),
          0;
      },
      this.lame_encode_flush = function (t, a, f, E) {
        var A = t.internal_flags,
          I = U2([2, 1152]),
          V = 0,
          H = A.mf_samples_to_encode - v.POSTDELAY,
          g = n(t);
        if (1 > A.mf_samples_to_encode) return 0;
        var M = 0;
        t.in_samplerate != t.out_samplerate &&
          (H += 16 * t.out_samplerate / t.in_samplerate);
        var T = t.framesize - H % t.framesize;
        for (
          576 > T && (T += t.framesize),
            t.encoder_padding = T,
            T = (H + T) / t.framesize;
          0 < T && 0 <= V;
        ) {
          var b = g - A.mf_size;
          H = t.frameNum,
            b *= t.in_samplerate,
            b /= t.out_samplerate,
            1152 < b && (b = 1152),
            1 > b && (b = 1),
            V = E - M,
            E == 0 && (V = 0),
            V = this.lame_encode_buffer(t, I[0], I[1], b, a, f, V),
            f += V,
            M += V,
            T -= H != t.frameNum ? 1 : 0;
        }
        if (
          A.mf_samples_to_encode = 0,
            0 > V ||
            (V = E - M,
              E == 0 && (V = 0),
              s.flush_bitstream(t),
              V = s.copy_buffer(A, a, f, V, 1),
              0 > V)
        ) return V;
        if (
          f += V, M += V, V = E - M, E == 0 && (V = 0), t.write_id3tag_automatic
        ) {
          if (
            o.id3tag_write_v1(t), V = s.copy_buffer(A, a, f, V, 0), 0 > V
          ) return V;
          M += V;
        }
        return M;
      },
      this.lame_encode_buffer = function (t, a, f, E, A, I, V) {
        var H = t.internal_flags, g = [null, null];
        if (H.Class_ID != 4294479419) return -3;
        if (E == 0) return 0;
        (H.in_buffer_0 == null || H.in_buffer_nsamples < E) &&
        (H.in_buffer_0 = G(E), H.in_buffer_1 = G(E), H.in_buffer_nsamples = E),
          g[0] = H.in_buffer_0,
          g[1] = H.in_buffer_1;
        for (var M = 0; M < E; M++) {g[0][M] = a[M],
            1 < H.channels_in && (g[1][M] = f[M]);}
        return R(t, g[0], g[1], E, A, I, V);
      };
  }
  function mt() {
    this.setModules = function (d, B) {};
  }
  function Et() {
    this.setModules = function (d, B, w) {};
  }
  function vt() {}
  function gt() {
    this.setModules = function (d, B) {};
  }
  function S0() {
    this.sampleRate =
      this.channels =
      this.dataLen =
      this.dataOffset =
        0;
  }
  function k2(d) {
    return d.charCodeAt(0) << 24 | d.charCodeAt(1) << 16 |
      d.charCodeAt(2) << 8 | d.charCodeAt(3);
  }
  var r0 = {
      fill: function (d, B, w, X) {
        if (arguments.length == 2) {
          for (var L = 0; L < d.length; L++) d[L] = arguments[1];
        } else for (L = B; L < w; L++) d[L] = X;
      },
    },
    i1 = {
      arraycopy: function (d, B, w, X, L) {
        for (L = B + L; B < L;) w[X++] = d[B++];
      },
    },
    r1 = {
      SQRT2: 1.4142135623730951,
      FAST_LOG10: function (d) {
        return Math.log10(d);
      },
      FAST_LOG10_X: function (d, B) {
        return Math.log10(d) * B;
      },
    };
  L1.short_block_allowed = new L1(0),
    L1.short_block_coupled = new L1(1),
    L1.short_block_dispensed = new L1(2),
    L1.short_block_forced = new L1(3);
  var o2 = { MAX_VALUE: 34028235e31 };
  C.vbr_off = new C(0),
    C.vbr_mt = new C(1),
    C.vbr_rh = new C(2),
    C.vbr_abr = new C(3),
    C.vbr_mtrh = new C(4),
    C.vbr_default = C.vbr_mtrh,
    M1.STEREO = new M1(0),
    M1.JOINT_STEREO = new M1(1),
    M1.DUAL_CHANNEL = new M1(2),
    M1.MONO = new M1(3),
    M1.NOT_SET = new M1(4),
    a1.STEPS_per_dB = 100,
    a1.MAX_dB = 120,
    a1.GAIN_NOT_ENOUGH_SAMPLES = -24601,
    a1.GAIN_ANALYSIS_ERROR = 0,
    a1.GAIN_ANALYSIS_OK = 1,
    a1.INIT_GAIN_ANALYSIS_ERROR = 0,
    a1.INIT_GAIN_ANALYSIS_OK = 1,
    a1.YULE_ORDER = 10,
    a1.MAX_ORDER = a1.YULE_ORDER,
    a1.MAX_SAMP_FREQ = 48e3,
    a1.RMS_WINDOW_TIME_NUMERATOR = 1,
    a1.RMS_WINDOW_TIME_DENOMINATOR = 20,
    a1.MAX_SAMPLES_PER_WINDOW =
      a1.MAX_SAMP_FREQ * a1.RMS_WINDOW_TIME_NUMERATOR /
        a1.RMS_WINDOW_TIME_DENOMINATOR + 1,
    H1.EQ = function (d, B) {
      return Math.abs(d) > Math.abs(B)
        ? Math.abs(d - B) <= 1e-6 * Math.abs(d)
        : Math.abs(d - B) <= 1e-6 * Math.abs(B);
    },
    H1.NEQ = function (d, B) {
      return !H1.EQ(d, B);
    },
    v2.NUMTOCENTRIES = 100,
    v2.MAXFRAMESIZE = 2880;
  var Y = {
    t1HB: [1, 1, 1, 0],
    t2HB: [1, 2, 1, 3, 1, 1, 3, 2, 0],
    t3HB: [3, 2, 1, 1, 1, 1, 3, 2, 0],
    t5HB: [1, 2, 6, 5, 3, 1, 4, 4, 7, 5, 7, 1, 6, 1, 1, 0],
    t6HB: [7, 3, 5, 1, 6, 2, 3, 2, 5, 4, 4, 1, 3, 3, 2, 0],
    t7HB: [
      1,
      2,
      10,
      19,
      16,
      10,
      3,
      3,
      7,
      10,
      5,
      3,
      11,
      4,
      13,
      17,
      8,
      4,
      12,
      11,
      18,
      15,
      11,
      2,
      7,
      6,
      9,
      14,
      3,
      1,
      6,
      4,
      5,
      3,
      2,
      0,
    ],
    t8HB: [
      3,
      4,
      6,
      18,
      12,
      5,
      5,
      1,
      2,
      16,
      9,
      3,
      7,
      3,
      5,
      14,
      7,
      3,
      19,
      17,
      15,
      13,
      10,
      4,
      13,
      5,
      8,
      11,
      5,
      1,
      12,
      4,
      4,
      1,
      1,
      0,
    ],
    t9HB: [
      7,
      5,
      9,
      14,
      15,
      7,
      6,
      4,
      5,
      5,
      6,
      7,
      7,
      6,
      8,
      8,
      8,
      5,
      15,
      6,
      9,
      10,
      5,
      1,
      11,
      7,
      9,
      6,
      4,
      1,
      14,
      4,
      6,
      2,
      6,
      0,
    ],
    t10HB: [
      1,
      2,
      10,
      23,
      35,
      30,
      12,
      17,
      3,
      3,
      8,
      12,
      18,
      21,
      12,
      7,
      11,
      9,
      15,
      21,
      32,
      40,
      19,
      6,
      14,
      13,
      22,
      34,
      46,
      23,
      18,
      7,
      20,
      19,
      33,
      47,
      27,
      22,
      9,
      3,
      31,
      22,
      41,
      26,
      21,
      20,
      5,
      3,
      14,
      13,
      10,
      11,
      16,
      6,
      5,
      1,
      9,
      8,
      7,
      8,
      4,
      4,
      2,
      0,
    ],
    t11HB: [
      3,
      4,
      10,
      24,
      34,
      33,
      21,
      15,
      5,
      3,
      4,
      10,
      32,
      17,
      11,
      10,
      11,
      7,
      13,
      18,
      30,
      31,
      20,
      5,
      25,
      11,
      19,
      59,
      27,
      18,
      12,
      5,
      35,
      33,
      31,
      58,
      30,
      16,
      7,
      5,
      28,
      26,
      32,
      19,
      17,
      15,
      8,
      14,
      14,
      12,
      9,
      13,
      14,
      9,
      4,
      1,
      11,
      4,
      6,
      6,
      6,
      3,
      2,
      0,
    ],
    t12HB: [
      9,
      6,
      16,
      33,
      41,
      39,
      38,
      26,
      7,
      5,
      6,
      9,
      23,
      16,
      26,
      11,
      17,
      7,
      11,
      14,
      21,
      30,
      10,
      7,
      17,
      10,
      15,
      12,
      18,
      28,
      14,
      5,
      32,
      13,
      22,
      19,
      18,
      16,
      9,
      5,
      40,
      17,
      31,
      29,
      17,
      13,
      4,
      2,
      27,
      12,
      11,
      15,
      10,
      7,
      4,
      1,
      27,
      12,
      8,
      12,
      6,
      3,
      1,
      0,
    ],
    t13HB: [
      1,
      5,
      14,
      21,
      34,
      51,
      46,
      71,
      42,
      52,
      68,
      52,
      67,
      44,
      43,
      19,
      3,
      4,
      12,
      19,
      31,
      26,
      44,
      33,
      31,
      24,
      32,
      24,
      31,
      35,
      22,
      14,
      15,
      13,
      23,
      36,
      59,
      49,
      77,
      65,
      29,
      40,
      30,
      40,
      27,
      33,
      42,
      16,
      22,
      20,
      37,
      61,
      56,
      79,
      73,
      64,
      43,
      76,
      56,
      37,
      26,
      31,
      25,
      14,
      35,
      16,
      60,
      57,
      97,
      75,
      114,
      91,
      54,
      73,
      55,
      41,
      48,
      53,
      23,
      24,
      58,
      27,
      50,
      96,
      76,
      70,
      93,
      84,
      77,
      58,
      79,
      29,
      74,
      49,
      41,
      17,
      47,
      45,
      78,
      74,
      115,
      94,
      90,
      79,
      69,
      83,
      71,
      50,
      59,
      38,
      36,
      15,
      72,
      34,
      56,
      95,
      92,
      85,
      91,
      90,
      86,
      73,
      77,
      65,
      51,
      44,
      43,
      42,
      43,
      20,
      30,
      44,
      55,
      78,
      72,
      87,
      78,
      61,
      46,
      54,
      37,
      30,
      20,
      16,
      53,
      25,
      41,
      37,
      44,
      59,
      54,
      81,
      66,
      76,
      57,
      54,
      37,
      18,
      39,
      11,
      35,
      33,
      31,
      57,
      42,
      82,
      72,
      80,
      47,
      58,
      55,
      21,
      22,
      26,
      38,
      22,
      53,
      25,
      23,
      38,
      70,
      60,
      51,
      36,
      55,
      26,
      34,
      23,
      27,
      14,
      9,
      7,
      34,
      32,
      28,
      39,
      49,
      75,
      30,
      52,
      48,
      40,
      52,
      28,
      18,
      17,
      9,
      5,
      45,
      21,
      34,
      64,
      56,
      50,
      49,
      45,
      31,
      19,
      12,
      15,
      10,
      7,
      6,
      3,
      48,
      23,
      20,
      39,
      36,
      35,
      53,
      21,
      16,
      23,
      13,
      10,
      6,
      1,
      4,
      2,
      16,
      15,
      17,
      27,
      25,
      20,
      29,
      11,
      17,
      12,
      16,
      8,
      1,
      1,
      0,
      1,
    ],
    t15HB: [
      7,
      12,
      18,
      53,
      47,
      76,
      124,
      108,
      89,
      123,
      108,
      119,
      107,
      81,
      122,
      63,
      13,
      5,
      16,
      27,
      46,
      36,
      61,
      51,
      42,
      70,
      52,
      83,
      65,
      41,
      59,
      36,
      19,
      17,
      15,
      24,
      41,
      34,
      59,
      48,
      40,
      64,
      50,
      78,
      62,
      80,
      56,
      33,
      29,
      28,
      25,
      43,
      39,
      63,
      55,
      93,
      76,
      59,
      93,
      72,
      54,
      75,
      50,
      29,
      52,
      22,
      42,
      40,
      67,
      57,
      95,
      79,
      72,
      57,
      89,
      69,
      49,
      66,
      46,
      27,
      77,
      37,
      35,
      66,
      58,
      52,
      91,
      74,
      62,
      48,
      79,
      63,
      90,
      62,
      40,
      38,
      125,
      32,
      60,
      56,
      50,
      92,
      78,
      65,
      55,
      87,
      71,
      51,
      73,
      51,
      70,
      30,
      109,
      53,
      49,
      94,
      88,
      75,
      66,
      122,
      91,
      73,
      56,
      42,
      64,
      44,
      21,
      25,
      90,
      43,
      41,
      77,
      73,
      63,
      56,
      92,
      77,
      66,
      47,
      67,
      48,
      53,
      36,
      20,
      71,
      34,
      67,
      60,
      58,
      49,
      88,
      76,
      67,
      106,
      71,
      54,
      38,
      39,
      23,
      15,
      109,
      53,
      51,
      47,
      90,
      82,
      58,
      57,
      48,
      72,
      57,
      41,
      23,
      27,
      62,
      9,
      86,
      42,
      40,
      37,
      70,
      64,
      52,
      43,
      70,
      55,
      42,
      25,
      29,
      18,
      11,
      11,
      118,
      68,
      30,
      55,
      50,
      46,
      74,
      65,
      49,
      39,
      24,
      16,
      22,
      13,
      14,
      7,
      91,
      44,
      39,
      38,
      34,
      63,
      52,
      45,
      31,
      52,
      28,
      19,
      14,
      8,
      9,
      3,
      123,
      60,
      58,
      53,
      47,
      43,
      32,
      22,
      37,
      24,
      17,
      12,
      15,
      10,
      2,
      1,
      71,
      37,
      34,
      30,
      28,
      20,
      17,
      26,
      21,
      16,
      10,
      6,
      8,
      6,
      2,
      0,
    ],
    t16HB: [
      1,
      5,
      14,
      44,
      74,
      63,
      110,
      93,
      172,
      149,
      138,
      242,
      225,
      195,
      376,
      17,
      3,
      4,
      12,
      20,
      35,
      62,
      53,
      47,
      83,
      75,
      68,
      119,
      201,
      107,
      207,
      9,
      15,
      13,
      23,
      38,
      67,
      58,
      103,
      90,
      161,
      72,
      127,
      117,
      110,
      209,
      206,
      16,
      45,
      21,
      39,
      69,
      64,
      114,
      99,
      87,
      158,
      140,
      252,
      212,
      199,
      387,
      365,
      26,
      75,
      36,
      68,
      65,
      115,
      101,
      179,
      164,
      155,
      264,
      246,
      226,
      395,
      382,
      362,
      9,
      66,
      30,
      59,
      56,
      102,
      185,
      173,
      265,
      142,
      253,
      232,
      400,
      388,
      378,
      445,
      16,
      111,
      54,
      52,
      100,
      184,
      178,
      160,
      133,
      257,
      244,
      228,
      217,
      385,
      366,
      715,
      10,
      98,
      48,
      91,
      88,
      165,
      157,
      148,
      261,
      248,
      407,
      397,
      372,
      380,
      889,
      884,
      8,
      85,
      84,
      81,
      159,
      156,
      143,
      260,
      249,
      427,
      401,
      392,
      383,
      727,
      713,
      708,
      7,
      154,
      76,
      73,
      141,
      131,
      256,
      245,
      426,
      406,
      394,
      384,
      735,
      359,
      710,
      352,
      11,
      139,
      129,
      67,
      125,
      247,
      233,
      229,
      219,
      393,
      743,
      737,
      720,
      885,
      882,
      439,
      4,
      243,
      120,
      118,
      115,
      227,
      223,
      396,
      746,
      742,
      736,
      721,
      712,
      706,
      223,
      436,
      6,
      202,
      224,
      222,
      218,
      216,
      389,
      386,
      381,
      364,
      888,
      443,
      707,
      440,
      437,
      1728,
      4,
      747,
      211,
      210,
      208,
      370,
      379,
      734,
      723,
      714,
      1735,
      883,
      877,
      876,
      3459,
      865,
      2,
      377,
      369,
      102,
      187,
      726,
      722,
      358,
      711,
      709,
      866,
      1734,
      871,
      3458,
      870,
      434,
      0,
      12,
      10,
      7,
      11,
      10,
      17,
      11,
      9,
      13,
      12,
      10,
      7,
      5,
      3,
      1,
      3,
    ],
    t24HB: [
      15,
      13,
      46,
      80,
      146,
      262,
      248,
      434,
      426,
      669,
      653,
      649,
      621,
      517,
      1032,
      88,
      14,
      12,
      21,
      38,
      71,
      130,
      122,
      216,
      209,
      198,
      327,
      345,
      319,
      297,
      279,
      42,
      47,
      22,
      41,
      74,
      68,
      128,
      120,
      221,
      207,
      194,
      182,
      340,
      315,
      295,
      541,
      18,
      81,
      39,
      75,
      70,
      134,
      125,
      116,
      220,
      204,
      190,
      178,
      325,
      311,
      293,
      271,
      16,
      147,
      72,
      69,
      135,
      127,
      118,
      112,
      210,
      200,
      188,
      352,
      323,
      306,
      285,
      540,
      14,
      263,
      66,
      129,
      126,
      119,
      114,
      214,
      202,
      192,
      180,
      341,
      317,
      301,
      281,
      262,
      12,
      249,
      123,
      121,
      117,
      113,
      215,
      206,
      195,
      185,
      347,
      330,
      308,
      291,
      272,
      520,
      10,
      435,
      115,
      111,
      109,
      211,
      203,
      196,
      187,
      353,
      332,
      313,
      298,
      283,
      531,
      381,
      17,
      427,
      212,
      208,
      205,
      201,
      193,
      186,
      177,
      169,
      320,
      303,
      286,
      268,
      514,
      377,
      16,
      335,
      199,
      197,
      191,
      189,
      181,
      174,
      333,
      321,
      305,
      289,
      275,
      521,
      379,
      371,
      11,
      668,
      184,
      183,
      179,
      175,
      344,
      331,
      314,
      304,
      290,
      277,
      530,
      383,
      373,
      366,
      10,
      652,
      346,
      171,
      168,
      164,
      318,
      309,
      299,
      287,
      276,
      263,
      513,
      375,
      368,
      362,
      6,
      648,
      322,
      316,
      312,
      307,
      302,
      292,
      284,
      269,
      261,
      512,
      376,
      370,
      364,
      359,
      4,
      620,
      300,
      296,
      294,
      288,
      282,
      273,
      266,
      515,
      380,
      374,
      369,
      365,
      361,
      357,
      2,
      1033,
      280,
      278,
      274,
      267,
      264,
      259,
      382,
      378,
      372,
      367,
      363,
      360,
      358,
      356,
      0,
      43,
      20,
      19,
      17,
      15,
      13,
      11,
      9,
      7,
      6,
      4,
      7,
      5,
      3,
      1,
      3,
    ],
    t32HB: [1, 10, 8, 20, 12, 20, 16, 32, 14, 12, 24, 0, 28, 16, 24, 16],
    t33HB: [15, 28, 26, 48, 22, 40, 36, 64, 14, 24, 20, 32, 12, 16, 8, 0],
    t1l: [1, 4, 3, 5],
    t2l: [1, 4, 7, 4, 5, 7, 6, 7, 8],
    t3l: [2, 3, 7, 4, 4, 7, 6, 7, 8],
    t5l: [1, 4, 7, 8, 4, 5, 8, 9, 7, 8, 9, 10, 8, 8, 9, 10],
    t6l: [3, 4, 6, 8, 4, 4, 6, 7, 5, 6, 7, 8, 7, 7, 8, 9],
    t7l: [
      1,
      4,
      7,
      9,
      9,
      10,
      4,
      6,
      8,
      9,
      9,
      10,
      7,
      7,
      9,
      10,
      10,
      11,
      8,
      9,
      10,
      11,
      11,
      11,
      8,
      9,
      10,
      11,
      11,
      12,
      9,
      10,
      11,
      12,
      12,
      12,
    ],
    t8l: [
      2,
      4,
      7,
      9,
      9,
      10,
      4,
      4,
      6,
      10,
      10,
      10,
      7,
      6,
      8,
      10,
      10,
      11,
      9,
      10,
      10,
      11,
      11,
      12,
      9,
      9,
      10,
      11,
      12,
      12,
      10,
      10,
      11,
      11,
      13,
      13,
    ],
    t9l: [
      3,
      4,
      6,
      7,
      9,
      10,
      4,
      5,
      6,
      7,
      8,
      10,
      5,
      6,
      7,
      8,
      9,
      10,
      7,
      7,
      8,
      9,
      9,
      10,
      8,
      8,
      9,
      9,
      10,
      11,
      9,
      9,
      10,
      10,
      11,
      11,
    ],
    t10l: [
      1,
      4,
      7,
      9,
      10,
      10,
      10,
      11,
      4,
      6,
      8,
      9,
      10,
      11,
      10,
      10,
      7,
      8,
      9,
      10,
      11,
      12,
      11,
      11,
      8,
      9,
      10,
      11,
      12,
      12,
      11,
      12,
      9,
      10,
      11,
      12,
      12,
      12,
      12,
      12,
      10,
      11,
      12,
      12,
      13,
      13,
      12,
      13,
      9,
      10,
      11,
      12,
      12,
      12,
      13,
      13,
      10,
      10,
      11,
      12,
      12,
      13,
      13,
      13,
    ],
    t11l: [
      2,
      4,
      6,
      8,
      9,
      10,
      9,
      10,
      4,
      5,
      6,
      8,
      10,
      10,
      9,
      10,
      6,
      7,
      8,
      9,
      10,
      11,
      10,
      10,
      8,
      8,
      9,
      11,
      10,
      12,
      10,
      11,
      9,
      10,
      10,
      11,
      11,
      12,
      11,
      12,
      9,
      10,
      11,
      12,
      12,
      13,
      12,
      13,
      9,
      9,
      9,
      10,
      11,
      12,
      12,
      12,
      9,
      9,
      10,
      11,
      12,
      12,
      12,
      12,
    ],
    t12l: [
      4,
      4,
      6,
      8,
      9,
      10,
      10,
      10,
      4,
      5,
      6,
      7,
      9,
      9,
      10,
      10,
      6,
      6,
      7,
      8,
      9,
      10,
      9,
      10,
      7,
      7,
      8,
      8,
      9,
      10,
      10,
      10,
      8,
      8,
      9,
      9,
      10,
      10,
      10,
      11,
      9,
      9,
      10,
      10,
      10,
      11,
      10,
      11,
      9,
      9,
      9,
      10,
      10,
      11,
      11,
      12,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
    ],
    t13l: [
      1,
      5,
      7,
      8,
      9,
      10,
      10,
      11,
      10,
      11,
      12,
      12,
      13,
      13,
      14,
      14,
      4,
      6,
      8,
      9,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      13,
      14,
      14,
      14,
      7,
      8,
      9,
      10,
      11,
      11,
      12,
      12,
      11,
      12,
      12,
      13,
      13,
      14,
      15,
      15,
      8,
      9,
      10,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      15,
      15,
      9,
      9,
      11,
      11,
      12,
      12,
      13,
      13,
      12,
      13,
      13,
      14,
      14,
      15,
      15,
      16,
      10,
      10,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      13,
      15,
      15,
      16,
      16,
      10,
      11,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      16,
      16,
      11,
      11,
      12,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      16,
      18,
      18,
      10,
      10,
      11,
      12,
      12,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      16,
      17,
      17,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      15,
      14,
      15,
      15,
      16,
      16,
      16,
      18,
      17,
      11,
      12,
      12,
      13,
      13,
      14,
      14,
      15,
      14,
      15,
      16,
      15,
      16,
      17,
      18,
      19,
      12,
      12,
      12,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      16,
      17,
      17,
      17,
      18,
      12,
      13,
      13,
      14,
      14,
      15,
      14,
      15,
      16,
      16,
      17,
      17,
      17,
      18,
      18,
      18,
      13,
      13,
      14,
      15,
      15,
      15,
      16,
      16,
      16,
      16,
      16,
      17,
      18,
      17,
      18,
      18,
      14,
      14,
      14,
      15,
      15,
      15,
      17,
      16,
      16,
      19,
      17,
      17,
      17,
      19,
      18,
      18,
      13,
      14,
      15,
      16,
      16,
      16,
      17,
      16,
      17,
      17,
      18,
      18,
      21,
      20,
      21,
      18,
    ],
    t15l: [
      3,
      5,
      6,
      8,
      8,
      9,
      10,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      14,
      5,
      5,
      7,
      8,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      6,
      7,
      7,
      8,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      9,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      10,
      9,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      14,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      14,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      15,
      14,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      15,
      12,
      12,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      14,
      15,
      15,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      14,
      15,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      15,
    ],
    t16_5l: [
      1,
      5,
      7,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      14,
      11,
      4,
      6,
      8,
      9,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      14,
      13,
      14,
      11,
      7,
      8,
      9,
      10,
      11,
      11,
      12,
      12,
      13,
      12,
      13,
      13,
      13,
      14,
      14,
      12,
      9,
      9,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      13,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      15,
      12,
      10,
      10,
      11,
      11,
      12,
      13,
      13,
      14,
      13,
      14,
      14,
      15,
      15,
      15,
      16,
      13,
      11,
      11,
      11,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      16,
      13,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      17,
      17,
      13,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      16,
      16,
      13,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      15,
      16,
      15,
      14,
      12,
      13,
      12,
      13,
      14,
      14,
      14,
      14,
      15,
      16,
      16,
      16,
      17,
      17,
      16,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      15,
      16,
      16,
      16,
      16,
      16,
      16,
      15,
      16,
      14,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      15,
      17,
      16,
      16,
      16,
      16,
      18,
      14,
      15,
      14,
      14,
      14,
      15,
      15,
      16,
      16,
      16,
      18,
      17,
      17,
      17,
      19,
      17,
      14,
      14,
      15,
      13,
      14,
      16,
      16,
      15,
      16,
      16,
      17,
      18,
      17,
      19,
      17,
      16,
      14,
      11,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      14,
      14,
      14,
      12,
    ],
    t16l: [
      1,
      5,
      7,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      14,
      10,
      4,
      6,
      8,
      9,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      14,
      13,
      14,
      10,
      7,
      8,
      9,
      10,
      11,
      11,
      12,
      12,
      13,
      12,
      13,
      13,
      13,
      14,
      14,
      11,
      9,
      9,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      12,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      15,
      11,
      10,
      10,
      11,
      11,
      12,
      13,
      13,
      14,
      13,
      14,
      14,
      15,
      15,
      15,
      16,
      12,
      11,
      11,
      11,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      16,
      12,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      17,
      17,
      12,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      16,
      16,
      12,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      15,
      16,
      15,
      13,
      12,
      13,
      12,
      13,
      14,
      14,
      14,
      14,
      15,
      16,
      16,
      16,
      17,
      17,
      16,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      15,
      16,
      16,
      16,
      16,
      16,
      16,
      15,
      16,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      15,
      17,
      16,
      16,
      16,
      16,
      18,
      13,
      15,
      14,
      14,
      14,
      15,
      15,
      16,
      16,
      16,
      18,
      17,
      17,
      17,
      19,
      17,
      13,
      14,
      15,
      13,
      14,
      16,
      16,
      15,
      16,
      16,
      17,
      18,
      17,
      19,
      17,
      16,
      13,
      10,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      10,
    ],
    t24l: [
      4,
      5,
      7,
      8,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      10,
      5,
      6,
      7,
      8,
      9,
      10,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      10,
      7,
      7,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      9,
      8,
      8,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      9,
      9,
      9,
      9,
      10,
      10,
      10,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      9,
      10,
      9,
      10,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      9,
      10,
      10,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      9,
      11,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      10,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      13,
      10,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      10,
      12,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      10,
      12,
      12,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      10,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      10,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      10,
      13,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      10,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      10,
      10,
      10,
      10,
      6,
    ],
    t32l: [1, 5, 5, 7, 5, 8, 7, 9, 5, 7, 7, 9, 7, 9, 9, 10],
    t33l: [4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8],
  };
  Y.ht = [
    new v1(0, 0, null, null),
    new v1(2, 0, Y.t1HB, Y.t1l),
    new v1(3, 0, Y.t2HB, Y.t2l),
    new v1(3, 0, Y.t3HB, Y.t3l),
    new v1(0, 0, null, null),
    new v1(4, 0, Y.t5HB, Y.t5l),
    new v1(4, 0, Y.t6HB, Y.t6l),
    new v1(6, 0, Y.t7HB, Y.t7l),
    new v1(6, 0, Y.t8HB, Y.t8l),
    new v1(6, 0, Y.t9HB, Y.t9l),
    new v1(8, 0, Y.t10HB, Y.t10l),
    new v1(8, 0, Y.t11HB, Y.t11l),
    new v1(8, 0, Y.t12HB, Y.t12l),
    new v1(16, 0, Y.t13HB, Y.t13l),
    new v1(0, 0, null, Y.t16_5l),
    new v1(16, 0, Y.t15HB, Y.t15l),
    new v1(1, 1, Y.t16HB, Y.t16l),
    new v1(2, 3, Y.t16HB, Y.t16l),
    new v1(3, 7, Y.t16HB, Y.t16l),
    new v1(4, 15, Y.t16HB, Y.t16l),
    new v1(6, 63, Y.t16HB, Y.t16l),
    new v1(8, 255, Y.t16HB, Y.t16l),
    new v1(10, 1023, Y.t16HB, Y.t16l),
    new v1(13, 8191, Y.t16HB, Y.t16l),
    new v1(4, 15, Y.t24HB, Y.t24l),
    new v1(5, 31, Y.t24HB, Y.t24l),
    new v1(6, 63, Y.t24HB, Y.t24l),
    new v1(7, 127, Y.t24HB, Y.t24l),
    new v1(8, 255, Y.t24HB, Y.t24l),
    new v1(9, 511, Y.t24HB, Y.t24l),
    new v1(11, 2047, Y.t24HB, Y.t24l),
    new v1(13, 8191, Y.t24HB, Y.t24l),
    new v1(0, 0, Y.t32HB, Y.t32l),
    new v1(0, 0, Y.t33HB, Y.t33l),
  ],
    Y.largetbl = [
      65540,
      327685,
      458759,
      589832,
      655369,
      655370,
      720906,
      720907,
      786443,
      786444,
      786444,
      851980,
      851980,
      851980,
      917517,
      655370,
      262149,
      393222,
      524295,
      589832,
      655369,
      720906,
      720906,
      720907,
      786443,
      786443,
      786444,
      851980,
      917516,
      851980,
      917516,
      655370,
      458759,
      524295,
      589832,
      655369,
      720905,
      720906,
      786442,
      786443,
      851979,
      786443,
      851979,
      851980,
      851980,
      917516,
      917517,
      720905,
      589832,
      589832,
      655369,
      720905,
      720906,
      786442,
      786442,
      786443,
      851979,
      851979,
      917515,
      917516,
      917516,
      983052,
      983052,
      786441,
      655369,
      655369,
      720905,
      720906,
      786442,
      786442,
      851978,
      851979,
      851979,
      917515,
      917516,
      917516,
      983052,
      983052,
      983053,
      720905,
      655370,
      655369,
      720906,
      720906,
      786442,
      851978,
      851979,
      917515,
      851979,
      917515,
      917516,
      983052,
      983052,
      983052,
      1048588,
      786441,
      720906,
      720906,
      720906,
      786442,
      851978,
      851979,
      851979,
      851979,
      917515,
      917516,
      917516,
      917516,
      983052,
      983052,
      1048589,
      786441,
      720907,
      720906,
      786442,
      786442,
      851979,
      851979,
      851979,
      917515,
      917516,
      983052,
      983052,
      983052,
      983052,
      1114125,
      1114125,
      786442,
      720907,
      786443,
      786443,
      851979,
      851979,
      851979,
      917515,
      917515,
      983051,
      983052,
      983052,
      983052,
      1048588,
      1048589,
      1048589,
      786442,
      786443,
      786443,
      786443,
      851979,
      851979,
      917515,
      917515,
      983052,
      983052,
      983052,
      983052,
      1048588,
      983053,
      1048589,
      983053,
      851978,
      786444,
      851979,
      786443,
      851979,
      917515,
      917516,
      917516,
      917516,
      983052,
      1048588,
      1048588,
      1048589,
      1114125,
      1114125,
      1048589,
      786442,
      851980,
      851980,
      851979,
      851979,
      917515,
      917516,
      983052,
      1048588,
      1048588,
      1048588,
      1048588,
      1048589,
      1048589,
      983053,
      1048589,
      851978,
      851980,
      917516,
      917516,
      917516,
      917516,
      983052,
      983052,
      983052,
      983052,
      1114124,
      1048589,
      1048589,
      1048589,
      1048589,
      1179661,
      851978,
      983052,
      917516,
      917516,
      917516,
      983052,
      983052,
      1048588,
      1048588,
      1048589,
      1179661,
      1114125,
      1114125,
      1114125,
      1245197,
      1114125,
      851978,
      917517,
      983052,
      851980,
      917516,
      1048588,
      1048588,
      983052,
      1048589,
      1048589,
      1114125,
      1179661,
      1114125,
      1245197,
      1114125,
      1048589,
      851978,
      655369,
      655369,
      655369,
      720905,
      720905,
      786441,
      786441,
      786441,
      851977,
      851977,
      851977,
      851978,
      851978,
      851978,
      851978,
      655366,
    ],
    Y.table23 = [
      65538,
      262147,
      458759,
      262148,
      327684,
      458759,
      393222,
      458759,
      524296,
    ],
    Y.table56 = [
      65539,
      262148,
      458758,
      524296,
      262148,
      327684,
      524294,
      589831,
      458757,
      524294,
      589831,
      655368,
      524295,
      524295,
      589832,
      655369,
    ],
    Y.bitrate_table = [[
      0,
      8,
      16,
      24,
      32,
      40,
      48,
      56,
      64,
      80,
      96,
      112,
      128,
      144,
      160,
      -1,
    ], [
      0,
      32,
      40,
      48,
      56,
      64,
      80,
      96,
      112,
      128,
      160,
      192,
      224,
      256,
      320,
      -1,
    ], [0, 8, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1, -1, -1, -1]],
    Y.samplerate_table = [[22050, 24e3, 16e3, -1], [44100, 48e3, 32e3, -1], [
      11025,
      12e3,
      8e3,
      -1,
    ]],
    Y.scfsi_band = [0, 6, 11, 16, 21],
    U1.Q_MAX = 257,
    U1.Q_MAX2 = 116,
    U1.LARGE_BITS = 1e5,
    U1.IXMAX_VAL = 8206;
  var R0 = {};
  return R0.SFBMAX = 3 * v.SBMAX_s,
    v.ENCDELAY = 576,
    v.POSTDELAY = 1152,
    v.MDCTDELAY = 48,
    v.FFTOFFSET = 224 + v.MDCTDELAY,
    v.DECDELAY = 528,
    v.SBLIMIT = 32,
    v.CBANDS = 64,
    v.SBPSY_l = 21,
    v.SBPSY_s = 12,
    v.SBMAX_l = 22,
    v.SBMAX_s = 13,
    v.PSFB21 = 6,
    v.PSFB12 = 6,
    v.BLKSIZE = 1024,
    v.HBLKSIZE = v.BLKSIZE / 2 + 1,
    v.BLKSIZE_s = 256,
    v.HBLKSIZE_s = v.BLKSIZE_s / 2 + 1,
    v.NORM_TYPE = 0,
    v.START_TYPE = 1,
    v.SHORT_TYPE = 2,
    v.STOP_TYPE = 3,
    v.MPG_MD_LR_LR = 0,
    v.MPG_MD_LR_I = 1,
    v.MPG_MD_MS_LR = 2,
    v.MPG_MD_MS_I = 3,
    v.fircoef = [
      -.1039435,
      -.1892065,
      -.0432472 * 5,
      -.155915,
      3898045e-23,
      .0467745 * 5,
      .50455,
      .756825,
      .187098 * 5,
    ],
    S1.MFSIZE = 3456 + v.ENCDELAY - v.MDCTDELAY,
    S1.MAX_HEADER_BUF = 256,
    S1.MAX_BITS_PER_CHANNEL = 4095,
    S1.MAX_BITS_PER_GRANULE = 7680,
    S1.BPC = 320,
    S0.RIFF = k2("RIFF"),
    S0.WAVE = k2("WAVE"),
    S0.fmt_ = k2("fmt "),
    S0.data = k2("data"),
    S0.readHeader = function (d) {
      var B = new S0(), w = d.getUint32(0, !1);
      if (
        S0.RIFF == w &&
        (d.getUint32(4, !0),
          S0.WAVE == d.getUint32(8, !1) && S0.fmt_ == d.getUint32(12, !1))
      ) {
        var X = d.getUint32(16, !0), L = 20;
        switch (X) {
          case 16:
          case 18:
            B.channels = d.getUint16(L + 2, !0),
              B.sampleRate = d.getUint32(L + 4, !0);
            break;
          default:
            throw "extended fmt chunk not implemented";
        }
        L += X, X = S0.data;
        for (
          var P = 0;
          X != w &&
          (w = d.getUint32(L, !1), P = d.getUint32(L + 4, !0), X != w);
        ) L += P + 8;
        return B.dataLen = P, B.dataOffset = L + 8, B;
      }
    },
    R0.SFBMAX = 3 * v.SBMAX_s,
    N2.Mp3Encoder = function (d, B, w) {
      arguments.length != 3 &&
        (console.error(
          "WARN: Mp3Encoder(channels, samplerate, kbps) not specified",
        ),
          d = 1,
          B = 44100,
          w = 128);
      var X = new s1(),
        L = new mt(),
        P = new a1(),
        D = new H1(),
        u = new st(),
        n = new U1(),
        R = new at(),
        e = new v2(),
        S = new tt(),
        x = new gt(),
        r = new et(),
        l = new E2(),
        s = new Et(),
        h = new vt();
      X.setModules(P, D, u, n, R, e, S, x, h),
        D.setModules(P, h, S, e),
        x.setModules(D, S),
        u.setModules(X),
        R.setModules(D, r, n, l),
        n.setModules(l, r, X.enc.psy),
        r.setModules(D),
        l.setModules(n),
        e.setModules(X, D, S),
        L.setModules(s, h),
        s.setModules(S, x, u);
      var m = X.lame_init();
      m.num_channels = d,
        m.in_samplerate = B,
        m.brate = w,
        m.mode = M1.STEREO,
        m.quality = 3,
        m.bWriteVbrTag = !1,
        m.disable_reservoir = !0,
        m.write_id3tag_automatic = !1,
        X.lame_init_params(m);
      var p = 1152, _ = 0 | 1.25 * p + 7200, i = new Int8Array(_);
      this.encodeBuffer = function (o, c) {
        return d == 1 && (c = o),
          o.length > p &&
          (p = o.length, _ = 0 | 1.25 * p + 7200, i = new Int8Array(_)),
          o = X.lame_encode_buffer(m, o, c, o.length, i, 0, _),
          new Int8Array(i.subarray(0, o));
      },
        this.flush = function () {
          var o = X.lame_encode_flush(m, i, 0, _);
          return new Int8Array(i.subarray(0, o));
        };
    },
    N2.WavHeader = S0,
    N2;
}
const Rt = N2(), Mt = Rt.Mp3Encoder;
export { Mt as Mp3Encoder };
