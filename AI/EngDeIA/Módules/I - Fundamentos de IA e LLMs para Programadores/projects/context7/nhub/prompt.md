# NHub Notification Hub - Next.js + IBM Carbon Design + Context7 MCP + Carbon MCP

## 1. Task Context

You are a senior enterprise full-stack/frontend engineer specialized in IBM ecosystem applications.

Your mission is to create an MVP implementation of **NHub (Notification Hub)** using:

- Next.js (App Router) + TypeScript
- IBM Carbon Design System React
- IBM Carbon for Products components when applicable
- Context7 MCP for up-to-date technical documentation
- Carbon MCP for IBM Carbon components, tokens, accessibility, and design patterns

The application represents an enterprise notification management platform where users can create and manage **Notification Rules**.

The purpose of NHub:

Allow users to create rules that monitor Salesforce objects and trigger notifications when specific business conditions are met.

Examples:

### Rule Example

Name:
`Critical Salesforce Cases`

Salesforce Object:
`Case`

Event:
`Case Status Changed`

Conditions:
```
Severity is 1 OR Severity is 2
AND
Status is New
```

Action:
`Send notification`

---

## 2. MCP Usage Requirements

You have access to:

- Context7 MCP
- Carbon MCP

### Context7 MCP

You MUST use Context7 MCP before generating code.

Retrieve documentation for:

- Next.js App Router
- Server Components
- Client Components
- TypeScript configuration
- IBM Carbon React installation
- Next.js integration
- Sass configuration

If Context7 MCP is unavailable, stop and respond only:

```
Context7 MCP unavailable. Cannot continue.
```

---

### Carbon MCP

You MUST use Carbon MCP before generating UI code.

Use `code_search` for:

- Header
- HeaderName
- SideNav
- Content
- DataTable
- Button
- Modal
- Dropdown
- ComboBox
- MultiSelect
- TextInput
- TextArea
- Tile
- Grid

Use `docs_search` for:

- Carbon Design guidelines
- Accessibility
- Layout patterns
- Typography
- Spacing tokens
- Color tokens

After receiving MCP context:

Respond only:

```
Received the necessary context
```

Do not summarize MCP results.

---

# 3. Application Requirements

Create an enterprise application called **NHub Notification Hub**.

The application allows users to create notification rules based on Salesforce events.

Supported objects:

- Case
- WorkOrder

Supported events:

Case:
- Case Created
- Case Updated
- Case Status Changed

WorkOrder:
- WorkOrder Created
- WorkOrder Updated
- WorkOrder Status Changed

---

# 4. Pages

## Dashboard

Use Carbon UI Shell:

- Header
- HeaderName
- SideNav
- Content

Include:

Carbon Tiles:

- Total Rules
- Active Rules
- Disabled Rules
- Notifications Sent

Include Recent Rules DataTable.

Columns:

- Rule Name
- Salesforce Object
- Event
- Conditions
- Status
- Last Updated
- Actions

---

## Rules Management

Create a page with Carbon DataTable.

Features:

- Create Rule
- Edit Rule
- Duplicate Rule
- Delete Rule
- Enable Rule
- Disable Rule

---

## Create Rule

Create a Carbon form containing:

### Basic Information

- Rule Name
- Description
- Status

### Salesforce Object

Dropdown:

- Case
- WorkOrder

### Trigger Event

Dynamic dropdown based on object.

### Condition Builder

Create a reusable visual rule builder.

Example:

```
Severity is 1

AND

Status is New
```

Allow:

- Add condition
- Remove condition
- Change operator
- Change field
- Change value

Operators:

- AND
- OR

Use Carbon components only.

---

## Notification Configuration

Fields:

Notification Type:

- Email
- Webhook
- IBM Event Notification

Recipients:

MultiSelect

Message Template:

TextArea

---

# 5. Architecture

Use:

- Next.js App Router
- TypeScript

Structure:

```
src/
 ├── app/
 ├── components/
 │   ├── layout/
 │   ├── dashboard/
 │   ├── rules/
 │   └── condition-builder/
 ├── data/
 │   └── mockRules.ts
 ├── types/
 │   └── rule.ts
 └── styles/
     └── globals.scss
```

---

# 6. Carbon Requirements

Use only Carbon Sass.

Do not use:

- Tailwind
- CSS Modules
- Styled Components
- Inline styles

Required imports:

```scss
@use '@carbon/styles/scss/themes' as *;
@use '@carbon/styles/scss/theme' with (
  $theme: $white
);
@use '@carbon/styles';
@use '@carbon/styles/scss/spacing' as *;
@use '@carbon/styles/scss/type' as *;
```

Use only Carbon tokens.

Never use arbitrary values.

Example:

Wrong:

```scss
padding: 20px;
```

Correct:

```scss
padding: $spacing-05;
```

---

# 7. Accessibility

Follow:

WCAG 2.2

Ensure:

- Semantic HTML
- Keyboard navigation
- Screen reader support
- Proper labels
- ARIA attributes
- Focus management
- Accessible forms

---

# 8. Dependencies

Generate package.json with:

- next
- react
- react-dom
- typescript
- @carbon/react
- @carbon/styles
- sass
- carbon-icons-react

Scripts:

- dev
- build
- start
- lint

---

# 9. Mock Data

No backend.

Create:

```
src/data/mockRules.ts
```

Include at least 5 realistic rules.

---

# 10. Validation

Run:

```
npm install
npm run build
```

Fix compilation issues.

Use Playwright MCP to validate:

- Dashboard loads
- Rules page loads
- Create Rule works
- Carbon components render correctly

---

# 11. Final Output Format

Return:

1. MCP Validation

```
Context7 OK
Carbon MCP OK
```

2. Created structure

3. Source code

4. Run commands

---

# 12. Non-Negotiable Rules

- Context7 MCP before coding
- Carbon MCP code_search before coding
- Carbon MCP docs_search before coding
- Never invent Carbon components
- Never use arbitrary CSS values
- Never use Tailwind
- Must compile successfully
- UI must resemble an IBM enterprise application
