
```
project-pulse
├─ app
│  ├─ api
│  │  ├─ auth
│  │  │  ├─ login
│  │  │  │  └─ route.ts
│  │  │  └─ logout
│  │  │     └─ route.ts
│  │  ├─ checkins
│  │  │  └─ route.ts
│  │  ├─ feedback
│  │  │  └─ route.ts
│  │  ├─ projects
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ risks
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ seed
│  │  │  └─ route.ts
│  │  ├─ test
│  │  │  └─ route.ts
│  │  └─ users
│  │     └─ route.ts
│  ├─ dashboard
│  │  ├─ admin
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ projects
│  │  │  │  └─ page.tsx
│  │  │  └─ risks
│  │  │     └─ page.tsx
│  │  ├─ client
│  │  │  └─ page.tsx
│  │  └─ employee
│  │     ├─ checkin
│  │     │  └─ page.tsx
│  │     ├─ layout.tsx
│  │     ├─ page.tsx
│  │     └─ risks
│  │        └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ login
│  │  └─ page.tsx
│  ├─ page.tsx
│  └─ register
├─ components
│  ├─ admin
│  │  ├─ AdminNavbar.tsx
│  │  ├─ AdminStats.tsx
│  │  ├─ HealthBadge.tsx
│  │  ├─ ProjectCard.tsx
│  │  ├─ ProjectList.tsx
│  │  └─ ProjectTable.tsx
│  ├─ employee
│  │  ├─ CheckinForm.tsx
│  │  ├─ EmployeeNavbar.tsx
│  │  └─ EmployeeProjectList.tsx
│  └─ ui
│     ├─ Badge.tsx
│     ├─ Button.tsx
│     └─ Card.tsx
├─ eslint.config.mjs
├─ lib
│  ├─ auth.ts
│  ├─ db.ts
│  ├─ getAuthUser.ts
│  └─ healthScore.ts
├─ models
│  ├─ Checkin.ts
│  ├─ Feedback.ts
│  ├─ Project.ts
│  ├─ Risk.ts
│  └─ User.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ proxy.ts
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
└─ tsconfig.json

```