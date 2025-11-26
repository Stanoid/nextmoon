# Backend Performance Fix Required

## Problem
The `getAllProductsAdmin` endpoint is returning ALL products at once, causing very slow loading times in the admin panel.

## Solution Required in minimoonback

Update the products endpoint to support server-side pagination and filtering:

### API Endpoint Changes

**Endpoint:** `GET /products?func=getAllProductsAdmin`

**Add Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `search` - Search query (optional, searches in code, name_ar, name_en)

**Response Format:**
```json
{
  "products": [...],
  "total": 1234,
  "page": 1,
  "limit": 20
}
```

### Example Implementation (Node.js/Express)

```javascript
// In your products controller
async getAllProductsAdmin(req, res) {
  const { page = 1, limit = 20, search = '' } = req.query;
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (search) {
    whereClause = {
      [Op.or]: [
        { code: { [Op.like]: `%${search}%` } },
        { name_ar: { [Op.like]: `%${search}%` } },
        { name_en: { [Op.like]: `%${search}%` } }
      ]
    };
  }

  const { count, rows } = await Product.findAndCountAll({
    where: whereClause,
    limit: parseInt(limit),
    offset: parseInt(offset),
    include: ['images', 'varients'], // Include related data
    order: [['createdAt', 'DESC']]
  });

  res.json({
    products: rows,
    total: count,
    page: parseInt(page),
    limit: parseInt(limit)
  });
}
```

## Frontend Changes (Already Done)

The frontend has been updated to:
- Send pagination parameters to the backend
- Handle paginated responses
- Debounce search queries (500ms delay)
- Show loading states properly

## Testing

After backend changes, test with:
1. Navigate to admin products list
2. Verify fast loading (should load only 20 items)
3. Test pagination buttons
4. Test search functionality
5. Test changing items per page

## Priority: HIGH
This is blocking admin users from managing products efficiently.
