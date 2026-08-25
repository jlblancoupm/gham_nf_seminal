# GOTHAM-NF

> **Learn a tractable posterior. Transport the physics.**

Research code and public project page for **Homotopy-Driven Training of Normalizing Flows for Acoustic Inverse Problems** (TECNIACÚSTICA 2026).

## Concept

1. Build a tractable auxiliary posterior from a locally linearized physical model.
2. Train a normalizing flow only on that auxiliary posterior.
3. Freeze the flow.
4. Use GOTHAM to transport samples through the nonlinear physics while preserving sample-specific inverse coordinates.
5. Track the transported density through the GOTHAM Jacobian and assess agreement with the nonlinear target posterior.

## Repository structure

```text
gotham_nf_seminal/
├── README.md
├── CITATION.cff
├── LICENSE
├── pyproject.toml
├── docs/                      # GitHub Pages public site
├── src/gotham_nf/             # reusable method code
├── experiments/
│   ├── scripts/               # generate numerical experiment outputs
│   └── 01_...04_...           # experiment-specific data/config/results
├── paper_figures/
│   ├── scripts/               # render the exact figures used in the paper
│   ├── reference/             # canonical paper figure assets
│   └── generated/             # regenerated figures for verification
├── notebooks/                 # explanatory notebooks only
├── tests/
├── results/reference/
└── paper/
```

## Reproduce

```bash
python -m pip install -e .

# 1. Generate the validated experimental outputs
python experiments/scripts/run_all.py

# 2. Render the exact paper figures from those outputs
python paper_figures/scripts/reproduce_all_figures.py
```

The two stages are intentionally separated. Experiment scripts generate numerical results; paper-figure scripts reproduce the **exact publication figures**. The current wrappers are explicit placeholders and must be connected to the validated reproducibility code rather than replaced by approximate reimplementations.

## GitHub Pages

Publish `/docs` from the `main` branch:

**Settings → Pages → Deploy from a branch → main → /docs**

Then update `CHANGE_ME` in:

- `docs/app.js`
- `CITATION.cff`
- `pyproject.toml`

## Design language

- Auxiliary / learned: `#3973AC`
- GOTHAM / physical transport: `#D9822B`
- Successful transported result: `#3D8B6D`
- Failure / validity limit: `#A74343`
- Neutral: `#4D4D4D`
- Light background: `#F2F5F8`


## Deploy the public site

The repository is configured for a GitHub Pages project site at:

`https://jlblancoupm.github.io/gotham_nf_seminal/`

See [`DEPLOY.md`](DEPLOY.md) for local preview, repository creation, Pages settings and release tagging.
