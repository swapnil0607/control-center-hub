# Control Center — Unified Engineering & Design Launchpad

[![Design](https://img.shields.io/badge/Design-Apple%20Pro%20Dark%20Glassmorphism-38bdf8.svg?style=flat-square)](#)
[![Stack](https://img.shields.io/badge/Architecture-Bento%20Grid%20%2F%20Decoupled-6366f1.svg?style=flat-square)](#)
[![Environment](https://img.shields.io/badge/Localhost-XAMPP%20Junctions-10b981.svg?style=flat-square)](#)
[![Status](https://img.shields.io/badge/2026-Production%20Suite-f59e0b.svg?style=flat-square)](#)

The central point of entry and orchestration hub for Swapnil Gaonkar's engineering and design ecosystem. Connects four independent production systems into a unified recruiter presentation platform.

---

## 🧭 Integrated Applications

| Project | Subpath | Focus Area | Technology |
| :--- | :--- | :--- | :--- |
| **[Portfolio 2026](file:///d:/swapnil/Control%20Center/Protfolio-webpage)** | `/portfolio/` | Flagship UI/UX, Case Studies & Generative Graphics | Vanilla ES6+, CSS3 Glass, Canvas API |
| **[HRMS Portal](file:///d:/swapnil/Control%20Center/HRMS)** | `/hrms/` | Enterprise Leave, Attendance & Workflow Engine | PHP 8.2, MySQL (`demo_hrms`), Bcrypt |
| **[Clientele Online](file:///d:/swapnil/Control%20Center/Clientele-online)** | `/clientele/` | B2B Brand Catalog & Media Directory | PHP, MySQL (`demo_clientele`), Admin CMS |
| **[PMS Portal](file:///d:/swapnil/Control%20Center/PMS)** | `/pms/` | Project Management, Kanban & Timesheets | PHP MVC, MySQL (`demo_pms`), XLSX Export |

---

## 🔑 Unified Demo Credentials

All applications in this ecosystem use a standardized demo pass: `Demo@2026!`

- **Super Admin**: `admin@demo.com` (HRMS), `admin` (Clientele), `admin@pms.demo` (PMS)
- **Project Lead / Manager**: `manager@demo.com` (HRMS), `swapnil` (Clientele), `pm@pms.demo` (PMS)
- **Staff / Developer**: `employee@demo.com` (HRMS), `dev@pms.demo` (PMS)

---

## ⚡ Architecture Topology

```
D:\swapnil\Control Center\
│
├── Control-Center-Hub/    --> Master Hub (/control-center/)
├── Protfolio-webpage/     --> Static Web Portfolio (/portfolio/)
├── HRMS/                  --> Enterprise HRMS System (/hrms/)
├── Clientele-online/      --> Enterprise Client Directory (/clientele/)
├── PMS/                   --> Project Management & Timesheets (/pms/)
│
└── .safety_backup/        --> [ISOLATED] Quarantined Live Corporate Databases
```

---

## 🛠️ Local Running Instructions
1. Open XAMPP Control Panel and start **Apache** and **MySQL**.
2. Navigate to `http://localhost/` or `http://localhost/control-center/`.
3. Select any project to test or copy demo credentials with one click.
