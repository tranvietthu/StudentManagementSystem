USE StudentManagementDB;

INSERT INTO dbo.Students
    (StudentCode, FullName, Age, Email, Major, GPA)
VALUES
    ('SV001', 'Nguyen Van A', 21,
     'student1@example.com', 'Information Technology', 3.6),
    ('SV002', 'Tran Thi B', 20,
     'student2@example.com', 'Computer Science', 3.8),
    ('SV003', 'Le Van C', 22,
     'student3@example.com', 'Software Engineering', 3.2);

SELECT * FROM dbo.Students;