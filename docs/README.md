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

## V7 math-strip fix

The lower method strip is now compact and KaTeX is isolated from generic span/flex styles.
This removes the nested boxes around individual glyphs and keeps the three equations readable.


## V8 citation and math fixes

- Lower-method KaTeX expressions now use single backslashes in `data-tex`, so `\mathcal{N}_0`, `\mathcal{N}`, `q:0\rightarrow1`, and `h,\,M` render correctly.
- BibTeX output is LaTeX-safe:
  - accented characters use commands such as `Mac{\'i}as`, `Ll{\'i}n`, `Guti{\'e}rrez`, and `C{\'a}mara`;
  - capitalization that must survive bibliography styles is protected with braces, e.g. `{{TECNIAC{\'U}STICA} 2026}`.
- Future BibTeX entries should follow the same rule: avoid raw accented Unicode and brace acronyms/proper capitalization that must be preserved.

## V9 paper figures and multibasin explorer

- Figure 2 and Figure 3 are now shown using raster crops extracted directly from the current paper PDF; they are evidence views, not recreated web graphics.
- The interactive multibasin panel distinguishes two meanings that must not be conflated:
  - **Paper view:** the published inverse-objective heatmap and numerical basin separator.
  - **Basin view:** an explanatory schematic in which translucent shadows represent attraction regions.
- An arbitrary initial point can be placed anywhere in the displayed parameter window.
- No arbitrary GOTHAM trajectory is fabricated. Transport statistics remain tied to the two validated regimes reported in the paper.
