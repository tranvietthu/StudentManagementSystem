# 🎓 Student Management System

**A lightweight full-stack student management application built with C#, ASP.NET Core 10, Entity Framework Core, SQL Server 2022 Express, HTML, CSS, and JavaScript.**

**Ứng dụng quản lý sinh viên full-stack gọn nhẹ, sử dụng C#, ASP.NET Core 10, Entity Framework Core, SQL Server 2022 Express, HTML, CSS và JavaScript.**

[English](#english) · [Tiếng Việt](#tiếng-việt)

> **Project status:** Educational project for local development. Core student-management endpoints and a lightweight web dashboard are the intended scope. Check the source code for the latest implemented and tested features.
>
>
> **Trạng thái:** Dự án học tập, phục vụ phát triển trên máy cá nhân. Các chức năng trọng tâm là API quản lý sinh viên và giao diện web gọn nhẹ. Xem mã nguồn để biết chức năng đã triển khai và kiểm thử thực tế.

---

<a id="english"></a>
# English

## 1. Overview

**Student Management System** is a learning project that demonstrates how a browser-based frontend communicates with an ASP.NET Core REST API and a SQL Server database.

The backend uses **C#**, **ASP.NET Core Web API**, and **Entity Framework Core (EF Core)**. The frontend uses **vanilla HTML, CSS, and JavaScript**, with no Node.js or frontend build process required.

**Learning goals:**
- Practice object-oriented programming (OOP) with C#.
- Build RESTful endpoints and understand HTTP status codes.
- Use EF Core and Code-First Migrations with SQL Server.
- Validate input and handle common API errors.
- Connect a web dashboard to a backend using the Fetch API.
- Maintain project history with Git and GitHub.

## 2. Features

### Student management
- List students and view a student by ID.
- Create, update, and delete student records.
- Search by student code, name, email, or major in the frontend.
- Validate student fields, including age, email, and GPA.
- Check for duplicate student codes and email addresses.

### Dashboard
- Show the total number of students.
- Calculate the average GPA.
- Count distinct academic majors.
- Display an interactive student table and add/edit form.
- Show success and error notifications.
- Adapt the layout to smaller screens.

### Persistence
- Store data in **SQL Server 2022 Express**.
- Access records using **EF Core**.
- Track schema changes using **Migrations**.
- Enforce unique indexes on `StudentCode` and `Email` when configured in `AppDbContext`.



## 3. Technology Stack

| Layer | Technology |
|---|---|
| Language | C# |
| Backend | ASP.NET Core 10 Web API |
| ORM | Entity Framework Core 10 |
| Database | Microsoft SQL Server 2022 Express |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| API communication | REST / JSON / Fetch API |
| Development | Visual Studio 2026, .NET 10 SDK |
| Database tool | SQL Server Management Studio (SSMS) |
| Version control | Git and GitHub |

## 4. Architecture

```text
Browser (HTML / CSS / JavaScript)
              |
              | HTTP requests / JSON
              v
      ASP.NET Core Web API
              |
              v
       StudentsController
              |
              v
        AppDbContext (EF Core)
              |
              v
    SQL Server 2022 Express
              |
              v
       StudentManagementDB
         └── Students
```

**Request flow:** The browser sends a request with `fetch()`. `StudentsController` handles it, EF Core queries or updates SQL Server, and the API returns an HTTP status and, when applicable, JSON.

## 5. Repository Structure

```text
StudentManagementSystem/
├── StudentManagementAPI/
│   ├── Controllers/
│   ├── Data/
│   ├── Migrations/
│   ├── Models/
│   ├── Properties/
│   ├── wwwroot/
│   ├── appsettings.Development.json
│   ├── appsettings.json
│   ├── Program.cs
│   ├── StudentManagementAPI.csproj
│   ├── StudentManagementAPI.http
│   └── WeatherForecast.cs
├── .gitignore
├── dotnet-tools.json
├── StudentManagementSystem.slnx
└── README.md
```

**Important:** The local `.git/`, `.vs/`, `bin/`, `obj/`, and `*.csproj.user` files are intentionally omitted from the repository tree because they should normally be ignored by Git.

### Main application files

When implemented following this project's development steps:

| Path | Purpose |
|---|---|
| `StudentManagementAPI/Models/Student.cs` | Student entity and validation attributes |
| `StudentManagementAPI/Data/AppDbContext.cs` | EF Core context and constraints |
| `StudentManagementAPI/Controllers/StudentsController.cs` | Student REST API endpoints |
| `StudentManagementAPI/Migrations/` | EF Core database migrations |
| `StudentManagementAPI/Program.cs` | App startup, dependency injection, and static files |
| `StudentManagementAPI/wwwroot/index.html` | Web dashboard markup |
| `StudentManagementAPI/wwwroot/css/style.css` | Dashboard styles |
| `StudentManagementAPI/wwwroot/js/app.js` | API calls and UI interactions |
| `StudentManagementAPI/StudentManagementAPI.http` | Manual HTTP request tests |



## 6. Requirements

- Windows with the **.NET 10 SDK** installed.
- Visual Studio 2026 (or another editor supporting C#).
- SQL Server 2022 Express with a running database instance.
- SQL Server Management Studio (optional, useful for inspection).
- Git (if cloning the repository).

The frontend does **not** require Node.js, npm, React, Docker, or a separate web server.

## 7. Installation and Run

### 7.1 Clone the repository

```powershell
git clone https://github.com/YOUR_USERNAME/StudentManagementSystem.git
cd StudentManagementSystem
```

Replace `YOUR_USERNAME` with the actual GitHub username.

### 7.2 Restore and build

From the repository root:

```powershell
dotnet restore StudentManagementSystem.slnx
dotnet build StudentManagementSystem.slnx
```

### 7.3 Configure the connection string

Make sure SQL Server Express is running. From the repository root:

```powershell
cd StudentManagementAPI
dotnet user-secrets init
```

Using **PowerShell**, set the local connection string:

```powershell
dotnet user-secrets set "ConnectionStrings:DefaultConnection" 'Server=localhost\SQLEXPRESS;Database=StudentManagementDB;Trusted_Connection=True;TrustServerCertificate=True;'
```

If your server instance is different, adjust `Server=` accordingly. The application must be started in the **Development** environment for the usual ASP.NET Core User Secrets configuration to be loaded.

**Security:** User Secrets is a development convenience, not encrypted secret storage. Do not commit passwords, production credentials, or personal data. `TrustServerCertificate=True` is intended here only for local development.

### 7.4 Apply EF Core migrations

From `StudentManagementAPI/`:

```powershell
dotnet ef --version
dotnet ef database update
```

If `dotnet ef` is unavailable, install a compatible **EF Core 10** CLI tool or restore the repository's local tool manifest **after confirming its location**. Do not create a duplicate `InitialCreate` migration if the existing migration files are already present.

EF Core applies pending migrations to **StudentManagementDB**; the database can be created automatically if the account has permission. Check the `Students` and `__EFMigrationsHistory` tables in SSMS.

### 7.5 Optional sample data

If the database is empty, you can insert non-sensitive demonstration data through SSMS. Example:

```sql
USE StudentManagementDB;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Students WHERE StudentCode = 'SV001')
   AND NOT EXISTS (SELECT 1 FROM dbo.Students WHERE Email = 'student1@example.com')
BEGIN
    INSERT INTO dbo.Students
        (StudentCode, FullName, Age, Email, Major, GPA)
    VALUES
        ('SV001', 'Nguyen Van A', 21,
         'student1@example.com', 'Information Technology', 3.6);
END;
```

This example prevents repeated insertion of that sample record in normal sequential use. Database unique indexes remain necessary to enforce uniqueness.

### 7.6 Run the application

In `StudentManagementAPI/`:

```powershell
dotnet run --launch-profile https
```

Open the HTTPS address shown in the console, for example:

```text
https://localhost:7111/
```

The port depends on `Properties/launchSettings.json`. If `wwwroot/index.html` is present and static-file middleware is enabled in `Program.cs`, the root URL serves the dashboard.

## 8. REST API

| Method | Route | Purpose | Typical successful status |
|---|---|---|---|
| GET | `/api/students` | List students | `200 OK` |
| GET | `/api/students/{id}` | Get a student | `200 OK` |
| POST | `/api/students` | Create a student | `201 Created` |
| PUT | `/api/students/{id}` | Update a student | `204 No Content` |
| DELETE | `/api/students/{id}` | Delete a student | `204 No Content` |

Additional responses may include `400 Bad Request` for invalid input, `404 Not Found` for missing records, and `409 Conflict` for detected duplicates. Exact behavior depends on the Controller implementation.

### Example request — Create a student

```http
POST /api/students
Content-Type: application/json

{
  "studentCode": "SV004",
  "fullName": "Pham Van D",
  "age": 21,
  "email": "student4@example.com",
  "major": "Information Technology",
  "gpa": 3.5
}
```

### Example response — Get a student

```json
{
  "id": 1,
  "studentCode": "SV001",
  "fullName": "Nguyen Van A",
  "age": 21,
  "email": "student1@example.com",
  "major": "Information Technology",
  "gpa": 3.6
}
```

## 9. Student Data Model

| Property | Type | Rule |
|---|---|---|
| `Id` | `int` | Database-generated primary key |
| `StudentCode` | `string` | Required, max. 20 characters, unique index |
| `FullName` | `string` | Required, max. 100 characters |
| `Age` | `int` | 16–100 |
| `Email` | `string` | Required, email format, unique index |
| `Major` | `string` | Required, max. 100 characters |
| `GPA` | `double` | 0.0–4.0 |

Model validation is handled using **Data Annotations**; EF Core maps the entity to the SQL Server `Students` table. The precise database types are determined by the generated migration.

## 10. Testing

`StudentManagementAPI/StudentManagementAPI.http` can be used in Visual Studio to send requests without installing Postman.

**Suggested manual test cases:**

| ID | Scenario | Expected result |
|---|---|---|
| TC01 | GET all students | `200 OK`, JSON array |
| TC02 | GET existing ID | `200 OK`, student JSON |
| TC03 | GET missing ID | `404 Not Found` |
| TC04 | POST valid student | `201 Created` |
| TC05 | POST invalid student | `400 Bad Request` |
| TC06 | POST duplicate code/email | `409 Conflict` if handled in the API |
| TC07 | PUT existing student | `204 No Content` |
| TC08 | DELETE existing student | `204 No Content` |


## 11. Future Improvements

- Request/response DTOs and mapping.
- Centralized exception handling, including database constraint conflicts.
- Authentication and role-based authorization before public deployment.
- Pagination, sorting, and server-side filtering.
- Unit and integration tests using xUnit.
- Management of courses, grades, and student enrollment.
- Dashboard visualizations and export features.


---

<a id="tiếng-việt"></a>
# 🇻🇳 Tiếng Việt

## 1. Giới thiệu dự án

**Student Management System** là dự án học tập nhằm xây dựng hệ thống quản lý sinh viên gồm **giao diện web**, **REST API** và **cơ sở dữ liệu SQL Server**.

Backend sử dụng **C#**, **ASP.NET Core Web API** và **Entity Framework Core (EF Core)**. Frontend dùng **HTML, CSS và JavaScript thuần**, không cần cài Node.js hay hệ thống build frontend riêng.

**Mục tiêu học tập:**
- Thực hành lập trình hướng đối tượng (OOP) bằng C#.
- Xây dựng REST API và tìm hiểu mã trạng thái HTTP.
- Kết nối SQL Server bằng EF Core và sử dụng Code-First Migrations.
- Kiểm tra dữ liệu đầu vào và xử lý các lỗi phổ biến.
- Kết nối Dashboard với backend bằng Fetch API.
- Quản lý lịch sử phát triển bằng Git và GitHub.

## 2. Chức năng

### Quản lý sinh viên
- Hiển thị danh sách và xem chi tiết sinh viên theo ID.
- Thêm, cập nhật và xóa sinh viên.
- Tìm kiếm theo mã sinh viên, họ tên, email hoặc ngành học ở giao diện.
- Kiểm tra dữ liệu tuổi, email, GPA và các trường bắt buộc.
- Kiểm tra trùng mã sinh viên hoặc email.

### Dashboard
- Hiển thị tổng số sinh viên.
- Tính GPA trung bình.
- Đếm số ngành học khác nhau.
- Hiển thị bảng và biểu mẫu thêm/sửa sinh viên.
- Thông báo khi thao tác thành công hoặc xảy ra lỗi.
- Giao diện điều chỉnh theo kích thước màn hình.

### Lưu trữ dữ liệu
- Lưu trữ trong **SQL Server 2022 Express**.
- Sử dụng **EF Core** để truy vấn và cập nhật.
- Quản lý thay đổi cấu trúc database qua **Migrations**.
- Tạo chỉ mục unique cho `StudentCode` và `Email` nếu đã cấu hình trong `AppDbContext`.


## 3. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Ngôn ngữ | C# |
| Backend | ASP.NET Core 10 Web API |
| ORM | Entity Framework Core 10 |
| Cơ sở dữ liệu | Microsoft SQL Server 2022 Express |
| Frontend | HTML5, CSS3, JavaScript thuần |
| Giao tiếp API | REST / JSON / Fetch API |
| Công cụ lập trình | Visual Studio 2026, .NET 10 SDK |
| Quản lý database | SQL Server Management Studio (SSMS) |
| Quản lý mã nguồn | Git và GitHub |

## 4. Kiến trúc hệ thống

```text
Trình duyệt (HTML / CSS / JavaScript)
                  |
                  | HTTP / JSON
                  v
         ASP.NET Core Web API
                  |
                  v
          StudentsController
                  |
                  v
         AppDbContext (EF Core)
                  |
                  v
       SQL Server 2022 Express
                  |
                  v
          StudentManagementDB
              └── Students
```

**Luồng hoạt động:** Trình duyệt gọi `fetch()` để gửi yêu cầu. `StudentsController` xử lý request, EF Core truy vấn hoặc cập nhật dữ liệu trên SQL Server, sau đó API trả về mã HTTP và JSON nếu có dữ liệu phản hồi.

## 5. Cấu trúc thư mục



```text
StudentManagementSystem/
├── StudentManagementAPI/
│   ├── Controllers/
│   ├── Data/
│   ├── Migrations/
│   ├── Models/
│   ├── Properties/
│   ├── wwwroot/
│   ├── appsettings.Development.json
│   ├── appsettings.json
│   ├── Program.cs
│   ├── StudentManagementAPI.csproj
│   ├── StudentManagementAPI.http
│   └── WeatherForecast.cs
├── .gitignore
├── dotnet-tools.json
├── StudentManagementSystem.slnx
└── README.md
```


### Vai trò của các file chính

Nếu đã tạo theo các bước phát triển dự án:

| Đường dẫn | Chức năng |
|---|---|
| `StudentManagementAPI/Models/Student.cs` | Entity sinh viên và các thuộc tính kiểm tra dữ liệu |
| `StudentManagementAPI/Data/AppDbContext.cs` | DbContext EF Core và ràng buộc |
| `StudentManagementAPI/Controllers/StudentsController.cs` | Các endpoint REST API |
| `StudentManagementAPI/Migrations/` | Quản lý Migration |
| `StudentManagementAPI/Program.cs` | Khởi động, Dependency Injection, static files |
| `StudentManagementAPI/wwwroot/index.html` | Cấu trúc Dashboard |
| `StudentManagementAPI/wwwroot/css/style.css` | Giao diện CSS |
| `StudentManagementAPI/wwwroot/js/app.js` | Tương tác và gọi API |
| `StudentManagementAPI/StudentManagementAPI.http` | Kiểm thử request thủ công |



## 6. Yêu cầu môi trường

- Windows có cài **.NET 10 SDK**.
- Visual Studio 2026 (hoặc editor hỗ trợ C#).
- SQL Server 2022 Express đang chạy.
- SQL Server Management Studio (không bắt buộc, dùng để kiểm tra database).
- Git (nếu muốn clone repository).

Frontend **không yêu cầu** Node.js, npm, React, Docker hoặc web server riêng.

## 7. Hướng dẫn cài đặt và chạy

### 7.1 Clone repository

```powershell
git clone https://github.com/YOUR_USERNAME/StudentManagementSystem.git
cd StudentManagementSystem
```

Thay `YOUR_USERNAME` bằng username GitHub thực tế.

### 7.2 Khôi phục thư viện và build

Tại thư mục gốc repository:

```powershell
dotnet restore StudentManagementSystem.slnx
dotnet build StudentManagementSystem.slnx
```

### 7.3 Cấu hình Connection String

Bảo đảm SQL Server Express đang chạy. Từ thư mục gốc:

```powershell
cd StudentManagementAPI
dotnet user-secrets init
```

Trong **PowerShell**, chạy:

```powershell
dotnet user-secrets set "ConnectionStrings:DefaultConnection" 'Server=localhost\SQLEXPRESS;Database=StudentManagementDB;Trusted_Connection=True;TrustServerCertificate=True;'
```

Nếu tên instance trên máy khác, sửa lại giá trị `Server=`. Thông thường, ứng dụng cần chạy trong môi trường **Development** để tự động tải User Secrets theo cấu hình mặc định của ASP.NET Core.

**Bảo mật:** User Secrets phù hợp cho môi trường phát triển nhưng không phải kho lưu secrets được mã hóa. Không commit mật khẩu hoặc dữ liệu sinh viên thật. `TrustServerCertificate=True` ở đây chỉ dành cho kết nối SQL Server local khi phát triển.

### 7.4 Tạo hoặc cập nhật database

Trong thư mục `StudentManagementAPI/`:

```powershell
dotnet ef --version
dotnet ef database update
```

Nếu chưa dùng được `dotnet ef`, hãy cài EF Core CLI tương thích phiên bản **10** hoặc khôi phục manifest local sau khi xác nhận vị trí file. Không tạo lại Migration `InitialCreate` nếu repository đã chứa migration đó.

EF Core sẽ áp dụng các migration chưa chạy vào **StudentManagementDB**; có thể tự tạo database nếu tài khoản có quyền. Bạn có thể kiểm tra bảng `Students` và `__EFMigrationsHistory` trong SSMS.

### 7.5 Thêm dữ liệu mẫu (không bắt buộc)

Nếu bảng đang trống, có thể dùng SSMS để thêm bản ghi demo:

```sql
USE StudentManagementDB;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Students WHERE StudentCode = 'SV001')
   AND NOT EXISTS (SELECT 1 FROM dbo.Students WHERE Email = 'student1@example.com')
BEGIN
    INSERT INTO dbo.Students
        (StudentCode, FullName, Age, Email, Major, GPA)
    VALUES
        ('SV001', 'Nguyen Van A', 21,
         'student1@example.com', 'Information Technology', 3.6);
END;
```

Ví dụ này tránh thêm lặp bản ghi mẫu khi chạy tuần tự trong trường hợp thông thường. Cơ sở dữ liệu vẫn cần unique index để bảo đảm tính duy nhất.

### 7.6 Chạy ứng dụng

Trong thư mục `StudentManagementAPI/`:

```powershell
dotnet run --launch-profile https
```

Mở địa chỉ HTTPS mà terminal hiển thị, ví dụ:

```text
https://localhost:7111/
```

Cổng thực tế phụ thuộc `Properties/launchSettings.json`. Nếu có `wwwroot/index.html` và `Program.cs` đã bật middleware phục vụ static files, trang chủ sẽ hiển thị Dashboard.

## 8. Tài liệu REST API

| Phương thức | Endpoint | Chức năng | Trạng thái thành công thường gặp |
|---|---|---|---|
| GET | `/api/students` | Lấy danh sách sinh viên | `200 OK` |
| GET | `/api/students/{id}` | Lấy sinh viên theo ID | `200 OK` |
| POST | `/api/students` | Thêm sinh viên | `201 Created` |
| PUT | `/api/students/{id}` | Cập nhật sinh viên | `204 No Content` |
| DELETE | `/api/students/{id}` | Xóa sinh viên | `204 No Content` |

Các mã phản hồi khác có thể là `400 Bad Request` khi dữ liệu không hợp lệ, `404 Not Found` khi không có bản ghi và `409 Conflict` khi phát hiện trùng. Hành vi chính xác phụ thuộc code Controller đang có.

### Ví dụ request thêm sinh viên

```http
POST /api/students
Content-Type: application/json

{
  "studentCode": "SV004",
  "fullName": "Pham Van D",
  "age": 21,
  "email": "student4@example.com",
  "major": "Information Technology",
  "gpa": 3.5
}
```

### Ví dụ response lấy sinh viên

```json
{
  "id": 1,
  "studentCode": "SV001",
  "fullName": "Nguyen Van A",
  "age": 21,
  "email": "student1@example.com",
  "major": "Information Technology",
  "gpa": 3.6
}
```

## 9. Mô hình dữ liệu sinh viên

| Thuộc tính | Kiểu | Quy tắc |
|---|---|---|
| `Id` | `int` | Khóa chính, database tự sinh |
| `StudentCode` | `string` | Bắt buộc, tối đa 20 ký tự, unique index |
| `FullName` | `string` | Bắt buộc, tối đa 100 ký tự |
| `Age` | `int` | Từ 16 đến 100 |
| `Email` | `string` | Bắt buộc, đúng định dạng, unique index |
| `Major` | `string` | Bắt buộc, tối đa 100 ký tự |
| `GPA` | `double` | Từ 0.0 đến 4.0 |

Data Annotations dùng để kiểm tra dữ liệu. EF Core ánh xạ entity sang bảng `Students`; kiểu cột SQL cụ thể được xác định trong Migration đã tạo.

## 10. Kiểm thử

Sử dụng file `StudentManagementAPI/StudentManagementAPI.http` trong Visual Studio để gửi request mà không cần cài Postman.

**Các test case thủ công đề xuất:**

| Mã TC | Tình huống | Kết quả mong đợi |
|---|---|---|
| TC01 | GET tất cả sinh viên | `200 OK`, danh sách JSON |
| TC02 | GET ID tồn tại | `200 OK`, JSON sinh viên |
| TC03 | GET ID không tồn tại | `404 Not Found` |
| TC04 | POST dữ liệu hợp lệ | `201 Created` |
| TC05 | POST dữ liệu không hợp lệ | `400 Bad Request` |
| TC06 | POST trùng mã/email | `409 Conflict` nếu Controller đã xử lý |
| TC07 | PUT sinh viên tồn tại | `204 No Content` |
| TC08 | DELETE sinh viên tồn tại | `204 No Content` |



## 11. Hướng phát triển

- Tách DTO cho request/response và mapping.
- Xử lý ngoại lệ tập trung, nhất là lỗi ràng buộc unique trong database.
- Đăng nhập, xác thực và phân quyền trước khi đưa ứng dụng lên Internet.
- Phân trang, sắp xếp, tìm kiếm phía server.
- Unit Test và Integration Test bằng xUnit.
- Quản lý môn học, điểm số và đăng ký môn.
- Bổ sung biểu đồ thống kê và chức năng xuất dữ liệu.



---

**Built with C# · ASP.NET Core 10 · Entity Framework Core · SQL Server 2022**  
**Phát triển bằng C# · ASP.NET Core 10 · Entity Framework Core · SQL Server 2022**
