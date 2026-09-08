ZION ASSEMBLY FINAL WEBSITE PACKAGE

WHAT IS INCLUDED
- Welcome screen with Admin/Member choice
- Passcode screen after role selection
- Member portal
- Admin dashboard
- Sermon search and download area
- Events
- Announcements
- Bible verse section
- Prayer request form
- Contact placeholders
- Responsive PC/mobile design
- Supplied church logo in assets/logo.png

IMPORTANT SECURITY NOTE
This package is designed for GitHub Pages, which is static hosting.
The Admin/Member passcodes in config.js are front-end demo gates and are NOT
secure authentication. Do not use a real private password here.

To make the admin system genuinely private and allow uploads/changes to
appear for every member/device, the next backend step should connect this
site to a real authentication + database/file-storage service such as
Supabase or Firebase.

BEFORE PUBLISHING
1. Open config.js.
2. Change demoAdminPasscode and demoMemberPasscode from CHANGE_ME_*.
3. Replace the placeholder church email if desired.
4. Replace the placeholder service times/address/phone in member.html.
5. Upload sermon PDFs into the sermons folder when available.
6. Use the Admin dashboard to manage sample content on the current browser.

GITHUB PAGES
Upload/replace the files in your repository. Keep:
assets/logo.png
sermons/
index.html
member.html
admin.html
style.css
config.js
gate.js
portal.js
admin.js

Then commit the changes and refresh the live site with Ctrl+F5.
