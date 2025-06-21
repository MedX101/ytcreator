// Test the clean script function with the actual AI-generated script
const testScript = `## How To Make Money: Your Blueprint to Financial Freedom (YouTube Script)

**[0:00-0:15] Intro - Hook**

[VISUAL: Upbeat music, fast-paced montage of money, success imagery (luxury cars, travel, etc.), then cut to the presenter – enthusiastic, friendly, slightly disheveled but confident]

Hey guys, what's up? It's your boy, [Your Name], and let's be honest – we all want more money, right?  Forget the get-rich-quick schemes, the pyramid crap.  This ain't that. This is a realistic roadmap, a blueprint to building genuine financial freedom. We're talking about actionable steps you can take *today* to start boosting your income.  Ready to level up your financial game? Let's go!

**[0:15-1:30]  Multiple Income Streams: The Power of Diversification**

[VISUAL: Screen graphics highlighting different income streams – side hustle icons, etc.]

Bro, relying on one source of income is like balancing on one leg – unstable!  The key is diversification. Think about it:  Multiple income streams equal more money, more security, and way less stress. 

First up, let's talk side hustles.  Got some skills?  Freelancing on sites like Upwork or Fiverr is a killer way to earn extra cash.  Maybe you're a whiz at graphic design, writing, or even coding – your skills are worth money! 

[VISUAL:  Show examples of Upwork or Fiverr dashboards showcasing earnings]

Next, investing. Now, I'm not a financial advisor, but even small, consistent investments can grow over time. Start with what you can afford – even $50 a month adds up.  There are tons of resources online to learn about investing – don't be intimidated!

[VISUAL: Simple stock market graph demonstrating growth over time]

Finally, consider selling your stuff!  We all have unused items gathering dust.  Platforms like eBay, Facebook Marketplace, and Craigslist are goldmines. 

[VISUAL: Images showcasing items sold on various online marketplaces]

**[1:30-3:00]  Building a Business – From Idea to Profit**

[VISUAL:  Transition – clean cut to a more professional setting]

Alright, so you're ready to build something bigger?  Let's talk about creating your own business.  Don't think you need a million-dollar idea, my boy – start small and scalable. Find a problem people have and offer a solution.

[VISUAL: Text on screen: "Problem + Solution = Profit"]

Could be selling handmade crafts on Etsy, providing a service like house cleaning or dog walking, or even starting an online store.  The key here is to validate your idea –  do your research, see if there's demand before you invest heavily.


[VISUAL: Examples of successful small businesses - Etsy shop, online store, service provider]

The internet is your oyster!  Learn the basics of digital marketing – Facebook Ads, Google Ads, SEO.  It's a learning curve, but there are tons of free resources online to help you.


**[3:00-4:30]  Skills and Mindset – The Unsung Heroes**

[VISUAL: Cut to more dynamic visuals – person working on a laptop, reading a book]

It's not just about the money, guys; it's about the skills you build. Continuously learning is crucial. Learn new software, improve your communication skills, network with people in your industry. This stuff is invaluable.


[VISUAL: Images representing continuous learning - online courses, books, networking events]

And let's talk about mindset.  This is HUGE.  You need to be persistent, resilient, and believe in yourself.  There will be setbacks, failures – that's part of the game.  Don't let them define you. Learn from them, adapt, and keep pushing.

[VISUAL: Motivational quotes and images]

**[4:30-5:30]  Actionable Steps & Conclusion**

[VISUAL:  A simple checklist graphic appears on screen]

Alright, let's recap.  Diversify your income, build a business around a problem you can solve, continually invest in your skills and most importantly, stay positive.

[VISUAL: Presenter looking directly at the camera]

So, what are you waiting for?  Click the link below to grab my free guide on five side hustles you can start today. It includes resources and actionable steps. Time is money, guys, and the clock is ticking! Let's go!

[VISUAL: End screen with social media links, website URL, and call to action]


**[5:30-6:00]  Outro - Giveaway (Optional)**

[VISUAL:  End screen with giveaway details]

And hey, to celebrate hitting 100k subscribers, I'm giving away $500 to one lucky viewer!  Just like, comment, and subscribe to enter.  Good luck!`;

// Copy the exact function from script-utils.ts
function cleanScriptForReading(script) {
  if (!script) return '';
  
  const lines = script.split('\n');
  const cleanedLines = [];
  
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
      .replace(/\([^)]*animation[^)]*\)/gi, '')      // Remove bullet points and dashes at the beginning (but not asterisks that are part of markdown)
      .replace(/^[•\-]\s*/, '') // Remove bullet points and dashes, but not asterisks      // Convert emphasis asterisks to quotes for better AI voiceover (*word* -> "word") 
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
  }    // Add natural paragraph breaks for human-like formatting
  const finalScript = [];
  
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

console.log("ORIGINAL AI-GENERATED SCRIPT:");
console.log("=============================");
console.log(testScript);

console.log("\n\n" + "=".repeat(60));
console.log("CLEANED SCRIPT (READY FOR AI VOICEOVER):");
console.log("=".repeat(60));
const result = cleanScriptForReading(testScript);
console.log(result);

console.log("\n\n" + "=".repeat(40));
console.log("ANALYSIS:");
console.log("=".repeat(40));
console.log("Original lines:", testScript.split('\n').length);
console.log("Clean lines:", result.split('\n').length);
console.log("Original characters:", testScript.length);
console.log("Clean characters:", result.length);
console.log("Reduction:", Math.round((1 - result.length / testScript.length) * 100) + "%");
