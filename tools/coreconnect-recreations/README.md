# CoreConnect recreations

The CoreConnect screens on the site are recreations, not screenshots: each is an HTML page drawn from scratch with the real product's layout, components and flow, fictional data and no product branding.

To change one, edit its HTML (or the generator script that writes it: `build-theme.py`, `gen_policy.py`, `gen_upload.py`), render it at its canvas size with one of the `render*.js` scripts, and save the JPG over the matching file in `apps/site/public/art/work/coreconnect/`.
