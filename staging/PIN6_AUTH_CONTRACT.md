# T3 Academic Memo — PIN 6-digit migration, staging contract
Status: DRAFT / FRONTEND_STAGING_ONLY / NOT_DEPLOYED. TaskID: T3-AA-MEMO-PIN6-20261016.

## Preserved live system
- Keep current public GitHub Pages `main` and school-owned Apps Script V16 unchanged.
- Preserve canonical memo register Sheet and official serial records. No new personnel/identity master.
- Experimental LINE, Google, OTP paths are **parked**, not deleted.
- This branch is a review candidate only; do not configure GitHub Pages from it.

## Authorized request translated into testable policy
- Every teacher receives a distinct school-managed Username, linked ONLY after owner-approved lookup of canonical UserID/PersonnelID and active RBAC.
- PIN is **exactly six ASCII digits** at rest/on wire. UI may normalize Thai digit input.
- Requested temporary startup PIN is `123456`. Because that value is public/common, it may be used **only in isolated synthetic tests or unactivated account staging**. It MUST NEVER grant a live session or any protected read/write.
- Actual activation requires separate authorized identity proof / one-time account activation; the administrator confirms the owner of the username through an approved channel without posting private activation tokens in GitHub/Drive/chat.
- After identity proof, user must choose a new PIN (6 digits) before ANY application privilege. New PIN must differ from startup PIN; ban common PINs, including `123456`.
- Lost PIN: school admin-approved identity re-verification and token revocation, not manual plaintext recovery.

## Proposed backend contract (NOT IMPLEMENTED/DEPLOYED)
Only existing authorized school GAS may implement these RPCs after staging gates:
1. `pinSignIn({username,pin})`: fixed-shape error; per-user/server throttling and lockout. For an unactivated user returns only `ACTIVATION_REQUIRED` with NO session. For an identity-verified account with mustChangePin, return restricted one-use exchange challenge and `CHANGE_REQUIRED`; no memo access. For active account return short-lived opaque session and `ACTIVE`.
2. `pinChangeInitial({challenge,newPin})`: server verifies authorized activation, replay, expiry, username, mustChangePin; returns an authenticated session only after successful atomic PIN update, revokes challenge.
3. `pinLogout({session})`: revoke session atomically.
4. All existing `fastAuth`, `getBootstrap`, `requestMemoNumber`, `listMemoRequests`, admin and cancellation endpoints must migrate to server-side opaque session/role/scope validation BEFORE enabling PIN login. Browser-supplied usernames/roles are never trusted.
5. School identity owner writes approved credentials/links only to its existing authorized auth store. No new duplicate STAFF/USERS/AUTH_IDENTITIES master. Memo app stores only audited references where permitted.
6. Store per-user randomly salted, keyed one-way PIN verifier server-side with secret pepper in secure runtime. Never store plaintext or a public bare SHA256(PIN), and never expose hashes, pepper, sessions, credentials or PII in the public repository.
7. Online guardrails: per-account attempt cap (e.g. 5 failed in 15 minutes), escalating backoff, audit, generic errors, atomic lock/rate accounting, anti-replay, idempotency, same-site session protections where supported, inactivity timeout and logout revocation. A six-digit PIN has just 1,000,000 combinations: rate limiting and enrollment proof are mandatory.
8. GAS cross-origin static frontend design must be validated for token leakage, replay, browser storage, redirect and CORS behavior. No real account linking from display name, email or self-attested PersonnelID.

## Acceptance before owner-only staging
- Source backup, exact SHA and revision match for native GAS V16 and `main`.
- One synthetic candidate account and admin-authorized owner-only staging; NO real staff roster or official number test.
- Negative tests: unknown user, wrong PIN, all-default PIN unauthorized, locked user, replay, stale challenge, duplicate identity, incorrect role/scope, cross-user data, SQL/HTML input, concurrent attempts, backend unavailable, logout revoked and forbidden admin issue/VOID.
- Mobile/desktop UAT. Runtime readback for actual backend auth, logs, sessions, role checks, no serial mutation; QA checklist and rollback.
- Human owner approval before identity migration, production changes, public release, staff permissions or real school records.

## Frontend candidate
`staging/pin6-login-preview.html` is **fail-closed**: `PIN_BACKEND_READY=false` and NO endpoint. It accepts a six-digit PIN UI but will never authenticate until an approved, versioned server implementation is deployed, verified and explicitly enabled. No credential is embedded or saved. `pin6-rules.js` offers UX validation, not authorization.

## Exact continuation
`PIN6_FRONTEND_STAGING__BACKEND_GAS_SOURCE_AND_AUTH_SSOT_OWNER_GATE__SYNTHETIC_NEGATIVE_QA__OWNER_ONLY_UAT__HUMAN_RELEASE`
