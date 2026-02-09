import re
import os

file_path = r'G:\code\hzyhhzy.github.io\googology\items.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def format_detail(match):
    detail_content = match.group(1)
    
    # Simple formatting logic
    # We want to put each top-level element on a new line
    
    # 1. </h2> -> </h2>\n        
    formatted = detail_content.replace('</h2>', '</h2>\n        ')
    
    # 2. </p> -> </p>\n        
    formatted = formatted.replace('</p>', '</p>\n        ')
    
    # 3. </h3> -> </h3>\n        
    formatted = formatted.replace('</h3>', '</h3>\n        ')
    
    # 4. Handle <h3> if it's not at the start (though step 2/3 usually handles the preceding tag)
    # But if we have </h3><code>, step 3 makes it </h3>\n        <code>. This is good.
    
    # 5. Clean up any trailing spaces/newlines created
    formatted = formatted.strip()
    
    # Re-assemble with outer indentation
    return f'detail: `\n        {formatted}\n    `'

# Regex to find detail: `...`
new_content = re.sub(r'detail:\s*`([^`]*)`', format_detail, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
