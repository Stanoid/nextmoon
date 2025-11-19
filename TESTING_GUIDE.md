# Complete Testing Guide

## 🔧 Setup for Local Testing

### 1. Environment Configuration
Make sure your `.env.local` or `src/app/local.js` has the correct API URL:

```javascript
// For local testing with backend on localhost
export const API_URL = "http://localhost:1337/api/";
export const IMG_URL = "http://localhost:1337";
export const ROOT_URL = "http://localhost:1337/";
```

### 2. Backend Server
Ensure your Strapi backend is running:
```bash
cd minimoonBack
npm run develop
# or
yarn develop
```

Backend should be accessible at: `http://localhost:1337`

### 3. Frontend Server
Start the Next.js development server:
```bash
npm run dev
# or
yarn dev
```

Frontend should be accessible at: `http://localhost:3000`

---

## 🧪 Test Cases

### 1. Authentication Tests

#### A. Login Page (`/login`)

**Test Case 1.1: Valid Login**
- Navigate to `/login`
- Enter valid credentials:
  - Email: `admin@test.com` (or your test admin email)
  - Password: `your_password`
- Click "تسجيل الدخول" (Login)
- **Expected Result:**
  - Loading spinner appears
  - Console logs show: "Login action called", "Login successful"
  - Redirect to `/admin` for admin users (type 1)
  - Redirect to `/` for regular users (type 4)

**Test Case 1.2: Invalid Credentials**
- Navigate to `/login`
- Enter invalid credentials:
  - Email: `wrong@test.com`
  - Password: `wrongpass`
- Click "تسجيل الدخول"
- **Expected Result:**
  - Error toast appears: "بريد إلكتروني أو كلمة مرور غير صحيحة"
  - User stays on login page
  - Console shows error details

**Test Case 1.3: Empty Fields**
- Navigate to `/login`
- Leave email empty, click login
- **Expected Result:** Toast error "الرجاء إدخال البريد الإلكتروني"
- Enter email, leave password empty, click login
- **Expected Result:** Toast error "الرجاء إدخال كلمة المرور"

**Test Case 1.4: Network Error**
- Stop the backend server
- Try to login
- **Expected Result:**
  - Console shows "Cannot connect to server"
  - Error toast appears
  - Loading state clears

#### B. Register Page (`/register`)

**Test Case 2.1: Valid Registration**
- Navigate to `/register`
- Fill in all fields:
  - Username: `testuser123`
  - Email: `testuser123@test.com`
  - Password: `password123`
  - Confirm Password: `password123`
- Click "متابعة" (Continue)
- **Expected Result:**
  - Success toast: "مرحباً testuser123"
  - Redirect to home page `/`
  - User is logged in

**Test Case 2.2: Duplicate Email**
- Try to register with existing email
- **Expected Result:**
  - Error toast: "البريد الإلكتروني مستخدم بالفعل"

**Test Case 2.3: Password Mismatch**
- Enter different passwords in password and confirm password
- **Expected Result:**
  - Error toast: "كلمات المرور غير متطابقة"

**Test Case 2.4: Invalid Email Format**
- Enter invalid email: `notanemail`
- **Expected Result:**
  - Error toast: "الرجاء إدخال بريد إلكتروني صحيح"

**Test Case 2.5: Short Password**
- Enter password less than 6 characters
- **Expected Result:**
  - Error toast: "كلمة المرور يجب أن تكون 6 أحرف على الأقل"

---

### 2. Admin Panel Tests

#### A. Admin Access (`/admin`)

**Test Case 3.1: Admin Login**
- Login with admin credentials (type 1)
- **Expected Result:**
  - Redirect to `/admin`
  - Dashboard loads successfully
  - User profile shows in sidebar

**Test Case 3.2: Non-Admin Access**
- Login with regular user (type 4)
- Try to navigate to `/admin`
- **Expected Result:**
  - Redirect to `/login`
  - Console shows "User is not admin"

**Test Case 3.3: Unauthenticated Access**
- Logout or clear cookies
- Navigate to `/admin`
- **Expected Result:**
  - Redirect to `/login`

#### B. Dashboard (`/admin` - page 0)

**Test Case 4.1: Dashboard Load**
- Navigate to admin panel
- Click "لوحة التحكم" (Dashboard)
- **Expected Result:**
  - 4 stat cards display with icons
  - Charts render correctly
  - No console errors
  - Loading spinner disappears

**Test Case 4.2: Dashboard Responsiveness**
- Resize browser window
- Test on mobile viewport (375px)
- Test on tablet viewport (768px)
- Test on desktop viewport (1920px)
- **Expected Result:**
  - Layout adapts correctly
  - Charts remain readable
  - No horizontal scroll

#### C. Products List (`/admin` - page 2)

**Test Case 5.1: Load Products**
- Click "المنتجات" (Products)
- **Expected Result:**
  - Products table loads
  - All products display with images
  - No null reference errors
  - Console shows: "Products loaded: X"

**Test Case 5.2: Edit Product**
- Click edit icon on any product
- **Expected Result:**
  - Navigate to edit page
  - Product data loads correctly

**Test Case 5.3: Delete Product**
- Click delete icon
- Confirm deletion
- **Expected Result:**
  - Success toast: "تم حذف المنتج"
  - Product removed from list
  - List refreshes

**Test Case 5.4: Toggle Product Status**
- Click status toggle
- **Expected Result:**
  - Success toast: "تم إظهار المنتج" or "تم إخفاء المنتج"
  - Status updates in database

**Test Case 5.5: API Error Handling**
- Stop backend server
- Try to load products
- **Expected Result:**
  - Error toast: "فشل في تحميل المنتجات"
  - Empty state or error message
  - No crash

---

### 3. Product Page Tests

#### A. Product Display (`/products?pid=X`)

**Test Case 6.1: Valid Product**
- Navigate to `/products?pid=1` (use valid product ID)
- **Expected Result:**
  - Product loads successfully
  - Images display correctly
  - Price, stock, variants show
  - No null reference errors
  - Console shows: "Product data received"

**Test Case 6.2: Invalid Product ID**
- Navigate to `/products?pid=99999`
- **Expected Result:**
  - Error page displays
  - Message: "المنتج غير متوفر"
  - "إعادة المحاولة" and "العودة للمتجر" buttons work

**Test Case 6.3: Product Without Variants**
- Navigate to product with no variants
- **Expected Result:**
  - Error message: "المنتج غير متوفر حالياً"
  - No crash

**Test Case 6.4: Add to Cart**
- Load valid product
- Click "أضف إلى السلة"
- **Expected Result:**
  - Success toast: "تمت إضافة المنتج إلى السلة"
  - Cart updates
  - Facebook Pixel fires (if configured)

**Test Case 6.5: Add to Favorites**
- Login first
- Click "أضف إلى المفضلة"
- **Expected Result:**
  - Success toast: "تمت إضافة المنتج إلى المفضلة"
  - Product added to favorites

**Test Case 6.6: Add to Favorites (Not Logged In)**
- Logout
- Click "أضف إلى المفضلة"
- **Expected Result:**
  - Error toast: "الرجاء تسجيل الدخول لإضافة المنتج للمفضلة"

---

### 4. Error Handling Tests

**Test Case 7.1: Network Disconnection**
- Disconnect internet
- Try any API operation
- **Expected Result:**
  - User-friendly error message
  - No crash
  - Console logs error details

**Test Case 7.2: Invalid API Response**
- Modify API to return invalid data
- **Expected Result:**
  - Validation catches error
  - Fallback UI displays
  - Error logged to console

**Test Case 7.3: Component Error**
- Force a component error (e.g., access undefined property)
- **Expected Result:**
  - Error boundary catches error
  - Error page displays
  - "إعادة تحميل الصفحة" button works

---

## 📊 Console Monitoring

### Expected Console Logs (Success Flow)

**Login:**
```
Login action called with: {identifier: "...", password: "..."}
Login fetcher called with API_URL: http://localhost:1337/api/
Login API response: {jwt: "...", user: {...}}
Login response: {error: false, data: {...}}
Login successful, user type: 1
Redirecting to admin...
```

**Product Load:**
```
Product data received: {data: {...}}
Products loaded: 15
```

**Admin Products:**
```
Products loaded: 15
```

### Expected Console Errors (Failure Flow)

**Invalid Login:**
```
Login API error: Error: Request failed with status code 400
Error response: 400 {error: {...}}
Login failed with error: 400
```

**Product Not Found:**
```
Invalid product data structure
Error: فشل في تحميل بيانات المنتج
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Solution:**
- Check backend is running on correct port
- Verify API_URL in `local.js`
- Check CORS settings in backend

### Issue 2: Login redirects but shows login page again
**Solution:**
- Check Redux store is persisting
- Verify JWT token is saved
- Check browser console for errors

### Issue 3: Products page crashes
**Solution:**
- Check product has valid variants
- Verify image data structure
- Check console for null reference errors

### Issue 4: Admin panel shows blank
**Solution:**
- Verify user type is 1 (admin)
- Check authentication token
- Verify API endpoints are accessible

---

## ✅ Success Criteria

All tests pass when:
1. ✅ Login works with valid credentials
2. ✅ Registration creates new users
3. ✅ Admin panel loads without errors
4. ✅ Dashboard displays all charts
5. ✅ Products list loads and displays
6. ✅ Product page handles all edge cases
7. ✅ Error messages are user-friendly
8. ✅ No console errors in normal flow
9. ✅ All CRUD operations work
10. ✅ Responsive design works on all devices

---

## 🔍 Browser DevTools Checklist

### Network Tab
- ✅ All API calls return 200 (success) or appropriate error codes
- ✅ No CORS errors
- ✅ Request/response payloads are correct

### Console Tab
- ✅ No unhandled errors
- ✅ Informative logs for debugging
- ✅ Error messages are clear

### Application Tab
- ✅ JWT token is stored correctly
- ✅ Redux state persists
- ✅ Local storage has correct data

---

## 📝 Test Report Template

```
Date: ___________
Tester: ___________
Environment: Local / Production

| Test Case | Status | Notes |
|-----------|--------|-------|
| Login - Valid | ✅/❌ | |
| Login - Invalid | ✅/❌ | |
| Register - Valid | ✅/❌ | |
| Admin Dashboard | ✅/❌ | |
| Products List | ✅/❌ | |
| Product Page | ✅/❌ | |
| Error Handling | ✅/❌ | |

Overall Status: ✅ PASS / ❌ FAIL
```

---

**Happy Testing! 🚀**
