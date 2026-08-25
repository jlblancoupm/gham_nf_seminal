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

## Author links

Only verified author pages are clickable.

Currently connected:
- Mateo Cámara → https://mateocamara.com/en/
- J.L. Blanco → https://jlblancoupm.github.io/

Other names are rendered as plain text until their exact profile pages are verified.

## V4 UI refinements

- Desktop subtitle kept on one line when space permits.
- Linked authors are now visually discoverable.
- Mathematical notation uses STIX Two Math for a more LaTeX-like appearance.
- Multibasin transport is shown with a sequence of arrowheads rather than a single line.
- Section 05 links directly to the corresponding GitHub script folders.
- External links always open in a new tab.
- Citation supports plain text, BibTeX, RIS, and direct access to `CITATION.cff`.

## V5 math rendering

Prominent mathematical expressions are rendered with KaTeX rather than a generic serif/math font.
This gives the method cards and physics strip a genuine LaTeX-like appearance while keeping the page static.

## V6 polish

- Removed direct `CITATION.cff` link from the public citation controls.
- Increased size and hierarchy of the surrogate/nonlinear/homotopy formulas below the three method cards.
- Reduced interactive arrowhead size so the trajectory reads as convergence rather than a sequence of oversized markers.
