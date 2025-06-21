/**
 * Utility functions for script processing and cleaning
 */

/**
 * Cleans a script by removing timestamps, symbols, and formatting for AI voice-over or natural reading
 * @param script - The original script content
 * @returns Clean, human-readable script
 */
export function cleanScriptForReading(script: string): string {
  if (!script) return '';
  
  return script
    // Remove timestamps like [0:00], (0:30), 00:15, etc.
    .replace(/\[?\d{1,2}:?\d{0,2}:?\d{2}\]?/g, '')
    .replace(/\(\d{1,2}:?\d{0,2}:?\d{2}\)/g, '')
    // Remove action descriptions in brackets/parentheses like [music], (laughter), etc.
    .replace(/\[([^\]]*)\]/g, '')
    .replace(/\(([^)]*)\)/g, '')
    // Remove speaker labels like "Speaker 1:", "Host:", etc.
    .replace(/^[A-Za-z\s]+\d*:\s*/gm, '')
    // Remove dashes at the beginning of lines
    .replace(/^-\s*/gm, '')
    // Remove bullet points and list markers
    .replace(/^[•·\*\+\-]\s*/gm, '')
    // Remove multiple dashes
    .replace(/--+/g, ' ')
    // Remove weird symbols and formatting
    .replace(/[""'']/g, '"') // Normalize quotes
    .replace(/…/g, '...') // Normalize ellipsis
    .replace(/[^\w\s.,!?;:'"()-]/g, '') // Remove other weird symbols
    // Clean up whitespace
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Multiple line breaks to double
    .replace(/^\s+|\s+$/g, '') // Trim start and end
    // Ensure proper sentence spacing
    .replace(/([.!?])\s*([A-Z])/g, '$1 $2')
    // Clean up paragraph breaks
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n\n');
}
