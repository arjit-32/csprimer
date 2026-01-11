---
title: Design Philosophy & Laws
meta_title: Design Philosophy & Laws | CS Primer
description: Dive into the essential design philosophies and laws that shape user interfaces and user experiences. Learn how these principles guide product design decisions in 2025.
author: Arjit Sharma
series: ["ui"]
categories: ["System-Design"]
draft: false
year: 2025
---

## Jakob’s Law  (User’s Expectations)

Users spend most of their time on other sites and expect your site to work the same way. 

Example - Navigation menu in center of the screen would throw a user off balance. Why? Because user has a mental model created by spending time on other sites that menu is at a corner or on the top.

![Jakobs-law-image](https://res.cloudinary.com/dwa6rcttw/image/upload/v1738869226/zm333gszfssxwzypiviq.png)

## Fitts’s Law  (Ease of Interaction)

The time required to reach a target (e.g., button) depends on its size and distance from the user’s starting point.

- Make touch targets big enough to tap easily.
- Leave enough space between touch targets.
- Position touch targets where they are easy to reach.

Example - In a Netflix form, buttons are large enough, spacing is such that there are no accidental clicks and are positioned in areas that are easy to reach and interact.

![Fitts-law-image](https://res.cloudinary.com/dwa6rcttw/image/upload/v1738869226/cark7qlddq492wez1bue.png)


## Hick’s Law (Simplify Decision Making)

The time it takes to make a decision increases with the number and complexity of choices available.

Example - Netflix has personalized and famous recommendations right in a carousel with just a “Play” button thus minimizing the time required to think.


![Hicks-law-image](https://res.cloudinary.com/dwa6rcttw/image/upload/v1738869226/piftdf3kod3rrjpnczjv.png)


## Miller’s Law (Cognitive Load)

The average person can keep only 7 (± 2) items in their working memory. In simple terms, chunk content to improve readability. 
Example - Netflix groups different shows into different categories.

![Millers-law-image](https://res.cloudinary.com/dwa6rcttw/image/upload/v1738869227/cbkkbsj48yarajdhxeek.png)

## Postel’s Law (Robustness Principle)

Be conservative in what you do, be liberal in what you accept from others.

Example - If user enters incorrect email format the system should be liberal in accepting the input and provide helpful feedback. 


![Postels-law-image](https://res.cloudinary.com/dwa6rcttw/image/upload/v1738869226/k7aj5vo7woifmzrktko0.png)

## Peak-End Rule

People tend to judge an experience based on two key moments: the **peak** (the most intense point, either positive or negative) and the **end** (the final moment).

Example - If netflix doesn’t contain a particular show(peak moment), instead of showing error page it gives recommendation of other page. 

![Peak-End-Rule-Image](https://res.cloudinary.com/dwa6rcttw/image/upload/v1738869227/dxvynmccysyux9crawxd.png)

## von Restorff Effect

When multiple similar objects are present, the one that differs from the rest is most likely to be remembered. So make important actions visually distinctive and also avoid competition between visual components.

Example -This principles can be seen in effect in Pricing tables. 

![von-Restorff-Effect-Image](https://res.cloudinary.com/dwa6rcttw/image/upload/v1738869228/psloozwsgvymjsott58r.png)

## Doherty Threshold

Productivity soars when a computer and its users interact at a pace (<400 ms) that ensures that neither has to wait on the other.

Example - Showing skeleton when content is loading gives a perception that waiting time was less.

![Doherty-Threshold-Image](https://res.cloudinary.com/dwa6rcttw/image/upload/v1738869228/qr3ck2tkevmdjmitly57.png)