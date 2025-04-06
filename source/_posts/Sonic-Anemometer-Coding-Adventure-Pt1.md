---
title: "Sonic Anemometer Coding Adventure Part 1: Imagination and Simulation"
date: 2025-04-06 19:58:26
featured: time_tronics_in_the_field.jpg
tags:
  - coding
  - open source
---

Back then, when I used to run track&field competitions I was always intrigued by this little device the referees had standing next to the long jump and 100m dash tracks. Join me on a coding adventure to fuck around and find out what that device is and how we can build one.

<!-- more -->

That thing measures wind speed which is essential in the long jumps and sprint races where records are only officially recognized unless there's a tail wind over 2 m/s. (TODO: an anecdote of ruined record? - Ask Šípák)

But how can two weirdly shaped prongs with seemingly no moving parts measure wind speed?

When I peeked closer, I found out there are indeed no fans. The business is happening at the ends of the two prongs. The device is otherwise blank of any note-worthy features modulo a cable port at its bottom. What's worth noting is that referees always orient the prongs along the direction of the race or jump. The rules (or athletes) are concerned for (TODO "of" instead?) tailwind (or headwind) so the device must be measuring wind speed in a single direction and that's presumably done by rotating it in a particular way.

The reason for the prongs sticking so far out into the air must be to get the measuring apparatus into mostly interrupted airflow. The two ends then must be somehow measuring how the air is moving in between them. There may be more ways to do that, but the obvious one (or rather the only one I can think of) is using sound.

Air is a medium for sound. If the medium moves it carries the sound wave with it - their velocities add up. I.e.

V(signal) = V(sound in air) + V(wind)

Rearranging that to express our quantity of interest:

V(wind) = V(signal) - V(sound in air)

If we play a sound from one prong we can measure how long it takes for that sound to arrive at the other prong: T(signal). We also know the physical distance between the prongs D.

V(signal) = D / T(signal)

Plugging that into the equation above, we get:

V(wind) = D/T(signal) - V(sound in air)

Speed of sound in air is a well measured entity. Easy pie, let's build it!

Well, "not so fast", you may object! "these equations are all nice and snug, but this is real world, not high school physics" and you'd be 100% right. For one, speed of sound in air is not constant but changes with temperature and pressure. We could measure these too and correct T for that, but then there's the issue of the vastly different magnitudes of speeds of sound and wind. For our device to by any useful for athletes, we need precision of measurement to be in tenths of m/s. On the other hand, speed of sound in air is on the order of hundreds of m/s. Meaning a 1% error in our calibration coefficient could throw off our measurement by 1000%.

TODO(graph where there's the spectrum of sound speeds from 0°C OASL to 40°C 3000ASL side by side the precision of 0.1m/s)

Luckily, there's a clever trick to avoid all that trouble. We'll get to it in some later post. For now let's assume we always know the true speed of sound in air and all we need to measure is the delay between the sound leaving a speaker in one prong and arriving to a microphone in the other. But how the hell we do that?

## The Problem
