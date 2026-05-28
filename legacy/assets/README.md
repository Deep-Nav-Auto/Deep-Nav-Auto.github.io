# Legacy theme assets

CSS, JavaScript, fonts, and other al-folio theme files used only by the archived Jekyll site.

**Lab photos and figures** are stored at the repository root:

```
assets/img/
```

If you run Jekyll from `legacy/` and need images, create a symlink:

```bash
cd legacy/assets
ln -s ../../assets/img img
```
