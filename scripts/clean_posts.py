#!/usr/bin/env python3
"""
Reduce converted Medium posts to title + headings + first paragraph per section.
Feeds graphify with structure/concepts only, not full prose.

Input:  posts/ or whitepapers/ (markitdown-converted .md files)
Output: posts-clean/ or whitepapers-clean/ (skeletal .md files, ~80% smaller)
"""

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
import argparse as _ap
_parser = _ap.ArgumentParser(add_help=False)
_parser.add_argument("--input", default="posts")
_parser.add_argument("--output", default=None)
_args, _ = _parser.parse_known_args()
INPUT_DIR = REPO_ROOT / _args.input
OUTPUT_DIR = REPO_ROOT / (_args.output or (_args.input + "-clean"))

IMAGE_RE = re.compile(r"^!\[.*?\]\(.*?\)\s*$")
EMOJI_RE = re.compile(
    "[\U0001F300-\U0001FFFF\U00002600-\U000027BF\U0000FE00-\U0000FE0F]+",
    flags=re.UNICODE,
)


def clean(text: str) -> str:
    lines = text.splitlines()
    out = []
    in_section = False
    got_first_para = False

    for line in lines:
        # Skip images entirely
        if IMAGE_RE.match(line):
            continue

        # Strip emoji from headings
        if line.startswith("#"):
            line = EMOJI_RE.sub("", line).strip()
            if re.match(r"^#{1,6}\s*$", line):
                continue
            out.append(line)
            in_section = True
            got_first_para = False
            continue

        # Skip Medium series boilerplate
        stripped = line.strip()
        if re.match(r'^[""].*[""]\s*\|', stripped):
            continue

        # Horizontal rules — keep as section break signal but don't emit
        if stripped in ("---", "***", "___"):
            continue

        # Blank line
        if not stripped:
            if got_first_para:
                in_section = False
            out.append("")
            continue

        # First paragraph of each section — keep it
        if in_section and not got_first_para:
            out.append(line)
            got_first_para = True
            continue

        # Bullet points — keep first 3 per section
        bullet_count = sum(1 for l in reversed(out) if l.startswith(("* ", "- ", "  *", "  -")))
        if stripped.startswith(("* ", "- ")) and bullet_count < 3:
            out.append(line)
            continue

        # Skip everything else (body prose after first para)

    # Collapse excess blanks
    result = []
    blanks = 0
    for line in out:
        if line.strip() == "":
            blanks += 1
            if blanks <= 1:
                result.append(line)
        else:
            blanks = 0
            result.append(line)

    return "\n".join(result).strip() + "\n"


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    files = sorted(INPUT_DIR.glob("*.md"))

    if not files:
        print(f"No .md files found in {INPUT_DIR}", file=sys.stderr)
        sys.exit(1)

    total_in = total_out = 0
    for f in files:
        original = f.read_text(encoding="utf-8")
        cleaned = clean(original)
        (OUTPUT_DIR / f.name).write_text(cleaned, encoding="utf-8")
        total_in += len(original)
        total_out += len(cleaned)

    reduction = (1 - total_out / total_in) * 100
    print(f"✓ {len(files)} files processed")
    print(f"  {total_in/1024:.0f}KB → {total_out/1024:.0f}KB ({reduction:.0f}% smaller)")


if __name__ == "__main__":
    main()
