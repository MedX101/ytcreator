/**
 * Utility functions for script processing and cleaning
 */

/**
 * Cleans a script by removing timestamps, symbols, and formatting for AI voice-over or natural reading
 * Preserves natural line breaks and spacing for human-like speech delivery
 * @param script - The original script content
 * @returns Clean, human-readable script ready for voiceover
 */
export function cleanScriptForReading(script: string): string {
  if (!script) return '';
  
  const lines = script.split('\n');
  const cleanedLines: string[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;
    
    // Skip timestamp patterns like [0:00], [0:15], [1:30], etc.
    if (/^\[\d+:\d+\]/.test(trimmedLine)) continue;
    
    // Skip lines that start with section headers followed by visual/audio cues
    // Example: "Intro - Visual: Upbeat intro music, animated title card"
    if (/^[A-Za-z\s]+ - (Visual|Audio|Music|Sound|SFX):/i.test(trimmedLine)) continue;
    
    // Skip lines that start with visual/production cues
    if (/^(Visual|Audio|Music|Sound|SFX|Intro|Outro|Conclusion)\s*[-:]/.test(trimmedLine)) continue;
    
    // Skip lines that contain mainly visual/audio instructions with **markers**
    if (/^\*\*(Visual|Audio|Music|Sound|SFX)\*\*:/i.test(trimmedLine)) continue;
    
    // Skip lines that are purely visual/production instructions in parentheses
    if (/^\([^)]*\)$/.test(trimmedLine)) continue;
    
    // Skip lines that are purely visual/production instructions in brackets
    if (/^\[[^\]]*\]$/.test(trimmedLine)) continue;
    
    // Skip lines that are just music or sound cues
    if (/^\[.*music.*\]$/i.test(trimmedLine)) continue;
    
    // Clean up the line
    let cleanedLine = trimmedLine
      // Remove timestamp prefixes like "[0:15] - "
      .replace(/^\[\d+:\d+\]\s*-?\s*/, '')
      // Remove speaker labels like "Speaker 1:", "Host:", "Narrator:", etc.
      .replace(/^(Speaker \d+|Host|Narrator|Interviewer|Guest):\s*/i, '')
      // Remove **Visual** or **Audio** markers completely
      .replace(/\*\*(Visual|Audio|Music|Sound|SFX)\*\*:\s*[^\n]*/gi, '')
      // Remove visual cues in parentheses
      .replace(/\([^)]*visual[^)]*\)/gi, '')
      .replace(/\([^)]*Visual[^)]*\)/gi, '')
      // Remove production notes in parentheses
      .replace(/\([^)]*music[^)]*\)/gi, '')
      .replace(/\([^)]*sound[^)]*\)/gi, '')
      .replace(/\([^)]*audio[^)]*\)/gi, '')
      .replace(/\([^)]*animation[^)]*\)/gi, '')
      // Remove bullet points and dashes at the beginning
      .replace(/^[•\-\*]\s*/, '')
      // Fix escaped quotes (we"re -> we're)
      .replace(/\\"/g, '"')
      .replace(/we"re/g, "we're")
      .replace(/don"t/g, "don't")
      .replace(/can"t/g, "can't")
      .replace(/won"t/g, "won't")
      .replace(/it"s/g, "it's")
      .replace(/that"s/g, "that's")
      .replace(/I"m/g, "I'm")
      .replace(/you"re/g, "you're")
      .replace(/they"re/g, "they're")
      .replace(/here"s/g, "here's")
      .replace(/there"s/g, "there's")
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim();
    
    // Skip if the line becomes empty after cleaning
    if (!cleanedLine) continue;
    
    // Skip lines that are still mostly production cues after cleaning
    if (/^(Visual|Audio|Music|Sound|SFX):/i.test(cleanedLine)) continue;
    if (/^(Show|Display|Cut to|Fade|Zoom|Pan):/i.test(cleanedLine)) continue;
    
    cleanedLines.push(cleanedLine);
  }
  
  // Join with single newlines to maintain natural reading flow
  return cleanedLines.join('\n').trim();
}
