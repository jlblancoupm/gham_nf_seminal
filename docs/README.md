# Public companion site

This is the publication-oriented companion site for the TECNIACÚSTICA 2026 contribution.

## V2 design principles

- visually related to the GAPS-UPM web identity, but publication-first;
- GAPS mark in the header and author/citation area;
- institutional affiliations kept deliberately quiet in the footer;
- scientific semantic colors belong to the paper content, not to institutional branding;
- interactive content must be backed by validated experiment outputs.

## Interactive module

The current multibasin explorer is a **validated-summary interface**. It switches between the two regimes reported by the paper and displays only published/validated aggregate values.

It intentionally does **not** invent intermediate trajectories or solve the physical system in the browser.

The next scientific implementation should export a dense validated multibasin dataset from `experiments/04_multibasin/` and load it from `docs/interactive/`.
