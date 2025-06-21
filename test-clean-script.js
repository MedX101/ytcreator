// Test script to demonstrate the improved clean function
const testScript = `
[0:00] Intro - Visual: Upbeat intro music, animated title card with playful graphics

Hey everyone! Welcome back to my channel.

[0:15] - Today we're going to talk about something really exciting.

**Visual**: Show screenshots of the product
**Audio**: Background music fades

• First point about the topic
• Second important point  
• Third key insight

Speaker 1: This is really interesting stuff.

(Visual cue: Animation shows the process)
[Music swells]

And that's exactly what we want to achieve here.

Conclusion - Visual: Call to action graphics, subscribe button animation
Thanks for watching, and I'll see you in the next video!
`;

// Updated clean function that matches the TypeScript implementation
function cleanScriptForReading(script) {
  if (!script) return '';
  
  const lines = script.split('\n');
  const cleanedLines = [];
  
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

console.log("ORIGINAL SCRIPT:");
console.log("================");
console.log(testScript);

console.log("\n\nCLEANED SCRIPT:");
console.log("===============");
console.log(cleanScriptForReading(testScript));
