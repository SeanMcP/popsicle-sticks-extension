# Test plan

## Setup

- [ ] Clone the repository
- [ ] Check out the branch to be tested
- [ ] Go to chrome://extensions
- [ ] Select "Load unpacked" > Select directory

## Cases

These are designed to be run in order, so some cases depend on previous ones.

### Add class/student flows

- [ ] Input class name > Select "Add class" > **Navigate automatically to class page**
- [ ] Select class > **See class name in header**
- [ ] Select class > **DO NOT see "Copy another class?" link**
- [ ] Select class > Input student name > Select "Add student" > **Student is rendered in list** 
- [ ] Select class > Input repeated student name > Select "Add student" > **Alert about duplicate student names**
- [ ] Select class > Select "Add multiple students" > Input students with new lines > Select "Add all" > **1) Navigate back to class view; 2) Students are rendered in list**
- [ ] Select class > Select "Add multiple students" > Input students separated by commas > Select "Names separated by commas" > Select "Add all" > **1) Navigate back to class view; 2) Students are rendered in list**
- [ ] Select class > Select "Remove student" > **Student is removed from list**
- [ ] Input class name > Select "Add class" > **See "Copy another class?" link on class page**
- [ ] Select class B > Select "Copy another class?" > **Navigate to copy page**
- [ ] Select class B > Select "Copy another class?" > Select class A > Select "Copy" > **1) Navigate back to class view; 2) Students from class A are copied to class B**
- [ ] Select class B > Input student name > **Student IS in class B BUT NOT in class A**
- [ ] Select class B > Select "Delete this class" > **1) Navigate back to home view; 2) Class B is removed from list**

### Theme

- [ ] Select "Settings" > Select "Dark" theme > **1) Theme changes on selection; 2) Theme is correct for all pages:**
  - [ ] **Backup**
  - [ ] **Home**
  - [ ] **Class**
  - [ ] **Bulk**
  - [ ] **Copy**
  - [ ] **Random**

### Data/backup

- [ ] Select "Settings" > Select "Download or upload your class and student data" > **1) See option to download data; 2) See option to upload data**
- [ ] Select "Settings" > Select "Download or upload your class and student data" > Select "Download data" > **Triggers JSON download**
- [ ] Open downloaded file > **Contains keys: `classes`, `secret`, `studentsByClassId`, `theme`**
- [ ] Open downloaded data file > **1) Is valid JSON; 2) Has all of the following:**
  - [ ] **`classes` property matches expected values**
  - [ ] **`studentsByClassId` property matches expected values**
  - [ ] **`secret` property is "Luke 8:17"**
  - [ ] **`theme` data is correct**
  - [ ] **`v` property is present**
  - [ ] **Missing class B in `classes` and `studentsByClassId`**
