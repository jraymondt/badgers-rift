#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL=0
VALID=0
INVALID=0
MISSING_TITLE=0
MISSING_DESC=0
MISSING_PUBDATE=0

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🔍 Astro Blog Frontmatter Validator${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Find all .md and .mdx files in src/content/blog/
find src/content/blog -type f \( -name "*.md" -o -name "*.mdx" \) | sort | while read -r file; do
    ((TOTAL++))
    
    # Extract frontmatter (everything between first and second ---)
    frontmatter=$(sed -n '/^---$/,/^---$/p' "$file" | head -n -1 | tail -n +2)
    
    # Check for required fields
    has_title=$(echo "$frontmatter" | grep -c "^title:")
    has_desc=$(echo "$frontmatter" | grep -c "^description:")
    has_pubdate=$(echo "$frontmatter" | grep -c "^pubDate:")
    
    # Determine status
    if [[ $has_title -eq 0 || $has_desc -eq 0 || $has_pubdate -eq 0 ]]; then
        echo -e "${RED}✗ INVALID${NC} - $file"
        ((INVALID++))
        
        [[ $has_title -eq 0 ]] && echo -e "  ${RED}  ✗ Missing: title${NC}" && ((MISSING_TITLE++))
        [[ $has_desc -eq 0 ]] && echo -e "  ${RED}  ✗ Missing: description${NC}" && ((MISSING_DESC++))
        [[ $has_pubdate -eq 0 ]] && echo -e "  ${RED}  ✗ Missing: pubDate${NC}" && ((MISSING_PUBDATE++))
    else
        echo -e "${GREEN}✓ VALID${NC}   - $file"
        ((VALID++))
    fi
done

echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Total files scanned:     ${BLUE}$TOTAL${NC}"
echo -e "Valid files:             ${GREEN}$VALID${NC}"
echo -e "Invalid files:           ${RED}$INVALID${NC}"

if [[ $INVALID -gt 0 ]]; then
    echo -e "\n${YELLOW}Missing fields:${NC}"
    [[ $MISSING_TITLE -gt 0 ]] && echo -e "  ${RED}• title:${NC}       $MISSING_TITLE files"
    [[ $MISSING_DESC -gt 0 ]] && echo -e "  ${RED}• description:${NC} $MISSING_DESC files"
    [[ $MISSING_PUBDATE -gt 0 ]] && echo -e "  ${RED}• pubDate:${NC}     $MISSING_PUBDATE files"
fi

echo ""

# Exit with appropriate code
if [[ $INVALID -eq 0 ]]; then
    echo -e "${GREEN}✓ All frontmatter is valid!${NC}\n"
    exit 0
else
    echo -e "${RED}✗ Some files have invalid frontmatter${NC}\n"
    exit 1
fi
