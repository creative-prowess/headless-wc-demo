export function activateDeferredScripts(allowedCategories = []) {
  const scripts = document.querySelectorAll('script[type="text/plain"][data-category]')

  scripts.forEach(script => {
    const category = script.getAttribute('data-category')
    if (!allowedCategories.includes(category)) return

    const newScript = document.createElement('script')
    newScript.type = 'text/javascript'

    // External script
    if (script.src || script.getAttribute('data-src')) {
      newScript.src = script.src || script.getAttribute('data-src')
    } else {
      // Inline script
      newScript.text = script.innerHTML
    }

    Array.from(script.attributes).forEach(attr => {
      if (!['type', 'data-category', 'data-src'].includes(attr.name)) {
        newScript.setAttribute(attr.name, attr.value)
      }
    })

    script.parentNode.replaceChild(newScript, script)
  })
}
