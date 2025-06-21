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
    
    // Skip markdown headings (##, #, ###, etc.) - these are titles, not spoken content
    if (/^#{1,6}\s/.test(trimmedLine)) continue;
    
    // Skip timestamp patterns like [0:00], [0:15], [1:30], etc.
    if (/^\[\d+:\d+\]/.test(trimmedLine)) continue;
    
    // Skip section headers with timestamps like **[0:00-0:15] Intro - Hook**
    if (/^\*\*\[\d+:\d+[-\d:]*\].*\*\*$/.test(trimmedLine)) continue;
    
    // Skip malformed section headers (missing first asterisk)
    if (/^\*\[\d+:\d+[-\d:]*\].*\*\*$/.test(trimmedLine)) continue;
    
    // Skip any line that contains timestamp sections in brackets with asterisks
    if (/^\*{1,2}\[[\d:-]+\].*\*{1,2}$/.test(trimmedLine)) continue;
    
    // Skip lines that start with section headers followed by visual/audio cues
    // Example: "Intro - Visual: Upbeat intro music, animated title card"
    if (/^[A-Za-z\s]+ - (Visual|Audio|Music|Sound|SFX):/i.test(trimmedLine)) continue;
    
    // Skip lines that start with visual/production cues (be more specific)
    if (/^(Visual|Audio|Music|Sound|SFX)\s*[-:]/.test(trimmedLine)) continue;
    
    // Skip lines that contain mainly visual/audio instructions with **markers**
    if (/^\*\*(Visual|Audio|Music|Sound|SFX)\*\*:/i.test(trimmedLine)) continue;
    
    // Skip lines that are purely visual/production instructions in parentheses
    if (/^\([^)]*\)$/.test(trimmedLine)) continue;
      // Skip lines that are purely visual/production instructions in brackets
    if (/^\[[^\]]*\]$/.test(trimmedLine)) continue;
    
    // Skip lines that contain VISUAL/ACTION instructions in brackets
    if (/^\[VISUAL[^\]]*\]$/i.test(trimmedLine)) continue;
    if (/^\[ACTION[^\]]*\]$/i.test(trimmedLine)) continue;
    if (/^\[VISUAL\/ACTION[^\]]*\]$/i.test(trimmedLine)) continue;
    
    // Skip lines that are just music or sound cues
    if (/^\[.*music.*\]$/i.test(trimmedLine)) continue;
    
    // Clean up the line
    let cleanedLine = trimmedLine
      // Remove timestamp prefixes like "[0:15] - "
      .replace(/^\[\d+:\d+\]\s*-?\s*/, '')
      // Remove speaker labels like "Speaker 1:", "Host:", "Narrator:", etc.
      .replace(/^(Speaker \d+|Host|Narrator|Interviewer|Guest):\s*/i, '')
      // Remove **Visual** or **Audio** markers completely
      .replace(/\*\*(Visual|Audio|Music|Sound|SFX)\*\*:\s*[^\n]*/gi, '')      // Remove visual cues in parentheses
      .replace(/\([^)]*visual[^)]*\)/gi, '')
      .replace(/\([^)]*Visual[^)]*\)/gi, '')
      // Remove production notes in parentheses
      .replace(/\([^)]*music[^)]*\)/gi, '')
      .replace(/\([^)]*sound[^)]*\)/gi, '')
      .replace(/\([^)]*audio[^)]*\)/gi, '')
      .replace(/\([^)]*animation[^)]*\)/gi, '')
      // Remove VISUAL/ACTION cues in brackets
      .replace(/\[VISUAL[^\]]*\]/gi, '') // Remove [VISUAL: ...]
      .replace(/\[ACTION[^\]]*\]/gi, '') // Remove [ACTION: ...]
      .replace(/\[VISUAL\/ACTION[^\]]*\]/gi, '') // Remove [VISUAL/ACTION: ...]
      // Remove bullet points and dashes at the beginning (but not asterisks that are part of markdown)
      .replace(/^[•\-]\s*/, '') // Remove bullet points and dashes, but not asterisks
      // Convert emphasis asterisks to quotes for better AI voiceover (*word* -> "word") 
      .replace(/\*([^*]+)\*/g, '"$1"') // Replace *today* with "today"
      // Replace dashes with commas for better AI voiceover flow (– becomes ,)
      .replace(/\s*–\s*/g, ', ') // Replace em dash with comma and space
      .replace(/\s*—\s*/g, ', ') // Replace long dash with comma and space
      .replace(/\s*-\s*/g, ', ') // Replace regular dash with comma and space (when used mid-sentence)
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
  
  // Add natural paragraph breaks for human-like formatting
  const finalScript: string[] = [];
  
  for (let i = 0; i < cleanedLines.length; i++) {
    const currentLine = cleanedLines[i];
    const nextLine = cleanedLines[i + 1];
    
    finalScript.push(currentLine);
    
    // Add line breaks based on natural speech patterns
    // Add break after questions
    if (currentLine.endsWith('?')) {
      finalScript.push('');
    }
    // Add break after exclamations for emphasis
    else if (currentLine.endsWith('!') && currentLine.length > 50) {
      finalScript.push('');
    }
    // Add break after long sentences (over 80 characters)
    else if (currentLine.length > 80 && currentLine.endsWith('.')) {
      finalScript.push('');
    }
    // Add break before transition words/phrases
    else if (nextLine && /^(First|Next|Finally|Alright|And|So|Now|Here's|Listen|Look|Remember|Don't forget)/i.test(nextLine)) {
      finalScript.push('');
    }
    // Add break before topic changes (lines that start with certain patterns)
    else if (nextLine && /^(Bro,|Hey,|Listen,|Now,|Here's the thing|The key|The bottom line)/i.test(nextLine)) {
      finalScript.push('');
    }
    // Random breaks for variety (every 2-4 lines, but not consecutive)
    else if (i > 0 && i % 3 === 0 && Math.random() > 0.5 && 
             finalScript[finalScript.length - 1] !== '' && 
             currentLine.length > 30) {
      finalScript.push('');
    }
  }
  
  // Clean up any triple line breaks
  return finalScript.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
