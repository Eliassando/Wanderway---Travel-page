# Design

## Context

The current application is a default Create React App scaffold with a single placeholder heading and no real user journey. The redesign must evolve this into a polished, responsive travel landing page and set up the proper API layer needed for dynamic content and conversion tracking.

## Goals / Non-Goals

**Goals:**
- Build a premium travel landing page with a strong hero section, destination discovery, curated offers, reviews, and conversion actions.
- Make the page dynamic through data-driven content instead of hard-coded static blocks.
- Create a robust backend contract for future booking features and admin content management.
- Keep the implementation responsive, accessible, and deployable on a typical web hosting setup.

**Non-Goals:**
- Full payment processing or real-time inventory booking.
- Real airline or hotel provider integrations in the initial version.
- Full CMS admin panel in the first release.
- Multi-tenant SaaS infrastructure or global distribution platform engineering.

## Decisions

### 1. Frontend should remain React-based but become data-driven
The project already uses React, so the most robust path is to keep the existing front-end stack and transform it into a structured, component-based landing page with reusable cards, sections, and state-driven filtering. This reduces tooling churn and keeps iteration fast.

**Alternative considered:** Rebuilding the front end in another framework. This was rejected because it would add unnecessary migration risk without improving the product outcome for this stage.

### 2. Recommended backend language: TypeScript on Node.js with NestJS
For a travel product, the best balance of robustness, ecosystem maturity, and team velocity is TypeScript on Node.js using NestJS.

**Why this is the best choice:**
- Strong compatibility with the React ecosystem and frontend teams.
- Excellent API reliability, validation, and typed contracts.
- Mature libraries for authentication, validation, scheduling, and queueing.
- Easier long-term scaling compared with a loosely typed or less structured backend stack.
- Good fit for route-based APIs, booking workflows, and future admin tooling.

**Alternatives considered:**
- Python with FastAPI: excellent for speed and readability, but less natural for a React-heavy team already using JavaScript.
- Java Spring Boot: very robust for enterprise systems, but heavier than necessary for a landing page and booking-intake product in MVP stage.
- PHP Laravel: good for rapid product delivery, but less aligned with a modern React-first stack than TypeScript.

### 3. Data model should separate content from inquiry workflows
The system should manage two concerns separately:
- Travel content: destinations, categories, pricing summaries, gallery data, and feature metadata.
- User conversion data: inquiries, lead details, contact preferences, and trip intent.

This separation keeps the landing page lightweight while allowing future CRM, email, and booking-platform integrations.

### 4. UI should be mobile-first and conversion-driven
The homepage should be designed around a clear conversion flow: hero message, quick sort/filter actions, featured packages, trust indicators, and a visible inquiry form. On mobile, the experience should collapse into a single-column flow with larger tap targets, simplified filters, and a sticky or compact CTA area.

**Alternative considered:** A dense desktop-first layout. Rejected because travel discovery is highly mobile-driven and conversion drops when forms or filters feel cramped.

### 5. Backend should expose a clean REST API contract
The frontend should consume structured API responses for destinations, offers, testimonials, and inquiry submission. This allows the UI to feel dynamic while keeping the implementation modular and easier to test.

## Risks / Trade-offs

- [Content freshness] → Mitigation: keep destination data in a structured source with API caching and a simple admin/content update path.
- [Backend complexity] → Mitigation: start with a lightweight REST API and add background job processing only when inquiry volume justifies it.
- [Lead data protection] → Mitigation: validate inputs, sanitize payloads, and limit exposure of personal data via secure API and storage controls.
- [Search/filter scope creep] → Mitigation: begin with region, category, and budget filters and expand only when analytics show clear demand.

## Migration Plan

1. Build the landing page around mock or seeded data and verify the responsive flow on mobile and desktop.
2. Add the backend API contract and validation layer for destinations, offers, reviews, and inquiry submission.
3. Connect the frontend to the API and replace static placeholders with live data.
4. Add analytics, form tracking, and deployment monitoring.
5. Expand into CRM/email integration or a real booking engine only after conversion metrics justify it.

## Open Questions

- Should the initial release use a lead-capture form only, or should it also integrate with a real booking or CRM backend immediately?
- Will destination content be managed manually in JSON/DB seed data or through a headless CMS later?
