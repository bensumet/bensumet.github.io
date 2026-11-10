#!/usr/bin/env python3
"""Builds theme-preview.html (one file, ?theme=botanico|autunno|cielo) and admin-theme-editor.html.
The preview markup/CSS is shared so the editor's right panel is the same component."""
import os
D = os.path.dirname(os.path.abspath(__file__))

FONT = '-apple-system,"Segoe UI",Roboto,"Open Sans",Helvetica,Arial,sans-serif'

PV_CSS = r"""
.pv{position:relative;width:1002px;height:582px;overflow:hidden;background:var(--bg1);font-family:%(font)s;color:#1f1f1f}
.pv[data-theme=botanico]{--primary:#112f36;--accent:#018880;--accent2:#7b9b96;--accent3:#005a55;--bg1:#dfe2de;--bg2:#d7d7d7;--bg3:#f2f2f2;--crumb:#ffffff;
  --banner:linear-gradient(100deg,#0b0f0e 0%%,#1a2523 22%%,#0d1211 41%%,#22302d 63%%,#0b100f 82%%,#1b2624 100%%);
  --link:#017a73;--link-cur:#016e68;--sep:#7f8c8a;--head:#0f6a65;--icon:#2f8f86;--tabbg:#e6e9e8;--row:#ebebeb;--summary:#f0f0f0;--inp:#e3e5e2;--tabdot:#94b5b1}
.pv[data-theme=autunno]{--primary:#014e51;--accent:#bf5e26;--accent2:#9f6631;--accent3:#591202;--bg1:#f5f3ea;--bg2:#e5e6d9;--bg3:#eceee6;--crumb:#fbfbf6;
  --banner:linear-gradient(90deg,#0e3d40 0%%,#14595a 18%%,#3d6a62 40%%,#6d6e55 58%%,#a8662c 78%%,#c0672a 90%%,#8e4a1f 100%%);
  --link:#a8521f;--link-cur:#591202;--sep:#8f7a6a;--head:#6a1a06;--icon:#c4632a;--tabbg:#eef0ea;--row:#f1f2ed;--summary:#e9eae4;--inp:#f0efe8;--tabdot:#b39a8e}
.pv[data-theme=cielo]{--primary:#07508e;--accent:#e97117;--accent2:#f7a86d;--accent3:#036fca;--bg1:#eaeaea;--bg2:#f2f2f2;--bg3:#f3f3f3;--crumb:#ffffff;
  --banner:#0a4e8d;
  --link:#b35409;--link-cur:#07508e;--sep:#9a8f88;--head:#1c74bf;--icon:#e97117;--tabbg:#e7eff8;--row:#e9f0fa;--summary:#f3f3f3;--inp:#ececec;--tabdot:#8ebdd7}
.pv .a{position:absolute}
.pv .banner{left:0;top:0;width:1002px;height:25px;background:var(--banner)}
.pv[data-theme=botanico] .banner::after{content:"";position:absolute;inset:0;background:
  linear-gradient(148deg,transparent 0 46%%,rgba(120,150,140,.18) 46%% 47%%,transparent 47%%),
  linear-gradient(32deg,transparent 0 61%%,rgba(120,150,140,.14) 61%% 62%%,transparent 62%%),
  linear-gradient(160deg,transparent 0 78%%,rgba(120,150,140,.16) 78%% 79%%,transparent 79%%),
  linear-gradient(20deg,transparent 0 22%%,rgba(120,150,140,.14) 22%% 23%%,transparent 23%%)}
.pv[data-theme=autunno] .banner::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 14px,rgba(0,0,0,.05) 14px 28px)}
.pv .logo{left:12px;top:7px;color:#fff;font-weight:700;font-size:7.6px;z-index:1}
.pv .kebab{left:962px;top:6px;z-index:1}
.pv .crumb{left:0;top:25px;width:1002px;height:32px;background:var(--crumb)}
.pv .bc{left:6px;top:33px;font-size:11px;display:flex;align-items:center;gap:0}
.pv .bc a{color:var(--link);text-decoration:underline;text-underline-offset:2px}
.pv .bc a.cur{color:var(--link-cur)}
.pv .bc svg{width:14px;height:12px;stroke:var(--sep);fill:none;stroke-width:1.1;margin:0 3px 0 4px}
.pv .sum{left:0;top:57px;width:852px;height:111px;background:var(--summary)}
.pv .sl{font-size:8px;font-weight:700;color:#1f1f1f}
.pv .sv{font-size:11px;color:#222;line-height:17px}
.pv .prem{left:852px;top:57px;width:150px;height:111px;background:var(--primary);color:#fff;text-align:center}
.pv .prem .t{position:absolute;left:0;right:0;top:33px;font-size:8.5px;font-weight:700}
.pv .prem .v{position:absolute;left:0;right:0;top:51px;font-size:14.5px;letter-spacing:.2px}
.pv .tabs{left:6px;top:179px;width:145px;height:89px;background:var(--tabbg);border-radius:4px}
.pv .tb{position:absolute;left:0;width:139px;height:20px;font-size:8.5px;color:#3a3a3a;line-height:20px;padding-left:22px}
.pv .tb::before{content:"";position:absolute;left:8px;top:8.5px;width:3px;height:3px;border-radius:50%%;background:var(--tabdot)}
.pv .tb.on{background:var(--primary);color:#fff;border-radius:3px}
.pv .card{left:163px;top:178px;width:816px;height:430px;background:#fcfcfc;border-radius:6px}
.pv .h1{font-size:14.5px;color:var(--head);font-weight:400}
.pv .th{font-size:11.5px;color:#2a2a2a}
.pv .row{left:179px;width:785px;height:34px;background:var(--row);border-radius:4px}
.pv .td{font-size:11.5px;color:#222}
.pv .ic{width:12px;height:12px;stroke:var(--icon);fill:none;stroke-width:1.3}
.pv .fl{font-size:8px;font-weight:700;color:#1f1f1f}
.pv .fv{font-size:11px;color:#222}
.pv .hr{left:179px;top:483px;width:785px;height:1px;background:#ececec}
.pv .in{height:25px;background:var(--inp);border:1px solid #c9cbc8;border-radius:3px}
""" % {"font": FONT}

def pv_html(theme):
    cols = [(12, 'Policy Number', ['12345678']), (152, 'Effective Period', ['02/03/2025 -', '02/03/2026']),
            (292, 'Product', ['General']), (432, 'Term', ['Current Policy (1)']),
            (572, 'Insured', ['Company']), (712, 'Status', ['Issued'])]
    s = []
    for x, l, v in cols:
        s.append(f'<div class="a sl" style="left:{x}px;top:71px">{l}</div><div class="a sv" style="left:{x}px;top:83px">{"<br>".join(v)}</div>')
    for x, l, v in [(12, 'UW Company', 'Company X'), (152, 'Risk Location', 'Maine')]:
        s.append(f'<div class="a sl" style="left:{x}px;top:127px">{l}</div><div class="a sv" style="left:{x}px;top:139px">{v}</div>')
    summary = "\n".join(s)
    chev = '<svg viewBox="0 0 14 12"><path d="M5 2l4 4-4 4"/></svg>'
    edit = '<svg class="ic" viewBox="0 0 12 12"><path d="M6 2H2v8h8V6"/><path d="M5 7l.4-1.8L10 .9 11.1 2 6.8 6.6z"/></svg>'
    trash = '<svg class="ic" viewBox="0 0 12 12"><path d="M1.5 3h9M4.5 3V1.5h3V3M2.5 3l.7 7.5h5.6L9.5 3M5 5v4M7 5v4"/></svg>'
    return f'''<div class="pv" data-theme="{theme}">
<div class="a banner"></div>
<div class="a logo">Harbor &amp; Pine</div>
<svg class="a kebab" width="22" height="13" viewBox="0 0 22 13"><g fill="#fff"><circle cx="6" cy="2" r="1.3"/><circle cx="6" cy="6.5" r="1.3"/><circle cx="6" cy="11" r="1.3"/></g><path d="M12 5.5l2 2 2-2" stroke="#fff" fill="none" stroke-width="1"/></svg>
<div class="a crumb"></div>
<div class="a bc"><a>Home</a>{chev}<a>Page</a>{chev}<a class="cur">Current Page</a></div>
<div class="a sum"></div>
{summary}
<div class="a prem"><svg style="position:absolute;left:123px;top:9px" width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.8" stroke="#fff" fill="none" stroke-width="1"/><path d="M4.4 8.2L7 5.6l2.6 2.6" stroke="#fff" fill="none" stroke-width="1.1"/></svg><div class="t">Total Premium</div><div class="v">$1000.00</div></div>
<div class="a tabs"><div class="tb on" style="top:8px">Tab 1</div><div class="tb" style="top:35.5px">Tab 2</div><div class="tb" style="top:63px">Tab 3</div></div>
<div class="a card"></div>
<div class="a h1" style="left:179px;top:193px">Heading Level 1</div>
<div class="a th" style="left:189px;top:243px">Table Heading</div>
<div class="a th" style="left:601px;top:243px">Table Heading 2</div>
<div class="a th" style="left:870px;top:243px">Action</div>
<div class="a row" style="top:273px"></div>
<div class="a td" style="left:189px;top:282px">Named Insured</div>
<div class="a td" style="left:601px;top:282px">Alder, June</div>
<div class="a" style="left:895px;top:281px">{edit}</div><div class="a" style="left:917px;top:281px">{trash}</div>
<div class="a row" style="top:315px"></div>
<div class="a td" style="left:189px;top:324px">Secondary Named Insured</div>
<div class="a td" style="left:601px;top:324px">Alder, Ray</div>
<div class="a" style="left:895px;top:323px">{edit}</div><div class="a" style="left:917px;top:323px">{trash}</div>
<div class="a h1" style="left:179px;top:378px">Heading Level 1</div>
<div class="a fl" style="left:179px;top:414px">Street</div><div class="a fv" style="left:296px;top:411px">18 Wharf Street</div>
<div class="a fl" style="left:179px;top:437px">Zipcode</div><div class="a fv" style="left:296px;top:434px">04101</div>
<div class="a fl" style="left:179px;top:460px">State</div><div class="a fv" style="left:296px;top:457px">ME</div>
<div class="a hr"></div>
<div class="a fl" style="left:183px;top:503px">Input Label</div>
<div class="a in" style="left:340px;top:495px;width:164px"></div>
<div class="a fl" style="left:183px;top:538px">Select Label</div>
<div class="a in" style="left:340px;top:530px;width:91px"></div>
<svg class="a" style="left:417px;top:540px" width="7" height="5" viewBox="0 0 7 5"><path d="M0.5 0.8h6L3.5 4.3z" fill="#333"/></svg>
<div class="a in" style="left:340px;top:566px;width:99px"></div>
</div>'''

preview_page = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Theme Preview</title>
<style>*{{box-sizing:border-box;margin:0;padding:0}}html,body{{width:1002px;height:582px;overflow:hidden;background:#fff}}{PV_CSS}</style></head>
<body>
{pv_html('botanico')}
<script>
(function(){{var t=(new URLSearchParams(location.search).get('theme')||'botanico').toLowerCase();
if(['botanico','autunno','cielo'].indexOf(t)<0)t='botanico';
document.querySelector('.pv').setAttribute('data-theme',t);
document.title='Theme Preview - '+t.charAt(0).toUpperCase()+t.slice(1);}})();
</script>
</body></html>'''
open(os.path.join(D, 'theme-preview.html'), 'w').write(preview_page)

# ---------------- admin editor ----------------
def topicon(x, path):
    return (f'<div class="a ti" style="left:{x}px"><svg width="14" height="14" viewBox="0 0 14 14">{path}</svg>'
            f'<svg width="5" height="5" viewBox="0 0 5 5"><path d="M.8 1.6l1.7 1.7 1.7-1.7"/></svg></div>')

icons = [
    (98, '<rect x="2.5" y="4" width="9" height="8.5" rx="2"/><path d="M5 4V2.5h4V4M7 7v2.5"/><circle cx="7" cy="7" r=".6"/>'),
    (136, '<circle cx="7" cy="7" r="2"/><path d="M7 1.5v1.6M7 10.9v1.6M1.5 7h1.6M10.9 7h1.6M3.1 3.1l1.1 1.1M9.8 9.8l1.1 1.1M3.1 10.9l1.1-1.1M9.8 4.2l1.1-1.1"/>'),
    (174, '<rect x="2" y="2" width="10" height="10" rx="1"/><circle cx="7" cy="5.8" r="1.8"/><path d="M3.8 11.5c.5-2 1.7-3 3.2-3s2.7 1 3.2 3"/>'),
    (211, '<path d="M3 1.5h6v11H3z"/><path d="M5.2 1.5v11M7 4h1.2M7 6h1.2"/>'),
    (250, '<path d="M7 2v10M2 7h10"/>'),
]
top_icons = "\n".join(topicon(x, p) for x, p in icons)

def row(label, val, y, light=False):
    sw_border = '#9a9a9a' if light else 'rgba(0,0,0,.25)'
    return (f'<div class="a rl" style="left:16px;top:{y-6}px">{label}</div>'
            f'<div class="a ri" style="left:173px;top:{y-12}px">{val}</div>'
            f'<svg class="a" style="left:344px;top:{y}px" width="6" height="4" viewBox="0 0 6 4"><path d="M.3.5h5.4L3 3.6z" fill="#222"/></svg>'
            f'<div class="a sw" style="left:362px;top:{y-6}px;background:{val};border-color:{sw_border}"></div>'
            f'<svg class="a info" style="left:404px;top:{y-10}px" viewBox="0 0 13 13"><circle cx="6.5" cy="6.5" r="5.6"/><path d="M6.5 5.6v3.8M6.5 3.5v.5" stroke-width="1.4"/></svg>')

theme_rows = [('Primary Color', '#112f36'), ('Secondary Color', '#4b5b5a'), ('Tertiary Color', '#ebebeb'),
              ('Primary Accent Color', '#018880'), ('Secondary Accent Color', '#7b9b96'), ('Tertiary Accent Color', '#005a55')]
bg_rows = [('Primary Background Color', '#dfe2de'), ('Secondary Background Color', '#d7d7d7'),
           ('Tertiary Background Color', '#f2f2f2'), ('Breadcrumb Background Color', '#ffffff')]
L = []
for i, (l, v) in enumerate(theme_rows):
    L.append(row(l, v, 171 + i * 35.2, v in ('#ebebeb',)))
for i, (l, v) in enumerate(bg_rows):
    L.append(row(l, v, 426 + i * 35.2, v in ('#f2f2f2', '#ffffff', '#d7d7d7', '#dfe2de')))
L.append(row('Text On Primary Color', '#ffffff', 640, True))
rows_html = "\n".join(L)

admin = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Edit Theme Configuration</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{width:1568px;height:668px;overflow:hidden}}
body{{position:relative;font-family:{FONT};background:#fff;color:#222}}
.a{{position:absolute}}
.top{{left:0;top:0;width:1568px;height:25px;background:#18324b}}
.logo{{left:13px;top:8px;color:#fff;font-weight:700;font-size:8px}}
.ti{{top:5px;display:flex;align-items:center;gap:1px}}
.ti svg{{stroke:#c9d3dc;fill:none;stroke-width:1.1}}
.left{{left:0;top:25px;width:519px;height:643px;background:#f1f1f1}}
.h{{font-size:22.5px;color:#22313f;font-weight:400;letter-spacing:-.1px}}
.sec{{font-size:12.5px;color:#22313f}}
.rl{{font-size:8.8px;font-weight:700;color:#1f1f1f;white-space:nowrap}}
.ri{{width:164px;height:25px;background:#f2f2f2;border:1px solid #c6c6c6;border-radius:3px;font-size:11px;line-height:23px;padding-left:5px;color:#222}}
.sw{{width:31px;height:15px;border:1px solid}}
.info{{width:13px;height:13px;stroke:#1f1f1f;fill:none;stroke-width:1.1}}
.more{{left:13px;top:555px;width:453px;height:22px;background:#e5e5e5;border-radius:5px;font-size:11.5px;color:#2a2a2a;line-height:22px;padding-left:24px}}
.sbt{{width:4px;border-radius:2px;background:#6e6e6e}}
{PV_CSS}
</style></head>
<body>
<div class="a top"></div>
<div class="a logo">Harbor &amp; Pine</div>
{top_icons}
{topicon(1490, '<path d="M2 12l5.5-5.5M9 2.5l2.5 2.5-3 3L6 5.5z"/><path d="M2.5 3.5l2 2M10 9.5l2 2"/>')}
<div class="a ti" style="left:1528px"><svg width="14" height="14" viewBox="0 0 14 14" style="fill:#c9d3dc;stroke:none"><circle cx="7" cy="2.8" r="1.3"/><circle cx="7" cy="7" r="1.3"/><circle cx="7" cy="11.2" r="1.3"/></svg><svg width="5" height="5" viewBox="0 0 5 5"><path d="M.8 1.6l1.7 1.7 1.7-1.7"/></svg></div>

<div class="a left"></div>
<div class="a h" style="left:12px;top:43px">Edit Theme Configuration</div>
<div class="a rl" style="left:16px;top:90px">Theme Name</div>
<div class="a" style="left:173px;top:88px;font-size:11.5px;color:#222">Botanico</div>
<div class="a sec" style="left:13px;top:129px">Theme</div>
<div class="a sec" style="left:13px;top:384px">Background</div>
<div class="a sec" style="left:13px;top:598px">Text</div>
{rows_html}
<div class="a more">More Background Options</div>
<svg class="a" style="left:20px;top:560px" width="8" height="12" viewBox="0 0 8 12"><path d="M2 2l4 4-4 4" stroke="#333" fill="none" stroke-width="1.1"/></svg>
<svg class="a" style="left:509px;top:35px" width="8" height="6" viewBox="0 0 8 6"><path d="M1 4.5l3-3 3 3" stroke="#9a9a9a" fill="none"/></svg>
<div class="a sbt" style="left:511px;top:45px;height:350px"></div>
<svg class="a" style="left:509px;top:652px" width="8" height="6" viewBox="0 0 8 6"><path d="M1 1.5l3 3 3-3" stroke="#9a9a9a" fill="none"/></svg>
<div class="a" style="left:519px;top:25px;width:7px;height:643px;background:#e9e9e9;border-left:1px solid #dcdcdc"></div>

<div class="a h" style="left:535px;top:40px">Theme Preview</div>
<div class="a" style="left:535px;top:76px">{pv_html('botanico')}</div>
<svg class="a" style="left:1547px;top:32px" width="8" height="6" viewBox="0 0 8 6"><path d="M1 4.5l3-3 3 3" stroke="#9a9a9a" fill="none"/></svg>
<div class="a sbt" style="left:1549px;top:40px;height:395px;background:#777"></div>
<svg class="a" style="left:1547px;top:652px" width="8" height="6" viewBox="0 0 8 6"><path d="M1 1.5l3 3 3-3" stroke="#9a9a9a" fill="none"/></svg>
</body></html>'''
open(os.path.join(D, 'admin-theme-editor.html'), 'w').write(admin)
print('built')
