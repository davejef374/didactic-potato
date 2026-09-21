---
title: A diode, and a matchhead
date: 2026-09-02
category: electronics
kicker: 405NM · 120MW
blurb: Build notes, schematics, and an honest account of what went wrong first.
slot: bench photo
---

The driver is a fairly boring constant-current design; the interesting part is
everything I got wrong before arriving at it.

## What went wrong first

I ran the diode straight off a bench supply with a current limit set, on the
assumption that the limit would act fast enough. It does not. The supply's
control loop takes milliseconds to respond and the diode takes microseconds to
die. That is the whole lesson, and it cost me two diodes to learn.

## The driver

A linear current sink, sensing across a 1 Ω resistor, with a soft-start so the
diode never sees the turn-on transient. Inefficient, warm, and completely
stable, which at this power level is the right trade.

## Safety, briefly

405 nm at 120 mW is not a toy. Goggles rated for the wavelength, a beam path
that terminates in something matte and non-flammable, nothing reflective on my
hands or the bench. The matchhead in the title was lit deliberately, inside a
metal tray, with everything else cleared away.
