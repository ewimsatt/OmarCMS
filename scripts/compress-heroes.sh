#!/bin/zsh
# Compress hero images to 85% JPEG quality using sips (macOS built-in)
# Run: ./scripts/compress-heroes.sh
# Note: Non-destructive preview: change mv to cp first

echo "Compressing hero images..."
initial_size=$(du -sh public/images/blog | cut -f1)
echo "Initial size: $initial_size"

count=0
saved=0
for f in public/images/blog/*/hero.jpg; do
  if [[ ! -f "$f" ]]; then continue; fi
  initial=$(stat -f%z "$f")
  sips -s format jpeg -s formatOptions 85 "$f" --out "${f}_tmp.jpg"
  new=$(stat -f%z "${f}_tmp.jpg")
  mv "${f}_tmp.jpg" "$f"
  delta=$((initial - new))
  saved=$((saved + delta))
  count=$((count + 1))
  echo "Compressed $f: ${initial}B → ${new}B (saved ${delta}B)"
done

final_size=$(du -sh public/images/blog | cut -f1)
echo ""
echo "Summary: Compressed $count images, saved ~${saved}B total"
echo "Size: $initial_size → $final_size"
