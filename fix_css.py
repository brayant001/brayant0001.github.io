import re

with open('styles.css', 'r') as f:
    css = f.read()

# Remove font import
css = re.sub(r"@import url\('https://fonts.googleapis.com/css2\?family=Roboto\+Mono&display=swap'\);\n+", "", css)

# Change body font and background
css = css.replace("font-family: 'Roboto Mono', monospace;", "font-family: 'Inter', sans-serif;")
css = css.replace("background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);", "background: linear-gradient(135deg, #0f172a, #1e293b, #0f172a);")

# Add Reveal animation classes
reveal_css = """
/* Reveal Animations */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
"""
css = css.replace("/* Fondo y tipografía general */", reveal_css + "\n/* Fondo y tipografía general */")

# Remove all button ::before pseudo elements with content
css = re.sub(r"#[a-zA-Z0-9_]+Btn(?:Hover|Active)?(?:,\s*#[a-zA-Z0-9_]+Btn(?:Hover|Active)?)*::before\{[^}]*content:\"[^\"]*\";[^}]*\}\n*", "", css)

# Also remove contact specific ::before that we don't need
css = re.sub(r"#contacto \.contact-item::before\{[^}]*\}\n*", "", css)
css = css.replace("content: attr(data-icon);", "") # just in case

# Fix the specific btn-ghost before mail emoji
css = re.sub(r"#contacto \.contact-actions \.btn-ghost::before\{[^}]*\}\n*", "", css)

# Add spacing for the new <i> icons in buttons
css += """
button i { margin-right: 8px; }
.btn-ghost i { margin-right: 8px; }

/* Contact Icons Style */
.contact-icon {
  display:inline-flex; align-items:center; justify-content:center;
  width:32px; height:32px; border-radius:8px;
  background:rgba(0,170,255,.18);
  border:1px solid rgba(0,229,255,.35);
  font-size: 1.1rem;
  color:#00e5ff;
}

/* Add tilt effect class */
.tilt-card {
  transform-style: preserve-3d;
  transform: perspective(1000px);
}
.tilt-card:hover {
  transform: perspective(1000px) rotateX(var(--tilt-x, 0)) rotateY(var(--tilt-y, 0)) scale3d(1.02, 1.02, 1.02);
  z-index: 10;
}
"""

with open('styles.css', 'w') as f:
    f.write(css)

print("CSS Fixed")
