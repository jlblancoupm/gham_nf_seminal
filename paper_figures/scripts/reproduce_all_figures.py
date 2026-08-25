"""Reproduce the exact paper figures in publication order."""

from pathlib import Path
import subprocess
import sys

FIGURES = [
    "figure_1_framework.py",
    "figure_2_measurement_geometry.py",
    "figure_3_transport_multibasin.py",
]

if __name__ == "__main__":
    here = Path(__file__).resolve().parent
    for script in FIGURES:
        subprocess.run([sys.executable, str(here / script)], check=True)
