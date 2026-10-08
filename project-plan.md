# Admin Dashboard Plan (Detailed)

## 1) Goal
Build a secure, production-ready admin dashboard that allows the admin to:
- add new projects
- edit existing projects
- delete projects safely
- publish/unpublish projects
- manage associated technologies, categories, and project media

The dashboard should be fast, reliable, and intuitive, with strong validation and clear feedback for every action.

---

## 2) Admin Scope (V1)

### Core CRUD for Projects
1. **Create Project**
   - Title, slug, short description, full description
   - Cover image
   - Gallery images (multiple)
   - Technologies (multi-select)
   - Categories (multi-select)
   - Links (live URL, GitHub URL, case study URL)
   - Featured toggle
   - Published toggle
   - Display order
   - Completion date

2. **Read/List Projects**
   - Table/grid list with pagination
   - Search by title/slug
   - Filter by published/featured/category/technology
   - Sort by created date, updated date, display order, title
   - Quick status indicators (Published, Featured, Draft)

3. **Update Project**
   - Edit all project fields
   - Manage gallery image order and captions
   - Manage category/technology assignments
   - Save as draft or publish immediately

4. **Delete Project**
   - Soft delete preferred (or hard delete with confirmation)
   - Multi-step confirmation for destructive action
   - Optional “type project title to confirm”

### Supporting Management (Recommended in same admin)
- Manage technologies
- Manage categories
- Review contact messages

---

## 3) Route and Information Architecture

### Route Structure
- `/admin` → dashboard overview
- `/admin/projects` → projects list page
- `/admin/projects/new` → create project form
- `/admin/projects/[id]/edit` → edit project form
- `/admin/projects/[id]` (optional) → project detail preview
- `/admin/settings` (optional) → profile/security/config

### Dashboard Modules
1. **Overview cards**
   - Total projects
   - Published projects
   - Draft projects
   - Featured projects
2. **Recent activity**
   - Last created/updated projects
3. **Quick actions**
   - “Add New Project”
   - “Manage Categories”
   - “Manage Technologies”

---

## 4) Data Requirements (Project Model)

### Required Fields
- `title`
- `slug` (unique)
- `description`
- `published`
- `featured`

### Strongly Recommended Fields
- `shortDescription`
- `coverImage`
- `displayOrder`
- `completedAt`
- `liveUrl`, `githubUrl`, `caseStudyUrl`
- `createdAt`, `updatedAt`

### Relational Data
- `ProjectImage[]` with `url`, `alt`, `caption`, `displayOrder`
- many-to-many `ProjectTechnology[]`
- many-to-many `ProjectCategory[]`

### Data Integrity Rules
- Slug must be unique
- URL fields must be valid URLs when provided
- Image URLs must be non-empty strings
- Display order must be integer >= 0
- Completion date cannot be invalid format

---

## 5) UX Flows (Detailed)

### A) Create Project Flow
1. Admin clicks “Add New Project”
2. Form opens with sections:
   - Basic info
   - Content
   - Media
   - Links
   - Classification (categories/technologies)
   - Publishing controls
3. Real-time validation highlights field errors
4. On submit:
   - Disable submit button
   - Show loading state
   - Save with server action/API
5. On success:
   - Toast: “Project created successfully”
   - Redirect to edit page or projects list
6. On failure:
   - Show field errors (if validation)
   - Show global error banner (if server error)

### B) Edit Project Flow
1. Admin selects project from list
2. Existing values are prefilled
3. Admin updates values and saves
4. System shows:
   - success toast
   - updated timestamp
5. Optional: “Save and Continue Editing”

### C) Delete Project Flow
1. Admin clicks “Delete”
2. Confirmation modal appears:
   - warning about irreversible impact
   - optional typed confirmation
3. On confirm:
   - disable confirm button while deleting
   - execute delete action
4. On success:
   - success toast
   - remove row from list
5. On error:
   - error toast/banner
   - keep project row intact

### D) Publish/Unpublish Flow
1. Admin toggles publish state
2. Confirm change (optional)
3. Persist update
4. Trigger revalidation (projects pages)

---

## 6) Admin Projects List Page Spec

### Table Columns
- Title
- Slug
- Status (Published/Draft)
- Featured (Yes/No)
- Categories
- Technologies
- Updated At
- Actions (Edit, Delete, Preview)

### List Features
- Search input (debounced)
- Filters:
  - Published: all/published/draft
  - Featured: all/featured/non-featured
  - Category selector
  - Technology selector
- Sorting:
  - Updated desc (default)
  - Created desc/asc
  - Display order asc
  - Title A-Z
- Pagination with page size control
- Empty state with CTA: “Create first project”

---

## 7) Project Form Design (Sections)

### Section 1: Basic Info
- Title (text)
- Slug (text, auto-generated from title but editable)
- Short description (textarea)

### Section 2: Full Content
- Rich content / markdown field for detailed explanation
- Suggested blocks:
  - Problem statement
  - Architecture explanation
  - Challenges
  - Performance optimizations

### Section 3: Media
- Cover image URL upload/input
- Gallery list:
  - add image row
  - remove image row
  - reorder (drag/drop or up/down)
  - alt/caption metadata

### Section 4: Tech & Category
- Multi-select technologies
- Multi-select categories
- Optional inline create new technology/category

### Section 5: External Links
- Live URL
- GitHub URL
- Case study URL

### Section 6: Visibility & Ordering
- Featured toggle
- Published toggle
- Display order number
- Completion date picker

---

## 8) Backend/Server Actions Plan

### Read Queries (`/lib/queries`)
- `getAdminProjects(params)` with filtering, sorting, pagination
- `getProjectById(id)` with relations
- `getCategories()`
- `getTechnologies()`

### Mutations (`/lib/actions` or API routes)
- `createProject(input)`
- `updateProject(id, input)`
- `deleteProject(id)`
- `toggleProjectPublished(id, published)`
- `toggleProjectFeatured(id, featured)`

### Validation
- Use Zod schemas for:
  - create input
  - update input
  - list query params
- Return structured errors:
  - `fieldErrors`
  - `formError`
  - `statusCode`

### Revalidation
- Revalidate:
  - `/projects`
  - `/projects/[slug]` (if slug exists)
  - homepage sections showing featured projects

---

## 9) Security & Access Control

### Authentication
- Admin login required for all `/admin/*`
- Use secure password hashing (bcrypt)
- Secure session cookies (httpOnly, secure, sameSite)

### Authorization
- Role check for admin-only actions
- Block non-admin users from project mutations

### Input Security
- Validate all inputs server-side (never trust client)
- Sanitize rich text where applicable
- Enforce URL validation for external links

### Abuse Protection
- Rate-limit sensitive endpoints (login, create/update/delete)
- CSRF protection for mutation requests if needed by architecture

### Auditability (Recommended)
- Track actor, action, target id, timestamp for:
  - create
  - update
  - delete
  - publish/unpublish

---

## 10) Error Handling & Feedback Standards

### User Feedback
- Success toast for completed actions
- Inline validation errors by field
- Error banner for server failures
- Loading states on all async actions

### Logging
- Structured server logs:
  - action name
  - project id/slug
  - actor id
  - success/failure
  - error code/message

---

## 11) Performance Plan

- Use indexed fields for:
  - slug
  - published
  - featured
  - createdAt / updatedAt
  - displayOrder
- Use selective Prisma `select/include` (avoid over-fetching)
- Avoid N+1 query patterns for categories/technologies/images
- Cache read-heavy admin metadata where appropriate
- Use paginated list queries, never fetch full dataset by default

---

## 12) QA & Testing Plan

### Unit Tests
- Zod schema validation cases
- Slug generation and uniqueness logic
- Sorting/filtering param parsing

### Integration Tests
- Create project success/failure
- Edit project success/failure
- Delete project confirmation path
- Publish/unpublish actions

### UI Tests
- Form validation rendering
- List filters/search/sort
- Empty/loading/error states

### Security Tests
- Unauthorized access to admin routes
- Non-admin mutation attempts
- Invalid payload handling

---

## 13) Implementation Milestones

### Milestone 1: Foundation
- Admin route protection
- Admin layout and navigation
- Projects list page with read queries

### Milestone 2: CRUD Completion
- Create project page + validation
- Edit project page + validation
- Delete flow + confirmation modal

### Milestone 3: Publishing & Taxonomy
- Publish/unpublish
- Featured toggle
- Category/technology management integration

### Milestone 4: Hardening
- Audit logs
- rate limiting + security checks
- UX polish and accessibility review

---

## 14) Success Criteria (Definition of Done)

The admin page is complete when:
1. Admin can create, edit, and delete projects end-to-end.
2. All project fields and relationships are manageable in UI.
3. Validation blocks invalid data and displays clear errors.
4. Unauthorized users cannot access or mutate admin data.
5. Project changes propagate to public pages reliably.
6. Destructive actions are protected by confirmation flow.
7. List page supports practical filtering, sorting, and search.
8. Logs and error handling make failures traceable.

---

## 15) Optional V2 Enhancements

- Draft autosave
- Project version history / restore
- Bulk actions (bulk publish/delete)
- Media uploader integration (Cloudinary/S3)
- AI-assisted summary generation for short description
- Scheduled publishing
