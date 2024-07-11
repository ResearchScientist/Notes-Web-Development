# Critical Path

**Benchmark**

Measure the baseline performance of the site prior to any optimizations.

**Optimizations**

- make fewer http requests
- use CDN
- use cache headers
- use gzip
- place JS at bottom of body
- minify CSS , JS

# Images

Use sprite sheets for images.
- align images horizontally instead of vertically

Compress image size.

# Minification

- uglify . js

look for css tool
that removes comments and white space

# Lazy Loading

Load assets only when visible to the user.

- speeds up initial page load
- slows down overall user interaction

Consider what is more important for specific uses.

# Parallel Loading

Loads assets simultaneously and runs them in order of download completion.

Does not run them in a defined order.
- scripts may break if order is important

# Single Thread

**Engines**

No more than one of these operations can occur at a time.
- CSS rendering engine
- DOM engine
- JS engine
- memory cleaning engine

There are more.

**Web Workers**
Use web workers since they run on a separate thread and can make use of multi threading and multi cores.
Once they complete their calculations they wait for the main thread to be available in order to communicate their result.

Pos
- can run intensive calculations

Neg
- too many web workers can slow down performance
