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

## V10 interactive upgrade

- Step numbers 1/2/3 are larger and visually tied to the auxiliary / transport / result colors.
- The multibasin section now supports:
  - paper vs basin explanatory views;
  - free placement of an initial point;
  - validated auxiliary vs boundary regimes;
  - side-by-side comparison of finite trajectories, domain preservation and median defect;
  - selection among the three tested `h` values, while only exposing exact endpoint statistics where the paper reports them.
- No intermediate numerical values are interpolated or invented.

## V11 dual interactive prototype

The Interactive section is split into the two experiments rather than mixing them:

1. **Posterior transport (Sec. 3.2)** uses the exact reported moments for the auxiliary posterior and nonlinear target. Intermediate `r_M` contours are explicitly labelled as visual interpolation because the paper does not report intermediate covariance summaries.
2. **Multibasin stress test (Sec. 3.3)** anchors the target and competing stationary point to the values reported in the paper. The objective contours, separator and arbitrary-point path are visibly labelled as a schematic web reconstruction until raw exported experiment data are connected.

This separation avoids presenting a multibasin `r_M` as if it were the same probabilistic experiment as Sec. 3.2.

## V11.1 author cleanup

This patch changes only the author presentation in the `Authors & citation` section:

- removed every repeated GAPS mark from the author list;
- kept Mateo Cámara and J.L. Blanco as visibly clickable author names;
- left the remaining authors as plain text until profile URLs are verified;
- GAPS identity remains only at page level (header/footer), not repeated per author.

## V11.2 guided interaction

Only the interactive section was refined:

- reduced the vertical size of the Sec. 3.2 posterior visual;
- clipped all posterior contours to the actual plotting rectangle;
- added a clear call to action and Play 0→6 control for posterior transport;
- added explicit 1–2–3 instructions and Run to M=20 control for the multibasin prototype;
- manual slider interaction stops the automatic playback.

No other page content or author/citation layout was intentionally changed.

## V11.3 visual/control clarification

Interactive-only refinement:

- Sec. 3.2 posterior ellipses are visually narrower/more vertical by widening the displayed beta range; the reported moments are unchanged.
- Posterior legend moved to the bottom-left inside the plotting panel.
- Sec. 3.3 now explicitly distinguishes:
  - `q`: homotopy coordinate, from auxiliary (`q=0`) to nonlinear target (`q=1`);
  - `hbar`: convergence-control parameter;
  - `M`: truncation order of the finite homotopy series.
- `q` is shown as an evaluation state rather than an independent user slider, to avoid incorrectly conflating homotopy continuation with truncation order.
