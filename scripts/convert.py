#!/usr/bin/env python3
"""
Convert PDFs (and other formats) to Markdown using markitdown.

Usage:
  python3 scripts/convert.py --type whitepapers --input path/to/file.pdf
  python3 scripts/convert.py --type books --input path/to/file.pdf
  python3 scripts/convert.py --type posts --input path/to/file.pdf
  python3 scripts/convert.py --type whitepapers --input path/to/folder/

Output:
  whitepapers/ → repo root (committed, public)
  books/       → repo root (gitignored, local only)
  posts/       → repo root (gitignored, local only)
"""

import argparse
import sys
from pathlib import Path
from markitdown import MarkItDown

REPO_ROOT = Path(__file__).parent.parent
SUPPORTED = {".pdf", ".docx", ".pptx", ".xlsx", ".html", ".htm", ".txt", ".md"}

OUTPUT_DIRS = {
    "whitepapers": REPO_ROOT / "whitepapers",
    "books": REPO_ROOT / "books",
    "posts": REPO_ROOT / "posts",
}


def convert_file(path: Path, out_dir: Path) -> Path:
    md = MarkItDown()
    result = md.convert(str(path))
    out_path = out_dir / (path.stem + ".md")
    out_path.write_text(result.text_content, encoding="utf-8")
    return out_path


def main():
    parser = argparse.ArgumentParser(description="Convert files to Markdown")
    parser.add_argument("--type", required=True, choices=OUTPUT_DIRS.keys(),
                        help="Content type: whitepapers | books | posts")
    parser.add_argument("--input", required=True,
                        help="Path to a file or folder to convert")
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    out_dir = OUTPUT_DIRS[args.type]
    out_dir.mkdir(parents=True, exist_ok=True)

    if not input_path.exists():
        print(f"Error: {input_path} does not exist", file=sys.stderr)
        sys.exit(1)

    files = (
        [input_path] if input_path.is_file()
        else [f for f in input_path.rglob("*") if f.suffix.lower() in SUPPORTED]
    )

    if not files:
        print("No supported files found.", file=sys.stderr)
        sys.exit(1)

    for f in files:
        try:
            out = convert_file(f, out_dir)
            print(f"✓ {f.name} → {out.relative_to(REPO_ROOT)}")
        except Exception as e:
            print(f"✗ {f.name}: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
