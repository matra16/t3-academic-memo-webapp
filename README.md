# Academic Internal Memo — public UI only

Canonical school records remain owned by the authorized school account documented in the private Academic control registry.
GitHub hosts only the **public static HTML/JS interface**. No student or staff master data, credentials, tokens, or private records are committed.
The existing owner-controlled Google Apps Script doPost accepts authenticated JSON RPC over HTTPS and authorizes each operation server-side. The original Apps Script UI remains a fallback. GitHub Pages is a zero-paid-cost static host, not the record database.
Public access to the site does not imply public access to the register: staff code authentication remains mandatory.
The owner remains responsible for academic approvals; issuance sequence and rollback are preserved in the canonical Sheets owner.
