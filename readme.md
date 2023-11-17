# React + TypeScript + Vite + Vanilla-Extract

This is an exploration of what it feels like to implement [vanilla-extract](https://vanilla-extract.style/) for styles in a simple project. In this case, I used the default React + Typescript Vite template.

I'm mostly interested in exploring how vanilla handles the typical CSS-in-JS edge cases like nested selectors, pseudo-selectors, and keyframe animations.

I also want to compare the build output to ensure the build size isn't bloated (it shouldn't be based on how vanilla works).

## Source Changes

The changes to the component file that imports the styles are straightforward. We switch from string `className`s to imported identifiers that are generated at build time by the vinalla-extract vite plugin.

The diff can be viewed here: [component diff](https://github.com/codekirei/vanilla-extract-poc/compare/2c6f0d6..85e4b6f#diff-9627dc66df62a6649464029eae47b9a8f3d529356eb7df1a0d21b44d0538fe57)

The changes to the styles themselves are also pretty straightforward. Essentially, instead of just writing CSS, we write objects that map to styles. There's a bit of adjustment for writing selectors, but that's the main syntactic overhead.

Files:
- [old](https://github.com/codekirei/vanilla-extract-poc/compare/2c6f0d6..85e4b6f#diff-60f5dcfc15327d5dd812d9df394c217efbedb4aa33dca782ed69d39dce811972)
- [new](https://github.com/codekirei/vanilla-extract-poc/compare/2c6f0d6..85e4b6f#diff-1d9e3e968d5cd15ad394d1fae595d8491fad2b7005a9efa3f24d2f610713844f)

## Build Changes

The JS diff is notably quite minimal: [js diff](https://github.com/codekirei/vanilla-extract-poc/compare/2c6f0d6..85e4b6f#diff-92d1f4d6a8be505b9c49341f65dad3a7f01bc4212536ea219b9be5a3eef46182).

I haven't gone through this with a fine-tooth comb, but the only changes I'm seeing are in the class names (expected) and build artifacts via code minification (inconsequential). Most importantly, the build itself isn't bloated:

- old size: `143408` bytes
- new size: `143440` bytes

That's a small enough difference to be a rounding error (and this is before gzip...). I'd need a much larger sample size to draw any conclusions, but it seems like the zero-runtime claim is indeed true!

The dynamically generated class names on dom elements in the final build are less pretty than meticulously crafted custom class names via BEM or whatever other methodology you go with, but that's a small tradeoff for avoiding class name collisions and not having to enforce class naming conventions. For example, in this contrived example, `.logo` has become `.l2jers1`. There's certainly a bit of contextual clarity and signalling of intent lost there.

Files:
- [old css](https://github.com/codekirei/vanilla-extract-poc/compare/2c6f0d6..85e4b6f#diff-92d1f4d6a8be505b9c49341f65dad3a7f01bc4212536ea219b9be5a3eef46182)
- [new css](https://github.com/codekirei/vanilla-extract-poc/compare/2c6f0d6..85e4b6f#diff-92d1f4d6a8be505b9c49341f65dad3a7f01bc4212536ea219b9be5a3eef46182)

## Conclusions

While I do prefer the look and feel of writing pure CSS a bit more than writing CSS-in-JS, the tooling is good enough now that the pain is minimal.

The big win for Vanilla-Extract isn't really apparent in a project of this scope. The reason you'd use something like this is so multiple devs working together on a sufficiently complex project don't have to worry about shipping conflicting stylenames (which would cause bugs). While there are certainly other methodologies to accomplish this goal (pre-deploy checks, css naming conventions like BEM or SMACSS, etc.), I think Vanilla-Extract is a good solution for teams wanting to write their own styles (i.e. not use Tailwind).
