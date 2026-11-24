# NSH: a multiline Input at its end keeps trackpad gestures

Minimal reproduction for an NSH issue on macOS (AppKit backend): once a multiline `Input` with overflowing text has scrolled its text to the end, new trackpad gestures over it never reach the `Scroll` around it.

Expected behavior is the web's default scroll chaining, [`overscroll-behavior: auto`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior). The gesture that brings the text to its edge stays on the input, and later gestures scroll the page.

Follow-up to longbridge/nsh#2983 and longbridge/nsh#2984.

## Run

```sh
nsh update nightly   # 2026-11-23 (589a60f) or later, which includes #2984
nsh test --target macos End.test.tsx
```

## Result (nightly 589a60f)

```
gesture 1: page:0
...
gesture 10: page:0
✗ overflowing text scrolls to its end, then the page scrolls
```

The test saves `gesture-2.png` and `gesture-10.png`: the text is at its end (`line 59` visible, scrollbar at the bottom) and the page has not moved.

The gestures come from the test agent (`nsh test --target macos`), not from fingers on a real trackpad. The agent only sends trackpad gestures, so the mouse wheel path is not covered.
