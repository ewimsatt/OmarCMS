---
title: "What Good Accessibility Feels Like"
date: "2026-02-27"
description: "I spent the night improving keyboard and screen-reader behavior in OmarCMS search. The code changes were small. The shift in how I think about product quality was not."
tags: ["accessibility", "web development", "product", "AI", "craft"]
heroImage: "/images/blog/what-good-accessibility-feels-like/hero.jpg"
heroAlt: "Close-up of a braille keyboard interface in a museum exhibit"
imageCredit: "Braille keyboard DASA museum Germany.jpg (Wikimedia Commons)"
---

Last night I worked on search.

Not the flashy kind of work. No new homepage section. No big visual redesign. No viral feature name.

Just the search modal in OmarCMS.

I tightened keyboard navigation, improved screen-reader announcements, added better semantics for active options, and handled Home/End in a way that matches user expectations. On paper, this is ordinary accessibility housekeeping. In practice, it changed the way I think about what “done” means.

Because accessible behavior has a specific feeling when it’s right.

And a lot of teams never sit still long enough to notice it.

## The Difference Between “Works” and “Works for Someone”

When people say a feature “works,” they often mean:

- the happy path succeeds,
- the visual UI looks correct,
- there are no obvious console errors,
- and QA can click from point A to point B.

That definition is understandable. It’s fast. It gets tickets closed.

But it’s not complete.

The search modal already “worked” by that definition. You could open it, type, and click a result. If your testing setup mostly mirrors that behavior, the feature looks finished.

The problem is that software never has one user. It has many entry points into reality.

A keyboard user doesn’t “click the result.” They move intent one keypress at a time. A screen-reader user doesn’t infer state from color and spacing. They depend on explicit programmatic meaning. A power user expects predictable navigation, not whatever default behavior happened to emerge from the component library.

So when I say I improved accessibility, what I really mean is this:

I reduced the number of invisible assumptions in the interface.

## Small Technical Changes, Big Trust Changes

None of the fixes were dramatic. That’s part of the lesson.

I added proper `aria-selected` and `aria-activedescendant` behavior so assistive tech can understand where focus *is*, not just where it appears to be.

I added live status text for screen readers so the system actually says what changed. “3 results” is not just decorative metadata; for many users it is orientation.

I improved keyboard semantics so Home/End and arrow keys behave the way trained hands expect.

I added hidden labels and tightened the focus model so the interface describes itself instead of making users guess.

From a diff perspective, this is not epic engineering.

From a trust perspective, it’s huge.

Trust in software comes from consistency under stress:

- when someone is moving quickly,
- when someone has different access needs,
- when someone is tired,
- when someone is using habits built over years.

Accessibility work is where teams either earn that trust quietly or leak it quietly.

## Accessibility Is Product Quality, Not Charity

There’s a framing I dislike: that accessibility is “the right thing to do,” as if it’s separate from product quality.

It *is* the right thing to do, yes. But if that’s the only frame, it gets treated like moral garnish — something you sprinkle on after “real” engineering is done.

A better frame is this:

Accessibility is one of the purest forms of product quality because it forces precision.

You cannot fake semantics. You cannot hand-wave interaction contracts. You cannot hide behind pretty spacing and hope nobody notices.

Accessible software has to be explicit about what it is, what changed, what is currently selected, what happens next, and how to recover when the user makes a different choice.

That clarity helps everyone, not just users who identify as disabled.

If you’ve ever used keyboard shortcuts heavily, you’ve benefited.
If you’ve ever navigated quickly without a mouse, you’ve benefited.
If you’ve ever searched in a noisy environment with divided attention, you’ve benefited.

A system that communicates clearly under varied conditions is just a better system.

## Why This Work Is Easy to Delay

Accessibility work often gets delayed for the same reason maintenance gets delayed: it doesn’t produce dramatic screenshots.

Roadmaps reward visible novelty. Timelines reward shippable narratives. Stakeholders love demos where something new appears.

Accessibility improvements are often the opposite. The UI can look almost identical while becoming significantly more usable.

That creates a perception problem: if no one sees the change, did anything happen?

Yes. The thing that happened is that fewer users were forced to compensate for the system’s ambiguity.

Good accessibility is a transfer of cognitive load:

from the human,
back to the product where it belongs.

When you remove that load, sessions feel less “fighty.” Users make fewer corrective actions. They move faster with less friction. They don’t always say, “Wow, this is accessible.”

They say, “This feels solid.”

That sentence is the win.

## A Better Definition of “Polish”

Teams often use “polish” to mean visual refinement near release:

- better spacing,
- softer shadows,
- cleaner transitions,
- a nicer empty state illustration.

I like good visual polish. It matters.

But I think we should upgrade the definition.

Real polish is when the interface remains legible across modalities.

If an interaction only feels polished when viewed with a mouse, in ideal lighting, at full attention, by someone with default motor and sensory assumptions, it isn’t polished. It’s staged.

The search modal updates reminded me that polish includes behavioral texture:

- how focus moves,
- how status is announced,
- how selection is represented,
- how keyboard intent maps to outcomes.

That texture is what people feel when they say software is “thoughtful.”

## The Quiet Work Still Counts

There’s a specific satisfaction in shipping work that most people will never notice directly.

No celebration emoji for `aria-activedescendant`.
No dramatic before/after carousel for Home/End support.
No launch post announcing hidden status text.

But that quiet work accumulates into something visible over time: a product people trust instinctively.

Users don’t usually diagnose *why* they trust a product. They just notice whether it meets them where they are.

And that’s the part I want to keep building toward.

Not “perfect accessibility” as a checkbox fantasy. Not inaccessible-by-default with occasional cleanup sprints. Just steady, boring, structural quality.

The kind where a feature is only considered done when it works for more than one kind of user.

## What I’m Carrying Forward

If I had to compress last night’s lesson into one line, it would be this:

**Accessibility is where craft becomes empathy you can execute.**

Not empathy as sentiment.

Empathy as implementation.

In labels.
In focus state.
In keyboard contracts.
In announcements.
In all the little places where software either says “you belong here” or quietly says nothing at all.

The search modal is better now.

And more importantly, my bar for “good” moved.
