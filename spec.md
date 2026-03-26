# Munger City App

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full-stack hyperlocal city app for Munger, Bihar
- Sections: Local News, Jobs, Buy/Sell Marketplace, Services, Events
- User auth (sign in / register) with role-based access (admin, business, user)
- Business listings with tier-based pricing (₹199–₹999/month)
- Featured ads system (promoted listings)
- Post/browse classifieds (buy/sell)
- Service listings with booking/contact
- Events listing with date/location
- Jobs board with apply via contact
- News feed (admin posts news)
- Homepage with hero, category tiles, latest cards, sidebar featured ads
- Language toggle UI (English/Hindi labels)

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: User auth, roles (admin/business/user). Entities: News, Jobs, Listings (buy/sell), Services, Events, BusinessProfile, FeaturedAd.
2. Backend: CRUD for all entities. Admin-only for news. Authenticated users can post jobs/listings/services/events.
3. Backend: Business profile with tier (basic ₹199, standard ₹499, premium ₹999) — stored as enum, no real payment.
4. Backend: Featured ad flag on listings/services/businesses.
5. Frontend: Full app with navbar (Home, News, Jobs, Marketplace, Services, Events), hero with search, category tiles, latest content cards, sidebar ads.
6. Frontend: Per-section browse pages with filters.
7. Frontend: Post forms for each content type (authenticated).
8. Frontend: Business registration flow with plan selection.
9. Frontend: Admin panel for news posting and featured ad management.
