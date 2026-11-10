import os
D = os.path.dirname(os.path.abspath(__file__))
OR = '#e2701c'   # icon orange
ORT = '#b9530b'  # text / button orange (contrast-safe)

def svg(w, h, body, stroke=OR, sw=1.4, fill='none'):
    return '<svg width="%d" height="%d" viewBox="0 0 %d %d" fill="%s" stroke="%s" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round">%s</svg>' % (w, h, w, h, fill, stroke, sw, body)

steps = ['INFO', 'GENERAL INFO', 'OPERATION DESCRIPTIONS', 'COMMODITIES', 'DRIVER INFORMATION', 'VEHICLE', 'COVERAGE', 'UNDERWRITING INFORMATION', 'QUESTIONNAIRE', 'HIRING, TRAINING AND SAFETY', 'INSURANCE INFORMATION', 'ADDITIONAL INSURED', 'LOSS EXPERIENCE']
side = ''.join('<div class="st%s">%s</div>' % (' on' if s == 'DRIVER INFORMATION' else '', s) for s in steps)

letters = 'ABCDEFGHIJKLMNOPQRSTUVWX'
hdr = ['Actions', 'Driver Num', 'First Name', 'M.I', 'Last Name', 'Birth Date', 'Sex', 'Marital Stat', 'Driver Licen', 'State', 'Date of Hire', 'License Typ', 'Year(s) Exp']
colw = 54.6
rows = []
rows.append('<tr class="lt"><td class="rn corner"><i></i></td>' + ''.join('<td%s>%s</td>' % (' class="a"' if L == 'A' else '', L) for L in letters) + '</tr>')
rows.append('<tr class="h1"><td class="rn">1</td>' + ''.join('<td class="hb">%s</td>' % h for h in hdr) + '<td></td>' * (24 - 13) + '</tr>')
for r in range(2, 23):
    cells = []
    for c in range(24):
        txt = 'Text' if (r <= 5 and c < 13) else ''
        cls = ' class="sel"' if (r == 2 and c == 0) else ''
        cells.append('<td%s>%s</td>' % (cls, txt))
    rows.append('<tr><td class="rn%s">%d</td>%s</tr>' % (' ra' if r == 2 else '', r, ''.join(cells)))

sep = '<span class="sp"></span>'
tb = ''.join([
    svg(15, 13, '<path d="M1 3h4l1.5 1.5H13v7H1z"/><path d="M1 11.5 3.5 6H14l-2.5 5.5"/>', stroke='#555', sw=1.1),
    svg(13, 14, '<path d="M6.5 1v8M3 6l3.5 3.5L10 6M1 13h11"/>', stroke='#222', sw=1.6),
    sep,
    svg(14, 14, '<circle cx="3.5" cy="11" r="2.2"/><circle cx="10.5" cy="11" r="2.2"/><path d="M4.8 9.3 11 1M9.2 9.3 3 1"/>'),
    svg(13, 14, '<rect x="1" y="1" width="7" height="9"/><rect x="5" y="4" width="7" height="9" fill="#efefef"/>'),
    svg(12, 14, '<rect x="1.5" y="2.5" width="9" height="11"/><rect x="3.5" y="1" width="5" height="3" fill="#efefef"/>'),
    sep,
    '<b class="ti" style="color:%s">B</b><i class="ti" style="color:%s;font-family:Georgia,serif;font-style:italic;font-size:13px">I</i><u class="ti" style="color:%s">U</u>' % (OR, OR, OR),
    sep,
    svg(16, 10, '<path d="M6 2H4a3 3 0 0 0 0 6h2M10 2h2a3 3 0 0 1 0 6h-2M5 5h6"/>'),
    sep,
    svg(14, 13, '<path d="M1 1h12v8H6l-3 3V9H1z"/>', sw=1.1),
    sep,
    svg(15, 13, '<rect x="1" y="1" width="13" height="11"/><path d="M1 10l4-4 3 3 2-2 4 4"/><circle cx="10" cy="4" r="1"/>', sw=1.1),
    sep,
    svg(11, 14, '<path d="M5.5 1C3 5 1.5 7 1.5 9a4 4 0 0 0 8 0c0-2-1.5-4-4-8z"/>', sw=1.1), '<em class="dd"></em>',
    sep,
    '<b class="ti" style="color:%s;font-size:13px">A</b><em class="dd"></em>' % OR,
    sep,
    svg(14, 14, '<rect x="1" y="1" width="12" height="12"/><path d="M1 7h12M7 1v12"/>', sw=1.1), '<em class="dd"></em>',
    sep,
    '<span class="num">1</span><em class="dd" style="margin-left:14px;margin-top:6px"></em>',
    sep,
    '<span style="font-size:14px;color:#333;margin-left:6px">Arial</span><em class="dd" style="margin-left:10px"></em>',
    '<span style="width:40px"></span>',
    svg(14, 12, '<path d="M1 1h12M1 4.5h8M1 8h12M1 11.5h8"/>', sw=1.3), '<em class="dd"></em>',
    sep,
    svg(13, 15, '<rect x="1" y="1" width="11" height="4"/><path d="M1 8h11M1 11h11M1 14h11"/>', sw=1.1),
    sep,
    '<span style="font-size:8px;color:%s;font-weight:700;letter-spacing:-.3px">.00<br>&#8594;0</span>' % OR,
    '<span style="font-size:8px;color:%s;font-weight:700;letter-spacing:-.3px">.0<br>&#8594;00</span>' % OR,
    sep,
    '<span style="font-size:8px;color:#333;font-weight:700">123</span><em class="dd" style="border-top-color:#333;margin-left:10px"></em>',
    sep,
    svg(14, 13, '<rect x="1" y="1" width="12" height="11"/><path d="M1 4h12M5 4v8"/>', sw=1.1), '<em class="dd"></em>',
    svg(14, 13, '<rect x="1" y="1" width="12" height="11"/><path d="M1 4.5h12M1 8h12M5 1v11M9 1v11"/>', sw=1.1), '<em class="dd"></em>',
    sep,
    svg(12, 13, '<path d="M1 1h10L7 6v6L5 11V6z"/>', fill=OR, sw=1),
    '<span class="hot">' + svg(14, 14, '<rect x="1" y="1" width="12" height="12"/><path d="M1 7h12M7 1v12"/>', stroke='#fff', sw=1.3) + '</span>',
])

html = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Upload Match</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1600px;height:900px;overflow:hidden}
body{font-family:-apple-system,"Segoe UI",Roboto,"Open Sans",Helvetica,Arial,sans-serif;background:#eaeaea;color:#1d2a44;position:relative}
.band{position:absolute;left:0;top:0;width:25px;height:900px;background:#06508d}
.top{position:absolute;left:0;top:0;width:1600px;height:47px;background:#08508f;display:flex;color:#fff}
.logo{width:153px;padding-left:37px;font-weight:700;font-size:13px;line-height:46px;letter-spacing:.2px}
.tab{width:70px;height:47px;border-left:1px solid #b9cde0;display:flex;align-items:center;justify-content:center}
.tab:last-of-type{border-right:1px solid #b9cde0}
.tr{position:absolute;right:0;top:0;height:47px;display:flex;align-items:center}
.vd{width:1px;height:23px;background:#b9cde0}
.vf{width:1px;height:47px;background:#b9cde0}
.date{width:67px;height:47px;text-align:center;line-height:1}
.date small{display:block;font-size:10px;margin-top:-3px;height:9px;overflow:hidden}
.date b{display:block;font-weight:400;font-size:27px;line-height:24px}
.date span{display:block;font-size:13px;line-height:13px}
.white{position:absolute;left:25px;top:47px;width:1575px;height:43px;background:#fff}
.crumb{position:absolute;left:38px;top:60px;font-size:15px;color:''' + ORT + '''}
.crumb .gt{margin:0 9px;font-size:13px}
.crumb .cur{color:#1f6fb8}
.qh{position:absolute;left:25px;top:90px;width:1575px;height:115px;background:#f2f2f2;border-bottom:1.5px solid #576f7b}
.qf{position:absolute;font-size:14px;color:#1d2a44}
.qf .k{font-size:14px;font-weight:600;color:#1d2a44}
.qf .v{display:block;font-size:20px;margin-top:5px;color:#1d2a44}
.side{position:absolute;left:25px;top:206px;width:204px;height:694px;background:#06508d}
.st{height:51px;margin-bottom:1.7px;background:#e8f1f8;color:#3d6585;font-size:11px;font-weight:700;padding-left:9px;display:flex;align-items:center;letter-spacing:.1px}
.st.on{background:#06508d;color:#fff}
.edge{position:absolute;left:229px;top:206px;width:4px;height:694px;background:#08539a}
.ed{position:absolute;left:245px;top:215px;width:1343px;height:507px;background:#f0f0f0;border:1px solid #dcdcdc}
.tabs{position:absolute;left:0;top:0;height:34px;width:100%;display:flex;align-items:flex-end;border-bottom:1px solid #d5d5d5}
.tabs .t{height:28px;padding:0 13px;border:1px solid #d5d5d5;border-bottom:none;font-size:14px;color:#333;display:flex;align-items:center;margin-right:2px;background:#ececec}
.tabs .t.on{background:#fff;height:32px;margin-bottom:-1px}
.tbar{position:absolute;left:0;top:35px;height:36px;width:100%;display:flex;align-items:center;padding-left:12px;gap:10px;border-bottom:1px solid #d9d9d9}
.tbar .sp{width:1px;height:22px;background:#d6d6d6}
.ti{font-size:12px;text-decoration:none}
u.ti{text-decoration:underline}
.dd{display:inline-block;border:3.5px solid transparent;border-top:4px solid ''' + OR + ''';margin-left:-8px;margin-top:4px}
.num{font-size:13px;color:#333;border-bottom:1px solid #333;width:22px;text-align:center;margin-left:4px}
.hot{width:28px;height:28px;background:#f26b1d;border-radius:2px;display:flex;align-items:center;justify-content:center;margin-left:-4px}
.fx{position:absolute;left:0;top:72px;height:31px;width:100%;background:#fff;display:flex;align-items:center;border-bottom:1px solid #e0e0e0}
.ref{width:126px;height:22px;margin-left:5px;border-bottom:1px solid #3a5a8a;font-size:14px;color:#333;padding:1px 9px;position:relative}
.ref:after{content:"";position:absolute;right:6px;top:10px;border:3.5px solid transparent;border-top:4px solid #333}
.fxl{margin-left:20px;font-family:Georgia,serif;font-style:italic;font-size:13px;color:#444;border-right:1px solid #bbb;padding-right:6px}
.fxv{margin-left:12px;font-size:14px;color:#333}
.gw{position:absolute;left:0;top:104px;width:1328px;height:389px;overflow:hidden;background:#fff}
table{border-collapse:collapse;table-layout:fixed;width:1337px}
td{height:17px;border:1px solid #e1e1e1;font-size:10.5px;color:#222;padding:0 0 0 2px;white-space:nowrap;overflow:hidden}
td.rn{width:27px;background:#f0f0f0;text-align:center;color:#333;font-size:10px;padding:0;border-color:#f0f0f0;border-bottom-color:#f0f0f0}
td.ra{background:#f6d6c5}
tr.lt td{background:#ececec;text-align:center;font-size:10.5px;height:18px;color:#333;padding:0;border-color:#dedede}
tr.lt td.a{background:#f2c9b1}
tr.lt td.corner{position:relative}
tr.lt td.corner i{position:absolute;right:2px;bottom:2px;border:5px solid transparent;border-right-color:#bdbdbd;border-bottom-color:#bdbdbd}
tr.h1 td{height:20px;border-bottom:1.5px solid #9ec5ea}
td.hb{background:#cfe6fa;color:#2f6496;text-align:center;font-size:10.5px;padding:0;border-color:#b6d4ef}
td.sel{outline:2px solid #e2701c;outline-offset:-2px;position:relative}
tr td:nth-child(3){border-right:1px solid #8c8c8c}
.vs{position:absolute;right:0;top:104px;width:14px;height:389px;background:#f1f1f1}
.vs i{position:absolute;left:3px;top:14px;width:8px;height:40px;background:#c1c1c1;border-radius:1px}
.hs{position:absolute;left:0;top:493px;width:1328px;height:12px;background:#f1f1f1}
.hs i{position:absolute;left:12px;top:2px;width:630px;height:8px;background:#c1c1c1}
.btns{position:absolute;left:248px;top:734px;display:flex;gap:3px}
.b{height:33px;color:#fff;font-size:14px;font-weight:600;display:flex;align-items:center;gap:5px;padding:0 9px}
.b.f{background:#f8cdaa;color:#fff}
.b.s{background:''' + ORT + '''}
</style></head><body>
<div class="top">
  <div class="logo">Harbor &amp; Pine</div>
  <div class="tab">''' + svg(22, 19, '<path d="M11 1 1 10h3v8h5v-5h4v5h5v-8h3z"/>', stroke='none', fill='#fff') + '''</div>
  <div class="tab">''' + svg(28, 22, '<circle cx="14" cy="5" r="4"/><circle cx="6" cy="7" r="3"/><circle cx="22" cy="7" r="3"/><path d="M7 21v-5c0-3 3-5 7-5s7 2 7 5v5zM1 20v-4c0-2 2-4 5-4l1 .2M27 20v-4c0-2-2-4-5-4l-1 .2"/>', stroke='none', fill='#fff') + '''</div>
  <div class="tab">''' + svg(25, 20, '<path d="M12.5 1A11.5 11.5 0 0 0 1 12.5V19h23v-6.5A11.5 11.5 0 0 0 12.5 1z" fill="#fff" stroke="none"/><path d="M12.5 15 17 7" stroke="#08508f" stroke-width="2.2"/><circle cx="12.5" cy="15" r="2.2" fill="#08508f" stroke="none"/><circle cx="5" cy="13" r="1.2" fill="#08508f" stroke="none"/><circle cx="7" cy="7.5" r="1.2" fill="#08508f" stroke="none"/><circle cx="12.5" cy="5" r="1.2" fill="#08508f" stroke="none"/><circle cx="20" cy="13" r="1.2" fill="#08508f" stroke="none"/>', stroke='none') + '''</div>
  <div class="tab">''' + svg(43, 20, '<rect x="1" y="1" width="18" height="18" rx="3" fill="#fff" stroke="none"/><path d="M5 10l3.5 3.5L15 6" stroke="#08508f" stroke-width="2.6" fill="none"/><path d="M24 4h18M24 10h18M24 16h18" stroke="#fff" stroke-width="3" fill="none"/>', stroke='none') + '''</div>
  <div class="tab">''' + svg(20, 20, '<path d="M10 1v18M1 10h18"/>', stroke='#fff', sw=3.6) + '''</div>
  <div class="tr">
    <span style="width:6px;height:1px;background:#fff;margin:14px 13px 0 0;opacity:.8"></span>
    ''' + svg(20, 20, '<circle cx="8" cy="8" r="6"/><path d="M12.5 12.5 18 18"/>', stroke='#fff', sw=2.8) + '''
    <span class="vd" style="margin:0 25px 0 18px"></span>
    ''' + svg(20, 20, '<circle cx="8" cy="8" r="6"/><path d="M12.5 12.5 18 18M5 8h6M8 5v6"/>', stroke='#fff', sw=2.4) + '''
    <span class="vf" style="margin-left:26px"></span>
    <span style="width:70px;display:flex;justify-content:center">''' + svg(6, 20, '<rect x="0" y="0" width="6" height="5" rx="1"/><rect x="0" y="7.5" width="6" height="5" rx="1"/><rect x="0" y="15" width="6" height="5" rx="1"/>', stroke='none', fill='#fff') + '''</span>
    <span class="vf"></span>
    <div class="date"><small>Jan</small><b>12</b><span>2020</span></div>
  </div>
</div>
<div class="band"></div>
<div class="white"></div>
<div class="crumb">Customers<span class="gt">&gt;</span>Corgi Company<span class="gt">&gt;</span><span class="cur">New Quote</span></div>
<div style="position:absolute;left:1499px;top:57px;display:flex;gap:5px">''' + svg(21, 18, '<path d="M10.5 1C16 1 20 4.2 20 8s-4 7-9.5 7c-1.2 0-2.3-.1-3.300-.4L3 17l1-3.700C2.200 12 1 10.100 1 8 1 4.200 5 1 10.500 1z"/><circle cx="6.5" cy="8" r="1.4" fill="#fff" stroke="none"/><circle cx="10.5" cy="8" r="1.4" fill="#fff" stroke="none"/><circle cx="14.5" cy="8" r="1.4" fill="#fff" stroke="none"/>', stroke='none', fill=OR) + svg(18, 18, '<path d="M1 1h12.5L17 4.5V17H1z"/><path d="M4.5 1v5h8V1M4 17v-6h10v6"/>', sw=1.4) + '''</div>
<div class="qh"></div>
<div class="qf" style="left:34px;top:98px"><span class="k">QUOTE NUMBER</span></div>
<div class="qf" style="left:273px;top:98px"><span class="k">EFFECTIVE PERIOD</span><span class="v">01/12/2020 - 01/12/2021</span></div>
<div class="qf" style="left:512px;top:98px"><span class="k">INSURED</span><span class="v" style="color:''' + ORT + '''">Corgi Company</span></div>
<div class="qf" style="left:751px;top:98px"><span class="k">HOME PHONE</span></div>
<div class="qf" style="left:990px;top:98px"><span class="k">PRODUCT</span><span class="v">Trucking</span></div>
<div class="qf" style="left:1229px;top:98px"><span class="k">TOTAL PREMIUM</span><span class="v">$0.00</span></div>
<div style="position:absolute;left:1526px;top:99px">''' + svg(16, 16, '<circle cx="8" cy="8" r="7.5" fill="#e2701c" stroke="none"/><path d="M4.5 9.5 8 6l3.5 3.5" stroke="#fff" stroke-width="2.2" fill="none"/>', stroke='none') + '''</div>
<div class="qf" style="left:273px;top:162px"><span class="k">Transaction:</span></div>
<div class="qf" style="left:512px;top:162px"><span class="k">Status:</span> Incomplete (New Quote)</div>
<div class="qf" style="left:751px;top:162px"><span class="k">Risk Location:</span> California</div>
<div class="qf" style="left:990px;top:162px;width:220px;line-height:19px"><span class="k">UW Company:</span> Harbor &amp; Pine<br>Mutual</div>
<div class="qf" style="left:1229px;top:162px"><span class="k">Issuer:</span></div>
<div class="side">''' + side + '''</div>
<div class="edge"></div>
<div class="ed">
  <div class="tabs"><span style="display:flex;gap:14px;align-self:center;margin:0 6px 0 12px">''' + svg(14, 12, '<path d="M6 1 1 5.5 6 10V7c3.500 0 5.500 1 7 3.500C12.500 6 10 3.700 6 3.500z"/>', stroke='none', fill=OR) + svg(14, 12, '<path d="M8 1l5 4.5L8 10V7c-3.500 0-5.500 1-7 3.500C1.500 6 4 3.700 8 3.500z"/>', stroke='none', fill=OR) + '''</span><span class="t on">Home</span><span class="t">Insert</span><span class="t">Data</span></div>
  <div class="tbar">''' + tb + '''</div>
  <div class="fx"><div class="ref">A2</div><span class="fxl">fx</span><span class="fxv">Text</span></div>
  <div class="gw"><table><colgroup><col style="width:27px">''' + ('<col style="width:%spx">' % colw) * 24 + '''</colgroup>''' + '\n'.join(rows) + '''</table></div>
  <div class="vs"><i></i></div>
  <div class="hs"><i></i></div>
</div>
<div class="btns">
  <div class="b f" style="width:188px">''' + svg(13, 13, '<circle cx="6.5" cy="6.5" r="6.5" fill="#fff" stroke="none"/><path d="M6.5 3.5v6M3.5 6.5h6" stroke="#f8cdaa" stroke-width="1.8"/>', stroke='none') + '''Create New Driver(s)</div>
  <div class="b f" style="width:113px">''' + svg(13, 13, '<circle cx="6.5" cy="6.5" r="5.5" stroke="#fff" stroke-width="1.6"/><circle cx="6.5" cy="6.5" r="2.2" fill="#fff" stroke="none"/>', stroke='none') + '''Remove All</div>
  <div class="b s" style="width:115px">''' + svg(13, 13, '<circle cx="6.5" cy="6.5" r="5.5" stroke="#fff" stroke-width="1.6"/><circle cx="6.5" cy="6.5" r="2.2" fill="#fff" stroke="none"/>', stroke='none') + '''Upload File</div>
  <div class="b s" style="width:115px;justify-content:center">''' + svg(13, 13, '<circle cx="6.5" cy="6.5" r="5.5" stroke="#fff" stroke-width="1.6"/><circle cx="6.5" cy="6.5" r="2.2" fill="#fff" stroke="none"/>', stroke='none') + '''Undo</div>
</div>
</body></html>'''
open(os.path.join(D, 'design-upload-match-2020.html'), 'w').write(html)
