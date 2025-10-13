/**
 * Captcha Utility
 * Generates and validates numeric captchas
 */

/**
 * Generates a random numeric captcha
 * @param length - Length of the captcha (default: 4)
 * @returns A string of random digits
 */
export const generateNumericCaptcha = (length: number = 4): string => {
  let captcha = '';
  for (let i = 0; i < length; i++) {
    captcha += Math.floor(Math.random() * 10);
  }
  return captcha;
};

/**
 * Creates an SVG representation of the captcha with visual noise
 * @param captcha - The captcha string to render
 * @returns SVG markup as a string
 */
export const renderCaptchaToSVG = (captcha: string): string => {
  const width = 160;
  const height = 60;
  const fontSize = 28;
  const letterSpacing = width / (captcha.length + 1);

  // Generate random noise lines
  const noiseLines = Array.from({ length: 5 }, () => {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    const color = `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 0.3)`;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" />`;
  }).join('');

  // Generate letters with random positions and rotations
  const letters = captcha
    .split('')
    .map((char, index) => {
      const x = letterSpacing * (index + 0.5);
      const y = height / 2 + Math.random() * 10 - 5;
      const rotation = Math.random() * 30 - 15;
      const color = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`;
      return `<text x="${x}" y="${y}" font-size="${fontSize}" font-weight="bold" fill="${color}" text-anchor="middle" transform="rotate(${rotation} ${x} ${y})">${char}</text>`;
    })
    .join('');

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#f5f5f5" />
      ${noiseLines}
      ${letters}
    </svg>
  `;
};
