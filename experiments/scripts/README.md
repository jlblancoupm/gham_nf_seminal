# Experiment-generation scripts

These scripts generate the numerical results and intermediate data used by the study.

They must **not** contain paper layout or figure-export logic.

Expected responsibilities:
- run measurement-geometry experiments;
- build the auxiliary posterior and train the frozen NF;
- run probabilistic GOTHAM transport;
- run the multibasin stress test;
- save deterministic machine-readable outputs under each experiment folder.

The validated research code from the reproducibility package should be moved/wrapped here without changing the numerical experiment.
