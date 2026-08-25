# Deploying the GOTHAM-NF project page

The repository is designed to be published as a GitHub Pages **project site**:

- Repository: `https://github.com/jlblancoupm/gotham_nf_seminal`
- Public site: `https://jlblancoupm.github.io/gotham_nf_seminal/`

The existing personal GitHub Pages site remains at `https://jlblancoupm.github.io/`.
This project is published below `/gotham_nf_seminal/`.

## 1. Test locally

From the repository root:

```bash
python preview_web.py
```

Open:

```text
http://127.0.0.1:8000/
```

The site is static HTML/CSS/JavaScript, so no build step is required.

## 2. Create the GitHub repository

Create a new public repository named exactly:

```text
gotham_nf_seminal
```

Do **not** name it `jlblancoupm.github.io`; that repository is reserved for the personal/root site.

## 3. Push this repository

```bash
git init
git add .
git commit -m "Initial GOTHAM-NF project site and reproducibility structure"
git branch -M main
git remote add origin https://github.com/jlblancoupm/gotham_nf_seminal.git
git push -u origin main
```

If the repository already exists, clone it first and copy these files into it instead of running `git init`.

## 4. Enable GitHub Pages

On GitHub:

1. Open `jlblancoupm/gotham_nf_seminal`.
2. Go to **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main**.
6. Select folder **/docs**.
7. Click **Save**.

GitHub will publish the page at:

```text
https://jlblancoupm.github.io/gotham_nf_seminal/
```

The first deployment may take a minute or two.

## 5. Verify the deployment

Check:

- hero and navigation;
- `View code` points to `jlblancoupm/gotham_nf_seminal`;
- mobile layout;
- `Copy BibTeX`;
- all links work under the `/gotham_nf_seminal/` subpath.

The current site uses relative paths for CSS and JavaScript, so it is safe as a GitHub Pages project site.

## 6. Add the real scientific code

Keep the separation already defined:

```text
experiments/scripts/
    numerical experiment generation

paper_figures/scripts/
    exact rendering of the figures published in the paper
```

The wrappers currently present are intentionally explicit placeholders. Replace them only with the validated reproducibility scripts used for the paper.

## 7. Add the exact publication figures

Put the canonical paper assets in:

```text
paper_figures/reference/
```

and connect:

```text
paper_figures/scripts/
```

to the exact plotting scripts used for the final paper.

Do not create approximations of the published figures.

## 8. Add interactive results

The public site lives in:

```text
docs/
```

Recommended next structure:

```text
docs/
├── index.html
├── styles.css
├── app.js
├── assets/
└── interactive/
    ├── multibasin/
    └── measurement-geometry/
```

The first substantive interactive module should be the multibasin transport explorer:
`theta_0`, `M`, and `h` controls with trajectory, coordinate defect,
Jacobian determinant, conditioning, and domain-validity feedback.

Prefer precomputed validated experiment data exported as JSON for the first
version rather than silently implementing a different browser-side solver.

## 9. Tag the paper release

When the paper and repository are frozen:

```bash
git tag -a v1.0-tecniacustica2026 -m "TECNIACUSTICA 2026 reproducible release"
git push origin v1.0-tecniacustica2026
```

This gives the publication an immutable code/version reference even if the
web page evolves later.
