#!/bin/bash -v
echo "Prebuilding: Q# samples..."

dotnet build
jupyter nbconvert *.ipynb --execute --stdout --to markdown  --allow-errors  --ExecutePreprocessor.timeout=120
