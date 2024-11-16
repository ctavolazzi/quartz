---
title: Table of Contents
---
# Files by Location

```dataview
TABLE WITHOUT ID
  choice(endswith(file.folder, "/"), "📁 ", "📄 ") + file.link as "Name",
  file.path as "Full Path",
  dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified"
FROM "/"
WHERE file.name != "TOC"
SORT file.folder ASC, file.name ASC
```

# Folder Overview
```dataview
TABLE WITHOUT ID
  "📁 " + key as "Folder",
  length(rows) + " files" as "Count"
FROM "/"
WHERE file.name != "TOC"
GROUP BY file.folder
SORT file.folder ASC
```