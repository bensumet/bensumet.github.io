import os
D = os.path.dirname(os.path.abspath(__file__))

HEAD = r'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>%(title)s</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1548px;height:668px;overflow:hidden}
body{font-family:-apple-system,"Segoe UI",Roboto,"Open Sans",Helvetica,Arial,sans-serif;background:#f1f1f1;color:#222;font-size:12px}
.bar{height:25px;background:#18324b;display:flex;align-items:center;color:#fff;position:relative}
.logo{font-weight:700;font-size:8px;margin-left:13px;width:75px}
.nav{display:flex}.nav span{width:38px;display:flex;justify-content:center}
.right{position:absolute;right:0;top:0;height:25px;display:flex;align-items:center}
.pill{width:4px;height:18px;background:#fff;border-radius:2px;margin-right:8px}
.asst{background:#fff;color:#18324b;font-weight:700;font-size:8.5px;border-radius:3px;width:63px;height:18px;display:flex;align-items:center;justify-content:center;margin:0 18px 0 8px}
.crumb{height:32px;background:#f7f7f7;display:flex;align-items:center;padding-left:12px;font-size:12px;position:relative}
.crumb a{color:#3c6a93;text-decoration:underline}
.crumb .sep{margin:0 6px}
.acts{position:absolute;right:0;top:0;height:32px;display:flex;align-items:center;gap:12px}
.pbtn{background:#3d6a96;color:#fff;font-size:12.5px;font-weight:600;height:22px;border-radius:3px 0 0 3px;display:flex;align-items:center;padding:0 3px 0 6px;margin-left:16px}
.sum{position:absolute;left:12px;top:69px;width:1536px;height:191px;background:#e5e5e5}
.sum .f{position:absolute;font-size:12px;line-height:15px}
.sum .f b{display:block;font-size:9.5px;font-weight:700;line-height:13px;margin-bottom:1px}
.sum a{color:#3c6a93;text-decoration:underline}
.tot{position:absolute;left:1324px;top:69px;width:224px;height:191px;background:#1d384b;color:#fff;text-align:center}
.tot b{display:block;font-size:10px;margin-top:32px}
.tot span{display:block;font-size:15px;margin-top:6px}
.side{position:absolute;left:12px;top:289px;width:152px;height:312px;background:#e3e3e3;border-radius:6px;padding-top:8px}
.side div{height:23px;margin:0 7px 4.7px 7px;font-size:10px;display:flex;align-items:center;padding-left:21px;position:relative;color:#333;border-radius:3px}
.side div:before{content:"";position:absolute;left:8px;top:10px;width:3px;height:3px;background:#999}
.side div.on{background:#1d384b;color:#fff}
.side div.on:before{background:#9fb3c4}
.panel{position:absolute;left:176px;background:#f8f8f8;border-radius:6px 0 0 6px;width:1372px;overflow:hidden}
h3{font-weight:400;font-size:14px;color:#2a3a48}
.kv{position:absolute;font-size:12px;line-height:15px}
.kv b{display:block;font-size:9.5px;font-weight:700;line-height:13px;margin-bottom:1px}
</style></head><body>
<div class="bar">
  <div class="logo">Harbor &amp; Pine</div>
  <div class="nav">
    <span><svg width="13" height="12" viewBox="0 0 13 12" fill="none" stroke="#fff" stroke-width="1"><path d="M1 6.5 6.5 1 12 6.5M3 5v6h7V5"/></svg></span>
    <span><svg width="12" height="13" viewBox="0 0 12 13" fill="none" stroke="#fff" stroke-width="1"><circle cx="6" cy="2.5" r="1.5"/><path d="M6 4v3M2 7h8M2 7v2M10 7v2M6 7v2"/><circle cx="2" cy="10.5" r="1.3"/><circle cx="6" cy="10.5" r="1.3"/><circle cx="10" cy="10.5" r="1.3"/></svg></span>
    <span><svg width="13" height="11" viewBox="0 0 13 11" fill="none" stroke="#fff" stroke-width="1"><path d="M1.5 9a5 5 0 1 1 10 0z"/><path d="M6.5 8 9 4.5"/></svg></span>
    <span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="1"><rect x="1" y="1" width="10" height="10"/><path d="M3 4l1 1 2-2M7 4h2.5M3 8l1 1 2-2M7 8h2.5"/></svg></span>
    <span><svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="#fff" stroke-width="1"><path d="M6 1v10M1 6h10M13 5l2 2 2-2"/></svg></span>
  </div>
  <div class="right">
    <div class="pill"></div>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" stroke-width="1.1"><circle cx="6" cy="6" r="4.3"/><path d="M9.2 9.2 13 13"/></svg>
    <svg style="margin-left:12px" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" stroke-width="1.1"><circle cx="6" cy="6" r="4.3"/><path d="M9.2 9.2 13 13M4 6h4M6 4v4"/></svg>
    <div class="asst">Assistant</div>
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="#fff" stroke-width=".9"><rect x="1" y="1" width="5" height="5"/><rect x="8" y="1" width="5" height="5"/><rect x="1" y="9" width="5" height="5"/><path d="M8 9h5v5M15 8l1.5 1.5L18 8"/></svg>
    <svg style="margin-left:14px" width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="#fff" stroke-width="1"><path d="M2 12 10 3l2 2-8 8zM10 3l2-2 2 2-2 2M15 7l1.5 1.5L18 7"/></svg>
    <svg style="margin:0 10px 0 14px" width="4" height="14" viewBox="0 0 4 14" fill="#fff"><circle cx="2" cy="2" r="1.3"/><circle cx="2" cy="7" r="1.3"/><circle cx="2" cy="12" r="1.3"/></svg>
  </div>
</div>
<div class="crumb"><a>Customers</a><span class="sep"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" stroke="#666" stroke-width="1"><path d="M1 1l4.5 4.5L1 10"/></svg></span><a>KESTREL PRINT SHOP</a><span class="sep"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" stroke="#666" stroke-width="1"><path d="M1 1l4.5 4.5L1 10"/></svg></span><u>Policy Number: 0205020171</u>
  <div class="acts">
    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="#3d6a96" stroke-width="1.1"><rect x="1" y="1" width="12" height="9" rx="1"/><path d="M1 1.5 7 6l6-4.5"/></svg>
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" stroke="#3d6a96" stroke-width="1.1"><path d="M3 1h6l3 3v10H3z"/><path d="M1 3v11.5h9"/><path d="M5.5 6h4v5h-4zM5.5 8.5h4"/></svg>
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" stroke="#3d6a96" stroke-width="1.1"><path d="M7.5 1C11 1 14 3.3 14 6.2S11 11.4 7.5 11.4c-.8 0-1.6-.1-2.3-.3L2 13l.8-3C1.700 9 1 7.700 1 6.200 1 3.300 4 1 7.500 1z"/><circle cx="5" cy="6.2" r=".6" fill="#3d6a96"/><circle cx="7.5" cy="6.2" r=".6" fill="#3d6a96"/><circle cx="10" cy="6.2" r=".6" fill="#3d6a96"/></svg>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#3d6a96" stroke-width="1.1"><path d="M7 2H1.5v10.5H12V7"/><path d="M5 9l.5-2.5L11.5.8l2 2L7.5 8.5z"/></svg>
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" stroke="#3d6a96" stroke-width="1.1"><path d="M4 4V1h7v3M4 10H1.5V4.5h12V10H11"/><rect x="4" y="8" width="7" height="5"/></svg>
    <div class="pbtn">Policy<svg style="margin-left:1px" width="6" height="5" viewBox="0 0 6 5"><path d="M0 0h6L3 4z" fill="#fff"/></svg></div>
  </div>
</div>
<div class="sum">
%(sum)s
</div>
<div class="tot"><svg style="position:absolute;right:6px;top:10px" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="1"><circle cx="6" cy="6" r="5.3"/><path d="M3.5 7.3 6 4.8l2.5 2.5"/></svg><b>Total Premium</b><span>$222.10</span></div>
<div class="side">%(side)s</div>
'''

cols = [13, 229, 446, 662, 879, 1095]
rows1 = [[('Policy Number', '<a>0205020171</a>'), ('Effective Period', '06/28/2021 - 06/28/2022'), ('Term', 'Current Policy (1)'), ('Status', 'New'), ('Product', 'BusinessOwners'), ('UW Company', 'Harbor &amp; Pine Mutual')],
         [('Insured', '<a>KESTREL PRINT SHOP</a>'), ('Risk Location', 'California'), ('Address', '220 Harbor Way San Francisco, CA<br>94107, US'), ('Mobile Phone', '(555) 014-2290'), ('Claim Indicator', 'No'), ('Customer Type', 'Commercial')],
         [('Billing Cycle', 'Conversion Pending'), ('Current Amount Due', '$0.00'), ('Policy Balance', '$0.00'), ('Bill Plan', '1-Pay'), ('Bill Type', 'Direct Bill'), ('Autopay Method', 'None')],
         [('Paid Through Date', '06/28/2022')]]
tops = [14, 54, 110, 150]
sm = []
for r, t in zip(rows1, tops):
    for (k, v), x in zip(r, cols):
        sm.append('<div class="f" style="left:%dpx;top:%dpx"><b>%s</b>%s</div>' % (x, t, k, v))
SUM = '\n'.join(sm)

STEPS = ['General Policy Info', 'Policy Information', 'Property Information', 'Additional Interest', 'Forms', 'UW Results', 'Premium', 'Premium Override', 'Bill Options', 'History', 'Documents']
def side(sel):
    return ''.join('<div%s>%s</div>' % (' class="on"' if s == sel else '', s) for s in STEPS)

# ---------- overview ----------
def kvs(items, left0, top0):
    out = []
    xs = [0, 338, 676]
    for i, (k, v) in enumerate(items):
        out.append('<div class="kv" style="left:%dpx;top:%dpx"><b>%s</b>%s</div>' % (left0 + xs[i % 3], top0 + 39 * (i // 3), k, v))
    return '\n'.join(out)

pd = [('Custom Policy Number', 'HP-0205-0171'), ('Date Converted', '11/17/2021'), ('Original Inception Date', '06/28/2021'),
      ('Term', 'Twelve Months'), ('Effective Date', '06/28/2021'), ('Expiration Date', '06/28/2022'),
      ('Group', 'BOP Account #1002'), ('Market Code', 'Main Street Retail Campaign'), ('UW Company', 'HPMIC')]
over = HEAD % {'title': 'Policy Overview', 'sum': SUM, 'side': side('General Policy Info')} + '''
<div class="panel" style="top:289px;height:183px">
  <h3 style="position:absolute;left:12px;top:18px">Policy Details</h3>
  %s
</div>
<div class="panel" style="top:484px;height:184px">
  <h3 style="position:absolute;left:12px;top:18px">Insured Information</h3>
  <div style="position:absolute;left:20px;top:46px;width:322px;height:160px;border:1px solid #b9b9b9;border-radius:4px;background:#fbfbfb">
    <div style="position:absolute;left:12px;top:14px;font-size:12px;display:flex;align-items:center;gap:6px"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#333" stroke-width=".9"><rect x=".5" y=".5" width="9" height="9"/><circle cx="5" cy="4" r="1.6"/><path d="M2 9c.5-1.8 1.6-2.6 3-2.6s2.5.8 3 2.6"/></svg>KESTREL PRINT SHOP</div>
    <svg style="position:absolute;right:16px;top:16px" width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#333" stroke-width=".9"><circle cx="5.5" cy="5.5" r="4.9"/><path d="M5.5 4.8v3.2M5.5 3v.6"/></svg>
    <div class="kv" style="left:12px;top:45px"><b>Type</b>Named Insured</div>
    <div class="kv" style="left:12px;top:85px"><b>Phone</b>(555) 014-2290</div>
    <div class="kv" style="left:12px;top:125px"><b>Email</b>june.alder@example.com</div>
  </div>
</div>
</body></html>''' % kvs(pd, 20, 46)
open(os.path.join(D, 'policy-overview.html'), 'w').write(over)

# ---------- property grid ----------
letters = 'ABCDEFGHIJKLMNOP'
widths = [62, 76, 63, 63, 63, 63, 108, 63, 63, 107, 125, 90, 91, 128, 75, 84]
hdr = ['Action', 'Other Errors', 'Number', 'Location', 'Building', 'Address 1', 'Zipcode / Zip + 4', 'City', 'State', 'Class Description', 'Interest in Premises', 'Exposure Basis', 'Exposure Amount', 'Building Limit of Insurance', 'Construction', 'Building Code Effective']
data = ['@', '', '', '1', '1', '220 Harbor Way', '94107', 'San Francisco', 'CA', 'Accounting Services - CPAs - L', 'Lessor', 'LOI', '300000', '30000', 'Frame Construction', '1']
caret = '<i class="cr"></i>'
rh = 18.3
g = []
g.append('<tr class="lt"><td class="rn corner"></td>' + ''.join('<td class="%s">%s</td>' % ('selc' if L == 'D' else '', L) for L in letters) + '</tr>')
g.append('<tr class="hd"><td class="rn">1</td>' + ''.join('<td><span>%s</span>%s</td>' % (h, caret) for h in hdr) + '</tr>')
cells = []
for i, v in enumerate(data):
    cls = 'sel' if i == 3 else ''
    if v == '@':
        v = '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#6b7fae" stroke-width=".9"><circle cx="5.5" cy="5.5" r="4.8"/><path d="M5.5 2.8v3l1.6 1"/></svg>'
    if i in (1, 2):
        cls = 'ro'
    cells.append('<td class="%s">%s</td>' % (cls, v))
g.append('<tr class="dr"><td class="rn rsel">2</td>' + ''.join(cells) + '</tr>')
for n in range(3, 12):
    g.append('<tr class="er"><td class="rn">%d</td>' % n + '<td></td>' * 16 + '</tr>')
colg = '<col style="width:20px">' + ''.join('<col style="width:%dpx">' % w for w in widths)

tiles = [('No Filter', None, '#c62828'), ('Misc', '0', '#3f7d23'), ('Format', '0', '#3f7d23'), ('Missing Data', '0', '#3f7d23'), ('Data Size', '0', '#3f7d23'), ('Invalid', '0', '#3f7d23')]
th = ''.join('<div class="tile" style="background:%s">%s<em>%s</em></div>' % (c, ('<span>%s</span>' % n) if n else '', l) for l, n, c in tiles)

GRID_CSS = '''
<style>
.tiles{position:absolute;left:16px;top:60px;display:flex;gap:6px}
.tile{width:63px;height:37px;border-radius:2px;color:#fff;position:relative;text-align:center}
.tile span{position:absolute;left:0;right:0;top:0;font-size:22px;line-height:26px;font-weight:300}
.tile em{position:absolute;left:0;right:0;bottom:3px;font-style:normal;font-size:8.5px;font-weight:700}
.tb{position:absolute;left:16px;top:100px;width:1344px;height:32px;background:#e3e3e3;display:flex;align-items:center;padding-left:12px;gap:10px}
.fx{position:absolute;left:16px;top:133px;width:1344px;height:27px;background:#3e6e7c;display:flex;align-items:center}
.ref{width:98px;height:19px;background:#fff;border-radius:2px;margin-left:6px;font-size:11px;padding:2px 5px;position:relative}
.ref:after{content:"";position:absolute;right:6px;top:7px;border:3px solid transparent;border-top:4px solid #333}
.fxi{font-family:Georgia,serif;font-style:italic;color:#fff;font-size:11px;margin:0 9px 0 11px}
.fbar{flex:1;height:19px;background:#a5acb2;margin-right:6px;font-size:11px;padding:2px 4px;color:#1d2a33}
table.g{position:absolute;left:16px;top:160px;border-collapse:collapse;table-layout:fixed;width:1344px;background:#fff}
table.g td{height:18.3px;border:1px solid #e3e3e3;font-size:7.4px;color:#444;text-align:center;white-space:nowrap;overflow:hidden;padding:0 2px;position:relative}
table.g td.rn{background:#3e6e7c;color:#fff;font-size:9.5px;font-weight:700;border-color:#3e6e7c;border-bottom-color:#5a8794}
table.g tr.lt td{background:#3e6e7c;color:#fff;font-size:10px;font-weight:700;border-color:#5a8794;height:19px}
table.g tr.lt td.selc{background:#7a6a76}
table.g td.rsel{background:#6e6670}
table.g tr.lt td:nth-child(2){border-right:2px solid #fff}
table.g tr.hd td{color:#555;text-align:center;padding-right:14px;border-top:1.5px solid #e86b6b;border-bottom:1.5px solid #e86b6b}
table.g tr.hd td.rn{border-color:#3e6e7c;padding:0}
table.g tr.dr td{border-bottom:1.5px solid #e86b6b;color:#333}
table.g tr.dr td.rn{border-bottom-color:#3e6e7c}
table.g td.ro{background:#f4f4f4}
table.g td.sel{outline:2px solid #e05555;outline-offset:-2px;background:#fdeeee}
table.g tr.er td{height:18.3px}
i.cr{position:absolute;right:3px;top:4px;width:9px;height:9px;border:1px solid #888;background:#fff}
i.cr:after{content:"";position:absolute;left:1.5px;top:2.5px;border:2.5px solid transparent;border-top:3px solid #222}
</style>'''

ico = lambda p, w=12: '<svg width="%d" height="12" viewBox="0 0 %d 12" fill="none" stroke="#222" stroke-width="1.2">%s</svg>' % (w, w, p)
tools = ''.join([
    ico('<path d="M4 3 1 6l3 3M1 6h7a3 3 0 0 1 3 3"/>'), ico('<path d="M8 3l3 3-3 3M11 6H4a3 3 0 0 0-3 3"/>'),
    '<span style="width:4px"></span>', ico('<path d="M6 1v7M3 5l3 3 3-3M1.5 11h9"/>'),
    '<span style="width:4px"></span>', ico('<circle cx="3" cy="9" r="2"/><circle cx="9" cy="9" r="2"/><path d="M4.3 7.6 9.5 1M7.7 7.6 2.5 1"/>'),
    ico('<rect x="1" y="1" width="6" height="7"/><rect x="4.5" y="4" width="6" height="7" fill="#e3e3e3"/>'),
    ico('<rect x="2" y="2" width="8" height="9.5"/><rect x="4" y=".8" width="4" height="2.2" fill="#e3e3e3"/>'),
    '<span style="width:6px"></span>', ico('<rect x="1" y="1.5" width="10" height="9"/><path d="M1 4.5h10M1 7.5h10M4.3 1.5v9M7.6 1.5v9"/>'),
    '<svg width="6" height="5" viewBox="0 0 6 5" style="margin-left:-6px"><path d="M0 0h6L3 4z" fill="#222"/></svg>'])

grid = HEAD % {'title': 'Property Information', 'sum': SUM, 'side': side('Property Information')} + GRID_CSS + '''
<div class="panel" style="top:289px;height:379px">
  <h3 style="position:absolute;left:16px;top:16px">Property Information</h3>
  <div class="tiles">%s</div>
  <div class="tb">%s</div>
  <div class="fx"><div class="ref">D2</div><span class="fxi">fx</span><div class="fbar">'1</div></div>
  <table class="g"><colgroup>%s</colgroup>%s</table>
</div>
</body></html>''' % (th, tools, colg, '\n'.join(g))
open(os.path.join(D, 'policy-property-grid.html'), 'w').write(grid)
