# Backend Work Instructions

## IMPORTANT: Read This Before Making Backend Changes

When working on backend code (API endpoints, database queries, server-side logic), please follow these guidelines:

### ⚠️ DO NOT RUIN EXISTING FUNCTIONALITY

1. **Always preserve existing logic** - Do not remove or break working features
2. **Test thoroughly** - Verify that changes don't break existing endpoints
3. **Maintain data integrity** - Ensure database operations are safe and reversible
4. **Keep API contracts** - Don't change response formats without updating frontend

### 🔍 Before Making Changes

- **Read the entire file** - Understand the context and dependencies
- **Check related files** - Look for files that depend on what you're changing
- **Review error handling** - Ensure proper error responses are maintained
- **Verify authentication** - Don't break auth/authorization logic

### ✅ Best Practices

1. **Incremental changes** - Make small, testable changes
2. **Preserve fallbacks** - Keep default values and error handling
3. **Document changes** - Add comments explaining complex logic
4. **Maintain consistency** - Follow existing code patterns
5. **Keep backups** - Ensure critical data operations are reversible

### 🚫 What NOT to Do

- ❌ Don't delete working endpoints without confirmation
- ❌ Don't change database schemas without migration plan
- ❌ Don't remove error handling or validation
- ❌ Don't break existing API response formats
- ❌ Don't modify authentication/authorization without careful review

### 📝 When Asked to Edit Backend

1. First, ask for clarification on what should be preserved
2. Explain what will change and what will stay the same
3. Propose the changes before implementing
4. Test the changes thoroughly
5. Verify frontend still works with the changes

---

**Remember: Backend changes affect the entire application. Always err on the side of caution and preserve existing functionality unless explicitly told to remove it.**
