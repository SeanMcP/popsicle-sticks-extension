# Test plan

## Setup

### Git

- [ ] Go to https://github.com/seanmcp/popsicle-sticks-extension
- [ ] Clone the repository
- [ ] Check out the branch to be tested
- [ ] Go to chrome://extensions
- [ ] Select "Load unpacked" > Select directory

### Manual

- [ ] Go to https://github.com/seanmcp/popsicle-sticks-extension
- [ ] Select the branch to be tested
- [ ] Select "Code" > "Download ZIP"
- [ ] Unzip on your computer
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

### Random picker

- [ ] Select class > Select "Random Picker" > **A student from this class is displayed**
  - [ ] Select "Next" > **See a different student from the class**
  - [ ] Select "Previous" > **See the first student**
  - [ ] Select "Next" until through class > **1) List continues infinitely; 2) Order is shuffled**
    - **Note**: A name may repeat if it was the last in one set, and then the first in a second shuffled set. This is unlikely with larger classes but more probable with smaller test classes.
  - [ ] Select "Back" > **Navigate to class page**

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
  - [ ] **`v` (version) data is correct**
  - [ ] **Missing class B in `classes` and `studentsByClassId`**
- [ ] Select "Settings" > Select "Download or upload your class and student data" > Select "Choose file" > Select `qa/invalid.json` > Select "Upload" > **1) See error message "That data wasn't formatted correctly"; 2) No data changes are applied**
- [ ] Select "Settings" > Select "Download or upload your class and student data" > Select "Choose file" > Select `qa/empty.json` > Select "Upload" > **1) See error message "That file did not originate from this extension"; 2) No data changes are applied**
- [ ] Select "Settings" > Select "Download or upload your class and student data" > Select "Choose file" > Select `qa/valid-v1.json` > Select "Upload" > **1) Navigate back to home view; 2) Data for three classes and their students applied correctly; 3) Theme is applied**

### History

All of these cases are from a cold start

- [ ] Open extension > Navigate to page > Close extension > Open extension > **See last visited page**
  - [ ] **Backup**
  - [ ] **Bulk**
  - [ ] **Class**
  - [ ] **Copy**
  - [ ] **Random**
- [ ] Open extension > Select class > Select "Random Picker" > Close extension > Open extension > **See same student**
- [ ] Open extension > Navigate to page > Close extension > Wait 5 minutes > Open extension > **See home page**

### Pop out

- [ ] **See "Pop out in new window" button**
- [ ] Select "Pop out in new window" > **See pop out of current page**
- [ ] Select "Pop out in new window" > Select class > Close pop out > Open extension > **See last visited page from pop out**
- [ ] Select class > Select "Random Picker" > **See "Pop out in new window" button**
- [ ] Select class > Select "Random Picker" > Select "Pop out in new window" > **See pop out of current page and state**
